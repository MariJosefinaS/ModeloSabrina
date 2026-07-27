"use client";

import { useEffect, useState } from "react";
import type { Tarjeta } from "@/lib/content";
import TemaIcono from "@/components/TemaIcono";
import PuntoIcono from "@/components/PuntoIcono";
import EscenaInteractiva, { CUBRE, type EscenaId } from "@/components/EscenaInteractiva";

// Tintes azul/celeste por tarjeta (paleta institucional). Clases literales
// para que Tailwind las tome. Cada tarjeta tiene una variante suave distinta.
// `dark` repite el mismo escalonado pero en azul noche: la tarjeta destacada
// (Signos de alarma) sigue siendo la más saturada de las seis.
const COLORS: Record<
  Tarjeta["color"],
  { grad: string; ring: string; dark: string }
> = {
  mint: { grad: "from-[#D9F0FF]", ring: "ring-[#A6D8F2]", dark: "dark:from-[#13385A] dark:ring-[#2B6394]" },
  lavender: { grad: "from-[#E4EBFB]", ring: "ring-[#BAC9EE]", dark: "dark:from-[#152F52] dark:ring-[#2C5688]" },
  skysoft: { grad: "from-[#DCEEFF]", ring: "ring-[#9FD1F0]", dark: "dark:from-[#123A60] dark:ring-[#2A6798]" },
  peach: { grad: "from-[#EAF4FF]", ring: "ring-[#B3D8F2]", dark: "dark:from-[#14324F] dark:ring-[#295C8A]" },
  bubble: { grad: "from-[#CFE9FB]", ring: "ring-[#93C9EC]", dark: "dark:from-[#0F4270] dark:ring-[#3B7CB4]" },
  sunshine: { grad: "from-[#E6F5FF]", ring: "ring-[#AEDBF3]", dark: "dark:from-[#153656] dark:ring-[#2D6090]" },
};

const INTERACTIVOS: Record<string, () => React.ReactNode> = {
  nursing: () => <EscenaInteractiva id="nursing" />,
  crib: () => <EscenaInteractiva id="crib" />,
  outfit: () => <EscenaInteractiva id="outfit" />,
  diaper: () => <EscenaInteractiva id="diaper" />,
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
              className={`reveal focus-cute group relative flex flex-col items-start overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${c.grad} to-white p-5 text-left shadow-soft ring-1 ${c.ring} transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-12px_rgba(0,86,162,0.35)] ${c.dark} dark:to-panel ${
                t.destacada ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Ilustración grande con halo, como la infografía del sanatorio.
                  De noche el halo se mantiene CLARO a propósito: los dibujos
                  están trazados en azul oscuro sobre relleno celeste y sobre
                  fondo oscuro desaparecerían. Queda como un plato de luz. */}
              <span className="relative grid w-full place-items-center py-1">
                <span
                  aria-hidden
                  className="absolute h-[112px] w-[112px] rounded-full bg-[radial-gradient(circle,#FFFFFF_0%,#DCEEFF_58%,rgba(191,227,255,0)_75%)] dark:bg-[radial-gradient(circle,#FFFFFF_0%,#CFE6FA_54%,rgba(207,230,250,0)_74%)] dark:shadow-[0_0_38px_-6px_rgba(191,227,255,0.45)]"
                />
                <TemaIcono
                  id={t.id}
                  className={`relative h-[104px] w-[104px] drop-shadow-[0_10px_16px_rgba(11,63,112,0.16)] ${
                    t.destacada ? "anim-wiggle" : "anim-bob-slow"
                  }`}
                />
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-cocoa dark:text-tinta">
                {t.titulo}
              </h3>
              <p className="mt-0.5 font-semibold text-cocoa/80 dark:text-acento">{t.clave}</p>
              <p className="mt-2 text-sm leading-snug text-cocoa/65 dark:text-tinta2">{t.resumen}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-sm font-bold text-marca ring-1 ring-sky/40 dark:bg-noche/70 dark:text-acento dark:ring-borde [margin-top:1rem]">
                👆 {t.interactivos?.length ? "Tocá y probá" : "Tocá para ver más"}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Panel de detalle (sin navegar) ── */}
      {abierta && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/40 p-0 backdrop-blur-sm dark:bg-black/65 sm:items-center sm:p-4"
          onClick={() => setAbierta(null)}
          role="dialog"
          aria-modal="true"
          aria-label={abierta.titulo}
        >
          <div
            className="anim-pop relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-soft dark:bg-noche dark:ring-1 dark:ring-borde/60 sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* encabezado */}
            <div
              className={`flex items-center gap-3 bg-gradient-to-br ${COLORS[abierta.color].grad} to-cream px-5 py-4 ${COLORS[abierta.color].dark} dark:to-noche`}
            >
              {/* El icono conserva su plaquita blanca también de noche. */}
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white p-2 shadow-soft ring-1 ring-sky/50 dark:ring-borde">
                <TemaIcono id={abierta.id} className="h-full w-full" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl leading-tight text-cocoa dark:text-tinta">
                  {abierta.titulo}
                </h2>
                <p className="truncate text-sm font-semibold text-cocoa/70 dark:text-acento">
                  {abierta.clave}
                </p>
              </div>
              <button
                onClick={() => setAbierta(null)}
                aria-label="Cerrar"
                className="focus-cute ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80 text-xl text-cocoa shadow-soft transition hover:rotate-90 dark:bg-panelAlt dark:text-tinta"
              >
                ✕
              </button>
            </div>

            {/* cuerpo scrolleable */}
            <div className="overflow-y-auto px-5 py-5">
              {abierta.interactivos?.map((clave) => (
                <div
                  key={clave}
                  className="mb-5 rounded-3xl bg-white/70 p-4 shadow-soft ring-1 ring-white dark:bg-panel/70 dark:ring-borde/60"
                >
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-marca/10 px-3 py-1 text-xs font-bold text-marca dark:bg-acento/15 dark:text-acento">
                    👆 Interactivo · probalo
                  </p>
                  {INTERACTIVOS[clave]()}
                </div>
              ))}

              {/* Los puntos que el interactivo ya explica NO se repiten acá. */}
              {(() => {
                const yaExplicados = new Set(
                  (abierta.interactivos ?? []).flatMap(
                    (c) => CUBRE[c as EscenaId] ?? []
                  )
                );
                const resto = abierta.puntos.filter(
                  (p) => !yaExplicados.has(p.titulo)
                );
                if (resto.length === 0) return null;
                return (
                  <>
                    {yaExplicados.size > 0 && (
                      <p className="mb-2 font-display text-lg text-cocoa/70 dark:text-tinta2">
                        Además
                      </p>
                    )}
                    <ul className="grid gap-3">
                      {resto.map((p, i) => (
                        <li
                          key={i}
                          className="flex gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5 dark:bg-panel dark:ring-borde/50"
                        >
                          {/* El pictograma mantiene su pastilla celeste clara:
                              es lo que lo hace legible sobre el panel oscuro. */}
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-skysoft/50 p-1 text-xl ring-1 ring-sky/30 dark:bg-skysoft dark:ring-borde">
                            <PuntoIcono icon={p.icon} className="h-full w-full" />
                          </span>
                          <div>
                            <h3 className="font-display text-lg leading-tight text-cocoa dark:text-tinta">
                              {p.titulo}
                            </h3>
                            <p className="mt-0.5 text-sm text-cocoa/75 dark:text-tinta2">
                              {p.texto}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
