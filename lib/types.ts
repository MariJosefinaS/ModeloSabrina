export type TemaConsulta = "vestir" | "dormir" | "amamantar" | "otro";

/**
 * Dos vías, según eligió la mamá:
 *  - "publico"  → comentario visible en el foro; la respuesta se publica ahí
 *                 (y si dejó email, también le llega).
 *  - "privado"  → NO se publica nunca; la respuesta va sólo por mail, así que
 *                 el email es obligatorio.
 */
export type Visibilidad = "publico" | "privado";

export type Consulta = {
  id: string;
  nombre: string;
  email: string | null;
  tema: TemaConsulta;
  mensaje: string;
  visibilidad: Visibilidad;
  created_at: string;
  respuesta: string | null;
  respondido_at: string | null;
};

export type NuevaConsulta = {
  nombre: string;
  email?: string | null;
  tema: TemaConsulta;
  mensaje: string;
  visibilidad: Visibilidad;
};

export const TEMAS: { value: TemaConsulta; label: string; emoji: string }[] = [
  { value: "vestir", label: "Cómo vestir", emoji: "🧦" },
  { value: "dormir", label: "Dormir seguro", emoji: "🌙" },
  { value: "amamantar", label: "Amamantar", emoji: "🤱" },
  { value: "otro", label: "Otra consulta", emoji: "💬" },
];

export function temaLabel(tema: string): string {
  return TEMAS.find((t) => t.value === tema)?.label ?? "Consulta";
}

export function temaEmoji(tema: string): string {
  return TEMAS.find((t) => t.value === tema)?.emoji ?? "💬";
}

/** Sólo esto se muestra en el foro: lo privado nunca sale del panel. */
export function esPublica(c: Consulta): boolean {
  return c.visibilidad === "publico";
}
