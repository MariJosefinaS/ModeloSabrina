import { NextRequest, NextResponse } from "next/server";
import { isValidSession, ADMIN_COOKIE } from "@/lib/auth";
import { answerConsulta } from "@/lib/store";
import { sendRespuesta } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidSession(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const respuesta = String(body?.respuesta ?? "").trim();

  if (respuesta.length < 2) {
    return NextResponse.json({ ok: false, error: "La respuesta está vacía" }, { status: 400 });
  }

  try {
    const consulta = await answerConsulta(id, respuesta);
    if (!consulta) {
      return NextResponse.json({ ok: false, error: "Consulta no encontrada" }, { status: 404 });
    }

    // La respuesta va por mail en los dos casos: en la privada es la ÚNICA
    // vía, y en la pública es el aviso de que ya está publicada. Si el envío
    // falla, la respuesta igual quedó guardada: no se pierde el trabajo.
    let mailEnviado = false;
    if (consulta.email) {
      try {
        await sendRespuesta(consulta);
        mailEnviado = true;
      } catch (err) {
        console.error("No se pudo enviar la respuesta al paciente:", err);
      }
    }

    return NextResponse.json({ ok: true, consulta, mailEnviado });
  } catch (err) {
    console.error("Error al responder:", err);
    return NextResponse.json({ ok: false, error: "No se pudo guardar la respuesta" }, { status: 500 });
  }
}
