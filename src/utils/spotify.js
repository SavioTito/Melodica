// utils/spotify.js

// ✅ Get playlist duration
export const getPlaylistDuration = async (playlistId, token) => {
  let totalDurationMs = 0;
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

  console.log("Access Token:", token);
  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) break;

    const data = await res.json();
    for (const item of data.items) {
      if (item.track?.duration_ms) {
        totalDurationMs += item.track.duration_ms;
      }
    }

    nextUrl = data.next;
  }

  return totalDurationMs;
};

// ✅ Fetch playlists based on genres
export const fetchPlaylistsByGenres = async (genres, token) => {
  const playlistFetches = genres.map(async (genre) => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        genre
      )}&type=playlist&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.playlists.items;
  });

  const playlistsByGenre = await Promise.all(playlistFetches);
  const allPlaylists = playlistsByGenre.flat();
  const limitedPlaylists = allPlaylists.slice(0, 50);

  const enrichedPlaylists = await Promise.all(
    limitedPlaylists.map(async (playlist) => {
      if (!playlist || !playlist.id) return null;
      const durationMs = await getPlaylistDuration(playlist.id, token);
      return { ...playlist, durationMs };
    })
  );

  return enrichedPlaylists.filter(Boolean);
};

// ✅ Format playlist duration
export const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// ✅ Check if user saved a playlist
export const isPlaylistSaved = async (playlistId, token) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=50`, // we loop through user's playlists
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) return false;

  const data = await res.json();
  return data.items.some((pl) => pl.id === playlistId);
};

// ✅ Follow a playlist (save it)
export const savePlaylist = async (playlistId, token) => {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.ok;
};

// ✅ Unfollow a playlist
export const unsavePlaylist = async (playlistId, token) => {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.ok;
};

// ✅ NEW: Enrich a single playlist with duration + save status
export const enrichPlaylist = async (playlist, token) => {
  const durationMs = await getPlaylistDuration(playlist.id, token);
  const saved = await isPlaylistSaved(playlist.id, token);
  return { ...playlist, durationMs, saved };
};

// ✅ NEW: Load mood, token, and playlists from sessionStorage (for reuse)
export const getSessionData = () => {
  const mood = sessionStorage.getItem("userMood");
  const token = sessionStorage.getItem("spotifyToken");
  const raw = JSON.parse(sessionStorage.getItem("playlists") || "[]");
  return { mood, token, rawPlaylists: raw };
};

// ✅ NEW: Toggle Save/Unsave status
export const toggleSavePlaylist = async (playlist, token) => {
  if (playlist.saved) {
    await unsavePlaylist(playlist.id, token);
    return { ...playlist, saved: false };
  } else {
    await savePlaylist(playlist.id, token);
    return { ...playlist, saved: true };
  }
};
