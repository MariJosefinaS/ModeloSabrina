"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Consulta, temaEmoji, temaLabel } from "@/lib/types";

function fecha(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminCard({
  consulta,
  onSaved,
}: {
  consulta: Consulta;
  onSaved: (c: Consulta) => void;
}) {
  const [texto, setTexto] = useState(consulta.respuesta ?? "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function guardar() {
    setError(null);
    setGuardando(true);
    try {
      const res = await fetch(`/api/consultas/${consulta.id}/respuesta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuesta: texto }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo guardar");
      } else {
        onSaved(data.consulta);
      }
    } catch {
      setError("Problema de conexión");
    } finally {
      setGuardando(false);
    }
  }

  const respondida = Boolean(consulta.respuesta);

  return (
    <li className="rounded-[1.5rem] bg-white/90 p-5 shadow-soft ring-1 ring-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender/50 text-xl">
            {temaEmoji(consulta.tema)}
          </span>
          <div>
            <p className="font-display text-lg leading-tight text-cocoa">{consulta.nombre}</p>
            <p className="text-xs font-semibold text-grape/70">
              {temaLabel(consulta.tema)} · {fecha(consulta.created_at)}
            </p>
            {consulta.email && (
              <a
                href={`mailto:${consulta.email}`}
                className="text-xs text-grape underline"
              >
                {consulta.email}
              </a>
            )}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            respondida ? "bg-emerald-100 text-emerald-700" : "bg-sunshine/70 text-cocoa/70"
          }`}
        >
          {respondida ? "Respondida ✓" : "Pendiente"}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-cream p-3 text-cocoa/85">
        {consulta.mensaje}
      </p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        placeholder="Escribí la respuesta que verá la mamá en el foro…"
        className="focus-cute mt-3 w-full rounded-2xl border-0 bg-white px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5"
      />

      {error && (
        <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>
      )}

      <div className="mt-2 flex justify-end">
        <button
          onClick={guardar}
          disabled={guardando || texto.trim().length < 2}
          className="focus-cute rounded-full bg-grape px-5 py-2 font-bold text-white shadow-soft transition hover:brightness-110 disabled:opacity-50"
        >
          {guardando ? "Guardando…" : respondida ? "Actualizar respuesta" : "Publicar respuesta"}
        </button>
      </div>
    </li>
  );
}

export default function AdminClient({ initial }: { initial: Consulta[] }) {
  const router = useRouter();
  const [consultas, setConsultas] = useState<Consulta[]>(initial);
  const [soloPendientes, setSoloPendientes] = useState(false);

  const pendientes = useMemo(
    () => consultas.filter((c) => !c.respuesta).length,
    [consultas]
  );

  const visibles = useMemo(() => {
    const list = soloPendientes ? consultas.filter((c) => !c.respuesta) : consultas;
    // Pendientes primero, luego por fecha desc
    return [...list].sort((a, b) => {
      const ap = a.respuesta ? 1 : 0;
      const bp = b.respuesta ? 1 : 0;
      if (ap !== bp) return ap - bp;
      return a.created_at < b.created_at ? 1 : -1;
    });
  }, [consultas, soloPendientes]);

  function onSaved(updated: Consulta) {
    setConsultas((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  async function salir() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-cocoa">Panel de asesoras 🤱</h1>
          <p className="text-cocoa/70">
            {pendientes > 0
              ? `${pendientes} consulta${pendientes > 1 ? "s" : ""} sin responder`
              : "¡Todo respondido! 🎉"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoloPendientes((v) => !v)}
            className={`focus-cute rounded-full px-4 py-2 text-sm font-bold shadow-soft ring-2 transition ${
              soloPendientes ? "bg-grape text-white ring-grape" : "bg-white text-cocoa ring-white"
            }`}
          >
            {soloPendientes ? "Ver todas" : "Ver solo pendientes"}
          </button>
          <button
            onClick={salir}
            className="focus-cute rounded-full bg-white px-4 py-2 text-sm font-bold text-cocoa shadow-soft ring-2 ring-white"
          >
            Salir
          </button>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white/70 p-6 text-center text-cocoa/70 ring-1 ring-white">
          No hay consultas para mostrar.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visibles.map((c) => (
            <AdminCard key={c.id} consulta={c} onSaved={onSaved} />
          ))}
        </ul>
      )}
    </div>
  );
}
