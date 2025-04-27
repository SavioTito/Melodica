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
    title: "Happy and groovin'! 🎉",
    description:
      "Catchy beats to match your good mood. From pop to kuduro, let the rhythm guide your smile.",
  },
  relaxed: {
    image: "/img/relaxedBanner.svg",
    title: "Total chill 😌",
    description:
      "Smooth tunes to unwind and enjoy the moment. Jazz, lo-fi, kizomba... just feel it.",
  },
  focus: {
    image: "/img/focusBanner.svg",
    title: "Focused on the goal 🎯",
    description:
      "Instrumentals and electronic beats to keep you productive and in the zone. No distractions, just flow.",
  },
  romantic: {
    image: "/img/romanticBanner",
    title: "Love in the air 💘",
    description:
      "Tracks that touch the heart. From soul to flamenco, feel the romantic vibe in the air.",
  },
  sad: {
    image: "/img/sadBanner.svg",
    title: "Introspective moment 🌧️",
    description:
      "Songs to reflect and feel. Calm your heart with smooth, deep tones.",
  },
  angry: {
    image: "/img/angryBanner.svg",
    title: "Let it all out! 🔥",
    description:
      "When the energy is intense, the sound needs to match. Rock, trap, metal – let it all go.",
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
                      Open
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
