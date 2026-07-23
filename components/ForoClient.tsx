"use client";

import { useState } from "react";
import { Consulta, TEMAS, TemaConsulta, temaEmoji, temaLabel } from "@/lib/types";

function fecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ForoClient({ initial }: { initial: Consulta[] }) {
  const [consultas, setConsultas] = useState<Consulta[]>(initial);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState<TemaConsulta>("vestir");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setEnviando(true);
    try {
      const res = await fetch("/api/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, tema, mensaje }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo enviar. Probá de nuevo.");
      } else {
        setConsultas((prev) => [data.consulta, ...prev]);
        setMensaje("");
        setEmail("");
        setOk(true);
      }
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mt-8">
      {/* Formulario */}
      <form
        onSubmit={enviar}
        className="rounded-[2rem] bg-white/85 p-6 shadow-soft ring-1 ring-white"
      >
        <h2 className="font-display text-2xl text-cocoa">✏️ Hacé tu consulta</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-cocoa/80">Tu nombre</span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={2}
              placeholder="Ej: Meli"
              className="focus-cute mt-1 w-full rounded-2xl border-0 bg-cream px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5 placeholder:text-cocoa/40"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-cocoa/80">Email (opcional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Para avisarte cuando respondan"
              className="focus-cute mt-1 w-full rounded-2xl border-0 bg-cream px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5 placeholder:text-cocoa/40"
            />
          </label>
        </div>

        <div className="mt-4">
          <span className="text-sm font-bold text-cocoa/80">Tema</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TEMAS.map((t) => (
              <button
                type="button"
                key={t.value}
                onClick={() => setTema(t.value)}
                aria-pressed={tema === t.value}
                className={`focus-cute rounded-full px-4 py-2 text-sm font-bold shadow-soft ring-2 transition ${
                  tema === t.value
                    ? "bg-grape text-white ring-grape"
                    : "bg-white text-cocoa ring-white hover:bg-lavender/40"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-cocoa/80">Tu consulta</span>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            minLength={5}
            rows={4}
            placeholder="Contanos qué te gustaría saber…"
            className="focus-cute mt-1 w-full rounded-2xl border-0 bg-cream px-4 py-3 text-cocoa shadow-inner ring-1 ring-black/5 placeholder:text-cocoa/40"
          />
        </label>

        {error && (
          <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
            {error}
          </p>
        )}
        {ok && (
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            ¡Gracias! Tu consulta se publicó. Te vamos a responder pronto. 🤗
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="focus-cute mt-5 w-full rounded-full bg-grape px-6 py-3 font-display text-lg text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
        >
          {enviando ? "Enviando…" : "Enviar consulta 💌"}
        </button>
      </form>

      {/* Listado */}
      <h2 className="mt-10 font-display text-2xl text-cocoa">
        💬 Consultas de la comunidad
      </h2>

      {consultas.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-white/70 p-6 text-center text-cocoa/70 ring-1 ring-white">
          Todavía no hay consultas. ¡Sé la primera en preguntar! 🌸
        </p>
      ) : (
        <ul className="mt-4 space-y-5">
          {consultas.map((c) => (
            <li
              key={c.id}
              className="rounded-[1.75rem] bg-white/85 p-5 shadow-soft ring-1 ring-white"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender/50 text-xl">
                    {temaEmoji(c.tema)}
                  </span>
                  <div>
                    <p className="font-display text-lg leading-tight text-cocoa">{c.nombre}</p>
                    <p className="text-xs font-semibold text-grape/70">
                      {temaLabel(c.tema)} · {fecha(c.created_at)}
                    </p>
                  </div>
                </div>
                {c.respuesta ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    Respondida ✓
                  </span>
                ) : (
                  <span className="rounded-full bg-sunshine/60 px-3 py-1 text-xs font-bold text-cocoa/70">
                    En espera
                  </span>
                )}
              </div>

              <p className="mt-3 whitespace-pre-wrap text-cocoa/85">{c.mensaje}</p>

              {c.respuesta && (
                <div className="mt-4 rounded-2xl bg-mint/30 p-4 ring-1 ring-mint">
                  <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                    🤱 Respuesta de la asesora
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-cocoa/85">{c.respuesta}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
