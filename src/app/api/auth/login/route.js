export async function GET() {
  const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`;

  return Response.redirect(authUrl);
}
