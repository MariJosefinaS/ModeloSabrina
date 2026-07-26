import Link from "next/link";
import QRCode from "qrcode";
import PrintButton from "@/components/PrintButton";
import TemaIcono from "@/components/TemaIcono";
import PuntoIcono from "@/components/PuntoIcono";
import {
  DISCLAIMER,
  GENERALIDADES,
  identificacion,
  tarjetas,
  type Tarjeta,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Tríptico para imprimir · Cuidados en internación conjunta",
};

const byId = Object.fromEntries(tarjetas.map((t) => [t.id, t])) as Record<
  string,
  Tarjeta
>;

const AZUL = "#0056A2";

// ── Ambientación: formas orgánicas y hojitas de fondo, como en la
//    infografía del sanatorio. Van detrás del contenido, muy tenues.
function Fondo({ variante = 0 }: { variante?: number }) {
  const blobs = [
    "M-30 -20c70-30 150 10 160 70s-60 70-120 50-110-90-40-120z",
    "M-40 40c60-50 140-20 150 40s-70 60-130 40S-100 90-40 40z",
    "M-20 -30c80-20 140 30 130 80s-80 60-140 30-70-90 10-110z",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* mancha superior */}
      <svg viewBox="0 0 200 160" className="absolute -left-10 -top-8 h-[62mm] w-[62mm]">
        <path d={blobs[variante % 3]} fill="#EAF5FF" />
      </svg>
      {/* mancha inferior */}
      <svg viewBox="0 0 200 160" className="absolute -bottom-10 -right-12 h-[70mm] w-[70mm] rotate-180">
        <path d={blobs[(variante + 1) % 3]} fill="#F2F9FF" />
      </svg>
      {/* ramita de hojas, como el borde de la infografía */}
      <svg viewBox="0 0 60 120" className="absolute -right-2 top-1/3 h-[38mm] w-[19mm] opacity-60">
        <path d="M30 4v112" stroke="#CDE7FA" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {[14, 34, 54, 74, 94].map((y) => (
          <g key={y}>
            <path d={`M30 ${y}c-16-4-22 6-20 14 10 4 20-4 20-14z`} fill="#DCEEFF" />
            <path d={`M30 ${y + 10}c16-4 22 6 20 14-10 4-20-4-20-14z`} fill="#EAF5FF" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Íconos de línea para el bloque de contacto ─────────────────
function IconoLinea({ name, className }: { name: string; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    pin: (
      <>
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
    tel: (
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    ),
    chat: (
      <>
        <path d="M20 12a8 8 0 1 1-3.2-6.4" />
        <path d="M20 4v4h-4" />
        <path d="M4.4 15.6 3.5 20.5l4.9-.9" />
      </>
    ),
    web: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5S14.4 18.4 12 20.5c-2.4-2.1-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5z" />
      </>
    ),
    ig: (
      <>
        <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="16.9" cy="7.1" r="1" />
      </>
    ),
    qr: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <path d="M13.5 13.5h3v3h-3zM19 13.5h1.5v1.5H19zM17.5 18.5h3v2h-3z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={AZUL}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p[name]}
    </svg>
  );
}

// ── Sello institucional de los 80 años ─────────────────────────
function Sello80({ className = "", blanco = false }: { className?: string; blanco?: boolean }) {
  const c = blanco ? "#ffffff" : AZUL;
  const c2 = blanco ? "rgba(255,255,255,.55)" : "#8ECAE6";
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="none" stroke={c2} strokeWidth="2" />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={c}
        strokeWidth="3"
        strokeDasharray="4 5"
      />
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fill={c}
        fontSize="42"
        fontWeight="700"
        fontFamily="var(--font-fredoka), system-ui, sans-serif"
      >
        80
      </text>
      <text
        x="60"
        y="80"
        textAnchor="middle"
        fill={c}
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="1.4"
        fontFamily="var(--font-nunito), system-ui, sans-serif"
      >
        AÑOS
      </text>
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fill={c2}
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.6"
        fontFamily="var(--font-nunito), system-ui, sans-serif"
      >
        1946 – 2026
      </text>
    </svg>
  );
}

// ── Bloque de un tema: ilustración circular + título centrado + viñetas
//  `size` gradúa la densidad: "dense" para la contratapa (9 signos de
//  alarma), "media" para la cara interna, "normal" si sobra lugar.
type TemaSize = "normal" | "media" | "dense";

const ESCALA: Record<
  TemaSize,
  { badge: string; titulo: string; texto: string; gap: string; icono: string }
> = {
  normal: {
    badge: "h-[50px] w-[50px]",
    titulo: "text-[13px]",
    texto: "text-[11.6px] leading-[1.4]",
    gap: "gap-[7px]",
    icono: "h-[16px] w-[16px]",
  },
  media: {
    badge: "h-[46px] w-[46px]",
    titulo: "text-[12.5px]",
    texto: "text-[11px] leading-[1.38]",
    gap: "gap-[5px]",
    icono: "h-[16px] w-[16px]",
  },
  dense: {
    badge: "h-[42px] w-[42px]",
    titulo: "text-[12px]",
    texto: "text-[10.2px] leading-[1.34]",
    gap: "gap-[4px]",
    icono: "h-[15px] w-[15px]",
  },
};

function Tema({
  t,
  size = "normal",
  grow = false,
  tinte = 0,
}: {
  t: Tarjeta;
  size?: TemaSize;
  grow?: boolean;
  tinte?: number;
}) {
  const e = ESCALA[size];
  // Tarjeta suave por tema (como el póster de ejemplo), en tintes celestes
  const TINTES = ["bg-white/80", "bg-[#EAF5FF]/85", "bg-[#F4FAFF]/90"];
  return (
    <section
      className={`break-inside-avoid relative rounded-[14px] ${TINTES[tinte % 3]} px-[3mm] pb-[2mm] pt-[1mm] ring-1 ring-sky/45 ${
        grow ? "flex flex-1 flex-col" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <span
          className={`grid place-items-center rounded-full bg-sky p-[6px] ring-[3px] ring-white outline outline-1 outline-marca/25 ${e.badge}`}
        >
          <TemaIcono id={t.id} className="h-full w-full" />
        </span>
        <h3
          className={`mt-1 text-center font-display font-bold uppercase leading-tight tracking-[0.03em] text-marca ${e.titulo}`}
        >
          {t.titulo}
        </h3>
        <span className="mt-[3px] h-[3px] w-9 rounded-full bg-sky" />
      </div>
      <ul
        className={`mt-2 ${
          grow && t.puntos.length > 1
            ? `flex flex-1 flex-col justify-around`
            : `grid ${e.gap}`
        }`}
      >
        {t.puntos.map((p, i) => (
          <li key={i} className={`flex gap-1.5 ${e.texto} text-[#44515F]`}>
            <PuntoIcono icon={p.icon} className={`mt-[0.5px] shrink-0 ${e.icono}`} />
            <span>
              <strong className="font-bold text-marca">{p.titulo}.</strong>{" "}
              {p.texto}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Huellita, para el badge del panel de identificación ────────
function Huellita({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="22" cy="30" rx="11" ry="13" fill={AZUL} opacity="0.9" />
      <ellipse cx="14.5" cy="14.5" rx="4" ry="4.6" fill={AZUL} opacity="0.75" />
      <ellipse cx="22.5" cy="11.5" rx="3.6" ry="4.2" fill={AZUL} opacity="0.75" />
      <ellipse cx="30" cy="12.5" rx="3.2" ry="3.8" fill={AZUL} opacity="0.75" />
      <ellipse cx="36" cy="17" rx="2.8" ry="3.2" fill={AZUL} opacity="0.75" />
    </svg>
  );
}

// ── Línea de puntos para completar a mano ──────────────────────
function Campo({
  etiqueta,
  ancho,
  sufijo,
}: {
  etiqueta: string;
  ancho: string;
  sufijo?: string;
}) {
  const flex = ancho === "full" ? "flex-[3]" : ancho === "med" ? "flex-[2]" : "flex-1";
  return (
    <span className={`flex min-w-0 items-baseline gap-1 ${flex}`}>
      <span className="shrink-0 font-display text-[10.5px] font-bold text-marca">
        {etiqueta}
      </span>
      <span className="min-w-[6mm] flex-1 border-b border-dotted border-marca/45" />
      {sufijo && (
        <span className="shrink-0 text-[9.5px] font-semibold text-[#5A6875]">
          {sufijo}
        </span>
      )}
    </span>
  );
}

export default async function HojaPage() {
  const qrSvg = await QRCode.toString(SITE.url, {
    type: "svg",
    margin: 1,
    color: { dark: AZUL, light: "#ffffff" },
  });

  return (
    <div className="min-h-screen py-6 print:min-h-0 print:py-0">
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
          🖨️ Imprimí <strong>doble faz</strong> (volteo por el borde corto), en
          A4 <strong>apaisado</strong>, <strong>sin márgenes</strong> (tamaño
          real), y <strong>plegá en 3</strong>. Plastificalo para dejárselo a la
          mamá. 💙
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ORDEN DE LECTURA que pidió el stakeholder (video de la maqueta
          de papel, Ejemplos/_transcribe/v0725.txt + frames0725):

            1 Presentación (TAPA)
            2 Identificación del RN (huella y datos)  ← al abrir la tapa
            3 Alimentación · Vínculo y apego · Eliminación
            4 Sueño seguro · El llanto · Vestimenta y temperatura
            5 Baño, uñas y cordón · Acompañar a mamá · Control del bebé sano
            6 Signos de alarma · Contactos · QR

          Plegado tipo carta: se pliega el tercio DERECHO hacia adentro y
          después el IZQUIERDO encima. Por eso el tercio izquierdo de la
          cara interna es el dorso de la tapa (panel 2) y el izquierdo de
          la externa es la solapa que queda escondida (panel 5).

            CARA EXTERNA  [5 solapa][6 contratapa][1 TAPA]
            CARA INTERNA  [2 identif.][3 alim/vínculo/elim][4 sueño/llanto/vest]
          ══════════════════════════════════════════════════════════════ */}

      {/* ════════ CARA EXTERNA (solapa + contratapa + tapa) ════════ */}
      <p className="no-print mx-auto mb-1 max-w-4xl px-4 text-xs font-bold uppercase tracking-wide text-marca/70">
        Cara externa
      </p>
      <div className="trifold trifold-zoom page-break rounded-2xl shadow-soft">
        {/* SOLAPA (izquierda): es el tercio que se pliega hacia adentro, así
            que en el orden de lectura es el PANEL 5 → baño/uñas/cordón,
            acompañar a mamá y control del bebé sano. Al abrir la tapa queda
            a la derecha de la ficha de identificación (tal cual la maqueta
            de papel del stakeholder, frames f_003/f_004). */}
        <div className="panel flex flex-col gap-[2.5mm] bg-[#F7FBFF] p-[4mm]">
          <Fondo variante={2} />
          <Tema t={byId["bano-cordon"]} size="media" grow tinte={2} />
          <Tema t={byId["acompanar-mama"]} size="media" grow tinte={0} />
          <Tema t={byId["control"]} size="media" tinte={1} />
        </div>

        {/* CONTRATAPA (centro): signos de alarma + contacto + QR */}
        <div className="panel flex flex-col p-[6mm]">
          <div className="flex items-center gap-2 border-b-2 border-marca/15 pb-2">
            <img
              src="/logo-sanatorio.png"
              alt={SITE.institucion}
              className="h-9 w-auto"
            />
            <div className="flex-1">
              <p className="font-display text-[12px] font-bold leading-tight text-marca">
                {SITE.institucion}
              </p>
              <p className="text-[8.5px] leading-tight text-[#5A6875]">
                {SITE.ciudad}
              </p>
            </div>
            <Sello80 className="h-[38px] w-[38px] shrink-0" />
          </div>

          {/* Cuándo consultar → signos de alarma */}
          <div className="mt-2.5 rounded-xl bg-marca px-3 py-[5px] text-center">
            <p className="font-display text-[13px] font-bold uppercase leading-tight tracking-[0.04em] text-white">
              Cuándo consultar
            </p>
          </div>
          <div className="mt-2">
            <Tema t={byId["alarma"]} size="dense" tinte={0} />
          </div>

          {/* QR */}
          <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-[#F1F7FC] p-2.5 ring-1 ring-marca/15">
            <div
              className="h-[80px] w-[80px] shrink-0 [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
              aria-label="Código QR"
            />
            <div>
              <p className="flex items-center gap-1 font-display text-[11.5px] font-bold leading-tight text-marca">
                <IconoLinea name="qr" className="h-[14px] w-[14px] shrink-0" />
                Escaneá y vela en tu teléfono
              </p>
              <p className="mt-1 text-[9px] leading-snug text-[#44515F]">
                La guía completa, con imágenes para tocar y un espacio para
                dejar tus consultas. Si no podés entrar, guardá este tríptico.
              </p>
            </div>
          </div>

          {/* Contacto */}
          <div className="mt-2.5">
            <p className="font-display text-[11.5px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
              Datos de contacto
            </p>
            <span className="mt-[3px] block h-[3px] w-9 rounded-full bg-sky" />
            <ul className="mt-1.5 grid gap-[4px] text-[9.4px] leading-snug text-[#44515F]">
              <li className="flex gap-2">
                <IconoLinea name="pin" className="mt-[1px] h-[12px] w-[12px] shrink-0" />
                <span>
                  <strong className="text-marca">Dirección.</strong>{" "}
                  {SITE.direccion} — {SITE.ciudad}
                </span>
              </li>
              <li className="flex gap-2">
                <IconoLinea name="tel" className="mt-[1px] h-[12px] w-[12px] shrink-0" />
                <span>
                  <strong className="text-marca">Teléfono.</strong>{" "}
                  {SITE.telefono} · {SITE.internos}
                </span>
              </li>
              <li className="flex gap-2">
                <IconoLinea name="chat" className="mt-[1px] h-[12px] w-[12px] shrink-0" />
                <span>
                  <strong className="text-marca">WhatsApp.</strong>{" "}
                  {SITE.whatsapp}
                </span>
              </li>
              <li className="flex gap-2">
                <IconoLinea name="web" className="mt-[1px] h-[12px] w-[12px] shrink-0" />
                <span>
                  <strong className="text-marca">Web.</strong> {SITE.webLabel} ·{" "}
                  <strong className="text-marca">Instagram.</strong>{" "}
                  @sanatoriomodelo
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <p className="text-balance rounded-lg border border-dashed border-marca/35 bg-white/70 px-2 py-[3px] text-center font-display text-[8.2px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
              {GENERALIDADES}
            </p>
            <p className="mt-1.5 border-t border-marca/10 pt-1.5 text-[7.6px] leading-tight text-[#6B7783]">
              {DISCLAIMER}
            </p>
          </div>
        </div>

        {/* TAPA (derecha): logo + 80 años + foto + título */}
        <div className="panel relative flex flex-col overflow-hidden bg-gradient-to-b from-marca to-marcaSoft p-[7mm] text-white">
          {/* burbujas celestes decorativas */}
          <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -left-8 top-1/2 h-20 w-20 rounded-full bg-sky/20" />

          <div className="relative flex flex-col items-center text-center">
            <img
              src="/logo-sanatorio-white.png"
              alt={SITE.institucion}
              className="h-[52px] w-auto"
            />
            <p className="mt-1.5 font-display text-[14px] font-bold leading-tight">
              {SITE.institucion}
            </p>
            <p className="text-[9.5px] leading-tight text-white/85">
              {SITE.ciudad}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Sello80 blanco className="h-[58px] w-[58px]" />
              <div className="text-left">
                <p className="font-display text-[11px] font-bold uppercase leading-tight tracking-wide">
                  80 aniversario
                </p>
                <p className="text-[9px] leading-snug text-white/85">
                  Celebrando nuestros 80 años junto a las familias tucumanas.
                </p>
                <span className="mt-1 inline-block rounded-full bg-white/15 px-2.5 py-[2px] text-[8.5px] font-bold uppercase tracking-wide">
                  Excelencia y compromiso
                </span>
              </div>
            </div>
          </div>

          {/* ── Panal hexagonal: es la FOTO REAL de la instalación de la
              entrada del sanatorio, enderezada y recortada con fondo
              transparente (scripts/panal-desde-foto.py → panal-pared.png).
              Se dibujó 4 veces con vectores y el sanatorio las rechazó
              todas, así que va la pieza real. Crece para absorber el
              sobrante: si no, el título quedaba flotando en el medio. */}
          <div className="relative mt-2 flex flex-1 items-center justify-center">
            <img
              src="/panal-pared.png"
              alt="Instalación hexagonal de la entrada del sanatorio: excelencia, calidad y compromiso"
              className="w-[89mm] max-h-full object-contain"
            />
          </div>

          <div className="relative mt-3 text-center">
            <h1 className="font-display text-[26px] font-bold leading-none">
              Cuidados de tu bebé
            </h1>
            <p className="mt-2 font-display text-[11px] font-semibold uppercase leading-tight tracking-[0.05em] text-white/90">
              Guía práctica · Internación conjunta y primeros días en casa
            </p>
          </div>

          <div className="relative mt-2.5 flex items-center justify-center gap-2 border-t border-white/25 pt-2 text-[9.5px] font-semibold text-white/85">
            <IconoLinea name="qr" className="h-[13px] w-[13px] stroke-white" />
            Escaneá el QR del reverso y vela en tu teléfono
          </div>
        </div>
      </div>

      {/* ════════ CARA INTERNA (contenido) ════════ */}
      <p className="no-print mx-auto mb-1 mt-6 max-w-4xl px-4 text-xs font-bold uppercase tracking-wide text-marca/70">
        Cara interna
      </p>
      <div className="trifold trifold-zoom rounded-2xl shadow-soft">
        {/* PANEL 2 — Identificación del recién nacido. Va al dorso de la tapa
            (el tercio izquierdo de la cara interna es la espalda del tercio
            derecho de la externa), así que es lo primero que aparece al
            abrir la portada: la huella y los datos del bebé. */}
        <div className="panel flex flex-col p-[6mm]">
          <Fondo variante={2} />

          <div className="relative flex flex-col items-center">
            <span className="grid h-[50px] w-[50px] place-items-center rounded-full bg-sky p-[9px] ring-[3px] ring-white outline outline-1 outline-marca/25">
              <Huellita className="h-full w-full" />
            </span>
            <h3 className="mt-1.5 text-center font-display text-[14px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
              {identificacion.titulo}
            </h3>
            <span className="mt-[3px] h-[3px] w-9 rounded-full bg-sky" />
          </div>

          {/* Datos del bebé, para completar a mano */}
          <div className="relative mt-4 grid gap-[3.5mm]">
            {identificacion.filas.map((fila, i) => (
              <div key={i} className="flex items-baseline gap-3">
                {fila.map((c) => (
                  <Campo
                    key={c.etiqueta}
                    etiqueta={c.etiqueta}
                    ancho={c.ancho}
                    sufijo={c.sufijo}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Huella del pie */}
          <div className="relative mt-4 flex flex-1 flex-col rounded-2xl border-2 border-dashed border-marca/30 bg-white/70 p-2">
            <p className="text-center font-display text-[10.5px] font-bold uppercase tracking-[0.05em] text-marca/70">
              {identificacion.huella}
            </p>
            <div className="grid flex-1 place-items-center">
              <Huellita className="h-[26mm] w-[26mm] opacity-[0.09]" />
            </div>
          </div>

          {/* Equipo de salud */}
          <div className="relative mt-4">
            <p className="font-display text-[11.5px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
              {identificacion.equipoTitulo}
            </p>
            <span className="mt-[3px] block h-[3px] w-9 rounded-full bg-sky" />
            <div className="mt-2.5 grid gap-[3.5mm]">
              {identificacion.equipo.map((rol) => (
                <Campo key={rol} etiqueta={rol} ancho="full" />
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 3 */}
        <div className="panel flex flex-col gap-[2.5mm] bg-[#F7FBFF] p-[4mm]">
          <Fondo variante={0} />
          <Tema t={byId["alimentacion"]} size="media" tinte={0} />
          <Tema t={byId["vinculo"]} size="media" grow tinte={1} />
          <Tema t={byId["eliminacion"]} size="media" grow tinte={2} />
        </div>
        {/* PANEL 4 */}
        <div className="panel flex flex-col gap-[2.5mm] p-[4mm]">
          <Fondo variante={1} />
          <Tema t={byId["sueno"]} size="media" tinte={1} />
          <Tema t={byId["llanto"]} size="media" tinte={2} />
          <Tema t={byId["vestimenta"]} size="media" tinte={0} />
        </div>
      </div>
    </div>
  );
}
