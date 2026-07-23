"use client";

import { useEffect, useState } from "react";
import type { Tarjeta } from "@/lib/content";
import TemaIcono from "@/components/TemaIcono";
import PuntoIcono from "@/components/PuntoIcono";
import OutfitThermo from "@/components/OutfitThermo";
import SafeCrib from "@/components/SafeCrib";
import NursingGuide from "@/components/NursingGuide";
import DiaperChange from "@/components/DiaperChange";

// Tintes azul/celeste por tarjeta (paleta institucional). Clases literales
// para que Tailwind las tome. Cada tarjeta tiene una variante suave distinta.
const COLORS: Record<Tarjeta["color"], { grad: string; ring: string }> = {
  mint: { grad: "from-[#D9F0FF]", ring: "ring-[#A6D8F2]" },
  lavender: { grad: "from-[#E4EBFB]", ring: "ring-[#BAC9EE]" },
  skysoft: { grad: "from-[#DCEEFF]", ring: "ring-[#9FD1F0]" },
  peach: { grad: "from-[#EAF4FF]", ring: "ring-[#B3D8F2]" },
  bubble: { grad: "from-[#CFE9FB]", ring: "ring-[#93C9EC]" },
  sunshine: { grad: "from-[#E6F5FF]", ring: "ring-[#AEDBF3]" },
};

const INTERACTIVOS: Record<string, () => React.ReactNode> = {
  nursing: () => <NursingGuide />,
  crib: () => <SafeCrib />,
  outfit: () => <OutfitThermo />,
  diaper: () => <DiaperChange />,
};

export default function PosterClient({ tarjetas }: { tarjetas: Tarjeta[] }) {
  const [abierta, setAbierta] = useState<Tarjeta | null>(null);

  // Cerrar con Escape y bloquear el scroll del fondo cuando hay panel abierto.
  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta]);

  return (
    <>
      {/* ── Grilla del póster ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((t, i) => {
          const c = COLORS[t.color];
          return (
            <button
              key={t.id}
              onClick={() => setAbierta(t)}
              style={{ ["--delay" as string]: `${i * 90}ms` }}
              className={`reveal focus-cute group relative flex flex-col items-start overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${c.grad} to-white p-5 text-left shadow-soft ring-1 ${c.ring} transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-12px_rgba(0,86,162,0.35)] ${
                t.destacada ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-sky/50 ${
                  t.destacada ? "anim-wiggle" : "anim-bob-slow"
                }`}
              >
                <TemaIcono id={t.id} className="h-full w-full" />
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-cocoa">
                {t.titulo}
              </h3>
              <p className="mt-0.5 font-semibold text-cocoa/80">{t.clave}</p>
              <p className="mt-2 text-sm leading-snug text-cocoa/65">{t.resumen}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-sm font-bold text-marca ring-1 ring-sky/40 [margin-top:1rem]">
                👆 {t.interactivos?.length ? "Tocá y probá" : "Tocá para ver más"}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Panel de detalle (sin navegar) ── */}
      {abierta && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setAbierta(null)}
          role="dialog"
          aria-modal="true"
          aria-label={abierta.titulo}
        >
          <div
            className="anim-pop relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-soft sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* encabezado */}
            <div
              className={`flex items-center gap-3 bg-gradient-to-br ${COLORS[abierta.color].grad} to-cream px-5 py-4`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white p-2 shadow-soft ring-1 ring-sky/50">
                <TemaIcono id={abierta.id} className="h-full w-full" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl leading-tight text-cocoa">
                  {abierta.titulo}
                </h2>
                <p className="truncate text-sm font-semibold text-cocoa/70">
                  {abierta.clave}
                </p>
              </div>
              <button
                onClick={() => setAbierta(null)}
                aria-label="Cerrar"
                className="focus-cute ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80 text-xl text-cocoa shadow-soft transition hover:rotate-90"
              >
                ✕
              </button>
            </div>

            {/* cuerpo scrolleable */}
            <div className="overflow-y-auto px-5 py-5">
              {abierta.interactivos?.map((clave) => (
                <div
                  key={clave}
                  className="mb-5 rounded-3xl bg-white/70 p-4 shadow-soft ring-1 ring-white"
                >
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-marca/10 px-3 py-1 text-xs font-bold text-marca">
                    👆 Interactivo · probalo
                  </p>
                  {INTERACTIVOS[clave]()}
                </div>
              ))}

              <ul className="grid gap-3">
                {abierta.puntos.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-skysoft/50 p-1 text-xl ring-1 ring-sky/30">
                      <PuntoIcono icon={p.icon} className="h-full w-full" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-tight text-cocoa">
                        {p.titulo}
                      </h3>
                      <p className="mt-0.5 text-sm text-cocoa/75">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {abierta.destacada && (
                <p className="mt-4 rounded-2xl bg-skysoft/50 p-3 text-center text-sm font-semibold text-marca ring-1 ring-sky">
                  Ante la duda, siempre consultá. Más vale una consulta de más. 💙
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
