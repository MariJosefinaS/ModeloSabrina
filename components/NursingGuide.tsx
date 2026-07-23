"use client";

import { useState } from "react";

// Lo que el PO quiere: NO un curso de posturas, sino que sepan reconocer
// un BUEN AGARRE (lo mínimo e imprescindible).
const AGARRE = [
  {
    icon: "👄",
    titulo: "Boca bien abierta",
    detalle: "Abarca gran parte de la areola, no solo el pezón.",
  },
  {
    icon: "🍼",
    titulo: "Mentón toca el pecho",
    detalle: "La pancita del bebé mira hacia vos, bien pegado.",
  },
  {
    icon: "🐟",
    titulo: "Labios hacia afuera",
    detalle: "Como boquita de pescadito, sin meterse para adentro.",
  },
  {
    icon: "😊",
    titulo: "Mejillas redondas",
    detalle: "Se ven llenas al succionar, sin hundirse.",
  },
];

const C = {
  skin: "#E7B48F",
  skinB: "#F1C49C",
  outline: "#C0906A",
  hair: "#5B4636",
  areola: "#D9A06B",
  lead: "#0056A2",
};

function LatchScene() {
  // Ilustración de un buen agarre: bebé de perfil prendido, boca bien abierta.
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="Bebé prendido con buen agarre">
      {/* pecho */}
      <path d="M12 60q120-30 150 44 q10 40-30 66 q-70 30-120-6 z" fill={C.skin} stroke={C.outline} strokeWidth="2" />
      <circle cx="150" cy="120" r="30" fill={C.areola} opacity="0.85" />
      {/* cabecita del bebé prendida (perfil, mira a la izquierda) */}
      <g>
        <path d="M300 96q-40-16-70 4 q-20 14-20 20 q0 8 20 22 q30 20 70 4 q22-9 22-27 q0-18-22-27z" fill={C.skinB} stroke={C.outline} strokeWidth="2" />
        {/* orejita */}
        <circle cx="292" cy="120" r="9" fill={C.skinB} stroke={C.outline} strokeWidth="1.4" />
        {/* ojito cerradito, tranquilo */}
        <path d="M250 108q7-6 15-1" stroke="#4A3B3B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* pelusa */}
        <path d="M270 82q7-7 15-1" stroke={C.hair} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* boca bien abierta sobre la areola */}
        <path d="M178 108q-8 12 0 24 q10 8 24 6 q10-2 12-18 q-2-14-14-18 q-14-2-22 6z" fill="#C77" stroke={C.outline} strokeWidth="1.4" opacity="0.55" />
        {/* labio de arriba y de abajo, hacia afuera */}
        <path d="M180 106q8-5 22-3" stroke={C.outline} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M180 134q10 6 24 2" stroke={C.outline} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* etiquetas */}
      <g>
        <line x1="196" y1="120" x2="250" y2="48" stroke={C.lead} strokeWidth="1.4" strokeDasharray="3 3" />
        <circle cx="196" cy="120" r="3" fill={C.lead} />
        <text x="250" y="44" fontSize="12" fontWeight="800" fill="#5a4646" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>Boca bien abierta</text>
      </g>
      <g>
        <line x1="196" y1="140" x2="240" y2="190" stroke={C.lead} strokeWidth="1.4" strokeDasharray="3 3" />
        <circle cx="196" cy="140" r="3" fill={C.lead} />
        <text x="240" y="204" fontSize="12" fontWeight="800" fill="#5a4646" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>Mentón al pecho</text>
      </g>
      <g>
        <line x1="150" y1="120" x2="60" y2="180" stroke={C.lead} strokeWidth="1.4" strokeDasharray="3 3" />
        <circle cx="150" cy="120" r="3" fill={C.lead} />
        <text x="14" y="196" fontSize="12" fontWeight="800" fill="#5a4646" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>Abarca la areola</text>
      </g>
    </svg>
  );
}

export default function NursingGuide() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const todos = checked.every(Boolean);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Ilustración del buen agarre */}
      <div>
        <div className="rounded-[2rem] bg-white/80 p-4 shadow-soft ring-1 ring-white">
          <LatchScene />
        </div>
        <p className="mt-3 rounded-2xl bg-skysoft/40 p-3 text-center text-sm font-semibold text-cocoa ring-1 ring-sky">
          Si se prende bien, <b>no debería doler</b>. Si duele, retiralo con
          cuidado (meté un dedito en la comisura) y volvé a prenderlo.
        </p>
      </div>

      {/* Checklist de buen agarre */}
      <div className="rounded-3xl bg-white/80 p-5 shadow-soft ring-1 ring-white">
        <p className="font-display text-xl text-marca">¿Se está prendiendo bien?</p>
        <p className="mb-3 text-sm text-cocoa/70">Marcá lo que ves. Son las 4 señales de un buen agarre.</p>
        <ul className="space-y-2">
          {AGARRE.map((a, i) => (
            <li key={i}>
              <button
                onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                aria-pressed={checked[i]}
                className={`focus-cute flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-2 transition ${
                  checked[i] ? "bg-skysoft/60 ring-sky" : "bg-cream ring-white hover:bg-skysoft/40"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white ${
                    checked[i] ? "bg-marca" : "bg-cocoa/20"
                  }`}
                >
                  {checked[i] ? "✓" : a.icon}
                </span>
                <span>
                  <span className="block font-bold text-cocoa">{a.titulo}</span>
                  <span className="block text-xs text-cocoa/70">{a.detalle}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`mt-4 rounded-2xl p-3 text-center font-display text-lg transition ${
            todos ? "bg-marca text-white anim-wiggle" : "bg-skysoft/50 text-marca"
          }`}
        >
          {todos ? "🎉 ¡Buen agarre! Vas genial" : "Marcá las 4 señales para confirmar"}
        </div>
      </div>
    </div>
  );
}
