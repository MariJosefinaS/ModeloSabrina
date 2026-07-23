// Fondo animado y juguetón (menos formal): aurora de color que respira,
// nubes que cruzan, globos que suben, burbujas e íconos de bebé flotando.
// Todo pointer-events-none y detrás del contenido. Respeta reduce-motion.

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      <g fill="#ffffff">
        <circle cx="34" cy="38" r="20" />
        <circle cx="60" cy="30" r="26" />
        <circle cx="88" cy="40" r="18" />
        <rect x="30" y="40" width="62" height="18" rx="9" />
      </g>
    </svg>
  );
}

function Balloon({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <ellipse cx="30" cy="30" rx="24" ry="28" fill={color} />
      <ellipse cx="22" cy="20" rx="7" ry="9" fill="#ffffff" opacity="0.35" />
      <path d="M30 58l-4 6h8z" fill={color} />
      <path d="M30 64c6 8-6 14 0 22" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

const ICONOS = [
  { e: "⭐", top: "16%", left: "12%", d: "0s", s: "text-2xl" },
  { e: "🌙", top: "24%", left: "83%", d: "1.2s", s: "text-3xl" },
  { e: "☁️", top: "52%", left: "6%", d: "0.6s", s: "text-3xl" },
  { e: "💙", top: "40%", left: "90%", d: "1.8s", s: "text-2xl" },
  { e: "🧸", top: "70%", left: "16%", d: "0.9s", s: "text-3xl" },
  { e: "🍼", top: "78%", left: "80%", d: "1.5s", s: "text-2xl" },
  { e: "🫧", top: "60%", left: "48%", d: "0.3s", s: "text-3xl" },
];

const BALLOONS = [
  { left: "10%", color: "#8ECAE6", dur: "30s", delay: "0s", w: "w-10" },
  { left: "38%", color: "#3E86C6", dur: "38s", delay: "-14s", w: "w-12" },
  { left: "68%", color: "#BFE3FF", dur: "34s", delay: "-6s", w: "w-9" },
  { left: "88%", color: "#5FA8D3", dur: "42s", delay: "-22s", w: "w-11" },
];

const DOTS = [
  { top: "14%", left: "20%", d: "0s", c: "#8ECAE6" },
  { top: "30%", left: "72%", d: "0.8s", c: "#3E86C6" },
  { top: "48%", left: "10%", d: "1.4s", c: "#BFE3FF" },
  { top: "64%", left: "86%", d: "0.4s", c: "#5FA8D3" },
  { top: "80%", left: "30%", d: "1.8s", c: "#0056A2" },
  { top: "88%", left: "60%", d: "1.1s", c: "#8ECAE6" },
];

export default function Decor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Aurora: blobs de color que respiran */}
      <div className="anim-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-skysoft/60 blur-3xl" style={{ animationDelay: "0s" }} />
      <div className="anim-blob absolute -right-24 top-10 h-96 w-96 rounded-full bg-sky/35 blur-3xl" style={{ animationDelay: "-7s" }} />
      <div className="anim-blob absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#E4F2FF]/70 blur-3xl" style={{ animationDelay: "-13s" }} />

      {/* Nubes que cruzan */}
      <div className="anim-drift absolute top-[8%] opacity-80" style={{ animationDuration: "48s" }}>
        <Cloud className="w-28" />
      </div>
      <div className="anim-drift absolute top-[30%] opacity-70" style={{ animationDuration: "72s", animationDelay: "-20s" }}>
        <Cloud className="w-40" />
      </div>
      <div className="anim-drift absolute top-[66%] opacity-60" style={{ animationDuration: "90s", animationDelay: "-45s" }}>
        <Cloud className="w-24" />
      </div>

      {/* Globos que suben */}
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="anim-float-up absolute bottom-[-12%]"
          style={{ left: b.left, animationDuration: b.dur, animationDelay: b.delay }}
        >
          <Balloon color={b.color} className={b.w} />
        </div>
      ))}

      {/* Íconos de bebé flotando (bob + sway) */}
      {ICONOS.map((it, i) => (
        <span key={i} className="anim-sway absolute" style={{ top: it.top, left: it.left, animationDelay: it.d }}>
          <span className={`anim-bob block opacity-70 ${it.s}`}>{it.e}</span>
        </span>
      ))}

      {/* Puntitos que titilan */}
      {DOTS.map((s, i) => (
        <span
          key={`d${i}`}
          className="anim-twinkle absolute block h-2.5 w-2.5 rounded-full"
          style={{ top: s.top, left: s.left, background: s.c, animationDelay: s.d }}
        />
      ))}
    </div>
  );
}
