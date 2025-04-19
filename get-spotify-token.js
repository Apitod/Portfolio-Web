// Simple script to generate Spotify authorization URL and help get refresh token
const CLIENT_ID = '1e276f00cb404462948283877b3c2869';
const CLIENT_SECRET = 'a6bb2ed5f9204ba88e9760742fa837bd';
// Using the stable production URL
const REDIRECT_URI = 'https://portfolio-web1-apitod-razans-projects-c60e1643.vercel.app/api/spotify/callback';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state'
];

// Generate authorization URL
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

console.log('\n===== SPOTIFY TOKEN GENERATOR =====\n');
console.log('Step 1: Open this URL in your browser:');
console.log('\x1b[36m%s\x1b[0m', authUrl);
console.log('\nStep 2: Login to Spotify and authorize the application');
console.log('\nStep 3: After authorization, you will be redirected to your Vercel deployment.');
console.log('       If the callback endpoint is set up correctly, you should see the refresh token displayed.');
console.log('       If not, copy the "code" parameter from the URL in your browser address bar.\n');
console.log('Step 4: If you need to manually exchange the code, use this command:');
console.log('\x1b[33m%s\x1b[0m', `curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}" -d "grant_type=authorization_code&code=YOUR_CODE_HERE&redirect_uri=${encodeURIComponent(REDIRECT_URI)}" https://accounts.spotify.com/api/token\n`);
console.log('Step 5: Copy the "refresh_token" value from the response and update it in:');
console.log('       - src/app/api/spotify/route.ts');
console.log('       - src/app/api/spotify/control/route.ts\n');
console.log('=====================================') 