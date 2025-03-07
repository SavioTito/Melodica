"use client";
import { useState, useEffect } from "react";

export default function Recommendations() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Retrieve playlists from sessionStorage
    const playlistsData = sessionStorage.getItem("playlists");
    if (playlistsData) {
      const parsedPlaylists = JSON.parse(playlistsData);
      // Filter out null or undefined playlists
      const validPlaylists = parsedPlaylists.filter(
        (playlist) => playlist && playlist.name
      );
      setPlaylists(validPlaylists);
    }
  }, []);

  console.log(playlists);
  return (
    <main>
      <h1>Recomendações</h1>
      <div>
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir no Spotify
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}