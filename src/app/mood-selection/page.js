"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Icons from "@/components/icons";
import { fetchPlaylistsByGenres } from "@/utils/spotify";
import { getValidSpotifyToken } from "@/lib/spotify-auth"; // Import the helper function
import "./mood-selection.css";

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
  relaxed: [
    "lo-fi",
    "jazz",
    "ambient",
    "reggae",
    "country",
    "amapiano",
    "kizomba",
  ],
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
    // Try to get a valid token (check if expired or need refresh)
    async function checkToken() {
      let accessToken = searchParams.get("access_token");
      let refreshToken = searchParams.get("refresh_token");

      if (accessToken) {
        localStorage.setItem("spotify_access_token", accessToken);
        localStorage.setItem("spotify_refresh_token", refreshToken);
      } else {
        accessToken = await getValidSpotifyToken(); // Get the valid token (check if it's expired or refresh it)
      }

      if (accessToken) {
        setToken(accessToken);
      } else {
        router.push("/api/login"); // Redirect to login if no valid token
      }
    }

    checkToken();
  }, [searchParams, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood || !token) return;

    setIsLoading(true);

    try {
      const genres = moodToGenres[selectedMood];
      if (!genres) throw new Error("Invalid mood selected");

      const playlists = await fetchPlaylistsByGenres(genres, token);

      sessionStorage.setItem("playlists", JSON.stringify(playlists));
      sessionStorage.setItem("userMood", selectedMood);

      router.push("/recommendations");
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="moodSelection">
      <h1>
        Tell us how you feel and we will recommend the perfect playlists for you
      </h1>
      <h1 className="title2">Share your mood and get the perfect playlists.</h1>
      <div className="moodSelectionWrapper">
        <form onSubmit={handleSubmit}>
          <div className="groupMood">
            {[
              { id: "happy", label: "Happy", img: "/img/happy.svg" },
              { id: "relaxed", label: "Chill", img: "/img/relaxed.svg" },
              { id: "focus", label: "Focused", img: "/img/focus.svg" },
              { id: "romantic", label: "In love", img: "/img/romantic.svg" },
              { id: "sad", label: "Sad", img: "/img/sad.svg" },
              { id: "angry", label: "Mad", img: "/img/angry.svg" },
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
                  <Image
                    src={mood.img}
                    alt={mood.label}
                    width={50}
                    height={50}
                  />
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
              "Loading..."
            ) : (
              <>
                <Icons.Search className="moodSubmitIcon" />
                Get playlists
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
