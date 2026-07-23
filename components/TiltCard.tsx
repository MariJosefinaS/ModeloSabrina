"use client";

import { useRef, useState } from "react";

/**
 * Tarjeta con efecto 3D: se inclina siguiendo el cursor (rotateX/rotateY sobre
 * un plano con perspectiva) y muestra un brillo que sigue al mouse.
 * En touch o con "reduce motion" se queda quieta y linda igual.
 */
export default function TiltCard({
  children,
  className = "",
  max = 10,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, on: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotateY = (px - 0.5) * max * 2;
    const rotateX = -(py - 0.5) * max * 2;
    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
    });
    setGlowPos({ x: px * 100, y: py * 100, on: true });
  }

  function onLeave() {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
    setGlowPos((g) => ({ ...g, on: false }));
  }

  return (
    <div className={`perspective ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="preserve-3d relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={style}
      >
        {glow && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: glowPos.on ? 1 : 0,
              background: `radial-gradient(22rem 22rem at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.55), transparent 60%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
