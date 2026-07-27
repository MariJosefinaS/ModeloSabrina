"use client";

import { useEffect, useState } from "react";

// Interruptor sol/luna. Por defecto la página sigue al navegador; si la mamá
// toca el botón, su elección manda y queda guardada. El estado inicial lo
// aplica el script de app/layout.tsx antes de pintar (sin parpadeo); acá sólo
// se lee lo que ese script ya dejó puesto en el <html>.
export default function TemaSwitch({ className = "" }: { className?: string }) {
  const [oscuro, setOscuro] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setOscuro(document.documentElement.classList.contains("dark"));
    setListo(true);
  }, []);

  function alternar() {
    const proximo = !oscuro;
    setOscuro(proximo);
    document.documentElement.classList.toggle("dark", proximo);
    try {
      localStorage.setItem("tema", proximo ? "oscuro" : "claro");
    } catch {
      // Modo incógnito o storage bloqueado: el cambio vale para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={oscuro}
      aria-label={oscuro ? "Usar tema claro" : "Usar tema oscuro"}
      title={oscuro ? "Tema claro" : "Tema oscuro"}
      className={`focus-cute grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80 text-lg shadow-soft ring-1 ring-sky/40 transition hover:-translate-y-0.5 dark:bg-panelAlt dark:ring-borde ${className}`}
    >
      {/* Hasta que monte, se muestra la luna: así el botón no salta de ícono. */}
      <span className={listo ? "" : "opacity-0"}>{oscuro ? "☀️" : "🌙"}</span>
    </button>
  );
}
