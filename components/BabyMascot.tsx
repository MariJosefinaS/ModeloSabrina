// Mascota bebé tierna, hecha 100% en SVG con animaciones CSS:
// flota (bob), parpadea (blink) y saluda con la manito (wave).
// Sin JS: funciona igual en el servidor.

export default function BabyMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 300"
      className={className}
      role="img"
      aria-label="Un bebé sonriente saludando con la mano"
    >
      <defs>
        <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9DB0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF9DB0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="onesie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A9DBF0" />
          <stop offset="100%" stopColor="#7FC3E4" />
        </linearGradient>
      </defs>

      {/* halo suave */}
      <circle cx="130" cy="150" r="120" fill="#FFF3D6" opacity="0.6" />

      <g className="anim-bob" style={{ transformOrigin: "center" }}>
        {/* ── piernas y piecitos ── */}
        <g>
          <path d="M104 250c0 16-4 26-6 30" stroke="#F3C09B" strokeWidth="20" strokeLinecap="round" fill="none" />
          <path d="M156 250c0 16 4 26 6 30" stroke="#F3C09B" strokeWidth="20" strokeLinecap="round" fill="none" />
          <ellipse cx="96" cy="284" rx="15" ry="11" fill="#FFD9B8" />
          <ellipse cx="164" cy="284" rx="15" ry="11" fill="#FFD9B8" />
        </g>

        {/* ── cuerpo / enterito ── */}
        <path
          d="M78 214c0-34 24-52 52-52s52 18 52 52c0 30-16 52-52 52s-52-22-52-52z"
          fill="url(#onesie)"
        />
        {/* broches del enterito */}
        <circle cx="130" cy="205" r="4" fill="#fff" opacity="0.9" />
        <circle cx="130" cy="228" r="4" fill="#fff" opacity="0.9" />
        {/* bolsillito con corazón */}
        <path d="M130 246c-8-7-16-2-16 4 0 6 10 12 16 16 6-4 16-10 16-16 0-6-8-11-16-4z" fill="#fff" opacity="0.85" />

        {/* ── brazo izquierdo (en reposo) ── */}
        <path d="M86 196c-14 4-24 14-28 26" stroke="#F3C09B" strokeWidth="20" strokeLinecap="round" fill="none" />
        <circle cx="55" cy="226" r="13" fill="#FFD9B8" />

        {/* ── brazo derecho (saluda) ── */}
        <g className="anim-wave" style={{ transformBox: "fill-box", transformOrigin: "40% 90%" }}>
          <path d="M176 194c18-6 30-24 34-46" stroke="#F3C09B" strokeWidth="20" strokeLinecap="round" fill="none" />
          <circle cx="214" cy="142" r="15" fill="#FFD9B8" />
          {/* deditos */}
          <circle cx="207" cy="129" r="4" fill="#FFD9B8" />
          <circle cx="216" cy="126" r="4" fill="#FFD9B8" />
          <circle cx="224" cy="130" r="4" fill="#FFD9B8" />
        </g>

        {/* ── cabeza ── */}
        <circle cx="130" cy="118" r="72" fill="#FFD9B8" />
        {/* orejitas */}
        <circle cx="60" cy="122" r="14" fill="#FFD9B8" />
        <circle cx="200" cy="122" r="14" fill="#FFD9B8" />
        {/* rulito */}
        <path
          d="M130 50c-4-14 16-18 18-6 10-4 20 8 10 16"
          fill="none"
          stroke="#6B4F4F"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* cachetitos */}
        <circle cx="92" cy="140" r="20" fill="url(#cheek)" />
        <circle cx="168" cy="140" r="20" fill="url(#cheek)" />

        {/* ojitos (parpadean) */}
        <g className="anim-blink" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx="106" cy="118" r="9" fill="#4A3B3B" />
          <circle cx="154" cy="118" r="9" fill="#4A3B3B" />
          <circle cx="109" cy="114" r="3" fill="#fff" />
          <circle cx="157" cy="114" r="3" fill="#fff" />
        </g>

        {/* naricita y sonrisa */}
        <ellipse cx="130" cy="138" rx="4" ry="3" fill="#F3B58F" />
        <path d="M112 152c8 10 26 10 36 0" fill="none" stroke="#B5556B" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* estrellitas que titilan alrededor */}
      <g fill="#FFC94D">
        <path className="anim-twinkle" style={{ animationDelay: "0s" }} d="M34 70l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <path className="anim-twinkle" style={{ animationDelay: "1.1s" }} d="M232 74l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path className="anim-twinkle" style={{ animationDelay: "0.6s" }} d="M40 210l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
      </g>
    </svg>
  );
}
