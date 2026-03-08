import { RateLimiter } from '../../../lib/rateLimit';
import { cookies } from 'next/headers';
import { generateSystemPrompt } from '../../../data/personalInfo';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Separate rate limiter for chat: 20 requests per 5 minutes
const chatRateLimiter = new RateLimiter(300000, 20);

// Max input length per message to prevent abuse
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 20;

export async function POST(request) {
  try {
    if (!OPENAI_API_KEY) {
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

    // Prepend system prompt
    const fullMessages = [
      { role: 'system', content: generateSystemPrompt() },
      ...sanitized,
    ];

    // Streaming response
    if (useStream) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API error:', errorData);
        return Response.json(
          { error: 'Failed to get a response. Please try again.' },
          { status: 502 }
        );
      }

      // Transform the OpenAI SSE stream into our own SSE stream
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const readable = new ReadableStream({
        async start(controller) {
          const reader = response.body.getReader();
          let buffer = '';

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith('data: ')) continue;

                const data = trimmed.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    );
                  }
                } catch {
                  // Skip malformed chunks
                }
              }
            }
          } catch (err) {
            console.error('Stream processing error:', err);
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

    // Non-streaming fallback
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return Response.json(
        { error: 'Failed to get a response. Please try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

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
