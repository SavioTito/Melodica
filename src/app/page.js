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
            A música que você precisa, no momento certo
          </h1>
          <p className={styles.description}>
            Sabe aquele som que encaixa perfeitamente com o que você tá
            sentindo? Aqui, você escolhe seu mood, e a gente te entrega a trilha
            sonora perfeita, direto do Spotify. 🔥
          </p>
          <p className={styles.description2}>
          Escolha seu mood e receba a trilha sonora perfeita do Spotify. 🔥
          </p>
          <div className={styles.cto}>
            <button className={styles.cta} onClick={handleLogin}>
              Começar
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
          <h2>
            Receba sugestões de músicas que combinarão com você no momento
          </h2>
          <span className={styles.stepsSign}>Passos</span>
          <div className={styles.stepsContent}>
            <div className={styles.stepCard}>
              <Icons.FingerPrint className={styles.stepIcon} />
              <h3>Acesse o Spotify</h3>
              <p>
                Conecte a sua conta Spotify e a gente gerenciará as suas
                playlists com base no que estás sentindo.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Feeling className={styles.stepIcon} />
              <h3>Escolha seu mood</h3>
              <p>
                Selecione como você está se sentindo no momento e deixe a mágica
                acontecer.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Playlist className={styles.stepIcon} />
              <h3>Receba sugestões de Playlist</h3>
              <p>
                Nós vamos te recomendar as melhores playlists do Spotify que
                combinam com o seu mood.
              </p>
            </div>

            <div className={styles.stepCard}>
              <Icons.Save className={styles.stepIcon} />
              <h3>Salve Playlist</h3>
              <p>
                Se gostou da seleção, salve a playlist no seu Spotify e ouça
                quando quiser.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
