import { RateLimiter } from '../../../lib/rateLimit';
import { cookies } from 'next/headers';
import { personalInfo, generateBaseSystemPrompt } from '../../../data/personalInfo';
import { retrieveContext, formatContext } from '../../../lib/rag';
import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;

// Separate rate limiter for chat: 20 requests per 5 minutes
const chatRateLimiter = new RateLimiter(300000, 20);

// Max input length per message to prevent abuse
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 20;

export async function POST(request) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return Response.json(
        { error: 'Chat is not configured. The site owner needs to add an API key.' },
        { status: 503 }
      );
    }

    // Cookie-based user identification
    const cookieStore = cookies();
    let userId = cookieStore.get('chat_user_id')?.value;

    if (!userId) {
      userId = Math.random().toString(36).substring(2);
      cookieStore.set('chat_user_id', userId, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    // Check rate limit
    if (chatRateLimiter.isRateLimited(userId)) {
      const remainingTime = chatRateLimiter.getResetTime(userId) - Date.now();
      return Response.json(
        {
          error: `You've sent a lot of messages! Please wait ${Math.ceil(remainingTime / 60000)} minute(s) and try again.`,
          remainingTime,
          remainingRequests: 0,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { messages, stream: useStream } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Validate and sanitize messages
    const sanitized = messages.slice(-MAX_MESSAGES).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content.slice(0, MAX_MESSAGE_LENGTH) : '',
    })).filter(m => m.content.length > 0);

    if (sanitized.length === 0) {
      return Response.json(
        { error: 'No valid messages provided' },
        { status: 400 }
      );
    }

    // ── RAG Retrieval ──
    // Extract the latest user message for semantic search
    const latestUserMessage = sanitized
      .filter(m => m.role === 'user')
      .pop()?.content || '';

    let contextBlock = '';
    try {
      if (VOYAGE_API_KEY && latestUserMessage) {
        console.log(`[Chat] RAG enabled — querying: "${latestUserMessage.substring(0, 60)}..."`);
        const results = await retrieveContext(latestUserMessage);
        contextBlock = formatContext(results);
        console.log(`[Chat] RAG returned ${results.length} results, context length: ${contextBlock.length} chars`);
      } else {
        console.log(`[Chat] RAG skipped — VOYAGE_API_KEY: ${!!VOYAGE_API_KEY}, message: ${!!latestUserMessage}`);
      }
    } catch (err) {
      console.error('[Chat] RAG retrieval error (falling back to static bio):', err.message);
      // Graceful degradation: use static bio if RAG fails
      contextBlock = `## Fallback Context\n${personalInfo.bio}\n\nNote: Live retrieval is temporarily unavailable. Using limited biographical context.`;
    }

    // Build the system prompt: personality/rules + retrieved context
    const systemPrompt = contextBlock
      ? `${generateBaseSystemPrompt()}\n\n${contextBlock}`
      : `${generateBaseSystemPrompt()}\n\n## Context\n${personalInfo.bio}`;

    // Claude messages format: same as current {role, content} format
    const claudeMessages = sanitized;

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // ── Streaming response ──
    if (useStream) {
      const stream = anthropic.messages.stream({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: claudeMessages,
      });

      const encoder = new TextEncoder();

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
              ) {
                const content = event.delta.text;
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          } catch (err) {
            console.error('Claude stream error:', err);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Remaining-Requests': String(chatRateLimiter.getRemainingRequests(userId)),
        },
      });
    }

    // ── Non-streaming fallback ──
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: claudeMessages,
    });

    const reply = response.content[0].text;

    return Response.json({
      reply,
      remainingRequests: chatRateLimiter.getRemainingRequests(userId),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
