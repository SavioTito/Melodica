"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Icons from "@/components/icons";
import "./mood-selection.css";

// Mood to genres mapping
const moodToGenres = {
  happy: [
    "pop",
    "disco",
    "house",
    "funk",
    "reggaeton",
    "dancehall",
    "afrobeats",
    "k-pop",
    "samba",
    "kuduro",
    "semba",
  ],
  relaxed: ["lo-fi", "jazz", "ambient", "reggae", "country", "amapiano", "kizomba"],
  focus: ["classical", "instrumental", "minimal", "electronic"],
  romantic: ["r&b", "soul", "neo-soul", "flamenco", "gospel"],
  sad: ["indie", "acoustic", "blues", "folk", "fado"],
  angry: ["rock", "metal", "punk", "rap", "trap"],
};

function MoodSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [selectedMood, setSelectedMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let accessToken = searchParams.get("access_token");
    let refreshToken = searchParams.get("refresh_token");

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_refresh_token", refreshToken);
    } else {
      accessToken = localStorage.getItem("spotify_access_token");
    }

    setToken(accessToken);
    router.replace("/mood-selection");
  }, [searchParams, router]);

  const fetchPlaylistsByGenres = async (genres) => {
    const playlists = [];
    for (const genre of genres) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${genre}&type=playlist&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        playlists.push(...data.playlists.items);
      } else {
        console.error(`Error fetching playlists for genre: ${genre}`);
      }
    }
    return playlists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood || !token) return;

    setIsLoading(true);

    try {
      const genres = moodToGenres[selectedMood];
      if (!genres) throw new Error("Invalid mood selected");

      const playlists = await fetchPlaylistsByGenres(genres);

      sessionStorage.setItem("playlists", JSON.stringify(playlists));

      router.push("/recommendations");
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="moodSelection">
      <h1>Conte-nos como te sentes e nós recomendamos-te a música perfeita</h1>
      <div className="moodSelectionWrapper">
        <form onSubmit={handleSubmit}>
          <div className="groupMood">
            {[
              { id: "happy", label: "Feliz", img: "/img/happy.svg" },
              { id: "relaxed", label: "Tranquilo", img: "/img/relaxed.svg" },
              { id: "focus", label: "Focado", img: "/img/focus.svg" },
              { id: "romantic", label: "Apaixonado", img: "/img/romantic.svg" },
              { id: "sad", label: "Triste", img: "/img/sad.svg" },
              { id: "angry", label: "Chateado", img: "/img/angry.svg" },
            ].map((mood) => (
              <label key={mood.id} htmlFor={mood.id} className="moodCard">
                <input
                  type="radio"
                  id={mood.id}
                  name="mood"
                  className="hiddenRadioStyle"
                  onChange={() => setSelectedMood(mood.id)}
                />
                <div className="moodCardContent">
                  <Image src={mood.img} alt={mood.label} width={50} height={50} />
                  <span>{mood.label}</span>
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="moodSubmit"
            disabled={!selectedMood || isLoading}
          >
            {isLoading ? (
              "Carregando..."
            ) : (
              <>
                <Icons.Search className="moodSubmitIcon" />
                Buscar músicas
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function MoodSelection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoodSelectionContent />
    </Suspense>
  );
}