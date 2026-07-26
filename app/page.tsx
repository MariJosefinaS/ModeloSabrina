import Link from "next/link";
import Decor from "@/components/Decor";
import SiteHeader from "@/components/SiteHeader";
import BabyMascot from "@/components/BabyMascot";
import PosterClient from "@/components/PosterClient";
import { tarjetas, DISCLAIMER, GENERALIDADES } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Decor />
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-6 md:pt-8">
        {/* ── Encabezado breve ── */}
        <div className="mb-7 flex items-center gap-4">
          <div className="anim-pop w-20 shrink-0 md:w-24">
            <BabyMascot className="w-full drop-shadow-[0_18px_25px_rgba(131,103,199,0.3)]" />
          </div>
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-marca shadow-soft ring-1 ring-white">
              🍼 {SITE.programa} · {SITE.institucion}
            </span>
            <h1 className="mt-2 font-display text-3xl leading-tight text-cocoa md:text-5xl">
              Cuidados de tu bebé
            </h1>
            <p className="mt-1 max-w-md text-cocoa/75">
              Todo lo que podés hacer mientras están juntos, acá. Tocá una
              tarjeta para ver el paso a paso. 💙
            </p>
          </div>
        </div>

        {/* ── Póster de tarjetas ── */}
        <PosterClient tarjetas={tarjetas} />

        {/* ── Acciones ── */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/hoja"
            className="focus-cute rounded-full bg-marca px-6 py-3 font-display text-lg text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110"
          >
            🖨️ Imprimir el tríptico para llevar
          </Link>
          <Link
            href="/foro"
            className="focus-cute rounded-full bg-white px-5 py-3 font-semibold text-marca shadow-soft ring-1 ring-white transition hover:-translate-y-0.5"
          >
            ¿Te quedó una duda? Consultá
          </Link>
        </div>

        {/* ── Aviso breve ── */}
        <p className="text-balance mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed border-marca/35 bg-white/70 px-4 py-2 text-center font-display text-xs font-bold uppercase tracking-wide text-marca">
          {GENERALIDADES}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-cocoa/55">
          ⚠️ {DISCLAIMER}
        </p>
      </section>

      {/* ── Pie institucional mínimo ── */}
      <footer className="border-t border-white/60 bg-white/60">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-cocoa/70 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <img src="/logo-sanatorio.png" alt={SITE.institucion} className="h-8 w-auto" />
            <span>
              {SITE.direccion} — {SITE.ciudad}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="focus-cute font-semibold text-marca hover:underline">
              💬 WhatsApp
            </a>
            <a href={SITE.telefonoHref} className="focus-cute font-semibold text-marca hover:underline">
              📞 {SITE.telefono}
            </a>
            <a href={SITE.web} target="_blank" rel="noopener noreferrer" className="focus-cute font-semibold text-marca hover:underline">
              🌐 {SITE.webLabel}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
