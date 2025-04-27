"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Icons from "@/components/icons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <div>
      <section className={styles.banner}>
        <div className={styles.bannerWrapper}>
          <h1 className={styles.title}>
            The music you need, just when you need it
          </h1>
          <p className={styles.description}>
            You know that song that just gets how you’re feeling? Here, you pick
            your mood, and we’ll drop the perfect soundtrack—straight from
            Spotify. 🔥
          </p>
          <p className={styles.description2}>
            Set your vibe, and we’ll hit you with the perfect Spotify
            soundtrack. 🔥
          </p>
          <div className={styles.cto}>
            <button className={styles.cta} onClick={handleLogin}>
              Get started
              <Icons.Link className={styles.linkIcon} />
            </button>
          </div>
        </div>
      </section>

      <section className={styles.genres}>
        <ul>
          <li>Pop</li>
          <li>Rock</li>
          <li>Rap</li>
          <li>Electronic</li>
          <li>Reggaeton</li>
          <li>R&B</li>
          <li>Jazz</li>
          <li>Classical</li>
          <li>Country</li>
          <li>Reggae</li>
          <li>Metal</li>
          <li>Afrobeats</li>
          <li>K-Pop</li>
          <li>Flamenco</li>
          <li>Samba</li>
          <li>Kuduro</li>
          <li>Semba</li>
          <li>Kizomba</li>
          <li>Amapiano</li>
          <li>Blues</li>
          <li>Fado</li>
          <li>Gospel</li>
          <li>Soul</li>
          <li>Funk</li>
          <li>Dancehall</li>
          <li>Trap</li>
          <li>Folk</li>
          <li>Punk</li>
          <li>Disco</li>
        </ul>
      </section>

      <section className={styles.steps}>
        <div className={styles.stepsWrapper}>
          <h2>Get song suggestions that match your vibe in the moment</h2>
          <span className={styles.stepsSign}>Steps</span>
          <div className={styles.stepsContent}>
            <div className={styles.stepCard}>
              <Icons.FingerPrint className={styles.stepIcon} />
              <h3>Access Spotify</h3>
              <p>
                Connect your Spotify account and we'll manage your playlists
                based on how you're feeling.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Feeling className={styles.stepIcon} />
              <h3>Choose your mood</h3>
              <p>
                Tell us how you're feeling right now and let the magic happen.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Playlist className={styles.stepIcon} />
              <h3>Get playlist suggestions</h3>
              <p>
                We’ll recommend the best Spotify playlists that match your mood.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Save className={styles.stepIcon} />
              <h3>Save Playlist</h3>
              <p>
                If you liked the selection, save the playlist to your Spotify
                and listen whenever you want.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
