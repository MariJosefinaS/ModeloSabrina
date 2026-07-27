import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Cuidados en internación conjunta · Sanatorio Modelo S.A.",
  description:
    "Guía breve de cuidados del recién nacido para acompañarte durante la internación conjunta en el Sanatorio Modelo S.A.: alimentación, sueño seguro, pañal, cordón, signos de alarma y vínculo.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF9F3" },
    { media: "(prefers-color-scheme: dark)", color: "#071A2E" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

// Se ejecuta antes de pintar para que la página no arranque en claro y salte
// a oscuro. Sigue al navegador salvo que haya una elección guardada.
const TEMA_INICIAL = `
try {
  var t = localStorage.getItem("tema");
  var oscuro = t ? t === "oscuro"
                 : matchMedia("(prefers-color-scheme: dark)").matches;
  if (oscuro) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_INICIAL }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
