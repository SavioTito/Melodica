"use client";
import { useState, useEffect } from "react";
import "./recommendations.css";
import Icons from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

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

  console.log(playlists);
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
        <div className="playlistGrid">
          {playlists.map((playlist, index) => (
            <div key={`${playlist.id}-${index}`} className="playlist">
              <div className="playlistCover">
                <Image
                  src={playlist.images[0].url}
                  alt="playlist"
                  width={100}
                  height={100}
                />
              </div>
              <div className="playlistDetails">
                <h2>{playlist.name}</h2>
                <p>{playlist.description}</p>
                <Link
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver playlist
                  <Icons.Link className="playlistOpenIcon" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
