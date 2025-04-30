import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Authorization code missing", { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const redirectUrl = new URL(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/mood-selection`
    );
    redirectUrl.searchParams.set("access_token", access_token);
    redirectUrl.searchParams.set("refresh_token", refresh_token);
    redirectUrl.searchParams.set("expires_in", expires_in);

    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error(
      "Error getting Spotify token:",
      error.response?.data || error
    );
    return new Response("Authentication failed", { status: 500 });
  }
}
