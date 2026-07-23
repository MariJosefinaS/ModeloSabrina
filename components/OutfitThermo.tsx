"use client";

import { useState } from "react";

type Level = {
  key: string;
  label: string;
  emoji: string;
  capas: string;
  body: string; // color del enterito
  jacket: boolean;
  hat: boolean;
  blanket: boolean;
  socks: boolean;
  tip: string;
};

const LEVELS: (Level & { min: number; max: number })[] = [
  {
    min: -99, max: 15.99, key: "muy-frio", label: "Muy frío", emoji: "🥶",
    capas: "3 capas + manta", body: "#3E86C6", jacket: true, hat: true, blanket: true, socks: true,
    tip: "Body + enterito + buzo abrigado y mantita para salir. El gorro, solo en exteriores. Los prematuros suelen necesitar una capa más.",
  },
  {
    min: 16, max: 19.99, key: "fresco", label: "Fresco · ideal para dormir", emoji: "🌤️",
    capas: "2 capas", body: "#7FC3E4", jacket: false, hat: false, blanket: false, socks: true,
    tip: "Body + pijama o enterito. Este es el rango ideal del cuarto para dormir (16–20 °C).",
  },
  {
    min: 20, max: 23.99, key: "templado", label: "Templado", emoji: "🙂",
    capas: "1 a 2 capas", body: "#7BD389", jacket: false, hat: false, blanket: false, socks: true,
    tip: "Un body con enterito liviano alcanza. Tocá la nuca: si está transpirada, sacá una capa.",
  },
  {
    min: 24, max: 26.99, key: "calido", label: "Cálido", emoji: "☀️",
    capas: "1 capa", body: "#FFCE5C", jacket: false, hat: false, blanket: false, socks: false,
    tip: "Con una sola capa liviana de algodón alcanza. Abrigar de más provoca sudor e incomodidad.",
  },
  {
    min: 27, max: 99, key: "caluroso", label: "Caluroso", emoji: "🥵",
    capas: "1 capa muy liviana", body: "#FFB38A", jacket: false, hat: false, blanket: false, socks: false,
    tip: "Body de manga corta o solo el pañal. Ofrecé el pecho más seguido para mantenerlo hidratado.",
  },
];

function levelFor(temp: number) {
  return LEVELS.find((l) => temp >= l.min && temp <= l.max) ?? LEVELS[2];
}

export default function OutfitThermo() {
  const [temp, setTemp] = useState(22);
  const lvl = levelFor(temp);
  const frio = lvl.key === "muy-frio";
  const calor = lvl.key === "calido" || lvl.key === "caluroso";

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Bebé que cambia de ropa */}
      <div className="relative mx-auto w-full max-w-xs">
        <div className="anim-bob-slow rounded-[2rem] bg-white/70 p-4 shadow-soft ring-1 ring-white">
          <svg viewBox="0 0 220 260" className="w-full" role="img" aria-label={`Bebé vestido para clima ${lvl.label}`}>
            <defs>
              <radialGradient id="ot-cheek" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9DB0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF9DB0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* acento de clima en la esquina */}
            {frio && (
              <g stroke="#BFE3FF" strokeWidth="3" strokeLinecap="round">
                <line x1="196" y1="30" x2="196" y2="54" />
                <line x1="184" y1="42" x2="208" y2="42" />
                <line x1="188" y1="34" x2="204" y2="50" />
                <line x1="204" y1="34" x2="188" y2="50" />
              </g>
            )}
            {calor && (
              <g>
                <circle cx="196" cy="40" r="10" fill="#FFCE5C" />
                <g stroke="#FFCE5C" strokeWidth="3" strokeLinecap="round">
                  <line x1="196" y1="20" x2="196" y2="26" />
                  <line x1="196" y1="54" x2="196" y2="60" />
                  <line x1="176" y1="40" x2="182" y2="40" />
                  <line x1="210" y1="40" x2="216" y2="40" />
                </g>
              </g>
            )}

            {/* manta / capullo (muy frío) */}
            {lvl.blanket && (
              <path d="M58 150c34-20 70-20 104 0 12 46-20 66-52 66s-64-20-52-66z" fill="#DDEFFF" stroke="#9FD1F0" strokeWidth="3" />
            )}

            {/* piernas + piecitos/medias */}
            <path d="M96 198v18" stroke="#F3C09B" strokeWidth="18" strokeLinecap="round" />
            <path d="M124 198v18" stroke="#F3C09B" strokeWidth="18" strokeLinecap="round" />
            <ellipse cx="94" cy="224" rx="13" ry="9" fill={lvl.socks ? "#FF9DB0" : "#FFD9B8"} />
            <ellipse cx="126" cy="224" rx="13" ry="9" fill={lvl.socks ? "#FF9DB0" : "#FFD9B8"} />

            {/* enterito / body */}
            <path d="M110 118c-27 0-42 19-42 48 0 27 17 46 42 46s42-19 42-46c0-29-15-48-42-48z" fill={lvl.body} />
            <ellipse cx="92" cy="150" rx="14" ry="18" fill="#ffffff" opacity="0.18" />
            <circle cx="110" cy="150" r="3.6" fill="#ffffff" opacity="0.85" />
            <circle cx="110" cy="168" r="3.6" fill="#ffffff" opacity="0.85" />
            {/* bolsillo corazón */}
            <path d="M110 182c-6-5-12-1-12 3 0 5 7 9 12 12 5-3 12-7 12-12 0-4-6-8-12-3z" fill="#ffffff" opacity="0.55" />

            {/* brazos */}
            <path d="M78 138c-16 4-24 16-28 34" stroke="#F3C09B" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M142 138c16 4 24 16 28 34" stroke="#F3C09B" strokeWidth="16" strokeLinecap="round" fill="none" />
            <circle cx="48" cy="176" r="11" fill="#FFD9B8" />
            <circle cx="172" cy="176" r="11" fill="#FFD9B8" />

            {/* campera puffer (muy frío) */}
            {lvl.jacket && (
              <g>
                <path d="M110 116c-30 0-46 20-46 50 0 20 9 35 24 43 6 4 14 6 22 6s16-2 22-6c15-8 24-23 24-43 0-30-16-50-46-50z" fill="#5FA8D3" />
                <path d="M72 148c24 10 52 10 76 0" stroke="#BFE3FF" strokeWidth="3" fill="none" />
                <path d="M70 168c26 11 54 11 80 0" stroke="#BFE3FF" strokeWidth="3" fill="none" />
                <path d="M74 188c22 9 48 9 72 0" stroke="#BFE3FF" strokeWidth="3" fill="none" />
                {/* mangas puffer */}
                <circle cx="54" cy="150" r="17" fill="#5FA8D3" />
                <circle cx="166" cy="150" r="17" fill="#5FA8D3" />
                <circle cx="46" cy="176" r="12" fill="#F3C09B" />
                <circle cx="174" cy="176" r="12" fill="#F3C09B" />
                {/* bufanda */}
                <path d="M84 114c16 12 36 12 52 0l4 15c-20 12-40 12-60 0z" fill="#FF9DB0" />
                <path d="M130 122l14 4-6 26-14-4z" fill="#FF7FA0" />
              </g>
            )}

            {/* cabeza */}
            <circle cx="110" cy="74" r="46" fill="#FFD9B8" />
            <circle cx="64" cy="80" r="11" fill="#FFD9B8" />
            <circle cx="156" cy="80" r="11" fill="#FFD9B8" />

            {/* rulito (si no hay gorro) */}
            {!lvl.hat && (
              <path d="M110 30c-4-13 15-17 17-5 9-3 16 8 8 15" fill="none" stroke="#6B4F4F" strokeWidth="8" strokeLinecap="round" />
            )}

            {/* cachetitos */}
            <circle cx="86" cy="88" r="16" fill="url(#ot-cheek)" />
            <circle cx="134" cy="88" r="16" fill="url(#ot-cheek)" />

            {/* ojos */}
            <circle cx="96" cy="74" r="6" fill="#4A3B3B" />
            <circle cx="124" cy="74" r="6" fill="#4A3B3B" />
            <circle cx="98" cy="71" r="2" fill="#fff" />
            <circle cx="126" cy="71" r="2" fill="#fff" />

            {/* nariz + sonrisa */}
            <ellipse cx="110" cy="90" rx="3.4" ry="2.6" fill="#F3B58F" />
            <path d="M98 98c7 8 17 8 24 0" fill="none" stroke="#B5556B" strokeWidth="4" strokeLinecap="round" />

            {/* gorro con pompón (muy frío) */}
            {lvl.hat && (
              <g>
                <path d="M66 62c10-38 78-38 88 0z" fill="#3E86C6" />
                <rect x="62" y="56" width="96" height="15" rx="7.5" fill="#2C6FA6" />
                <circle cx="110" cy="18" r="9" fill="#DDEFFF" />
                <path d="M110 27v6" stroke="#2C6FA6" strokeWidth="3" />
              </g>
            )}
          </svg>
        </div>
        {/* etiqueta flotante con capas */}
        <div className="anim-float-tag absolute -right-2 -top-2 rounded-full bg-marca px-3 py-1 text-sm font-bold text-white shadow-soft">
          {lvl.capas}
        </div>
      </div>

      {/* Control + recomendación */}
      <div>
        <div className="mb-1 flex items-end justify-between">
          <span className="font-display text-lg text-marca">Mové la temperatura del ambiente</span>
          <span className="font-display text-3xl text-cocoa">{temp}°C</span>
        </div>

        <input
          type="range"
          min={14}
          max={30}
          step={1}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          aria-label="Temperatura del ambiente en grados Celsius"
          className="focus-cute h-3 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-sky via-mint to-bubble accent-marca"
        />
        <div className="mt-1 flex justify-between text-xs font-semibold text-cocoa/60">
          <span>14° frío</span>
          <span>22°</span>
          <span>30° calor</span>
        </div>

        <div className="mt-5 rounded-3xl bg-white/80 p-5 shadow-soft ring-1 ring-white">
          <p className="font-display text-xl text-cocoa">
            <span className="mr-2">{lvl.emoji}</span>
            {lvl.label}
          </p>
          <p className="mt-2 text-cocoa/80">{lvl.tip}</p>
        </div>
      </div>
    </div>
  );
}
