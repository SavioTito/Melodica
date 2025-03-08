"use client";
import { useState, useEffect } from "react";
import "./recommendations.css";
import Icons from "@/components/icons";

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
    <main className="playlistContainer">
      <header className="playlistBanner">
        <div className="bannerContent">
          <h1 className="bannerTitle">
            Poderia dizer-te que vai ficar tudo bem, mas vejo que já sabes
          </h1>
          <span>A música entende o que as palavras não dizem.</span>
        </div>
      </header>
      <section className="playlistWrapper">
        <div className="playlistGrid">
          {playlists.map((playlist, index) => (
            <div key={`${playlist.id}-${index}`} className="playlist">
              <div className="playlistCover">
                <img src={playlist.images[0].url} alt="playlist" />
              </div>
              <div className="playlistDetails">
                <h2>{playlist.name}</h2>
                <p>{playlist.description}</p>
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver playlist
                  <Icons.Link className="playlistOpenIcon"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
