import nodemailer from "nodemailer";
import { Consulta } from "./types";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

/**
 * Avisa por email interno que llegó una nueva consulta. Si no hay SMTP
 * configurado, lo muestra por consola (modo demo) para no bloquear el flujo.
 */
export async function notifyNewConsulta(consulta: Consulta): Promise<void> {
  const to = process.env.MAIL_TO || "";
  const from = process.env.MAIL_FROM || "Cuidados en internación conjunta <no-reply@localhost>";
  const asunto = `🍼 Nueva consulta (${consulta.tema}) de ${consulta.nombre}`;
  const cuerpo = [
    `Llegó una nueva consulta al foro "Cuidados en internación conjunta".`,
    ``,
    `Nombre:  ${consulta.nombre}`,
    `Email:   ${consulta.email ?? "(no dejó email)"}`,
    `Tema:    ${consulta.tema}`,
    `Fecha:   ${new Date(consulta.created_at).toLocaleString("es-AR")}`,
    ``,
    `Mensaje:`,
    consulta.mensaje,
    ``,
    `Respondé desde el panel de administración: /admin`,
  ].join("\n");

  if (!smtpConfigured()) {
    console.log("\n──────── [MODO DEMO · email interno no enviado] ────────");
    console.log(`Para: ${to || "(configurá MAIL_TO)"}`);
    console.log(`Asunto: ${asunto}`);
    console.log(cuerpo);
    console.log("────────────────────────────────────────────────────────\n");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: consulta.email || undefined,
    subject: asunto,
    text: cuerpo,
  });
}
