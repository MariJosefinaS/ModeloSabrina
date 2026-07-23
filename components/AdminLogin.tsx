"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BabyMascot from "@/components/BabyMascot";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo ingresar");
      } else {
        router.refresh();
      }
    } catch {
      setError("Problema de conexión");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form
      onSubmit={entrar}
      className="w-full max-w-sm rounded-[2rem] bg-white/90 p-8 text-center shadow-soft ring-1 ring-white"
    >
      <BabyMascot className="mx-auto w-24" />
      <h1 className="mt-2 font-display text-2xl text-cocoa">Panel de asesoras</h1>
      <p className="mt-1 text-sm text-cocoa/70">Ingresá para responder las consultas del foro.</p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        autoFocus
        className="focus-cute mt-5 w-full rounded-2xl border-0 bg-cream px-4 py-3 text-center text-cocoa shadow-inner ring-1 ring-black/5"
      />

      {error && (
        <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={cargando}
        className="focus-cute mt-4 w-full rounded-full bg-grape px-6 py-3 font-display text-lg text-white shadow-soft transition hover:brightness-110 disabled:opacity-60"
      >
        {cargando ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
