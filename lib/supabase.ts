import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * ¿Está configurado Supabase? Si no, la app usa el store local (modo demo).
 */
export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

let cached: SupabaseClient | null = null;

/**
 * Cliente de servidor con service_role. Solo debe usarse en route handlers /
 * código de servidor, nunca en el cliente.
 */
export function getServerSupabase(): SupabaseClient {
  if (!supabaseConfigured()) {
    throw new Error("Supabase no está configurado");
  }
  if (!cached) {
    cached = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false } }
    );
  }
  return cached;
}
