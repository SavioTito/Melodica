"use client";
import { useEffect, useState } from "react";
import {
  enrichPlaylist,
  getSessionData,
  formatDuration,
  toggleSavePlaylist,
} from "@/utils/spotify";
import "./recommendations.css";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/icons";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const { mood, token, rawPlaylists } = getSessionData();
      setMood(mood);

      const enriched = await Promise.all(
        rawPlaylists.map((playlist) => enrichPlaylist(playlist, token))
      );

      setPlaylists(enriched);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  const handleToggleSave = async (playlistId) => {
    const token = sessionStorage.getItem("spotifyToken");
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    const updated = await toggleSavePlaylist(playlist, token);
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? updated : p))
    );
  };

  const moodData = moodBanners[mood] || {};

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <main className="playlistContainer">
      <header
        className="playlistBanner"
        style={{
          backgroundImage: `url(${moodData.image || "/img/m-darkground.webp"})`,
        }}
      >
        <div className="bannerContent">
          <h1 className="bannerTitle">{moodData.title || "Recommendations"}</h1>
          <span>{moodData.description || "Playlists chosen for you."}</span>
        </div>
      </header>

      <section className="playlistWrapper">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Tracks</th>
                <th>Duration</th>
                <th>Save</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => (
                <tr key={playlist.id}>
                  <td className="title-column">
                    <Image
                      src={playlist.images[0].url}
                      alt="cover"
                      width={55}
                      height={55}
                      className="playlist-image"
                    />
                    {playlist.name.length > 30
                      ? playlist.name.substring(0, 25).toUpperCase() + "..."
                      : playlist.name.toUpperCase()}
                  </td>
                  <td className="description">
                    {playlist.description?.length > 30
                      ? playlist.description.substring(0, 50).toLowerCase() +
                        "..."
                      : playlist.description?.toLowerCase() || "no description"}
                  </td>
                  <td>{playlist.tracks.total}</td>
                  <td>{formatDuration(playlist.durationMs)}</td>
                  <td>
                    <button
                      className="savePlaylist"
                      onClick={() => handleToggleSave(playlist.id)}
                    >
                      {playlist.saved ? (
                        <Icons.Unsave className="playlistsIcon" />
                      ) : (
                        <Icons.Save className="playlistsIcon" />
                      )}
                    </button>
                  </td>
                  <td>
                    <Link
                      href={playlist.external_urls.spotify}
                      className="openPlaylist"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open <Icons.Link className="playlistsIcon" />
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
