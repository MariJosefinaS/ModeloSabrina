"use client";

import { useState } from "react";

type Item = {
  key: "saco" | "gorro" | "manta" | "peluches";
  label: string;
  emoji: string;
  good: boolean;
  why: string;
};

const ITEMS: Item[] = [
  { key: "saco", label: "Saco de dormir", emoji: "🛌", good: true, why: "Evita que se tape la cabeza y abriga sin mantas sueltas. La opción recomendada." },
  { key: "gorro", label: "Gorro puesto", emoji: "🧢", good: false, why: "Dentro de casa sobra: regulan el calor por la cabeza y pueden sobrecalentarse." },
  { key: "manta", label: "Mantas sueltas", emoji: "🧣", good: false, why: "Pueden cubrirle la cara. Si hace frío, mejor un saco de más tog o una capa de ropa." },
  { key: "peluches", label: "Peluches y almohadas", emoji: "🧸", good: false, why: "Los objetos blandos sueltos aumentan el riesgo. La cuna, despejada." },
];

export default function SafeCrib() {
  const [on, setOn] = useState<Record<Item["key"], boolean>>({
    saco: true,
    gorro: false,
    manta: false,
    peluches: false,
  });

  const toggle = (k: Item["key"]) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const riesgos = ITEMS.filter((i) => !i.good && on[i.key]);
  const seguro = riesgos.length === 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      {/* Escena de la cuna */}
      <div className="relative mx-auto w-full max-w-sm">
        <div className="rounded-[2rem] bg-gradient-to-b from-skysoft/60 to-white p-4 shadow-soft ring-1 ring-white">
          <svg viewBox="0 0 280 190" className="w-full" role="img" aria-label="Cuna con un bebé durmiendo">
            {/* colchón */}
            <rect x="26" y="118" width="228" height="34" rx="14" fill="#FFE8CC" />
            {/* saco de dormir (o sabanita) sobre el bebé */}
            {on.saco ? (
              <path d="M120 120c40 0 96 2 96 14 0 10-56 12-96 12s-40-2-40-13 0-13 40-13z" fill="#9BD0A6" stroke="#7BD389" strokeWidth="3" />
            ) : (
              <rect x="120" y="120" width="96" height="24" rx="10" fill="#CDEAC0" />
            )}
            {/* manta suelta (mala) */}
            {on.manta && (
              <path d="M96 116c34-8 118-8 150 2-6 12-30 16-30 16l-96 2c-24-2-30-12-24-20z" fill="#F7B7C6" opacity="0.9" stroke="#E98CA3" strokeWidth="2" />
            )}
            {/* peluche (malo) */}
            {on.peluches && (
              <g transform="translate(228,96)">
                <circle cx="0" cy="8" r="12" fill="#C9A26B" />
                <circle cx="-9" cy="-2" r="5" fill="#C9A26B" />
                <circle cx="9" cy="-2" r="5" fill="#C9A26B" />
                <circle cx="-3" cy="8" r="2" fill="#5b3b1e" />
                <circle cx="3" cy="8" r="2" fill="#5b3b1e" />
              </g>
            )}
            {/* cabecita del bebé */}
            <circle cx="72" cy="122" r="22" fill="#FFD9B8" />
            <path d="M64 118c2-2 6-2 8 0" stroke="#4A3B3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M76 118c2-2 6-2 8 0" stroke="#4A3B3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M70 130c2 2 6 2 8 0" stroke="#B5556B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* gorro (malo) */}
            {on.gorro && <path d="M50 116c2-18 42-18 44 0z" fill="#8367C7" />}
            {/* Zzz */}
            <text x="96" y="96" fontSize="16" fill="#8367C7" fontFamily="var(--font-fredoka)">z</text>
            <text x="106" y="86" fontSize="12" fill="#8367C7" fontFamily="var(--font-fredoka)">z</text>

            {/* barrotes de la cuna */}
            <g stroke="#E8B98C" strokeWidth="7" strokeLinecap="round">
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={i} x1={30 + i * 22} y1="60" x2={30 + i * 22} y2="170" />
              ))}
              <line x1="20" y1="58" x2="260" y2="58" strokeWidth="10" />
              <line x1="20" y1="170" x2="260" y2="170" strokeWidth="10" />
            </g>
            {/* postes */}
            <rect x="14" y="46" width="14" height="132" rx="7" fill="#D89A66" />
            <rect x="252" y="46" width="14" height="132" rx="7" fill="#D89A66" />
          </svg>
        </div>

        {/* sello de estado */}
        <div
          className={`anim-float-tag absolute -right-3 -top-3 rounded-full px-4 py-2 font-display text-sm text-white shadow-soft ${
            seguro ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {seguro ? "¡Cuna segura!" : `${riesgos.length} riesgo${riesgos.length > 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Controles */}
      <div>
        <p className="mb-3 font-display text-lg text-marca">Tocá cada elemento y mirá qué pasa 👇</p>
        <div className="grid grid-cols-2 gap-3">
          {ITEMS.map((it) => {
            const active = on[it.key];
            const tone = it.good
              ? active
                ? "bg-emerald-100 ring-emerald-300"
                : "bg-white ring-white"
              : active
                ? "bg-rose-100 ring-rose-300"
                : "bg-white ring-white";
            return (
              <button
                key={it.key}
                onClick={() => toggle(it.key)}
                aria-pressed={active}
                className={`focus-cute rounded-2xl p-3 text-left shadow-soft ring-2 transition ${tone}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{it.emoji}</span>
                  <span className="text-lg">
                    {active ? (it.good ? "✅" : "❌") : "⚪"}
                  </span>
                </div>
                <p className="mt-1 font-bold text-cocoa">{it.label}</p>
              </button>
            );
          })}
        </div>

        <div
          className={`mt-4 rounded-3xl p-4 shadow-soft ring-1 ${
            seguro ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"
          }`}
        >
          {seguro ? (
            <p className="text-cocoa/80">
              <b className="text-emerald-700">Todo en orden.</b> Bebé boca arriba, cuna despejada y el
              cuarto entre 16 y 20 °C. Un bebé un poco más fresco es más seguro que uno con demasiado abrigo.
            </p>
          ) : (
            <ul className="space-y-2">
              {riesgos.map((r) => (
                <li key={r.key} className="text-cocoa/80">
                  <b className="text-rose-700">{r.emoji} {r.label}:</b> {r.why}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
