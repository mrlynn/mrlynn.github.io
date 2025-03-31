import { NextResponse } from 'next/server';

// Cache token and expiration
let cachedToken = null;
let tokenExpiration = null;

export async function GET() {
  try {
    // Check if we have a valid cached token
    if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
      return NextResponse.json({ access_token: cachedToken });
    }

    // Validate environment variables
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.error('Missing Spotify credentials');
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get Spotify token', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Cache the token with 55 minutes expiration (tokens last 1 hour)
    cachedToken = data.access_token;
    tokenExpiration = Date.now() + (55 * 60 * 1000);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return NextResponse.json(
      { error: 'Failed to get Spotify token', details: error.message },
      { status: 500 }
    );
  }
} 