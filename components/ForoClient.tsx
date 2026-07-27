"use client";

import { useState } from "react";
import {
  Consulta,
  TEMAS,
  TemaConsulta,
  Visibilidad,
  temaEmoji,
  temaLabel,
} from "@/lib/types";

function fecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Las dos vías, explicadas con las palabras de la mamá y no del sistema.
const VIAS: {
  value: Visibilidad;
  emoji: string;
  titulo: string;
  detalle: string;
}[] = [
  {
    value: "publico",
    emoji: "💬",
    titulo: "Dejar un comentario público",
    detalle:
      "Tu pregunta y la respuesta quedan visibles acá, para que ayuden a otras mamás.",
  },
  {
    value: "privado",
    emoji: "🔒",
    titulo: "Hacer una consulta privada",
    detalle:
      "No se publica. Un profesional te responde por mail, sólo a vos.",
  },
];

const campo =
  "focus-cute mt-1 w-full rounded-2xl border-0 bg-cream px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5 placeholder:text-cocoa/40 dark:bg-noche dark:text-tinta dark:ring-borde/70 dark:placeholder:text-tinta2/50";
const etiqueta = "text-sm font-bold text-cocoa/80 dark:text-tinta2";

export default function ForoClient({ initial }: { initial: Consulta[] }) {
  const [consultas, setConsultas] = useState<Consulta[]>(initial);
  const [visibilidad, setVisibilidad] = useState<Visibilidad>("publico");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState<TemaConsulta>("vestir");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviada, setEnviada] = useState<Visibilidad | null>(null);

  const privada = visibilidad === "privado";

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviada(null);
    setEnviando(true);
    try {
      const res = await fetch("/api/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, tema, mensaje, visibilidad }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo enviar. Probá de nuevo.");
      } else {
        // Sólo lo público se suma al listado; lo privado no se muestra nunca.
        if (data.consulta?.visibilidad === "publico") {
          setConsultas((prev) => [data.consulta, ...prev]);
        }
        setMensaje("");
        setEmail("");
        setEnviada(visibilidad);
      }
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={enviar}
        className="rounded-[2rem] bg-white/85 p-6 shadow-soft ring-1 ring-white dark:bg-panel/85 dark:ring-borde/60"
      >
        <h2 className="font-display text-2xl text-cocoa dark:text-tinta">
          ✏️ Escribinos
        </h2>

        {/* ── Elección de vía: es lo primero, porque cambia todo lo demás ── */}
        <fieldset className="mt-4">
          <legend className={etiqueta}>¿Cómo querés hacerlo?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {VIAS.map((v) => {
              const activa = visibilidad === v.value;
              return (
                <button
                  type="button"
                  key={v.value}
                  onClick={() => setVisibilidad(v.value)}
                  aria-pressed={activa}
                  className={`focus-cute rounded-2xl p-4 text-left transition ${
                    activa
                      ? "bg-marca text-white shadow-soft ring-2 ring-marca dark:bg-marcaSoft dark:ring-marcaSoft"
                      : "bg-white text-cocoa ring-1 ring-sky/50 hover:-translate-y-0.5 dark:bg-noche/60 dark:text-tinta dark:ring-borde"
                  }`}
                >
                  <span className="flex items-center gap-2 font-display text-lg leading-tight">
                    <span aria-hidden>{v.emoji}</span>
                    {v.titulo}
                  </span>
                  <span
                    className={`mt-1 block text-sm leading-snug ${
                      activa ? "text-white/85" : "text-cocoa/65 dark:text-tinta2"
                    }`}
                  >
                    {v.detalle}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={etiqueta}>Tu nombre</span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={2}
              placeholder="Ej: Meli"
              className={campo}
            />
          </label>

          <label className="block">
            <span className={etiqueta}>
              Tu email{" "}
              <span className="font-semibold text-cocoa/55 dark:text-tinta2/70">
                {privada ? "(necesario para responderte)" : "(opcional)"}
              </span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={privada}
              placeholder={
                privada ? "Acá te llega la respuesta" : "Para avisarte cuando respondamos"
              }
              className={campo}
            />
          </label>
        </div>

        <div className="mt-4">
          <span className={etiqueta}>Tema</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TEMAS.map((t) => (
              <button
                type="button"
                key={t.value}
                onClick={() => setTema(t.value)}
                aria-pressed={tema === t.value}
                className={`focus-cute rounded-full px-4 py-2 text-sm font-bold shadow-soft transition ${
                  tema === t.value
                    ? "bg-marca text-white ring-2 ring-marca dark:bg-marcaSoft dark:ring-marcaSoft"
                    : "bg-white text-cocoa ring-1 ring-sky/50 hover:bg-skysoft/40 dark:bg-noche/60 dark:text-tinta dark:ring-borde"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-4 block">
          <span className={etiqueta}>
            {privada ? "Tu consulta" : "Tu comentario"}
          </span>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            minLength={5}
            rows={4}
            placeholder="Contanos qué te gustaría saber…"
            className={campo}
          />
        </label>

        {/* Recordatorio de lo que va a pasar con lo que escribió */}
        <p
          className={`mt-3 rounded-2xl px-4 py-2 text-sm ${
            privada
              ? "bg-marca/8 text-marca ring-1 ring-marca/20 dark:bg-acento/10 dark:text-acento dark:ring-acento/25"
              : "bg-skysoft/40 text-cocoa/75 ring-1 ring-sky/40 dark:bg-noche/60 dark:text-tinta2 dark:ring-borde"
          }`}
        >
          {privada
            ? "🔒 Esta consulta no se publica. La respuesta te llega sólo por mail."
            : "💬 Tu nombre, tu comentario y la respuesta se van a ver en esta página."}
        </p>

        {error && (
          <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:ring-rose-800">
            {error}
          </p>
        )}
        {enviada && (
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-800">
            {enviada === "privado"
              ? "¡Gracias! Tu consulta llegó y es privada. Te mandamos un mail de confirmación y un profesional te va a responder ahí. 🤗"
              : "¡Gracias! Tu comentario ya está publicado acá abajo. Cuando el equipo responda, la respuesta aparece junto a tu pregunta. 🤗"}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="focus-cute mt-5 w-full rounded-full bg-marca px-6 py-3 font-display text-lg text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60 dark:bg-marcaSoft"
        >
          {enviando
            ? "Enviando…"
            : privada
              ? "Enviar consulta privada 🔒"
              : "Publicar comentario 💬"}
        </button>
      </form>

      {/* ── Listado: SÓLO lo público ── */}
      <h2 className="mt-10 font-display text-2xl text-cocoa dark:text-tinta">
        💬 Consultas de la comunidad
      </h2>
      <p className="mt-1 text-sm text-cocoa/60 dark:text-tinta2/80">
        Acá se ven únicamente los comentarios públicos. Las consultas privadas
        no aparecen.
      </p>

      {consultas.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-white/70 p-6 text-center text-cocoa/70 ring-1 ring-white dark:bg-panel/60 dark:text-tinta2 dark:ring-borde/50">
          Todavía no hay comentarios. ¡Sé la primera en preguntar! 🌸
        </p>
      ) : (
        <ul className="mt-4 space-y-5">
          {consultas.map((c) => (
            <li
              key={c.id}
              className="rounded-[1.75rem] bg-white/85 p-5 shadow-soft ring-1 ring-white dark:bg-panel/85 dark:ring-borde/60"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-skysoft/60 text-xl dark:bg-noche/70">
                    {temaEmoji(c.tema)}
                  </span>
                  <div>
                    <p className="font-display text-lg leading-tight text-cocoa dark:text-tinta">
                      {c.nombre}
                    </p>
                    <p className="text-xs font-semibold text-marca/70 dark:text-acento/80">
                      {temaLabel(c.tema)} · {fecha(c.created_at)}
                    </p>
                  </div>
                </div>
                {c.respuesta ? (
                  <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                    Respondida ✓
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-sunshine/60 px-3 py-1 text-xs font-bold text-cocoa/70 dark:bg-panelAlt dark:text-tinta2">
                    En espera
                  </span>
                )}
              </div>

              <p className="mt-3 whitespace-pre-wrap text-cocoa/85 dark:text-tinta2">
                {c.mensaje}
              </p>

              {/* Respuesta del equipo: misma estructura que el mail —
                  borde grueso al costado, rótulo y firma. */}
              {c.respuesta && (
                <div className="mt-4 rounded-r-2xl border-l-4 border-marca bg-marca/5 p-4 dark:border-acento dark:bg-acento/10">
                  <p className="text-xs font-bold uppercase tracking-wide text-marca dark:text-acento">
                    Respuesta del equipo
                  </p>
                  <p className="mt-1.5 whitespace-pre-wrap text-cocoa/85 dark:text-tinta">
                    {c.respuesta}
                  </p>
                  {c.respondido_at && (
                    <p className="mt-2 text-xs text-cocoa/50 dark:text-tinta2/70">
                      🤱 Maternidad · {fecha(c.respondido_at)}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
