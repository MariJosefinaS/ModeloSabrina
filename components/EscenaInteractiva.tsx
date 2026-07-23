"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────
//  Escena interactiva: una ilustración GRANDE con puntos que se
//  tocan, al estilo de la infografía que pasó el sanatorio
//  ("Un solo escudo para proteger dos vidas"): dibujo central con
//  halo suave, degradés pastel y llamadas alrededor.
//
//  IMPORTANTE: todos los textos salen del documento oficial de la
//  Maternidad ("Internación conjunta"). No se agrega nada más.
// ─────────────────────────────────────────────────────────────

const O = "#0B3F70"; // contorno azul oscuro
const A = "#0056A2"; // azul institucional

export type EscenaId = "nursing" | "crib" | "outfit" | "diaper";

// x,y = dónde va el número (al margen) · tx,ty = a qué parte del dibujo apunta
type Punto = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  titulo: string;
  texto: string;
};
type Escena = { titulo: string; dibujo: React.ReactNode; puntos: Punto[] };

// ── Degradés y filtros compartidos (el "look" de la infografía) ──
function Defs() {
  return (
    <defs>
      <radialGradient id="halo" cx="50%" cy="46%" r="58%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#DCEEFF" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#BFE3FF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="piel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCE3CE" />
        <stop offset="100%" stopColor="#F2C39E" />
      </linearGradient>
      <linearGradient id="tela" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D6EBFC" />
      </linearGradient>
      <linearGradient id="telaAzul" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BFE3FF" />
        <stop offset="100%" stopColor="#8CC5EC" />
      </linearGradient>
      <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CDE9FB" />
        <stop offset="100%" stopColor="#9AD0F0" />
      </linearGradient>
      <linearGradient id="pelo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A4C6B" />
        <stop offset="100%" stopColor="#123A5A" />
      </linearGradient>
      <filter id="suave" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  );
}

// Sombra difusa bajo la figura, como en la infografía
function Piso({ cx, cy, rx = 120, ry = 16 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#9FC8E6" opacity="0.35" filter="url(#suave)" />;
}

// ── Escena 1: buen agarre (mamá amamantando) ──
const nursing: Escena = {
  titulo: "Buen agarre",
  puntos: [
    {
      x: 356,
      y: 118,
      tx: 243,
      ty: 196,
      titulo: "Boca bien abierta",
      texto:
        "Boca bien abierta abarcando la mayor parte de la areola y el pezón.",
    },
    {
      x: 44,
      y: 88,
      tx: 150,
      ty: 168,
      titulo: "Pecho a libre demanda",
      texto:
        "Pecho libre demanda, sin restricciones. Las veces que quiera y el tiempo que quiera, con un límite entre 3/4 hs, para lograr una frecuencia de entre 8 a 12 veces en 24 hs.",
    },
    {
      x: 366,
      y: 244,
      tx: 282,
      ty: 236,
      titulo: "Ofrecerle el otro pecho",
      texto:
        "Cuando lo suelte, ofrecerle el otro pecho. No suspender la lactancia, excepto indicación médica.",
    },
    {
      x: 40,
      y: 250,
      tx: 138,
      ty: 232,
      titulo: "Piel con piel",
      texto: "Contacto piel con piel, hablarle suavemente, conexión visual, abrazarlo.",
    },
  ],
  dibujo: (
    <>
      <circle cx="205" cy="152" r="146" fill="url(#halo)" />
      <Piso cx={200} cy={296} rx={124} />
      {/* pelo largo por detrás */}
      <path
        d="M120 118c0-46 30-74 66-74s66 28 66 74c0 44-6 96-22 124h-88c-16-28-22-80-22-124z"
        fill="url(#pelo)"
      />
      {/* torso de mamá con escote en V */}
      <path
        d="M124 292c0-58 22-92 62-100l0 0c40 8 62 42 62 100z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M170 194c6 16 22 16 28 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* cara mirando al bebé */}
      <circle cx="186" cy="118" r="44" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path
        d="M142 116a44 44 0 0 1 88-6c-14-4-24-13-29-23-12 15-33 24-59 29z"
        fill="url(#pelo)"
      />
      <path d="M196 128c6-6 16-6 22 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M168 130c5-5 13-5 18 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M186 150c7 5 15 4 20-2" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* brazo de mamá que sostiene al bebé */}
      <path
        d="M136 226c26 40 74 54 122 32"
        stroke="url(#piel)"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />
      {/* bebé envuelto, acostado en el regazo */}
      <path
        d="M212 214c30-16 76-6 84 22 8 28-24 50-62 44-34-6-54-50-22-66z"
        fill="url(#telaAzul)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M250 224c14 4 26 16 30 30" stroke={O} strokeWidth="2.5" opacity="0.35" fill="none" />
      {/* cabecita del bebé prendida al pecho */}
      <circle cx="222" cy="206" r="30" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path d="M200 190c10-14 34-14 44 2" stroke="url(#pelo)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M224 202c5-4 11-4 15 1" stroke={O} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="200" cy="214" rx="12" ry="10" fill="#F58BA4" stroke={O} strokeWidth="2.5" />
      {/* manito del bebé sobre el pecho */}
      <circle cx="212" cy="246" r="11" fill="url(#piel)" stroke={O} strokeWidth="2.5" />
    </>
  ),
};

// ── Escena 2: sueño seguro (cuna) ──
const crib: Escena = {
  titulo: "Sueño seguro",
  puntos: [
    {
      x: 200,
      y: 60,
      tx: 200,
      ty: 196,
      titulo: "Boca arriba",
      texto:
        "Boca arriba. Cubrir con la ropa de cama sólo hasta las axilas, con la cara descubierta, sacando los brazos por fuera de la sábana y/o manta.",
    },
    {
      x: 368,
      y: 120,
      tx: 292,
      ty: 190,
      titulo: "Cuna despejada",
      texto:
        "Sin almohada, sin juguetes, ni peluches, o chichoneras. Sin gorrito y sin babero.",
    },
    {
      x: 36,
      y: 246,
      tx: 108,
      ty: 240,
      titulo: "Colchón firme",
      texto:
        "Colchón firme, plano, cubierto con una sábana ajustada. No usar frazadas ni colchas gruesas.",
    },
    {
      x: 368,
      y: 262,
      tx: 320,
      ty: 250,
      titulo: "Su cuna, al lado",
      texto:
        "Debe dormir en su cuna al lado de la cama de los padres. El colecho incrementa el riesgo de accidentes.",
    },
    {
      x: 36,
      y: 84,
      tx: 78,
      ty: 108,
      titulo: "Menos estímulos",
      texto: "Disminuir todos los estímulos (la luz, los ruidos, la televisión).",
    },
  ],
  dibujo: (
    <>
      <circle cx="200" cy="160" r="150" fill="url(#halo)" />
      <Piso cx={200} cy={300} rx={140} />
      {/* luna tenue */}
      <path
        d="M74 84a30 30 0 1 0 17 47A30 30 0 0 1 74 84z"
        fill="#DCEEFF"
        stroke={O}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* patas y barrotes */}
      <path d="M64 150v148M336 150v148" stroke={O} strokeWidth="9" strokeLinecap="round" />
      <rect x="58" y="140" width="284" height="18" rx="9" fill="url(#telaAzul)" stroke={O} strokeWidth="3" />
      <path
        d="M96 158v58M128 158v58M160 158v58M192 158v58M224 158v58M256 158v58M288 158v58"
        stroke={O}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* colchón + sábana ajustada */}
      <path
        d="M56 216h288v36a18 18 0 0 1-18 18H74a18 18 0 0 1-18-18z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* bebé boca arriba, brazos afuera, tapado hasta las axilas */}
      <circle cx="200" cy="196" r="26" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path d="M182 180c8-10 28-10 36 2" stroke="url(#pelo)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="192" cy="196" r="2.6" fill={O} />
      <circle cx="208" cy="196" r="2.6" fill={O} />
      <path d="M194 206c4 3 8 3 12 0" stroke={O} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M168 226c-14-4-24-10-30-18M232 226c14-4 24-10 30-18" stroke="url(#piel)" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path
        d="M150 224h100v28H150z"
        fill="url(#telaAzul)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </>
  ),
};

// ── Escena 3: vestimenta y temperatura ──
const outfit: Escena = {
  titulo: "Vestimenta y temperatura",
  puntos: [
    {
      x: 200,
      y: 300,
      tx: 196,
      ty: 232,
      titulo: "Ropa de algodón",
      texto:
        "La ropa del bebé tiene que ser cómoda y amplia para permitirle moverse. Preferentemente ropa de algodón y de colores claros.",
    },
    {
      x: 366,
      y: 118,
      tx: 318,
      ty: 176,
      titulo: "Una muda más",
      texto: "Ropa de algodón, una muda más que la del adulto.",
    },
    {
      x: 40,
      y: 74,
      tx: 84,
      ty: 116,
      titulo: "Ambiente aireado",
      texto: "Mantener ambiente agradable. Aireado.",
    },
    {
      x: 40,
      y: 250,
      tx: 96,
      ty: 214,
      titulo: "Según la estación",
      texto: "Temperatura ambiental agradable, cálida o fresca según la estación del año.",
    },
  ],
  dibujo: (
    <>
      <circle cx="200" cy="160" r="150" fill="url(#halo)" />
      <Piso cx={200} cy={300} rx={104} />
      {/* ventana abierta y aireada */}
      <rect x="42" y="58" width="88" height="102" rx="10" fill="#EAF5FF" stroke={O} strokeWidth="3" />
      <path d="M86 58v102M42 110h88" stroke={O} strokeWidth="2.5" opacity="0.55" />
      <path d="M36 160h100" stroke={O} strokeWidth="5" strokeLinecap="round" />
      {/* cortina que se mueve */}
      <path
        d="M118 62c14 26 8 56-10 76 16 4 26 0 30-6V62z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M138 104c16-8 26 4 16 14M138 130c20-10 32 2 22 14"
        stroke={A}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      {/* termómetro de ambiente */}
      <rect x="86" y="192" width="20" height="60" rx="10" fill="#FFFFFF" stroke={O} strokeWidth="3" />
      <circle cx="96" cy="258" r="15" fill="#F58BA4" stroke={O} strokeWidth="3" />
      <rect x="90" y="216" width="12" height="44" rx="6" fill="#F58BA4" />
      <path d="M110 202h12M110 214h12M110 226h12" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
      {/* bebé de cuerpo entero con enterito */}
      <circle cx="196" cy="120" r="40" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path d="M168 100c12-14 42-14 54 4" stroke="url(#pelo)" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="183" cy="122" r="3.4" fill={O} />
      <circle cx="209" cy="122" r="3.4" fill={O} />
      <path d="M187 136c6 5 14 5 20 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* enterito amplio, de algodón claro */}
      <path
        d="M164 176l12-14h40l12 14 26 16-12 26-16-8v34h-72v-34l-16 8-12-26z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M154 244h84v22a10 10 0 0 1-10 10h-24v-14h-16v14h-24a10 10 0 0 1-10-10z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M176 164c8 12 32 12 40 0" stroke={O} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="196" cy="212" r="4" fill={A} opacity="0.55" />
      <circle cx="196" cy="230" r="4" fill={A} opacity="0.55" />
      {/* remera del adulto colgada al lado = una muda más */}
      <path
        d="M282 150l10-9h30l10 9 22 12-9 20-14-7v46a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-46l-14 7-9-20z"
        fill="url(#telaAzul)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M296 143c7 10 26 10 33 0" stroke={O} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ),
};

// ── Escena 4: baño, uñas y cordón ──
const diaper: Escena = {
  titulo: "Baño, uñas y cordón",
  puntos: [
    {
      x: 200,
      y: 306,
      tx: 200,
      ty: 250,
      titulo: "El baño",
      texto:
        "Baño con agua a temperatura ambiente y jabón para bebé. Puede ser un momento de placer y un espacio de encuentro que incluso puede calmarlo si está inquieto.",
    },
    {
      x: 366,
      y: 88,
      tx: 330,
      ty: 150,
      titulo: "La hora y la frecuencia",
      texto:
        "Los padres decidirán la hora y la frecuencia de cada baño, conviene hacerlo todos los días o incluso más de una vez.",
    },
    {
      x: 40,
      y: 232,
      tx: 150,
      ty: 196,
      titulo: "El cordón",
      texto:
        "Realizar curación de la base del cordón en cada cambio del pañal con gasa y alcohol al 70% (durante la internación). Luego lavarlo durante el baño y mantenerlo seco.",
    },
    {
      x: 40,
      y: 96,
      tx: 108,
      ty: 130,
      titulo: "Las uñas",
      texto: "Las uñas se deben limar. No cortarlas.",
    },
  ],
  dibujo: (
    <>
      <circle cx="200" cy="150" r="150" fill="url(#halo)" />
      <Piso cx={200} cy={300} rx={130} />
      {/* burbujas */}
      <circle cx="118" cy="70" r="16" fill="#EAF5FF" stroke={O} strokeWidth="2.5" />
      <circle cx="152" cy="44" r="10" fill="#EAF5FF" stroke={O} strokeWidth="2.5" />
      <circle cx="268" cy="62" r="13" fill="#EAF5FF" stroke={O} strokeWidth="2.5" />
      {/* bebé sentado en la bañera */}
      <path
        d="M162 214c0-40 16-58 38-58s38 18 38 58z"
        fill="url(#piel)"
        stroke={O}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* gasa sobre el ombligo */}
      <rect x="182" y="186" width="34" height="24" rx="6" fill="#FFFFFF" stroke={O} strokeWidth="2.5" />
      <path d="M190 192v12M200 190v16M210 192v12" stroke={A} strokeWidth="2" opacity="0.5" />
      {/* bracito levantado, la mano con las uñas */}
      <path
        d="M166 176c-22-6-40-16-52-32"
        stroke="url(#piel)"
        strokeWidth="17"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="108" cy="136" r="15" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path d="M100 126c3-4 8-4 11 0M110 122c3-4 8-4 11 1" stroke={O} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* cabeza */}
      <circle cx="200" cy="124" r="38" fill="url(#piel)" stroke={O} strokeWidth="3" />
      <path d="M174 104c12-14 40-14 52 4" stroke="url(#pelo)" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="188" cy="126" r="3.2" fill={O} />
      <circle cx="214" cy="126" r="3.2" fill={O} />
      <path d="M192 140c6 5 14 5 20 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* bañera */}
      <path
        d="M52 208h296v22c0 40-30 68-72 68H124c-42 0-72-28-72-68z"
        fill="url(#tela)"
        stroke={O}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M44 208h312" stroke={O} strokeWidth="5" strokeLinecap="round" />
      <path
        d="M74 236c26-14 44 14 70 0s44 14 70 0 44 14 70 0"
        stroke="url(#agua)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M92 296l-14 26M308 296l14 26" stroke={O} strokeWidth="7" strokeLinecap="round" />
      {/* canilla */}
      <path
        d="M312 196v-38a22 22 0 0 1 22-22h22"
        stroke={O}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
};

const ESCENAS: Record<EscenaId, Escena> = { nursing, crib, outfit, diaper };

export default function EscenaInteractiva({ id }: { id: EscenaId }) {
  const escena = ESCENAS[id];
  const [abierto, setAbierto] = useState(0);
  const punto = escena.puntos[abierto];

  return (
    <div>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#F2F9FF] to-[#E2F0FC] ring-1 ring-sky/50">
        <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label={escena.titulo}>
          <Defs />
          {escena.dibujo}

          {/* llamadas: número al margen + línea guía al detalle */}
          {escena.puntos.map((p, i) => {
            const activo = i === abierto;
            return (
              <g
                key={i}
                onClick={() => setAbierto(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={p.titulo}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setAbierto(i)}
              >
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={p.tx}
                  y2={p.ty}
                  stroke={A}
                  strokeWidth={activo ? 2.5 : 1.6}
                  strokeDasharray="5 5"
                  opacity={activo ? 0.85 : 0.4}
                />
                <circle cx={p.tx} cy={p.ty} r={activo ? 6 : 4} fill={A} opacity={activo ? 0.9 : 0.5} />
                {activo && (
                  <circle cx={p.x} cy={p.y} r="24" fill={A} opacity="0.16" className="anim-pulse-dot" />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={activo ? 16 : 14}
                  fill={activo ? A : "#FFFFFF"}
                  stroke={O}
                  strokeWidth="3"
                />
                <text
                  x={p.x}
                  y={p.y + 6}
                  textAnchor="middle"
                  className="select-none font-display"
                  fontSize="16"
                  fontWeight="700"
                  fill={activo ? "#FFFFFF" : A}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* texto del punto tocado — solo frases del documento */}
      <div className="mt-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-sky/40">
        <p className="font-display text-lg leading-tight text-marca">
          {abierto + 1}. {punto.titulo}
        </p>
        <p className="mt-1 text-sm leading-snug text-cocoa/80">{punto.texto}</p>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-cocoa/55">
        Tocá los números de la imagen
      </p>
    </div>
  );
}
