// Ilustraciones de cada tema, al estilo de los trípticos de ejemplo que
// pasó el sanatorio: dibujos planos (mamá amamantando, bañera con el bebé,
// cuna, bebé con termómetro…) con contorno azul oscuro y rellenos suaves,
// para ir dentro del círculo celeste del badge.
// Paleta institucional azul/celeste/blanco + tonos de piel y un coral
// puntual para corazones y termómetro (como en los ejemplos).

const O = "#0B3F70"; // contorno azul oscuro
const A = "#0056A2"; // azul institucional
// Los rellenos son DEGRADÉS (no colores planos): le dan el volumen suave
// de la infografía del sanatorio. Se definen una vez en <Degrades/>.
const C = "url(#tiCel)"; // celeste con volumen
const L = "url(#tiClaro)"; // celeste muy claro
const W = "url(#tiBlanco)";
const S = "url(#tiPiel)"; // piel
const H = "url(#tiPelo)"; // pelo
const R = "url(#tiCoral)"; // coral (corazón / termómetro)

function Degrades() {
  return (
    <defs>
      <linearGradient id="tiCel" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#DCEEFF" />
        <stop offset="100%" stopColor="#8CC5EC" />
      </linearGradient>
      <linearGradient id="tiClaro" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D2E9FB" />
      </linearGradient>
      <linearGradient id="tiBlanco" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E8F4FE" />
      </linearGradient>
      <linearGradient id="tiPiel" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FDE7D4" />
        <stop offset="100%" stopColor="#EFBB93" />
      </linearGradient>
      <linearGradient id="tiPelo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A4C6B" />
        <stop offset="100%" stopColor="#0E2E4A" />
      </linearGradient>
      <linearGradient id="tiCoral" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FFB3C4" />
        <stop offset="100%" stopColor="#EE6E8D" />
      </linearGradient>
    </defs>
  );
}

type Props = { id: string; className?: string };

const ICONOS: Record<string, React.ReactNode> = {
  // Alimentación — mamá amamantando
  alimentacion: (
    <>
      <path
        d="M7 45c0-11.5 4.6-17.5 11.5-17.5S30 33.5 30 45z"
        fill={C}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="17" r="7" fill={S} stroke={O} strokeWidth="1.7" />
      <path
        d="M11.6 16.4a7 7 0 0 1 13.9-1c-2-.7-3.5-2-4.3-3.5-1.9 2.3-5.4 3.8-9.6 4.5z"
        fill={H}
      />
      <path
        d="M27 29.5c3.6.2 5.8 2.4 6.2 5.6"
        stroke={S}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24.5 34.5c1.8-3.2 7-4 10.2-2 3.2 2 2.8 7.2-1 8.7-4 1.6-10.6.3-9.2-6.7z"
        fill={W}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="34.5" cy="29.5" r="4.8" fill={S} stroke={O} strokeWidth="1.7" />
      <path
        d="M31.8 26.4c1.3-1.7 4.2-1.9 5.3.2"
        stroke={H}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  // Vínculo y apego — piel con piel + corazón
  vinculo: (
    <>
      <path
        d="M35.5 9.5c-1.8-2.2-5.2-.9-5.2 1.8 0 2.8 5.2 6 5.2 6s5.2-3.2 5.2-6c0-2.7-3.4-4-5.2-1.8z"
        fill={R}
        stroke={O}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 45c0-10.5 4.2-16 10.5-16S29 34.5 29 45z"
        fill={C}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="18.5" r="6.6" fill={S} stroke={O} strokeWidth="1.7" />
      <path
        d="M12 18a6.6 6.6 0 0 1 13.1-1c-1.9-.7-3.3-1.9-4-3.3-1.8 2.2-5.1 3.6-9.1 4.3z"
        fill={H}
      />
      <path
        d="M23 37c1.6-3 6.4-3.8 9.4-1.8 2.9 1.9 2.5 6.6-1 8-3.6 1.5-9.8.3-8.4-6.2z"
        fill={W}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="31.5" r="4.6" fill={S} stroke={O} strokeWidth="1.7" />
    </>
  ),

  // Eliminación — pañal + gotita
  eliminacion: (
    <>
      <path
        d="M9 13h30v8c0 10-6 16.5-15 19.5C15 37.5 9 31 9 21z"
        fill={W}
        stroke={O}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 19.5h30" stroke={O} strokeWidth="1.6" />
      <path d="M9 13h30v6.5H9z" fill={L} stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
      <path
        d="M24 24c2.7 3.4 4.1 5.2 4.1 7a4.1 4.1 0 0 1-8.2 0c0-1.8 1.4-3.6 4.1-7z"
        fill={C}
        stroke={O}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M21.4 31.5a2.6 2.6 0 0 0 2.6 2.6"
        stroke={W}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  // Acompañar a mamá — mano sosteniendo un corazón
  "acompanar-mama": (
    <>
      <path
        d="M24 6c-2.4-2.9-7-1.2-7 2.3 0 3.6 7 7.9 7 7.9s7-4.3 7-7.9c0-3.5-4.6-5.2-7-2.3z"
        fill={R}
        stroke={O}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 29.5c0-2.2 2.3-3.4 4-2.3l4.5 3V22a2.7 2.7 0 0 1 5.4 0v6.5h1V19.5a2.7 2.7 0 0 1 5.4 0V28h1v-6.5a2.7 2.7 0 0 1 5.4 0V34c0 5.4-4.3 9.2-10 9.2-4.3 0-7.2-1.6-9.7-5z"
        fill={S}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </>
  ),

  // Vestimenta y temperatura — bodysuit + termómetro
  vestimenta: (
    <>
      <path
        d="M16 11l2-1.6h6.5l2 1.6 6 3-2.5 5.8-3.7-1.5V33a2.2 2.2 0 0 1-2.2 2.2h-8.4A2.2 2.2 0 0 1 13.5 33V18.3L9.8 19.8 7.3 14z"
        fill={C}
        stroke={O}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18 9.6c.9 1.9 5.6 1.9 6.5 0"
        stroke={O}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20.2" cy="26" r="1.3" fill={O} />
      <circle cx="20.2" cy="30.6" r="1.3" fill={O} />
      <rect
        x="33"
        y="14"
        width="6.4"
        height="19"
        rx="3.2"
        fill={W}
        stroke={O}
        strokeWidth="1.7"
      />
      <circle cx="36.2" cy="35.5" r="4.4" fill={R} stroke={O} strokeWidth="1.7" />
      <rect x="34.7" y="22" width="3" height="14" rx="1.5" fill={R} />
      <path d="M40.5 19h2.5M40.5 23h2.5M40.5 27h2.5" stroke={O} strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),

  // Baño, uñas y cordón — bañera con el bebé y burbujas
  "bano-cordon": (
    <>
      <circle cx="12" cy="12.5" r="2.4" fill={L} stroke={O} strokeWidth="1.3" />
      <circle cx="19" cy="7.5" r="1.8" fill={L} stroke={O} strokeWidth="1.3" />
      <circle cx="24.5" cy="12" r="1.4" fill={L} stroke={O} strokeWidth="1.3" />
      <circle cx="17" cy="20" r="5.4" fill={S} stroke={O} strokeWidth="1.7" />
      <path
        d="M14.4 16.2c1.4-1.9 4-1.9 5.4 0"
        stroke={H}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15.4" cy="20.4" r="1" fill={O} />
      <circle cx="19" cy="20.4" r="1" fill={O} />
      <path
        d="M23 23.5c2.2.2 3.6 1.2 4.2 2.8"
        stroke={S}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6.5 27h35v3.5c0 5.8-4.4 9.8-10.3 9.8H16.8C10.9 40.3 6.5 36.3 6.5 30.5z"
        fill={W}
        stroke={O}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M5.5 27h37" stroke={O} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10 32.5c3-1.7 5 1.7 8 0s5-1.7 8 0 5 1.7 8 0"
        stroke={C}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M12.5 40.3L10 44.5M35.5 40.3l2.5 4.2" stroke={O} strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  // El llanto — carita de bebé llorando
  llanto: (
    <>
      <circle cx="24" cy="25" r="12.5" fill={S} stroke={O} strokeWidth="1.8" />
      <path
        d="M22.5 11.5c.6-3 4.6-2.8 4.3.8"
        stroke={H}
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16.6 22.6c1.3-1.8 3.7-1.8 5 0M26.4 22.6c1.3-1.8 3.7-1.8 5 0"
        stroke={O}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="24" cy="31" rx="3.8" ry="3.2" fill={R} stroke={O} strokeWidth="1.5" />
      <path
        d="M17.4 26.6c-1.7 2.6-1.7 5 0 5s1.7-2.4 0-5z"
        fill={C}
        stroke={O}
        strokeWidth="1.3"
      />
      <path
        d="M30.6 26.6c-1.7 2.6-1.7 5 0 5s1.7-2.4 0-5z"
        fill={C}
        stroke={O}
        strokeWidth="1.3"
      />
    </>
  ),

  // Sueño seguro — cuna + luna
  sueno: (
    <>
      <path
        d="M39 6.5a5.6 5.6 0 1 0 3.2 8.8A5.7 5.7 0 0 1 39 6.5z"
        fill={C}
        stroke={O}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 22v10M40 22v10" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="6.5" y="19" width="35" height="4.4" rx="2.2" fill={C} stroke={O} strokeWidth="1.7" />
      <path
        d="M13.5 23.5v7M19 23.5v7M24.5 23.5v7M30 23.5v7M35.5 23.5v7"
        stroke={O}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.5 30h37v4.5a3.2 3.2 0 0 1-3.2 3.2H8.7a3.2 3.2 0 0 1-3.2-3.2z"
        fill={W}
        stroke={O}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 37.7v4.8M38.5 37.7v4.8" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),

  // Control del bebé sano — agenda con corazón (turno del control)
  control: (
    <>
      <rect x="8" y="12" width="32" height="29" rx="4" fill={W} stroke={O} strokeWidth="1.8" />
      <path d="M8 21h32" stroke={O} strokeWidth="1.6" />
      <path
        d="M8 16a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v5H8z"
        fill={C}
        stroke={O}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M16 8v6M32 8v6" stroke={O} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M24 28.5c-2-2.4-5.8-1-5.8 2 0 3.1 5.8 6.7 5.8 6.7s5.8-3.6 5.8-6.7c0-3-3.8-4.4-5.8-2z"
        fill={R}
        stroke={O}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </>
  ),

  // Signos de alarma — bebé con termómetro
  alarma: (
    <>
      <circle cx="19" cy="25" r="11.5" fill={S} stroke={O} strokeWidth="1.8" />
      <path
        d="M17.5 12.5c.6-2.8 4.4-2.6 4.1.8"
        stroke={H}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15" cy="23.5" r="1.4" fill={O} />
      <circle cx="23" cy="23.5" r="1.4" fill={O} />
      <path
        d="M15.5 30.5c2 1.8 5 1.8 7 0"
        stroke={O}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="32" y="9" width="7" height="21" rx="3.5" fill={W} stroke={O} strokeWidth="1.8" />
      <circle cx="35.5" cy="32.5" r="4.8" fill={R} stroke={O} strokeWidth="1.8" />
      <rect x="33.8" y="17" width="3.4" height="15" rx="1.7" fill={R} />
      <path d="M40 13h3M40 17h3M40 21h3" stroke={O} strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
};

export default function TemaIcono({ id, className }: Props) {
  const contenido = ICONOS[id];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <Degrades />
      {contenido ?? <circle cx="24" cy="24" r="11" fill={C} stroke={A} strokeWidth="1.8" />}
    </svg>
  );
}
