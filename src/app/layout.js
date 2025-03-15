"use client";

import { Inter, Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weights: ["400", "700"],
  variable: "--inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: ["400", "700"],
  variable: "--montserrat",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const noHeaderFooter = ["/login"];
  const hideHeaderFooter = noHeaderFooter.includes(pathName);

  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        {!hideHeaderFooter && (
          <header className="header">
            <div className="headerWrapper">
              <div className="logoWrapper">
                <Link href="/">
                  <Image src="/img/whitelogo.svg" alt="Melodica" />
                </Link>
              </div>
              <nav>
                <Link
                  href="https://www.linkedin.com/in/s%C3%A1vio-tito-023a55217/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
                /
                <Link href="https://github.com/SavioTito" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
                /
                <Link
                  href="https://www.instagram.com/its.saviotito/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </nav>
            </div>
          </header>
        )}

        {children}

        {!hideHeaderFooter && (
          <footer>
            <div className="footerWrapper">
              <p>© 2021 Melodica. Todos os direitos reservados.</p>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
