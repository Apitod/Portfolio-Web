import { NextRequest, NextResponse } from 'next/server';

// Spotify API credentials
const CLIENT_ID = '1e276f00cb404462948283877b3c2869';
const CLIENT_SECRET = 'a6bb2ed5f9204ba88e9760742fa837bd';
const REDIRECT_URI = 'https://portfolio-web1-apitod-razans-projects-c60e1643.vercel.app/api/spotify/callback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
  }
  
  try {
    // Exchange the code for access and refresh tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      })
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Error exchanging code for tokens:', errorData);
      return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: tokenResponse.status });
    }
    
    const tokens = await tokenResponse.json();
    
    // Display the refresh token in the response
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authorization Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
            }
            pre {
              background-color: #f4f4f4;
              padding: 15px;
              border-radius: 5px;
              overflow-x: auto;
            }
            .token {
              font-weight: bold;
              font-size: 1.1em;
              color: #2d7eb7;
              word-break: break-all;
            }
            .instructions {
              margin-top: 20px;
              padding: 15px;
              background-color: #f9f9f9;
              border-left: 4px solid #2d7eb7;
            }
          </style>
        </head>
        <body>
          <h1>Spotify Authorization Successful!</h1>
          <p>Your refresh token is:</p>
          <pre><code class="token">${tokens.refresh_token}</code></pre>
          
          <div class="instructions">
            <h2>Next Steps:</h2>
            <ol>
              <li>Copy the refresh token above</li>
              <li>Add it to your .env.local file as <code>SPOTIFY_REFRESH_TOKEN=your_token</code></li>
              <li>Or update the route.ts file directly with this token value</li>
            </ol>
          </div>
          
          <p>You can now close this window and go back to your application.</p>
        </body>
      </html>
    `;
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 