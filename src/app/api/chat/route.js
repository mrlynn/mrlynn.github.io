import { RateLimiter } from '../../../lib/rateLimit';
import { cookies } from 'next/headers';
import { personalInfo, generateBaseSystemPrompt } from '../../../data/personalInfo';
import { retrieveContext, formatContext } from '../../../lib/rag';
import {
  getArticlePlainText,
  generateArticleSystemPrompt,
} from '../../../lib/articleContext';
import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

// Separate rate limiter for chat: 20 requests per 5 minutes
const chatRateLimiter = new RateLimiter(300000, 20);
// Article dock is easier to spam from blog pages — slightly tighter
const articleRateLimiter = new RateLimiter(300000, 12);

// Max input length per message to prevent abuse
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 20;
const MAX_ARTICLE_MESSAGES = 12;

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

    const body = await request.json();
    const { messages, stream: useStream, slug } = body;
    const isArticleMode = typeof slug === 'string' && slug.length > 0;
    const rateLimiter = isArticleMode ? articleRateLimiter : chatRateLimiter;
    const maxMessages = isArticleMode ? MAX_ARTICLE_MESSAGES : MAX_MESSAGES;

    // Check rate limit
    if (rateLimiter.isRateLimited(userId)) {
      const remainingTime = rateLimiter.getResetTime(userId) - Date.now();
      return Response.json(
        {
          error: `You've sent a lot of messages! Please wait ${Math.ceil(remainingTime / 60000)} minute(s) and try again.`,
          remainingTime,
          remainingRequests: 0,
        },
        { status: 429 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Validate and sanitize messages
    const sanitized = messages.slice(-maxMessages).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content.slice(0, MAX_MESSAGE_LENGTH) : '',
    })).filter(m => m.content.length > 0);

    if (sanitized.length === 0) {
      return Response.json(
        { error: 'No valid messages provided' },
        { status: 400 }
      );
    }

    let systemPrompt;

    if (isArticleMode) {
      const article = getArticlePlainText(slug);
      if (!article) {
        return Response.json(
          { error: 'Article not found for this chat.' },
          { status: 404 }
        );
      }
      systemPrompt = generateArticleSystemPrompt(article);
      console.log(`[Chat] Article mode — slug: ${slug}, chars: ${article.text.length}`);
    } else {
      // ── RAG Retrieval (site-wide Ask AI) ──
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
        contextBlock = `## Fallback Context\n${personalInfo.bio}\n\nNote: Live retrieval is temporarily unavailable. Using limited biographical context.`;
      }

      systemPrompt = contextBlock
        ? `${generateBaseSystemPrompt()}\n\n${contextBlock}`
        : `${generateBaseSystemPrompt()}\n\n## Context\n${personalInfo.bio}`;
    }

    // Claude messages format: same as current {role, content} format
    const claudeMessages = sanitized;

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // Sonnet 5 enables adaptive thinking by default; for this chat UX we want
    // the full max_tokens budget spent on the reply text, not silent thinking.
    const modelParams = {
      model: ANTHROPIC_MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: claudeMessages,
      thinking: { type: 'disabled' },
    };

    // ── Streaming response ──
    if (useStream) {
      const stream = anthropic.messages.stream(modelParams);

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
            const message =
              err?.status === 401
                ? 'Chat is temporarily unavailable (invalid API key).'
                : err?.status === 404
                  ? `Chat model is unavailable (${ANTHROPIC_MODEL}). Try setting ANTHROPIC_MODEL in .env.local.`
                  : 'Something went wrong while generating a reply.';
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
            );
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
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
          'X-Remaining-Requests': String(rateLimiter.getRemainingRequests(userId)),
        },
      });
    }

    // ── Non-streaming fallback ──
    const response = await anthropic.messages.create(modelParams);

    const reply =
      response.content?.find((block) => block.type === 'text')?.text || '';

    return Response.json({
      reply,
      remainingRequests: rateLimiter.getRemainingRequests(userId),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
