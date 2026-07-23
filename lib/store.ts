import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Consulta, NuevaConsulta } from "./types";
import { supabaseConfigured, getServerSupabase } from "./supabase";

// ── Store local (modo demo, sin Supabase) ────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "consultas.json");

async function readLocal(): Promise<Consulta[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Consulta[];
  } catch {
    return [];
  }
}

async function writeLocal(items: Consulta[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

// ── API pública del store ─────────────────────────────────────────────────────
export async function listConsultas(): Promise<Consulta[]> {
  if (supabaseConfigured()) {
    const sb = getServerSupabase();
    const { data, error } = await sb
      .from("consultas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Consulta[]) ?? [];
  }
  const items = await readLocal();
  return items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function createConsulta(input: NuevaConsulta): Promise<Consulta> {
  const now = new Date().toISOString();
  const consulta: Consulta = {
    id: randomUUID(),
    nombre: input.nombre.trim(),
    email: input.email?.trim() || null,
    tema: input.tema,
    mensaje: input.mensaje.trim(),
    created_at: now,
    respuesta: null,
    respondido_at: null,
  };

  if (supabaseConfigured()) {
    const sb = getServerSupabase();
    const { data, error } = await sb
      .from("consultas")
      .insert({
        nombre: consulta.nombre,
        email: consulta.email,
        tema: consulta.tema,
        mensaje: consulta.mensaje,
      })
      .select("*")
      .single();
    if (error) throw error;
    return data as Consulta;
  }

  const items = await readLocal();
  items.push(consulta);
  await writeLocal(items);
  return consulta;
}

export async function answerConsulta(
  id: string,
  respuesta: string
): Promise<Consulta | null> {
  const now = new Date().toISOString();

  if (supabaseConfigured()) {
    const sb = getServerSupabase();
    const { data, error } = await sb
      .from("consultas")
      .update({ respuesta: respuesta.trim(), respondido_at: now })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return (data as Consulta) ?? null;
  }

  const items = await readLocal();
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  items[idx].respuesta = respuesta.trim();
  items[idx].respondido_at = now;
  await writeLocal(items);
  return items[idx];
}
