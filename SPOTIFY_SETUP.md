# Spotify Integration Setup

This guide explains how to set up Spotify API integration for your portfolio website to showcase your currently playing track.

## Prerequisites

1. A Spotify account (Premium recommended for full playback control)
2. A Spotify Developer account

## Steps to Set Up

### 1. Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app name and description
5. Click "Create"

### 2. Configure Your App

1. Click on your newly created app to view its settings
2. Note down the `Client ID` and `Client Secret`
3. Click "Edit Settings"
4. Add a Redirect URI: `http://localhost:3000/api/spotify/callback`
5. Save your changes

### 3. Get Your Refresh Token

To get a refresh token that will allow your application to access your Spotify data:

1. Create a temporary authorization URL with your Client ID and the following scopes:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing,user-read-playback-state,user-modify-playback-state
```

2. Replace `YOUR_CLIENT_ID` with your actual Client ID
3. Paste this URL in your browser and authorize the application
4. After authorization, you'll be redirected to your callback URL with a code parameter
5. Copy the code from the URL (everything after `code=`)

6. Use this code to request a refresh token by making a POST request to the Spotify token endpoint. You can use curl, Postman, or any API client:

```bash
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic YOUR_BASE64_ENCODED_CLIENT_ID_AND_SECRET" -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/api/spotify/callback" https://accounts.spotify.com/api/token
```

Replace:
- `YOUR_BASE64_ENCODED_CLIENT_ID_AND_SECRET` with Base64 encoded string of your client ID and secret (`client_id:client_secret`)
- `YOUR_CODE` with the code from step 5

7. This will return a JSON response containing a `refresh_token`. Save this token.

### 4. Update Your Environment Configuration

Create a `.env.local` file in the root of your project with the following variables:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

### 5. Update the API Route

Edit the files:
- `src/app/api/spotify/route.ts`
- `src/app/api/spotify/control/route.ts`

Replace the placeholder credentials with:

```typescript
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || '';
```

### 6. Restart Your Development Server

Stop and restart your Next.js development server to load the new environment variables.

## Usage

The Spotify integration allows you to:

1. Display your currently playing track in the footer
2. Control playback (play/pause, next, previous) 
3. Show track progress

## Troubleshooting

- **Token Expired**: Refresh tokens are long-lived but may eventually expire. If this happens, repeat the process to get a new refresh token.
- **Playback Control Issues**: Ensure you have a Spotify Premium account, as the free tier doesn't support remote playback control.
- **No Track Showing**: Make sure you're actively playing something on Spotify when testing.

## Security Considerations

Keep your Client ID, Client Secret, and Refresh Token private. Never commit them directly to your code repository. 