export async function getValidSpotifyToken() {
  const accessToken = localStorage.getItem("spotify_access_token");
  const expiryTime = parseInt(localStorage.getItem("spotify_token_expiry"), 10);
  const refreshToken = localStorage.getItem("spotify_refresh_token");

  if (Date.now() < expiryTime) {
    return accessToken;
  }

  // Token expired, refresh it
  try {
    const res = await fetch("/api/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) throw new Error("Failed to refresh");

    const data = await res.json();
    const newAccessToken = data.access_token;
    const newExpiryTime = Date.now() + data.expires_in * 1000;

    localStorage.setItem("spotify_access_token", newAccessToken);
    localStorage.setItem("spotify_token_expiry", newExpiryTime.toString());

    return newAccessToken;
  } catch (err) {
    console.error("Refresh failed, redirecting to login...");
    window.location.href = "/api/login";
    return null;
  }
}
