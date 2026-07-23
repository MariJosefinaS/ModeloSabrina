import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="focus-cute flex items-center gap-3">
          {/* Logo oficial del Sanatorio Modelo S.A. */}
          <img src="/logo-sanatorio.png" alt={SITE.institucion} className="h-9 w-auto" />
          <span className="hidden rounded-full bg-skysoft/80 px-3 py-1 text-xs font-bold text-marca shadow-soft sm:inline-block">
            🍼 {SITE.programa}
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-bold">
          <Link
            href="/hoja"
            className="focus-cute rounded-full bg-marca px-4 py-2 text-white shadow-soft transition hover:brightness-110"
          >
            🖨️ Imprimir tríptico
          </Link>
        </nav>
      </div>
    </header>
  );
}
