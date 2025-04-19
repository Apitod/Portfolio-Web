import { NextRequest, NextResponse } from 'next/server';

// Spotify API credentials (would be better in environment variables)
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '1e276f00cb404462948283877b3c2869';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'a6bb2ed5f9204ba88e9760742fa837bd';
// For demo purposes - replace with your actual refresh token from Spotify
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || 'AQCaS50iOJ3l7v_HBO0mrBYBni-lxi4B63MUUj4AcsbcBCia8YEChGFIkehlAezEI_B-4TxRsH9p5R2OzfsCrwsw7AJvW6odnweAY5NiTpn1gBrd1kFxbYSruRjxJ1ojDtw';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player';

// Get access token using refresh token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN
    })
  });

  const data = await response.json();
  return data.access_token;
};

// Control Spotify playback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }
    
    const accessToken = await getAccessToken();
    
    let endpoint = '';
    let method = 'PUT';
    
    switch (action) {
      case 'play':
        endpoint = 'https://api.spotify.com/v1/me/player/play';
        break;
      case 'pause':
        endpoint = 'https://api.spotify.com/v1/me/player/pause';
        break;
      case 'next':
        endpoint = 'https://api.spotify.com/v1/me/player/next';
        method = 'POST';
        break;
      case 'previous':
        endpoint = 'https://api.spotify.com/v1/me/player/previous';
        method = 'POST';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (response.status === 204) {
      return NextResponse.json({ success: true });
    }
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error.message }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error controlling Spotify playback:', error);
    return NextResponse.json({ error: 'Failed to control playback' }, { status: 500 });
  }
}

// Needed for Next.js API routes
export const dynamic = 'force-dynamic'; 