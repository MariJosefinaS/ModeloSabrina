import nodemailer from "nodemailer";
import { Consulta, temaLabel, temaEmoji } from "./types";
import { SITE } from "./site";

// ─────────────────────────────────────────────────────────────
//  Envío de correo del portal de consultas.
//  Al llegar una consulta se disparan DOS mails:
//    1) notifyNewConsulta → al mail institucional (aviso al equipo).
//    2) sendAcuseRecibo   → al paciente (respuesta automática linda,
//       avisando que un profesional responderá a la brevedad).
//  Sin SMTP configurado corre en MODO DEMO (imprime por consola).
// ─────────────────────────────────────────────────────────────

const AZUL = "#0056A2";
const CELESTE = "#BFE3FF";
const CELESTE_CLARO = "#EAF5FF";
const TEXTO = "#2B3A48";
const TENUE = "#6B7783";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function fechaLarga(iso: string): string {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Layout HTML compartido (tablas + estilos inline: compatibilidad
//    con Gmail, Outlook y clientes de celular) ──────────────────
function layout(opts: {
  preheader: string;
  hero: string; // emoji grande del encabezado
  titulo: string;
  cuerpo: string; // HTML del contenido central
}): string {
  const logo = `${SITE.url}/logo-sanatorio-white.png`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(SITE.programa)}</title>
</head>
<body style="margin:0;padding:0;background:${CELESTE_CLARO};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${TEXTO};">
<span style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${escapeHtml(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CELESTE_CLARO};padding:24px 12px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 12px 34px rgba(11,63,112,0.12);">

      <!-- Encabezado institucional -->
      <tr><td style="background:${AZUL};padding:22px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td align="left" style="vertical-align:middle;">
            <img src="${logo}" alt="Sanatorio Modelo S.A." height="34" style="height:34px;display:block;">
          </td>
          <td align="right" style="vertical-align:middle;color:#ffffff;font-size:12px;line-height:1.3;font-weight:700;">
            80 AÑOS<br><span style="color:${CELESTE};font-weight:600;font-size:11px;">1946 &ndash; 2026</span>
          </td>
        </tr></table>
      </td></tr>

      <!-- Franja hero -->
      <tr><td align="center" style="background:linear-gradient(180deg,${AZUL} 0%,#1E6FBF 100%);padding:8px 28px 34px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center">
          <div style="width:78px;height:78px;line-height:78px;border-radius:50%;background:#ffffff;font-size:40px;text-align:center;margin:6px auto 14px;">${opts.hero}</div>
          <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;font-weight:800;">${escapeHtml(opts.titulo)}</h1>
        </td></tr></table>
      </td></tr>

      <!-- Cuerpo -->
      <tr><td style="padding:28px 30px 8px;">
        ${opts.cuerpo}
      </td></tr>

      <!-- Pie institucional -->
      <tr><td style="padding:22px 30px 8px;">
        <hr style="border:none;border-top:1px solid #E3EDF6;margin:0 0 16px;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:800;color:${AZUL};">${escapeHtml(SITE.institucion)}</p>
        <p style="margin:0;font-size:13px;line-height:1.7;color:${TENUE};">
          📍 ${escapeHtml(SITE.direccion)} — ${escapeHtml(SITE.ciudad)}<br>
          📞 ${escapeHtml(SITE.telefono)} &nbsp;·&nbsp; 💬 WhatsApp ${escapeHtml(SITE.whatsapp)}<br>
          🌐 <a href="${SITE.web}" style="color:${AZUL};text-decoration:none;">${escapeHtml(SITE.webLabel)}</a>
        </p>
      </td></tr>

      <tr><td style="padding:14px 30px 26px;">
        <p style="margin:0;font-size:11px;line-height:1.6;color:#93A0AC;">
          Información orientativa para acompañarte durante la internación. No reemplaza el consejo de tu equipo de salud. Ante cualquier duda, preguntá al personal de enfermería o a tu pediatra.
        </p>
      </td></tr>

    </table>
    <p style="margin:16px 0 0;font-size:11px;color:#A7B4C0;">${escapeHtml(SITE.programa)}</p>
  </td></tr>
</table>
</body>
</html>`;
}

// Tarjeta que muestra el detalle de la consulta
function tarjetaConsulta(consulta: Consulta): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CELESTE_CLARO};border:1px solid #DCEBF8;border-radius:16px;">
    <tr><td style="padding:16px 18px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:800;color:${AZUL};letter-spacing:.02em;text-transform:uppercase;">
        ${temaEmoji(consulta.tema)} ${escapeHtml(temaLabel(consulta.tema))}
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${TEXTO};white-space:pre-wrap;">${escapeHtml(consulta.mensaje)}</p>
    </td></tr>
  </table>`;
}

type MailArmado = { asunto: string; texto: string; html: string };

/** Arma (sin enviar) el aviso interno para el equipo. */
export function buildNotifyEmail(consulta: Consulta): MailArmado {
  const asunto = `🍼 Nueva consulta (${temaLabel(consulta.tema)}) de ${consulta.nombre}`;

  const cuerpo = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Llegó una nueva consulta al portal <strong>${escapeHtml(SITE.programa)}</strong>.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.9;color:${TEXTO};margin-bottom:16px;">
      <tr><td style="width:96px;color:${TENUE};">Paciente</td><td style="font-weight:700;">${escapeHtml(consulta.nombre)}</td></tr>
      <tr><td style="color:${TENUE};">Email</td><td>${consulta.email ? `<a href="mailto:${escapeHtml(consulta.email)}" style="color:${AZUL};text-decoration:none;">${escapeHtml(consulta.email)}</a>` : "<em>(no dejó email)</em>"}</td></tr>
      <tr><td style="color:${TENUE};">Tema</td><td>${temaEmoji(consulta.tema)} ${escapeHtml(temaLabel(consulta.tema))}</td></tr>
      <tr><td style="color:${TENUE};">Fecha</td><td>${escapeHtml(fechaLarga(consulta.created_at))}</td></tr>
    </table>
    ${tarjetaConsulta(consulta)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 6px;"><tr>
      <td style="border-radius:999px;background:${AZUL};">
        <a href="${SITE.url}/admin" style="display:inline-block;padding:12px 26px;font-size:15px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:999px;">Responder desde el panel →</a>
      </td>
    </tr></table>`;

  const texto = [
    `Nueva consulta en ${SITE.programa}`,
    ``,
    `Paciente: ${consulta.nombre}`,
    `Email:    ${consulta.email ?? "(no dejó email)"}`,
    `Tema:     ${temaLabel(consulta.tema)}`,
    `Fecha:    ${fechaLarga(consulta.created_at)}`,
    ``,
    consulta.mensaje,
    ``,
    `Respondé desde: ${SITE.url}/admin`,
  ].join("\n");

  const html = layout({
    preheader: `Nueva consulta de ${consulta.nombre}`,
    hero: "🍼",
    titulo: "Nueva consulta recibida",
    cuerpo,
  });

  return { asunto, texto, html };
}

/**
 * (1) Aviso al mail institucional de que llegó una nueva consulta.
 */
export async function notifyNewConsulta(consulta: Consulta): Promise<void> {
  const to = process.env.MAIL_TO || SITE.mailInterno;
  const from = process.env.MAIL_FROM || `Portal de consultas <${process.env.SMTP_USER || "no-reply@localhost"}>`;
  const { asunto, texto, html } = buildNotifyEmail(consulta);

  if (!smtpConfigured()) {
    console.log("\n──────── [MODO DEMO · aviso interno no enviado] ────────");
    console.log(`Para: ${to}\nAsunto: ${asunto}\n\n${texto}`);
    console.log("─────────────────────────────────────────────────────────\n");
    return;
  }

  await getTransporter().sendMail({
    from,
    to,
    replyTo: consulta.email || undefined,
    subject: asunto,
    text: texto,
    html,
  });
}

/** Arma (sin enviar) el acuse automático para el paciente. */
export function buildAcuseEmail(consulta: Consulta): MailArmado {
  const asunto = `Recibimos tu consulta 🤱 — ${SITE.institucion}`;

  const cuerpo = `
    <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">¡Hola <strong>${escapeHtml(consulta.nombre)}</strong>! 👋</p>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:${TEXTO};">
      Recibimos tu consulta y ya la estamos viendo. <strong>Un profesional del equipo de la Maternidad va a responderte a la brevedad.</strong> Gracias por confiar en nosotros durante estos días. 💙
    </p>
    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:${TENUE};">Esto fue lo que nos escribiste:</p>
    ${tarjetaConsulta(consulta)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 6px;background:#F2FAF4;border:1px solid #CDE9D5;border-radius:14px;">
      <tr><td style="padding:14px 16px;font-size:13.5px;line-height:1.6;color:#2E6B45;">
        ⏱️ <strong>Mientras tanto,</strong> si es una urgencia durante la internación, llamá o acercate al personal de enfermería del piso.
      </td></tr>
    </table>
    <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:${TENUE};">
      Este es un mensaje automático que confirma que recibimos tu consulta. No hace falta que respondas a este correo.
    </p>`;

  const texto = [
    `¡Hola ${consulta.nombre}!`,
    ``,
    `Recibimos tu consulta y ya la estamos viendo. Un profesional del equipo de la Maternidad va a responderte a la brevedad. ¡Gracias por confiar en nosotros!`,
    ``,
    `Tu consulta (${temaLabel(consulta.tema)}):`,
    consulta.mensaje,
    ``,
    `Si es una urgencia durante la internación, llamá o acercate al personal de enfermería del piso.`,
    ``,
    `— ${SITE.institucion}`,
    `Este es un mensaje automático; no hace falta responderlo.`,
  ].join("\n");

  const html = layout({
    preheader: "Recibimos tu consulta. Un profesional te responderá a la brevedad.",
    hero: "🤱",
    titulo: "¡Recibimos tu consulta!",
    cuerpo,
  });

  return { asunto, texto, html };
}

/**
 * (2) Respuesta automática al PACIENTE: confirma la recepción y avisa
 *     que un profesional responderá a la brevedad. Solo si dejó email.
 */
export async function sendAcuseRecibo(consulta: Consulta): Promise<void> {
  if (!consulta.email) return; // sin email no hay a quién responder

  const from = process.env.MAIL_FROM || `${SITE.institucion} <${process.env.SMTP_USER || "no-reply@localhost"}>`;
  const { asunto, texto, html } = buildAcuseEmail(consulta);

  if (!smtpConfigured()) {
    console.log("\n──────── [MODO DEMO · acuse al paciente no enviado] ────────");
    console.log(`Para: ${consulta.email}\nAsunto: ${asunto}\n\n${texto}`);
    console.log("─────────────────────────────────────────────────────────────\n");
    return;
  }

  await getTransporter().sendMail({
    from,
    to: consulta.email,
    subject: asunto,
    text: texto,
    html,
  });
}
