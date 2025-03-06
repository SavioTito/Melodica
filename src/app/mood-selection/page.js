"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Icons from "@/components/icons";
import "./mood-selection.css";

export default function MoodSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [selectedMood, setSelectedMood] = useState("");

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
  }, []);

  
  console.log("TOKEN DE ACESSO: ",token);

  return (
    <main className="moodSelection">
      <h1>Conte-nos como te sentes e nós recomendamos-te a música perfeita</h1>
      <div className="moodSelectionWrapper">
        <form >
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

          <button type="submit" className="moodSubmit" disabled={!selectedMood}>
            <Icons.Search className="moodSubmitIcon" />
            Buscar músicas
          </button>
        </form>
      </div>
    </main>
  );
}
