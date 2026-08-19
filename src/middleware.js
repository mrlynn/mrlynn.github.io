import { NextResponse } from 'next/server';

// Routes matched below are gated by HTTP Basic auth against ADMIN_PASSWORD.
// Blog reads stay public — the site itself fetches them — so only mutating
// methods are challenged on /api/blog.
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/blog') && !MUTATING_METHODS.has(request.method)) {
    return NextResponse.next();
  }

  // Fail closed: with no password configured there is no way to authenticate,
  // so the route stays locked rather than silently open.
  // Trim the stored value: pasting into `vercel env add` commonly captures a
  // trailing newline, which would silently break every comparison.
  const expected = (process.env.ADMIN_PASSWORD || '').trim();
  if (!expected) {
    return unauthorized();
  }

  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) {
    return unauthorized();
  }

  let decoded;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(':');
  if (separator === -1) {
    return unauthorized();
  }

  if (!safeEqual(decoded.slice(separator + 1), expected)) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/blog', '/api/blog/:path*', '/api/upload'],
};
