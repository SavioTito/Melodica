"use client";
import { useState, useEffect } from "react";
import "./recommendations.css";
import Icons from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { formatDuration } from "@/utils/spotify";

const moodBanners = {
  happy: {
    image: "/img/happyBanner.svg",
    title: "Feliz e com ritmo! 🎉",
    description:
      "Sons contagiantes pra acompanhar teu bom humor. De pop a kuduro, deixa a batida guiar teu sorriso.",
  },
  relaxed: {
    image: "/img/relaxedBanner.svg",
    title: "Relax total 😌",
    description:
      "Músicas suaves pra descontrair e curtir o momento. Jazz, lo-fi, kizomba... é só sentir.",
  },
  focus: {
    image: "/img/focusBanner.svg",
    title: "Foco no objetivo 🎯",
    description:
      "Instrumentais e eletrônicas que te mantêm produtivo e centrado. Sem distrações, só flow.",
  },
  romantic: {
    image: "/img/romanticBanner",
    title: "Amor no ar 💘",
    description:
      "Trilhas que tocam o coração. De soul a flamenco, sinta a vibe apaixonada no ar.",
  },
  sad: {
    image: "/img/sadBanner.svg",
    title: "Momento introspectivo 🌧️",
    description:
      "Músicas pra refletir e sentir. Acalma o peito com tons suaves e profundos.",
  },
  angry: {
    image: "/img/angryBanner.svg",
    title: "Solta tudo! 🔥",
    description:
      "Quando a energia tá intensa, o som também tem que ser. Rock, trap, metal – libera geral.",
  },
};

export default function Recommendations() {
  const [playlists, setPlaylists] = useState([]);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    const storedMood = sessionStorage.getItem("userMood");
    setMood(storedMood);

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

  const moodData = moodBanners[mood];

  return (
    <main className="playlistContainer">
      <header
        className="playlistBanner"
        style={{
          backgroundImage: `url(${
            moodBanners[mood]?.image || "public/img/m-darkground.webp"
          })`,
        }}
      >
        <div className="bannerContent">
          <h1 className="bannerTitle">
            {moodBanners[mood]?.title || "Recommendations"}
          </h1>
          <span>
            {moodBanners[mood]?.description || "Playlists chosen for you."}
          </span>
        </div>
      </header>

      <section className="playlistWrapper">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">Title</th>
                <th className="table-head">Description</th>
                <th className="table-head">Tracks</th>
                <th className="table-head">Duration</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist, index) => (
                <tr key={`${playlist.id}-${index}`}>
                  <td className="title-column">
                    <Image
                      src={playlist.images[0].url}
                      alt="icone"
                      width={55}
                      height={55}
                      className="playlist-image"
                    />
                    {playlist.name.length > 30
                      ? playlist.name.substring(0, 25).toUpperCase() + "..."
                      : playlist.name.toUpperCase()}
                  </td>
                  <td className="description">
                    {playlist.description.length > 30
                      ? playlist.description.substring(0, 50).toLowerCase() +
                        "..."
                      : playlist.description.toLowerCase() ||
                        "No description for this. Just feel it "}
                  </td>
                  <td>{playlist.tracks.total}</td>
                  <td>{formatDuration(playlist.durationMs)}</td>
                  <td>
                    <button className="savePlaylist">
                      <Icons.Save className="playlistsIcon" />
                    </button>
                  </td>
                  <td>
                    <Link
                      href={playlist.external_urls.spotify}
                      className="openPlaylist"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir
                      <Icons.Link className="playlistsIcon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
