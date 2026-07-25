import { NextRequest, NextResponse } from "next/server";
import { listConsultas, createConsulta } from "@/lib/store";
import { notifyNewConsulta, sendAcuseRecibo } from "@/lib/email";
import { TemaConsulta } from "@/lib/types";

export const dynamic = "force-dynamic";

const TEMAS_VALIDOS: TemaConsulta[] = ["vestir", "dormir", "amamantar", "otro"];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function GET() {
  try {
    const consultas = await listConsultas();
    return NextResponse.json({ ok: true, consultas });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudieron leer las consultas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Datos inválidos" }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const mensaje = String(body.mensaje ?? "").trim();
  const email = body.email ? String(body.email).trim() : null;
  const tema: TemaConsulta = TEMAS_VALIDOS.includes(body.tema) ? body.tema : "otro";

  if (nombre.length < 2) {
    return NextResponse.json({ ok: false, error: "Contanos tu nombre 🙂" }, { status: 400 });
  }
  if (mensaje.length < 5) {
    return NextResponse.json({ ok: false, error: "Escribí un poquito más tu consulta" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Ese email no parece válido" }, { status: 400 });
  }

  try {
    const consulta = await createConsulta({ nombre, email, tema, mensaje });
    // Disparamos los dos mails en paralelo. Si falla el envío, igual
    // guardamos la consulta (no bloqueamos al paciente).
    const [avisoRes, acuseRes] = await Promise.allSettled([
      notifyNewConsulta(consulta),
      sendAcuseRecibo(consulta),
    ]);
    if (avisoRes.status === "rejected") {
      console.error("No se pudo enviar el aviso interno:", avisoRes.reason);
    }
    if (acuseRes.status === "rejected") {
      console.error("No se pudo enviar el acuse al paciente:", acuseRes.reason);
    }
    return NextResponse.json({ ok: true, consulta });
  } catch (err) {
    console.error("Error al guardar la consulta:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar la consulta. Probá de nuevo." },
      { status: 500 }
    );
  }
}
