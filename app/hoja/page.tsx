import Link from "next/link";
import QRCode from "qrcode";
import PrintButton from "@/components/PrintButton";
import TemaIcono from "@/components/TemaIcono";
import { tarjetas, type Tarjeta } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Tríptico para imprimir · Cuidados en internación conjunta",
};

const byId = Object.fromEntries(tarjetas.map((t) => [t.id, t])) as Record<
  string,
  Tarjeta
>;

// ── Bloque de un tema (ilustración celeste + título azul + viñetas) ──
function Tema({ t }: { t: Tarjeta }) {
  return (
    <section className="mb-3 break-inside-avoid">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-skysoft p-1 ring-1 ring-sky">
          <TemaIcono id={t.id} className="h-full w-full" />
        </span>
        <h3 className="font-display text-[14px] font-bold leading-tight text-marca">
          {t.titulo}
        </h3>
      </div>
      <ul className="mt-1.5 grid gap-1 pl-0.5">
        {t.puntos.map((p, i) => (
          <li
            key={i}
            className="flex gap-1.5 text-[10px] leading-snug text-cocoa/90"
          >
            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            <span>
              <strong className="text-cocoa">{p.titulo}.</strong> {p.texto}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function HojaPage() {
  const qrSvg = await QRCode.toString(SITE.url, {
    type: "svg",
    margin: 1,
    color: { dark: "#0056A2", light: "#ffffff" },
  });

  return (
    <div className="min-h-screen py-6">
      {/* ── Controles (no se imprimen) ── */}
      <div className="no-print mx-auto mb-5 flex max-w-4xl flex-col items-center gap-2 px-4 text-center">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="focus-cute rounded-full bg-white px-4 py-2 font-semibold text-marca shadow-soft ring-1 ring-white transition hover:-translate-y-0.5"
          >
            ← Volver
          </Link>
          <PrintButton />
        </div>
        <p className="text-sm text-cocoa/70">
          🖨️ Imprimí <strong>doble faz</strong> (volteo por el borde corto),
          en A4 <strong>apaisado</strong>, y <strong>plegá en 3</strong>.
          Plastificalo para dejárselo a la mamá. 💙
        </p>
      </div>

      {/* ════════ CARA EXTERNA (tapa + contratapa) ════════ */}
      <p className="no-print mx-auto mb-1 max-w-4xl px-4 text-xs font-bold uppercase tracking-wide text-marca/70">
        Cara externa
      </p>
      <div className="trifold trifold-zoom page-break rounded-2xl shadow-soft">
        {/* CONTRATAPA (izquierda): contacto + QR */}
        <div className="panel flex flex-col p-5">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-marca/25 pb-2">
            <img
              src="/logo-sanatorio.png"
              alt={SITE.institucion}
              className="h-9 w-auto"
            />
            <p className="font-display text-[13px] font-bold leading-tight text-marca">
              {SITE.institucion}
            </p>
          </div>

          {/* QR */}
          <div className="mt-3 flex flex-col items-center rounded-2xl bg-[#F1F7FC] p-3 ring-1 ring-marca/15">
            <div
              className="h-28 w-28 [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
              aria-label="Código QR"
            />
            <p className="mt-2 text-center font-display text-[13px] font-bold text-marca">
              📱 Escaneá y vela en tu teléfono
            </p>
            <p className="mt-0.5 text-center text-[9.5px] leading-snug text-cocoa/80">
              Vas a ver esta guía con imágenes para tocar y un espacio para dejar
              tus consultas. Si no podés entrar, guardá el tríptico.
            </p>
          </div>

          {/* Nota cálida + tira de ilustraciones */}
          <div className="mt-3 rounded-2xl bg-skysoft/40 p-3 ring-1 ring-sky/40">
            <p className="text-center font-display text-[12px] font-bold text-marca">
              Todo en un solo lugar 💙
            </p>
            <p className="mt-0.5 text-center text-[9px] leading-snug text-cocoa/80">
              Alimentación, sueño, baño, vínculo y señales de alarma, para
              acompañarte durante la internación.
            </p>
            <div className="mt-2 flex justify-center gap-1.5">
              {["alimentacion", "sueno", "bano-cordon", "vinculo", "alarma"].map(
                (id) => (
                  <span
                    key={id}
                    className="grid h-7 w-7 place-items-center rounded-full bg-white p-1 ring-1 ring-sky"
                  >
                    <TemaIcono id={id} className="h-full w-full" />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className="mt-3 space-y-1 text-[9.5px] leading-snug text-cocoa/85">
            <p className="flex items-center gap-1.5">
              <span>📍</span> {SITE.direccion} — {SITE.ciudad}
            </p>
            <p className="flex items-center gap-1.5">
              <span>📞</span> {SITE.telefono}
            </p>
            <p className="flex items-center gap-1.5">
              <span>💬</span> WhatsApp {SITE.whatsapp}
            </p>
            <p className="flex items-center gap-1.5">
              <span>🌐</span> {SITE.webLabel}
            </p>
            <p className="flex items-center gap-1.5">
              <span>📷</span> @sanatoriomodelo
            </p>
          </div>

          <p className="mt-auto border-t border-marca/10 pt-2 text-[8px] leading-tight text-cocoa/60">
            Información orientativa. No reemplaza la consulta con tu equipo de
            salud. Ante cualquier duda, preguntá al personal de enfermería o a tu
            pediatra.
          </p>
        </div>

        {/* FLAP (centro): Cuándo consultar → Signos de alarma + Control */}
        <div className="panel flex flex-col bg-[#F7FBFF] p-5">
          <div className="mb-2 rounded-xl bg-marca px-3 py-1.5 text-center">
            <p className="font-display text-[13px] font-bold leading-tight text-white">
              Cuándo consultar
            </p>
          </div>
          <Tema t={byId["alarma"]} />
          <div className="my-1 border-t border-dashed border-marca/20" />
          <Tema t={byId["control"]} />
          <p className="mt-auto rounded-xl bg-skysoft/50 p-2 text-center text-[9px] font-semibold leading-snug text-marca ring-1 ring-sky/50">
            Ante la duda, siempre consultá. Más vale una consulta de más. 💙
          </p>
        </div>

        {/* TAPA (derecha): logo + 80 años + programa */}
        <div className="panel relative flex flex-col overflow-hidden bg-gradient-to-b from-marca to-marcaSoft p-6 text-white">
          {/* burbujas celestes decorativas */}
          <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -left-6 top-1/3 h-16 w-16 rounded-full bg-sky/20" />

          <div className="relative flex flex-col items-center text-center">
            <img
              src="/logo-sanatorio-white.png"
              alt={SITE.institucion}
              className="h-14 w-auto"
            />
            <p className="mt-2 font-display text-[15px] font-bold leading-tight">
              {SITE.institucion}
            </p>
            <p className="text-[10px] leading-tight text-white/85">
              {SITE.ciudad}
            </p>

            <div className="my-3 flex flex-col items-center">
              <span className="font-display text-4xl font-bold leading-none">
                80
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide">
                años · aniversario
              </span>
              <span className="text-[10px] text-white/85">1946 – 2026</span>
              <span className="mt-1 rounded-full bg-white/15 px-3 py-0.5 text-[9.5px] font-semibold">
                Excelencia y compromiso
              </span>
            </div>
          </div>

          {/* Foto mamá + bebé */}
          <div className="relative my-3">
            <img
              src="/tapa-mama-bebe.jpg"
              alt="Mamá sosteniendo a su bebé"
              className="h-44 w-full rounded-2xl object-cover object-top shadow-lg ring-4 ring-white/70"
            />
          </div>

          <div className="relative mt-auto text-center">
            <div className="mx-auto mb-2 h-px w-16 bg-white/40" />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/85">
              🍼 {SITE.programa}
            </p>
            <h1 className="mt-1 font-display text-[26px] font-bold leading-none">
              Cuidados de tu bebé
            </h1>
            <p className="mt-2 text-[10.5px] leading-snug text-white/90">
              Guía práctica de cuidados para acompañarte durante la internación
              conjunta.
            </p>
          </div>
        </div>
      </div>

      {/* ════════ CARA INTERNA (contenido) ════════ */}
      <p className="no-print mx-auto mb-1 mt-6 max-w-4xl px-4 text-xs font-bold uppercase tracking-wide text-marca/70">
        Cara interna
      </p>
      <div className="trifold trifold-zoom rounded-2xl shadow-soft">
        {/* Columna 1 */}
        <div className="panel p-5">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-sky" />
          <Tema t={byId["alimentacion"]} />
          <Tema t={byId["vinculo"]} />
        </div>
        {/* Columna 2 */}
        <div className="panel bg-[#F7FBFF] p-5">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-marcaSoft" />
          <Tema t={byId["eliminacion"]} />
          <Tema t={byId["acompanar-mama"]} />
          <Tema t={byId["vestimenta"]} />
        </div>
        {/* Columna 3 */}
        <div className="panel p-5">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-sky" />
          <Tema t={byId["bano-cordon"]} />
          <Tema t={byId["llanto"]} />
          <Tema t={byId["sueno"]} />
        </div>
      </div>
    </div>
  );
}
