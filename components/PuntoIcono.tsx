// Dibujitos chicos para CADA VIÑETA, al estilo de los trípticos de ejemplo
// del sanatorio (cada punto lleva su pictograma: cama, osito, termómetro,
// pulmón, gota…). Reemplazan los emojis y los rombos.
//
// Se mapean por el campo `icon` de cada `Punto` de lib/content.ts (el emoji
// que ya estaba), así no hace falta tocar el contenido.
// Paleta institucional azul/celeste/blanco, con coral puntual.

const O = "#0B3F70"; // contorno azul oscuro
const A = "#0056A2"; // azul institucional
const C = "#BFE3FF"; // celeste claro
const L = "#EAF5FF"; // celeste muy claro
const W = "#FFFFFF";
const S = "#F7CDA9"; // piel
const R = "#F58BA4"; // coral

type Props = { icon: string; className?: string };

// Trazo grueso: se imprimen a ~4 mm, si son finos no se leen.
const sw = 1.8;

const ICONOS: Record<string, React.ReactNode> = {
  // ── Alimentación ──────────────────────────────────────────────
  // reloj — a libre demanda
  "⏰": (
    <>
      <circle cx="12" cy="13" r="7.6" fill={C} stroke={O} strokeWidth={sw} />
      <path d="M12 8.6V13l3 2" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M5.6 5.4L8 3.2M18.4 5.4L16 3.2" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  // boca bien abierta — buen agarre
  // carita con la boca bien abierta — buen agarre
  "👄": (
    <>
      <circle cx="12" cy="12" r="9" fill={S} stroke={O} strokeWidth={sw} />
      <circle cx="8.6" cy="9.4" r="1.2" fill={O} />
      <circle cx="15.4" cy="9.4" r="1.2" fill={O} />
      <ellipse cx="12" cy="15.4" rx="4" ry="3.4" fill={R} stroke={O} strokeWidth="1.5" />
    </>
  ),
  // estrella — el calostro alcanza
  "🌟": (
    <path
      d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.4 6.7 19.2l1.1-5.9L3.5 9.2l5.9-.8z"
      fill={C}
      stroke={O}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),
  // chupete tachado — sin chupete ni mamadera
  // chupete tachado — sin chupete ni mamadera
  "🚫": (
    <>
      <circle cx="12" cy="6" r="3.6" fill={W} stroke={O} strokeWidth={sw} />
      <rect x="10.4" y="8.6" width="3.2" height="3" rx="1.2" fill={C} stroke={O} strokeWidth="1.4" />
      <ellipse cx="12" cy="14.6" rx="7.2" ry="4.6" fill={C} stroke={O} strokeWidth={sw} />
      <ellipse cx="12" cy="18.4" rx="2.6" ry="2.6" fill={S} stroke={O} strokeWidth="1.4" />
      <path d="M3.4 20.6L20.6 3.4" stroke={R} strokeWidth="2.8" strokeLinecap="round" />
    </>
  ),

  // ── Vínculo ───────────────────────────────────────────────────
  // mamá con bebé — piel con piel
  "🤱": (
    <>
      <path d="M2.8 21c0-5.6 2.3-8.6 5.7-8.6S14.2 15.4 14.2 21z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="8.5" cy="7.4" r="3.6" fill={S} stroke={O} strokeWidth={sw} />
      <path d="M5 7.2a3.6 3.6 0 0 1 7-.6c-1-.4-1.8-1-2.2-1.8-1 1.2-2.7 2-4.8 2.4z" fill={O} />
      <path d="M13.6 15.8c.9-1.6 3.4-2 5-1 1.6 1 1.4 3.6-.5 4.3-2 .8-5.2.2-4.5-3.3z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="18.2" cy="13.2" r="2.5" fill={S} stroke={O} strokeWidth={sw} />
    </>
  ),
  // hablar — hablale y miralo
  "🗣️": (
    <>
      <circle cx="9.5" cy="12" r="5.6" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="8" cy="11" r="1" fill={O} />
      <path d="M7.4 14.4c1.2 1.2 3 1.2 4.2 0" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M16.4 8.6a5 5 0 0 1 0 6.8M19.4 6.2a8.6 8.6 0 0 1 0 11.6" stroke={A} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </>
  ),
  // dos corazones — se construye cuidando
  "💞": (
    <>
      <path d="M8 12.2c-1.6-2-4.7-.8-4.7 1.6 0 2.5 4.7 5.4 4.7 5.4s4.7-2.9 4.7-5.4c0-2.4-3.1-3.6-4.7-1.6z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M16.4 4.4c-1.2-1.5-3.6-.6-3.6 1.2 0 1.9 3.6 4.1 3.6 4.1S20 7.5 20 5.6c0-1.8-2.4-2.7-3.6-1.2z" fill={R} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
    </>
  ),

  // ── Eliminación ───────────────────────────────────────────────
  // gotitas — orina
  "💦": (
    <>
      <path d="M8 3.5c2.6 3.4 4 5.3 4 7.1a4 4 0 0 1-8 0c0-1.8 1.4-3.7 4-7.1z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M17 9.5c1.9 2.5 2.9 3.8 2.9 5.1a2.9 2.9 0 0 1-5.8 0c0-1.3 1-2.6 2.9-5.1z" fill={L} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M9.5 15.5c1.4 1.9 2.2 2.9 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-1 .8-2 2.2-3.9z" fill={L} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
    </>
  ),
  // pañal — meconio
  "💩": (
    <>
      <path d="M3.5 6h17v3.5c0 5.6-3.4 9.3-8.5 11.1C6.9 18.8 3.5 15.1 3.5 9.5z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M3.5 6h17v3.4h-17z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M9 13.4c1.8 1.6 4.2 1.6 6 0" stroke={C} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ),

  // ── Acompañar a mamá ──────────────────────────────────────────
  // familia — red de apoyo
  "👨‍👩‍👧": (
    <>
      <circle cx="6.6" cy="7.4" r="3.1" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="17.4" cy="7.4" r="3.1" fill={C} stroke={O} strokeWidth={sw} />
      <path d="M1.8 19.4c0-3.5 2.1-5.5 4.8-5.5s4.8 2 4.8 5.5zM12.6 19.4c0-3.5 2.1-5.5 4.8-5.5s4.8 2 4.8 5.5z" fill={L} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="12" cy="13.4" r="2.4" fill={S} stroke={O} strokeWidth={sw} />
      <path d="M8.4 21c0-2.6 1.6-4.1 3.6-4.1s3.6 1.5 3.6 4.1z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
    </>
  ),
  // reloj de arena — rutinas y horarios
  "⏳": (
    <>
      <path d="M5.5 3h13M5.5 21h13" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 3.4h10c0 4-4 5.6-4 8.6s4 4.6 4 8.6H7c0-4 4-5.6 4-8.6S7 7.4 7 3.4z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M8.6 18.9c.5-2 2.2-3 3.4-3s2.9 1 3.4 3z" fill={C} />
      <path d="M9.6 5.1h4.8c-.3 1.5-1.3 2.4-2.4 3.2-1.1-.8-2.1-1.7-2.4-3.2z" fill={C} />
    </>
  ),
  // pluma — despacio y con calma
  "🕊️": (
    <>
      <path d="M19.5 3.4c-6 .4-11.6 3.4-13.3 9.2-.6 2-.4 3.7.2 5.1 3.9-1 8-2.6 10.2-6.1 1.7-2.7 2.6-5.4 2.9-8.2z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M17.6 5.6C13 8.6 8.5 13 4.6 20.6" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </>
  ),

  // ── Vestimenta y temperatura ──────────────────────────────────
  // remerita — de algodón
  "👕": (
    <>
      <path d="M8.4 4.2l1.4-1.1h4.4l1.4 1.1 4.4 2.1-1.8 4.2-2.6-1.1v10.4a1.5 1.5 0 0 1-1.5 1.5H9.9a1.5 1.5 0 0 1-1.5-1.5V9.4l-2.6 1.1L4 6.3z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M9.8 3.1c.7 1.4 3.7 1.4 4.4 0" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </>
  ),
  // termómetro — temperatura / fiebre
  "🌡️": (
    <>
      <rect x="8.2" y="2.4" width="5.4" height="13.4" rx="2.7" fill={W} stroke={O} strokeWidth={sw} />
      <circle cx="10.9" cy="18.4" r="3.4" fill={R} stroke={O} strokeWidth={sw} />
      <rect x="9.6" y="8" width="2.6" height="10.4" rx="1.3" fill={R} />
      <path d="M15 5h2.6M15 8h2.6M15 11h2.6" stroke={O} strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  // aire — ambiente aireado
  "🌬️": (
    <>
      <path d="M2.8 8h9.4a2.6 2.6 0 1 0-2.6-2.9" stroke={A} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M2.8 12.4h13a2.8 2.8 0 1 1-2.8 3" stroke={O} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M4.6 16.8h6.2a2.3 2.3 0 1 1-2.3 2.4" stroke={C} strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),

  // ── Baño, uñas y cordón ───────────────────────────────────────
  // bañera — baño
  "🛁": (
    <>
      <circle cx="6.6" cy="4.6" r="1.5" fill={L} stroke={O} strokeWidth="1.1" />
      <circle cx="10.4" cy="2.8" r="1" fill={L} stroke={O} strokeWidth="1.1" />
      <path d="M2.4 11.6h19.2v2.2c0 3.2-2.4 5.4-5.6 5.4H8c-3.2 0-5.6-2.2-5.6-5.4z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M1.8 11.6h20.4" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 14.6c1.6-1 2.7.9 4.3 0s2.7.9 4.3 0 2.7.9 4.3 0" stroke={C} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M5.6 19.2L4.2 21.6M18.4 19.2l1.4 2.4" stroke={O} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15.6 9.6V6.2a2.4 2.4 0 0 1 2.4-2.4h2.6" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </>
  ),
  // mano con lima — uñas
  "💅": (
    <>
      <path d="M3.4 15.2c0-1.3 1.4-2 2.4-1.3l2.4 1.6V9.8a1.6 1.6 0 0 1 3.2 0v3.9h.6V8.2a1.6 1.6 0 0 1 3.2 0v5.5h.6v-3.9a1.6 1.6 0 0 1 3.2 0v7.4c0 3.2-2.6 5.5-6 5.5-2.6 0-4.3-1-5.8-3z" fill={S} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <rect x="15.6" y="1.6" width="2.6" height="8.4" rx="1.3" transform="rotate(24 16.9 5.8)" fill={C} stroke={O} strokeWidth="1.3" />
    </>
  ),
  // gasa — cordón / ombligo
  "🩹": (
    <>
      <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-22 12 12)" fill={C} stroke={O} strokeWidth={sw} />
      <rect x="8.4" y="8.2" width="7.2" height="7.6" rx="1.6" transform="rotate(-22 12 12)" fill={W} stroke={O} strokeWidth="1.3" />
      <circle cx="10.8" cy="11" r=".8" fill={A} />
      <circle cx="13.4" cy="13" r=".8" fill={A} />
    </>
  ),

  // ── El llanto ─────────────────────────────────────────────────
  // abrazo — consolá siempre
  "🫂": (
    <>
      <circle cx="8" cy="6.4" r="3.2" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="16" cy="6.4" r="3.2" fill={S} stroke={O} strokeWidth={sw} />
      <path d="M2.6 20.6c0-4.2 2.4-6.6 5.4-6.6s5.4 2.4 5.4 6.6z" fill={L} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M10.6 20.6c0-4.2 2.4-6.6 5.4-6.6s5.4 2.4 5.4 6.6z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M13.4 12.6c-1-1.2-2.9-.5-2.9 1 0 1.5 2.9 3.3 2.9 3.3s2.9-1.8 2.9-3.3c0-1.5-1.9-2.2-2.9-1z" fill={R} stroke={O} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  ),
  // lupa — revisá qué necesita
  "🔎": (
    <>
      <circle cx="10.4" cy="10.4" r="6.6" fill={L} stroke={O} strokeWidth={sw} />
      <path d="M7.4 8.6a4.6 4.6 0 0 1 3.6-2.4" stroke={W} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M15.4 15.4l5 5" stroke={O} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  // teléfono — si no cede, consultá
  "☎️": (
    <path
      d="M7.2 3.4c.8 0 1.4.5 1.7 1.2l1 2.4c.3.7.1 1.5-.5 2l-1 .8c.9 1.9 2.4 3.4 4.3 4.3l.8-1c.5-.6 1.3-.8 2-.5l2.4 1c.7.3 1.2.9 1.2 1.7v2.2c0 1.2-1 2.2-2.2 2C9.3 18.7 5.3 14.7 4.4 5.6c-.2-1.2.8-2.2 2-2.2z"
      fill={C}
      stroke={O}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  ),

  // ── Sueño seguro ──────────────────────────────────────────────
  // cama — boca arriba
  "🛏️": (
    <>
      <path d="M2.4 7.4v10M21.6 12v5.4" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2.4 12.4h19.2v5H2.4z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <rect x="4.4" y="8.4" width="6.4" height="4" rx="1.6" fill={C} stroke={O} strokeWidth={sw} />
      <path d="M3.4 17.4v3M20.6 17.4v3" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  // osito — cuna despejada (sin peluches)
  "🧸": (
    <>
      <circle cx="6.2" cy="6.6" r="2.8" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="17.8" cy="6.6" r="2.8" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="12" cy="13" r="8" fill={L} stroke={O} strokeWidth={sw} />
      <ellipse cx="12" cy="15" rx="3.6" ry="3" fill={W} stroke={O} strokeWidth="1.3" />
      <circle cx="9.4" cy="11" r="1.1" fill={O} />
      <circle cx="14.6" cy="11" r="1.1" fill={O} />
      <ellipse cx="12" cy="14.2" rx="1.3" ry="1" fill={O} />
    </>
  ),
  // cuna — su cuna, al lado
  "🛌": (
    <>
      <path d="M3.4 10.4v9M20.6 10.4v9" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="2.6" y="8.4" width="18.8" height="2.6" rx="1.3" fill={C} stroke={O} strokeWidth={sw} />
      <path d="M7 11v5M10.4 11v5M13.6 11v5M17 11v5" stroke={O} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M2.2 15.6h19.6v2.6a2 2 0 0 1-2 2H4.2a2 2 0 0 1-2-2z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M17.4 3.4a3 3 0 1 0 1.8 4.8 3 3 0 0 1-1.8-4.8z" fill={C} stroke={O} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  ),
  // luz baja y silencio — menos estímulos
  // luz baja y silencio — menos estímulos (luna + zzz)
  "🤫": (
    <>
      <path
        d="M14.6 2.6a9.4 9.4 0 1 0 6.6 12.6A9.6 9.6 0 0 1 14.6 2.6z"
        fill={C}
        stroke={O}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M14.8 3.6h4.6l-4.6 4.6h4.6" stroke={A} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),

  // ── Control del bebé sano ─────────────────────────────────────
  // calendario — primer control
  "📅": (
    <>
      <rect x="3.2" y="5" width="17.6" height="16" rx="2.6" fill={W} stroke={O} strokeWidth={sw} />
      <path d="M3.2 9.6h17.6" stroke={O} strokeWidth={sw} />
      <path d="M3.2 7.6a2.6 2.6 0 0 1 2.6-2.6h12.4a2.6 2.6 0 0 1 2.6 2.6v2H3.2z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M7.6 2.4v4M16.4 2.4v4" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 13.4c-1.1-1.4-3.2-.6-3.2 1.1 0 1.8 3.2 3.8 3.2 3.8s3.2-2 3.2-3.8c0-1.7-2.1-2.5-3.2-1.1z" fill={R} stroke={O} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  ),

  // ── Signos de alarma ──────────────────────────────────────────
  // pecho rechazado — no quiere comer
  "🍽️": (
    <>
      <rect x="9.6" y="4" width="4.8" height="9.4" rx="2.4" fill={W} stroke={O} strokeWidth={sw} />
      <path d="M9.6 8h4.8" stroke={O} strokeWidth="1.3" />
      <path d="M8.6 13.4h6.8v3.4a3.4 3.4 0 0 1-3.4 3.4 3.4 3.4 0 0 1-3.4-3.4z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M11.2 1.8h1.6v2.2h-1.6z" fill={C} stroke={O} strokeWidth="1.2" />
      <path d="M3.6 20.4L20.4 3.6" stroke={R} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  // carita con náusea — vómitos
  "🤮": (
    <>
      <circle cx="12" cy="10.6" r="7.6" fill={C} stroke={O} strokeWidth={sw} />
      <path d="M7.6 8.6c1-1.2 2.6-1.2 3.6 0M13.4 8.6c1-1.2 2.6-1.2 3.6 0" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M9.4 13.8h5.2" stroke={O} strokeWidth={sw} strokeLinecap="round" />
      <path d="M10 15c-.6 2-.4 4 .6 6M13.4 15c-.4 1.8-.2 3.8.8 5.4" stroke={A} strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  // gota — orina poco
  "💧": (
    <>
      <path d="M12 2.6c4 5.2 6.2 8 6.2 10.8a6.2 6.2 0 0 1-12.4 0C5.8 10.6 8 7.8 12 2.6z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M9 14.4a3 3 0 0 0 3 3" stroke={W} strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  // bebé flácido — muy blandito
  "🥴": (
    <>
      <circle cx="12" cy="9.4" r="6.6" fill={S} stroke={O} strokeWidth={sw} />
      <path d="M8.6 8.2c.9-1 2.3-1 3.2 0M13.4 9.6c.9-1 2.3-1 3.2 0" stroke={O} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M9.6 12.6c1.2.8 2.6.4 3.8-.2" stroke={O} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M12 16c-2.6.4-4.4 2-5.2 4.6M12 16c2.6.4 4.4 2 5.2 4.6" stroke={C} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </>
  ),
  // ojo — ojos u ombligo
  "👁️": (
    <>
      <path d="M1.8 12c2.8-4.4 6.2-6.6 10.2-6.6S19.4 7.6 22.2 12c-2.8 4.4-6.2 6.6-10.2 6.6S4.6 16.4 1.8 12z" fill={W} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3.8" fill={C} stroke={O} strokeWidth={sw} />
      <circle cx="12" cy="12" r="1.5" fill={O} />
    </>
  ),
  // carita con lágrima — llanto que no cede
  "😢": (
    <>
      <circle cx="12" cy="11.4" r="7.8" fill={S} stroke={O} strokeWidth={sw} />
      <path d="M7.6 9.4c1-1.2 2.6-1.2 3.6 0M13.4 9.4c1-1.2 2.6-1.2 3.6 0" stroke={O} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <ellipse cx="12" cy="15.4" rx="2.4" ry="2" fill={R} stroke={O} strokeWidth="1.2" />
      <path d="M7.4 12.4c-1.4 2.2-1.4 4.2 0 4.2s1.4-2 0-4.2z" fill={C} stroke={O} strokeWidth="1.1" />
    </>
  ),
  // pulmones — le cuesta respirar
  "🫁": (
    <>
      <path d="M12 2.6v8" stroke={O} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10.6c-1.6-1.4-3.2-1.4-4.4 0" stroke={O} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M12 10.6c1.6-1.4 3.2-1.4 4.4 0" stroke={O} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M7.6 10.6c1.4 0 2.2 1.2 2.2 2.8v6.4c0 1.2-1 2-2.2 1.8-2.6-.4-4.4-2.8-4.4-6 0-2.8 1.4-5 4.4-5z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M16.4 10.6c-1.4 0-2.2 1.2-2.2 2.8v6.4c0 1.2 1 2 2.2 1.8 2.6-.4 4.4-2.8 4.4-6 0-2.8-1.4-5-4.4-5z" fill={C} stroke={O} strokeWidth={sw} strokeLinejoin="round" />
    </>
  ),
  // labios azulados — cianosis
  "💙": (
    <>
      <path
        d="M2.8 11.8c2.6-3.4 5.6-5 9.2-5s6.6 1.6 9.2 5c-2.6 4.2-5.6 6.2-9.2 6.2s-6.6-2-9.2-6.2z"
        fill={A}
        stroke={O}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M2.8 11.8h18.4" stroke={O} strokeWidth={sw} />
    </>
  ),
};

export default function PuntoIcono({ icon, className }: Props) {
  const contenido = ICONOS[icon];
  if (!contenido) {
    // Fallback: si aparece un emoji nuevo en content.ts, se muestra tal cual.
    return <span className={className}>{icon}</span>;
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {contenido}
    </svg>
  );
}
