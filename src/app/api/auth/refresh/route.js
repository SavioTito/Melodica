import axios from "axios";

export async function POST(req) {
  const { refresh_token } = await req.json();

  if (!refresh_token) {
    return new Response("Refresh token missing", { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data || error);
    return new Response("Token refresh failed", { status: 500 });
  }
}
