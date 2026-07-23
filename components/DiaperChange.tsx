"use client";

import { useState } from "react";

type Paso = { emoji: string; titulo: string; texto: string };

const PASOS: Paso[] = [
  {
    emoji: "🧼",
    titulo: "Prepará todo",
    texto: "Lavate las manos y tené a mano el pañal limpio, algodón o toallitas y una gasa.",
  },
  {
    emoji: "👶",
    titulo: "Acostalo seguro",
    texto: "Boca arriba en un lugar firme. No lo dejes solo ni un segundo: tené una mano encima.",
  },
  {
    emoji: "🩲",
    titulo: "Abrí el pañal",
    texto: "Soltá el pañal sucio y usá el mismo frente para arrastrar lo grueso hacia abajo.",
  },
  {
    emoji: "➡️",
    titulo: "Limpiá adelante → atrás",
    texto: "Con algodón húmedo o toallita, siempre de adelante hacia atrás. En nenas, sin abrir los pliegues.",
  },
  {
    emoji: "🌬️",
    titulo: "Secá y airea el ombligo",
    texto: "Secá bien, sobre todo los pliegues. Dejá el cordón al aire.",
  },
  {
    emoji: "🧷",
    titulo: "Pañal limpio",
    texto: "Ponelo con el borde doblado por debajo del cordón. Ni muy apretado ni muy flojo.",
  },
  {
    emoji: "✨",
    titulo: "¡Listo!",
    texto: "Vestilo de nuevo y volvé a lavarte las manos.",
  },
];

export default function DiaperChange() {
  const [i, setI] = useState(0);
  const paso = PASOS[i];
  const ultimo = i === PASOS.length - 1;

  return (
    <div className="select-none">
      {/* Escena tocable */}
      <button
        onClick={() => setI((n) => (n + 1) % PASOS.length)}
        aria-label="Siguiente paso"
        className="focus-cute relative flex w-full flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-b from-skysoft/60 to-white p-6 text-center shadow-inner ring-1 ring-white transition active:scale-[0.99]"
      >
        <span className="grid h-24 w-24 place-items-center rounded-full bg-white text-5xl shadow-soft anim-bob-slow">
          {paso.emoji}
        </span>
        <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-marca/10 px-3 py-0.5 text-xs font-bold text-marca">
          Paso {i + 1} de {PASOS.length}
        </p>
        <h4 className="mt-1 font-display text-xl text-cocoa">{paso.titulo}</h4>
        <p className="mt-1 max-w-xs text-sm text-cocoa/75">{paso.texto}</p>
        <span className="mt-3 text-xs font-semibold text-marca/80">
          👆 {ultimo ? "Tocá para empezar de nuevo" : "Tocá para el siguiente"}
        </span>
      </button>

      {/* Puntos de progreso */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {PASOS.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Ir al paso ${n + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              n === i ? "w-6 bg-marca" : "w-2.5 bg-marca/25 hover:bg-marca/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
