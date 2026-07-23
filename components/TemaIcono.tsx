// Ilustraciones (íconos dibujados) para cada tema, en la paleta
// institucional azul/celeste. Se usan en el tríptico y en la web,
// reemplazando los emojis por dibujos consistentes.

const D = "#0056A2"; // azul institucional
const C = "#8ECAE6"; // celeste
const L = "#BFE3FF"; // celeste claro

type Props = { id: string; className?: string };

const ICONOS: Record<string, React.ReactNode> = {
  // Alimentación — mamadera
  alimentacion: (
    <>
      <rect x="20" y="6" width="8" height="5" rx="2.5" fill={C} stroke={D} strokeWidth="1.6" />
      <rect x="18" y="11" width="12" height="4" rx="1.5" fill={L} stroke={D} strokeWidth="1.6" />
      <rect x="17" y="15" width="14" height="26" rx="6" fill="#fff" stroke={D} strokeWidth="1.8" />
      <path d="M17.6 27h12.8v8a5.6 5.6 0 0 1-5.6 5.6h-1.6A5.6 5.6 0 0 1 17.6 35z" fill={C} />
      <path d="M20 19h4M20 22.5h3" stroke={D} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 30.6c-1.5-1.5-3.3-.3-3.3 1.1 0 1.5 3.3 3.3 3.3 3.3s3.3-1.8 3.3-3.3c0-1.4-1.8-2.6-3.3-1.1z" fill="#fff" />
    </>
  ),
  // Vínculo y apego — corazones
  vinculo: (
    <>
      <path d="M24 15c-2.4-2.7-6.6-1.1-6.6 2.2 0 3.5 6.6 7.6 6.6 7.6s6.6-4.1 6.6-7.6c0-3.3-4.2-4.9-6.6-2.2z" fill={C} stroke={D} strokeWidth="1.8" />
      <path d="M24 19.4c-1-1.1-2.7-.4-2.7 1 0 1.4 2.7 3 2.7 3s2.7-1.6 2.7-3c0-1.4-1.7-2.1-2.7-1z" fill="#fff" />
      <path d="M13 30c2.6 3.4 6.7 5.4 11 5.4S32.4 33.4 35 30" stroke={D} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="12.5" cy="28" r="1.4" fill={D} />
      <circle cx="35.5" cy="28" r="1.4" fill={D} />
    </>
  ),
  // Eliminación — gota
  eliminacion: (
    <>
      <path d="M24 8c5 7 9 11 9 16a9 9 0 0 1-18 0c0-5 4-9 9-16z" fill={C} stroke={D} strokeWidth="1.8" />
      <path d="M20 26.5a4 4 0 0 0 4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </>
  ),
  // Acompañar a mamá — dos cabecitas + corazón
  "acompanar-mama": (
    <>
      <path d="M25 8.5c-1.3-1.4-3.4-.6-3.4 1 0 1.7 3.4 3.6 3.4 3.6s3.4-1.9 3.4-3.6c0-1.6-2.1-2.4-3.4-1z" fill={D} />
      <circle cx="20" cy="22" r="7" fill={L} stroke={D} strokeWidth="1.8" />
      <circle cx="31" cy="28" r="5" fill={C} stroke={D} strokeWidth="1.8" />
      <path d="M11 39c.6-4.4 4-7 9-7M25 39c.5-3.4 3-5 6-5" stroke={D} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ),
  // Vestimenta — bodysuit
  vestimenta: (
    <>
      <path d="M19 12l2-1.5h6l2 1.5 6 3-2.4 5.5-3.6-1.4V33a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V19.1l-3.6 1.4L11 15z" fill={L} stroke={D} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M21 11c.8 1.8 5.2 1.8 6 0" stroke={D} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="30" r="1.2" fill={D} />
      <circle cx="24" cy="26" r="1.2" fill={D} />
    </>
  ),
  // Baño y cordón — bañera
  "bano-cordon": (
    <>
      <circle cx="20" cy="15" r="2" fill={L} stroke={D} strokeWidth="1.4" />
      <circle cx="26" cy="11" r="2.6" fill={L} stroke={D} strokeWidth="1.4" />
      <circle cx="30" cy="17" r="1.7" fill={L} stroke={D} strokeWidth="1.4" />
      <path d="M32 26v-3.5a3.5 3.5 0 0 0-3.5-3.5" stroke={D} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M9 26h30" stroke={D} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 26.5h26V29a7 7 0 0 1-7 7H18a7 7 0 0 1-7-7z" fill={C} stroke={D} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 36.5l-1.5 3M33 36.5l1.5 3" stroke={D} strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  // El llanto — carita con lágrima
  llanto: (
    <>
      <circle cx="24" cy="24" r="12" fill={L} stroke={D} strokeWidth="1.8" />
      <path d="M18 22.5c1-1.6 3-1.6 4 0M26 22.5c1-1.6 3-1.6 4 0" stroke={D} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="24" cy="30" rx="3" ry="2.6" fill={D} />
      <path d="M17.5 26c-1.6 2.2-1.6 4.4 0 4.4s1.6-2.2 0-4.4z" fill={C} stroke={D} strokeWidth="1.3" />
      <path d="M22 12.5c1-2 4-2 3.4 1" stroke={D} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  // Sueño seguro — luna y estrellas
  sueno: (
    <>
      <path d="M31 12a12 12 0 1 0 5.5 16.5A9.2 9.2 0 0 1 31 12z" fill={C} stroke={D} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 13l1.1 2.3 2.4 1-2.4 1L14 20.6l-1.1-2.3-2.4-1 2.4-1z" fill={D} />
      <path d="M34.5 31l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z" fill={D} />
    </>
  ),
  // Control del bebé sano — calendario con check
  control: (
    <>
      <rect x="11" y="14" width="26" height="23" rx="3" fill="#fff" stroke={D} strokeWidth="1.8" />
      <path d="M11 20.5h26" stroke={D} strokeWidth="1.6" />
      <rect x="11" y="14" width="26" height="6.5" rx="3" fill={L} stroke={D} strokeWidth="1.8" />
      <path d="M17 11v5M31 11v5" stroke={D} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 28.5l4 4 8-8" stroke={C} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18 28.5l4 4 8-8" stroke={D} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Signos de alarma — triángulo
  alarma: (
    <>
      <path d="M24 9.5l14.5 26a2 2 0 0 1-1.8 3H11.3a2 2 0 0 1-1.8-3z" fill={C} stroke={D} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M24 20v8" stroke={D} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="32.5" r="1.7" fill={D} />
    </>
  ),
};

export default function TemaIcono({ id, className }: Props) {
  const contenido = ICONOS[id];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {contenido ?? <circle cx="24" cy="24" r="10" fill={C} stroke={D} strokeWidth="1.8" />}
    </svg>
  );
}
