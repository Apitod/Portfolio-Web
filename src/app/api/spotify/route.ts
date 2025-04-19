import { NextResponse } from 'next/server';

// Spotify API credentials (would be better in environment variables)
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '1e276f00cb404462948283877b3c2869';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'a6bb2ed5f9204ba88e9760742fa837bd';
// For demo purposes - replace with your actual refresh token from Spotify
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || 'AQCaS50iOJ3l7v_HBO0mrBYBni-lxi4B63MUUj4AcsbcBCia8YEChGFIkehlAezEI_B-4TxRsH9p5R2OzfsCrwsw7AJvW6odnweAY5NiTpn1gBrd1kFxbYSruRjxJ1ojDtw';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

// Get access token using refresh token
const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
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

// Get currently playing track
const getNowPlaying = async () => {
  const accessToken = await getAccessToken();

  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.status === 204 || response.status === 404) {
    return NextResponse.json({ isPlaying: false });
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch currently playing track' },
      { status: response.status }
    );
  }

  const data = await response.json();
  
  const track = {
    isPlaying: data.is_playing,
    title: data.item?.name,
    artist: data.item?.artists?.map((artist: { name: string }) => artist.name).join(', '),
    album: data.item?.album?.name,
    albumImageUrl: data.item?.album?.images?.[0]?.url,
    songUrl: data.item?.external_urls?.spotify,
    progress: data.progress_ms,
    duration: data.item?.duration_ms
  };

  return NextResponse.json(track);
};

// API route handler
export async function GET() {
  try {
    const response = await getNowPlaying();
    return response;
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}

// Needed for Next.js static export
export const dynamic = 'force-dynamic'; 