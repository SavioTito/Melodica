"use client";

import { Inter, Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

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
                <a href="/">
                  <img src="/img/whitelogo.svg" alt="Melodica" />
                </a>
              </div>
              <nav>
                <a
                  href="https://www.linkedin.com/in/s%C3%A1vio-tito-023a55217/"
                  target="_blank"
                >
                  LinkedIn
                </a>
                /
                <a href="https://github.com/SavioTito" target="_blank">
                  GitHub
                </a>
                /
                <a
                  href="https://www.instagram.com/its.saviotito/"
                  target="_blank"
                >
                  Instagram
                </a>
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
