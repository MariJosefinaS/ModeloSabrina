export type TemaConsulta = "vestir" | "dormir" | "amamantar" | "otro";

export type Consulta = {
  id: string;
  nombre: string;
  email: string | null;
  tema: TemaConsulta;
  mensaje: string;
  created_at: string;
  respuesta: string | null;
  respondido_at: string | null;
};

export type NuevaConsulta = {
  nombre: string;
  email?: string | null;
  tema: TemaConsulta;
  mensaje: string;
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
