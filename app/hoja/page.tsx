import Link from "next/link";
import QRCode from "qrcode";
import PrintButton from "@/components/PrintButton";
import TemaIcono from "@/components/TemaIcono";
import PuntoIcono from "@/components/PuntoIcono";
import { tarjetas, type Tarjeta } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Tríptico para imprimir · Cuidados en internación conjunta",
};

const byId = Object.fromEntries(tarjetas.map((t) => [t.id, t])) as Record<
  string,
  Tarjeta
>;

const AZUL = "#0056A2";

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
function Tema({
  t,
  dense = false,
  grow = false,
}: {
  t: Tarjeta;
  dense?: boolean;
  grow?: boolean;
}) {
  return (
    <section className={`break-inside-avoid ${grow ? "flex flex-1 flex-col" : ""}`}>
      <div className="flex flex-col items-center">
        <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-sky p-[7px] ring-[3px] ring-white outline outline-1 outline-marca/25">
          <TemaIcono id={t.id} className="h-full w-full" />
        </span>
        <h3 className="mt-1.5 text-center font-display text-[13px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
          {t.titulo}
        </h3>
        <span className="mt-[3px] h-[3px] w-9 rounded-full bg-sky" />
      </div>
      <ul
        className={`mt-2 ${
          grow
            ? "flex flex-1 flex-col justify-around"
            : `grid ${dense ? "gap-[4px]" : "gap-[7px]"}`
        }`}
      >
        {t.puntos.map((p, i) => (
          <li
            key={i}
            className={`flex gap-1.5 ${
              dense ? "text-[10.2px] leading-[1.34]" : "text-[11.6px] leading-[1.4]"
            } text-[#44515F]`}
          >
            <PuntoIcono
              icon={p.icon}
              className={`mt-[0.5px] shrink-0 ${dense ? "h-[15px] w-[15px]" : "h-[16px] w-[16px]"}`}
            />
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

      {/* ════════ CARA EXTERNA (contratapa + flap + tapa) ════════ */}
      <p className="no-print mx-auto mb-1 max-w-4xl px-4 text-xs font-bold uppercase tracking-wide text-marca/70">
        Cara externa
      </p>
      <div className="trifold trifold-zoom page-break rounded-2xl shadow-soft">
        {/* SOLAPA (izquierda, se pliega hacia adentro): cuándo consultar */}
        <div className="panel flex flex-col bg-[#F4FAFF] p-[7mm]">
          <div className="rounded-xl bg-marca px-3 py-2 text-center">
            <p className="font-display text-[14px] font-bold uppercase leading-tight tracking-[0.04em] text-white">
              Cuándo consultar
            </p>
            <p className="mt-[2px] text-[9px] leading-tight text-white/85">
              Avisá al personal de enfermería si ves alguna de estas señales
            </p>
          </div>
          <div className="mt-3 flex flex-1 flex-col">
            <Tema t={byId["alarma"]} grow />
            <div className="grid gap-2 pt-3">
              <div className="rounded-2xl bg-white p-2.5 ring-1 ring-marca/15">
                <p className="text-center text-[10px] leading-snug text-[#44515F]">
                  <strong className="text-marca">Urgencias.</strong> Durante la
                  internación, llamá al personal de enfermería. Ya en casa,
                  comunicate con el sanatorio o acercate a la guardia.
                </p>
              </div>
              <p className="rounded-xl bg-skysoft/60 px-2 py-2 text-center font-display text-[11px] font-bold leading-snug text-marca ring-1 ring-sky/60">
                Ante la duda, siempre consultá. Más vale una consulta de más. 💙
              </p>
            </div>
          </div>
        </div>

        {/* CONTRATAPA (centro): institucional + QR + contacto */}
        <div className="panel flex flex-col p-[7mm]">
          <div className="flex items-center gap-2 border-b-2 border-marca/15 pb-2">
            <img
              src="/logo-sanatorio.png"
              alt={SITE.institucion}
              className="h-10 w-auto"
            />
            <div>
              <p className="font-display text-[13px] font-bold leading-tight text-marca">
                {SITE.institucion}
              </p>
              <p className="text-[9px] leading-tight text-[#5A6875]">
                {SITE.ciudad}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between">
            {/* Sello 80 años */}
            <div className="mt-3 flex items-center gap-3">
              <Sello80 className="h-[76px] w-[76px] shrink-0" />
              <div>
                <p className="font-display text-[12px] font-bold uppercase leading-tight tracking-wide text-marca">
                  Celebrando nuestros 80 años
                </p>
                <p className="mt-[2px] text-[10px] leading-snug text-[#44515F]">
                  Junto a las familias tucumanas, con excelencia y compromiso.
                </p>
              </div>
            </div>

            {/* QR */}
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#F1F7FC] p-3 ring-1 ring-marca/15">
              <div
                className="h-[96px] w-[96px] shrink-0 [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
                aria-label="Código QR"
              />
              <div>
                <p className="flex items-center gap-1 font-display text-[12.5px] font-bold leading-tight text-marca">
                  <IconoLinea name="qr" className="h-4 w-4 shrink-0" />
                  Escaneá y vela en tu teléfono
                </p>
                <p className="mt-1 text-[9.5px] leading-snug text-[#44515F]">
                  La guía completa, con imágenes para tocar y un espacio para
                  dejar tus consultas. Si no podés entrar, guardá este tríptico.
                </p>
              </div>
            </div>

            {/* Índice de temas */}
            <div className="mt-3 rounded-2xl bg-skysoft/40 p-3 ring-1 ring-sky/50">
              <p className="text-center font-display text-[11.5px] font-bold uppercase tracking-wide text-marca">
                Todo en un solo lugar
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-[5px]">
                {tarjetas.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-1.5 text-[9.2px] font-semibold leading-tight text-marca"
                  >
                    <span className="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-white p-[2px] ring-1 ring-sky">
                      <TemaIcono id={t.id} className="h-full w-full" />
                    </span>
                    {t.titulo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className="mt-3">
              <p className="font-display text-[12.5px] font-bold uppercase leading-tight tracking-[0.03em] text-marca">
                Datos de contacto
              </p>
              <span className="mt-[3px] block h-[3px] w-9 rounded-full bg-sky" />
              <ul className="mt-2 grid gap-[6px] text-[10px] leading-snug text-[#44515F]">
                <li className="flex gap-2">
                  <IconoLinea name="pin" className="mt-[1px] h-[13px] w-[13px] shrink-0" />
                  <span>
                    <strong className="text-marca">Dirección.</strong>{" "}
                    {SITE.direccion} — {SITE.ciudad}
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconoLinea name="tel" className="mt-[1px] h-[13px] w-[13px] shrink-0" />
                  <span>
                    <strong className="text-marca">Teléfono.</strong>{" "}
                    {SITE.telefono}
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconoLinea name="chat" className="mt-[1px] h-[13px] w-[13px] shrink-0" />
                  <span>
                    <strong className="text-marca">WhatsApp.</strong>{" "}
                    {SITE.whatsapp}
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconoLinea name="web" className="mt-[1px] h-[13px] w-[13px] shrink-0" />
                  <span>
                    <strong className="text-marca">Web.</strong> {SITE.webLabel}
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconoLinea name="ig" className="mt-[1px] h-[13px] w-[13px] shrink-0" />
                  <span>
                    <strong className="text-marca">Instagram.</strong>{" "}
                    @sanatoriomodelo
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-3 border-t border-marca/10 pt-2 text-[8px] leading-tight text-[#6B7783]">
            Información orientativa para acompañarte durante la internación. No
            reemplaza el consejo de tu equipo de salud. Ante cualquier duda,
            preguntá al personal de enfermería o a tu pediatra.
          </p>
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

          {/* Foto mamá + bebé */}
          <div className="relative mt-4">
            <img
              src="/tapa-mama-bebe.jpg"
              alt="Mamá sosteniendo a su bebé"
              className="h-[215px] w-full rounded-2xl object-cover object-top shadow-lg ring-4 ring-white/70"
            />
          </div>

          <div className="relative mt-4 text-center">
            <h1 className="font-display text-[27px] font-bold leading-none">
              Cuidados de tu bebé
            </h1>
            <p className="mt-2 font-display text-[11.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-white/90">
              Guía práctica · {SITE.programa}
            </p>
            <div className="mx-auto my-2.5 h-px w-16 bg-white/40" />
          </div>

          <div className="relative rounded-2xl bg-white/12 p-3 text-center ring-1 ring-white/25">
            <p className="text-[10.2px] leading-snug text-white/95">
              Estos días son hermosos y llenos de preguntas. Reunimos acá los
              cuidados esenciales para acompañarte mientras estás con tu bebé, y
              las señales para consultar sin demora.
            </p>
          </div>

          <div className="relative mt-auto flex items-center justify-center gap-2 pt-3 text-[9.5px] font-semibold text-white/85">
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
        {/* Columna 1 */}
        <div className="panel flex flex-col justify-between gap-3 p-[7mm]">
          <Tema t={byId["alimentacion"]} />
          <Tema t={byId["vinculo"]} />
          <Tema t={byId["eliminacion"]} />
        </div>
        {/* Columna 2 */}
        <div className="panel flex flex-col justify-between gap-3 bg-[#F4FAFF] p-[7mm]">
          <Tema t={byId["acompanar-mama"]} />
          <Tema t={byId["vestimenta"]} />
          <Tema t={byId["bano-cordon"]} />
        </div>
        {/* Columna 3 */}
        <div className="panel flex flex-col justify-between gap-3 p-[7mm]">
          <Tema t={byId["llanto"]} />
          <Tema t={byId["sueno"]} />
          <Tema t={byId["control"]} />
        </div>
      </div>
    </div>
  );
}
