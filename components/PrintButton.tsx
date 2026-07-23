"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="focus-cute rounded-full bg-marca px-6 py-3 font-display text-lg text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110"
    >
      🖨️ Imprimir / Guardar PDF
    </button>
  );
}
