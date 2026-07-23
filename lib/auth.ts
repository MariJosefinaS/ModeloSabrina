import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "bebe_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Token de sesión derivado de la contraseña (no se puede forjar sin conocerla). */
export function adminToken(): string {
  return createHmac("sha256", adminPassword())
    .update("bebe-abrigado-admin-v1")
    .digest("hex");
}

export function checkPassword(input: string): boolean {
  return safeEqual(input, adminPassword());
}

export function isValidSession(token?: string | null): boolean {
  if (!token) return false;
  return safeEqual(token, adminToken());
}
