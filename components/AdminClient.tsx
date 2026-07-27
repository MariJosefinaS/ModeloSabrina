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
  const [aviso, setAviso] = useState<string | null>(null);

  const privada = consulta.visibilidad === "privado";

  async function guardar() {
    setError(null);
    setAviso(null);
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
        // Que quede claro si el mail salió: en una consulta privada el mail
        // es la única forma en que la mamá se entera de la respuesta.
        setAviso(
          data.mailEnviado
            ? `Respuesta guardada y enviada por mail a ${consulta.email}.`
            : consulta.email
              ? "Respuesta guardada, pero el mail NO salió (revisá la configuración SMTP)."
              : "Respuesta guardada. No dejó email, así que no se envió nada."
        );
      }
    } catch {
      setError("Problema de conexión");
    } finally {
      setGuardando(false);
    }
  }

  const respondida = Boolean(consulta.respuesta);

  return (
    <li
      className={`rounded-[1.5rem] bg-white/90 p-5 shadow-soft ring-1 dark:bg-panel/90 ${
        privada
          ? "ring-marca/25 dark:ring-acento/30"
          : "ring-white dark:ring-borde/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-skysoft/60 text-xl dark:bg-noche/70">
            {temaEmoji(consulta.tema)}
          </span>
          <div>
            <p className="font-display text-lg leading-tight text-cocoa dark:text-tinta">
              {consulta.nombre}
            </p>
            <p className="text-xs font-semibold text-marca/70 dark:text-acento/80">
              {temaLabel(consulta.tema)} · {fecha(consulta.created_at)}
            </p>
            {consulta.email ? (
              <a
                href={`mailto:${consulta.email}`}
                className="text-xs text-marca underline dark:text-acento"
              >
                {consulta.email}
              </a>
            ) : (
              <span className="text-xs text-cocoa/50 dark:text-tinta2/70">
                sin email
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              privada
                ? "bg-marca/12 text-marca dark:bg-acento/15 dark:text-acento"
                : "bg-skysoft/70 text-cocoa/75 dark:bg-noche/70 dark:text-tinta2"
            }`}
          >
            {privada ? "🔒 Privada" : "💬 Pública"}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              respondida
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200"
                : "bg-sunshine/70 text-cocoa/70 dark:bg-panelAlt dark:text-tinta2"
            }`}
          >
            {respondida ? "Respondida ✓" : "Pendiente"}
          </span>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-cream p-3 text-cocoa/85 dark:bg-noche/60 dark:text-tinta2">
        {consulta.mensaje}
      </p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        placeholder={
          privada
            ? "Escribí la respuesta que le va a llegar por mail…"
            : "Escribí la respuesta que se va a publicar en el foro…"
        }
        className="focus-cute mt-3 w-full rounded-2xl border-0 bg-white px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5 dark:bg-noche dark:text-tinta dark:ring-borde/70"
      />

      <p className="mt-2 text-xs text-cocoa/60 dark:text-tinta2/80">
        {privada
          ? "🔒 No se publica: al guardar se le envía por mail únicamente a ella."
          : "💬 Se publica en el foro y además se le avisa por mail si dejó dirección."}
      </p>

      {error && (
        <p className="mt-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}
      {aviso && (
        <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          {aviso}
        </p>
      )}

      <div className="mt-2 flex justify-end">
        <button
          onClick={guardar}
          disabled={guardando || texto.trim().length < 2}
          className="focus-cute rounded-full bg-marca px-5 py-2 font-bold text-white shadow-soft transition hover:brightness-110 disabled:opacity-50 dark:bg-marcaSoft"
        >
          {guardando
            ? "Guardando…"
            : respondida
              ? "Actualizar y reenviar"
              : privada
                ? "Responder por mail"
                : "Publicar respuesta"}
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
          <h1 className="font-display text-3xl text-cocoa dark:text-tinta">
            Panel de asesoras 🤱
          </h1>
          <p className="text-cocoa/70 dark:text-tinta2">
            {pendientes > 0
              ? `${pendientes} consulta${pendientes > 1 ? "s" : ""} sin responder`
              : "¡Todo respondido! 🎉"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoloPendientes((v) => !v)}
            className={`focus-cute rounded-full px-4 py-2 text-sm font-bold shadow-soft ring-2 transition ${
              soloPendientes
                ? "bg-marca text-white ring-marca dark:bg-marcaSoft dark:ring-marcaSoft"
                : "bg-white text-cocoa ring-white dark:bg-panel dark:text-tinta dark:ring-borde"
            }`}
          >
            {soloPendientes ? "Ver todas" : "Ver solo pendientes"}
          </button>
          <button
            onClick={salir}
            className="focus-cute rounded-full bg-white px-4 py-2 text-sm font-bold text-cocoa shadow-soft ring-2 ring-white dark:bg-panel dark:text-tinta dark:ring-borde"
          >
            Salir
          </button>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white/70 p-6 text-center text-cocoa/70 ring-1 ring-white dark:bg-panel/60 dark:text-tinta2 dark:ring-borde/50">
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
