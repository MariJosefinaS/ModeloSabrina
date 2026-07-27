import nodemailer from "nodemailer";
import { Consulta, temaLabel, temaEmoji } from "./types";
import { SITE } from "./site";

// ─────────────────────────────────────────────────────────────
//  Correo del portal de consultas. Tres mails:
//    1) notifyNewConsulta → al mail institucional (aviso al equipo).
//    2) sendAcuseRecibo   → al paciente: "la recibimos".
//    3) sendRespuesta     → al paciente: la respuesta del profesional.
//  Sin SMTP configurado corre en MODO DEMO (imprime por consola).
//
//  Formato pedido por el usuario (Ejemplos/Captura ... 105916.png):
//  barra de color con antetítulo + título, cuerpo blanco, tabla de
//  etiqueta/valor con líneas finas, bloque destacado con borde
//  izquierdo grueso, y pie gris chico.
// ─────────────────────────────────────────────────────────────

const AZUL = "#0056A2";
const AZUL_OSCURO = "#0B3F70";
const CELESTE_CLARO = "#EFF6FC";
const FONDO = "#EDF2F7";
const TEXTO = "#2B3A48";
const TENUE = "#6B7783";
const LINEA = "#E7EEF5";

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

/** Respeta los saltos de línea que escribió la persona. */
function parrafos(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

// ── Piezas del formato ───────────────────────────────────────

/** Tabla etiqueta / valor, separada por líneas finas. */
function datos(filas: { etiqueta: string; valor: string }[]): string {
  const tr = filas
    .map(
      (f, i) => `
      <tr>
        <td style="padding:13px 14px 13px 0;vertical-align:top;width:104px;font-size:14px;color:${TENUE};${
          i ? `border-top:1px solid ${LINEA};` : ""
        }">${escapeHtml(f.etiqueta)}</td>
        <td style="padding:13px 0;vertical-align:top;font-size:14px;line-height:1.5;color:${TEXTO};${
          i ? `border-top:1px solid ${LINEA};` : ""
        }">${f.valor}</td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 22px;">${tr}</table>`;
}

/** Bloque destacado: borde izquierdo grueso + fondo tenue + rótulo. */
function destacado(opts: {
  rotulo: string;
  contenido: string;
  color?: string;
  fondo?: string;
}): string {
  const color = opts.color ?? AZUL;
  const fondo = opts.fondo ?? CELESTE_CLARO;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:${fondo};border-left:4px solid ${color};border-radius:0 10px 10px 0;">
    <tr><td style="padding:16px 18px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${color};">${escapeHtml(opts.rotulo)}</p>
      <div style="font-size:15px;line-height:1.65;color:${TEXTO};">${opts.contenido}</div>
    </td></tr>
  </table>`;
}

/** Armazón del mail: barra de color, cuerpo blanco y pie gris. */
function layout(opts: {
  preheader: string;
  antetitulo: string;
  titulo: string;
  emoji: string;
  cuerpo: string;
  barra?: string;
  pie?: string;
}): string {
  const barra = opts.barra ?? AZUL;
  const pie =
    opts.pie ?? `Mensaje automático de ${SITE.programa} · No respondas a este correo`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(SITE.institucion)}</title>
</head>
<body style="margin:0;padding:0;background:${FONDO};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${TEXTO};">
<span style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${escapeHtml(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${FONDO};padding:26px 12px;">
  <tr><td align="center">
    <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(11,63,112,0.10);">

      <!-- Barra de encabezado -->
      <tr><td style="background:${barra};padding:22px 30px 24px;">
        <p style="margin:0 0 8px;font-size:13px;letter-spacing:.04em;color:rgba(255,255,255,.72);text-transform:uppercase;">
          <span style="font-weight:700;color:#ffffff;">${escapeHtml(SITE.institucion)}</span> · ${escapeHtml(opts.antetitulo)}
        </p>
        <h1 style="margin:0;font-size:25px;line-height:1.25;font-weight:700;color:#ffffff;">
          ${opts.emoji} ${escapeHtml(opts.titulo)}
        </h1>
      </td></tr>

      <!-- Cuerpo -->
      <tr><td style="padding:28px 30px 10px;">
        ${opts.cuerpo}
      </td></tr>

      <!-- Pie -->
      <tr><td style="padding:6px 30px 24px;">
        <hr style="border:none;border-top:1px solid ${LINEA};margin:0 0 14px;">
        <p style="margin:0;text-align:center;font-size:12px;line-height:1.6;color:#93A0AC;">
          ${escapeHtml(pie)}
        </p>
      </td></tr>

    </table>
    <p style="margin:14px 0 0;font-size:11px;line-height:1.7;color:#8D9AA6;text-align:center;">
      ${escapeHtml(SITE.institucion)} · ${escapeHtml(SITE.direccion)}, ${escapeHtml(SITE.ciudad)}<br>
      ${escapeHtml(SITE.telefono)} · <a href="${SITE.web}" style="color:${AZUL};text-decoration:none;">${escapeHtml(SITE.webLabel)}</a>
    </p>
  </td></tr>
</table>
</body>
</html>`;
}

type MailArmado = { asunto: string; texto: string; html: string };

const VISIBILIDAD_LABEL: Record<Consulta["visibilidad"], string> = {
  publico: "Comentario público (se publica en el foro)",
  privado: "Consulta privada (se responde por mail)",
};

// ── 1) Aviso interno al equipo ───────────────────────────────

/** Arma (sin enviar) el aviso interno para el equipo. */
export function buildNotifyEmail(consulta: Consulta): MailArmado {
  const privada = consulta.visibilidad === "privado";
  const asunto = `${privada ? "🔒 Consulta privada" : "💬 Comentario público"} de ${consulta.nombre} — ${temaLabel(consulta.tema)}`;

  const cuerpo = `
    <p style="margin:0 0 6px;font-size:15px;line-height:1.6;">
      Llegó ${privada ? "una <strong>consulta privada</strong>" : "un <strong>comentario público</strong>"} al portal. Datos:
    </p>
    ${datos([
      { etiqueta: "Fecha/hora", valor: escapeHtml(fechaLarga(consulta.created_at)) },
      { etiqueta: "Paciente", valor: `<strong>${escapeHtml(consulta.nombre)}</strong>` },
      {
        etiqueta: "Email",
        valor: consulta.email
          ? `<a href="mailto:${escapeHtml(consulta.email)}" style="color:${AZUL};text-decoration:none;">${escapeHtml(consulta.email)}</a>`
          : `<em style="color:${TENUE};">(no dejó email)</em>`,
      },
      { etiqueta: "Tema", valor: `${temaEmoji(consulta.tema)} ${escapeHtml(temaLabel(consulta.tema))}` },
      { etiqueta: "Tipo", valor: escapeHtml(VISIBILIDAD_LABEL[consulta.visibilidad]) },
    ])}
    ${destacado({ rotulo: "Consulta", contenido: parrafos(consulta.mensaje) })}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 14px;"><tr>
      <td style="border-radius:6px;background:${AZUL};">
        <a href="${SITE.url}/admin" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:6px;">Responder desde el panel →</a>
      </td>
    </tr></table>`;

  const texto = [
    `${privada ? "Consulta privada" : "Comentario público"} en ${SITE.programa}`,
    ``,
    `Fecha/hora: ${fechaLarga(consulta.created_at)}`,
    `Paciente:   ${consulta.nombre}`,
    `Email:      ${consulta.email ?? "(no dejó email)"}`,
    `Tema:       ${temaLabel(consulta.tema)}`,
    `Tipo:       ${VISIBILIDAD_LABEL[consulta.visibilidad]}`,
    ``,
    `CONSULTA`,
    consulta.mensaje,
    ``,
    `Respondé desde: ${SITE.url}/admin`,
  ].join("\n");

  const html = layout({
    preheader: `${privada ? "Consulta privada" : "Comentario público"} de ${consulta.nombre}`,
    antetitulo: "Portal de consultas",
    titulo: privada ? "Nueva consulta privada" : "Nuevo comentario público",
    emoji: privada ? "🔒" : "💬",
    cuerpo,
    pie: `Aviso interno de ${SITE.programa} · Respondé desde el panel`,
  });

  return { asunto, texto, html };
}

export async function notifyNewConsulta(consulta: Consulta): Promise<void> {
  const to = process.env.MAIL_TO || SITE.mailInterno;
  const from =
    process.env.MAIL_FROM ||
    `Portal de consultas <${process.env.SMTP_USER || "no-reply@localhost"}>`;
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

// ── 2) Acuse de recibo al paciente ───────────────────────────

/** Arma (sin enviar) el acuse automático para el paciente. */
export function buildAcuseEmail(consulta: Consulta): MailArmado {
  const privada = consulta.visibilidad === "privado";
  const asunto = `Recibimos tu consulta 🤱 — ${SITE.institucion}`;

  const cuerpo = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
      ¡Hola <strong>${escapeHtml(consulta.nombre)}</strong>! Recibimos tu consulta y ya la estamos viendo.
      <strong>Un profesional del equipo de la Maternidad va a responderte a la brevedad.</strong> 💙
    </p>
    ${datos([
      { etiqueta: "Fecha/hora", valor: escapeHtml(fechaLarga(consulta.created_at)) },
      { etiqueta: "Tema", valor: `${temaEmoji(consulta.tema)} ${escapeHtml(temaLabel(consulta.tema))}` },
      {
        etiqueta: "Respuesta",
        valor: privada
          ? "Te llega <strong>por mail</strong>, a esta misma dirección"
          : "Se publica en el <strong>foro</strong>, y te avisamos por mail",
      },
    ])}
    ${destacado({ rotulo: "Lo que nos escribiste", contenido: parrafos(consulta.mensaje) })}
    ${destacado({
      rotulo: "Si es una urgencia",
      contenido:
        "Durante la internación, llamá o acercate al <strong>personal de enfermería del piso</strong>. No esperes la respuesta de este correo.",
      color: "#B4682B",
      fondo: "#FDF4EC",
    })}`;

  const texto = [
    `¡Hola ${consulta.nombre}!`,
    ``,
    `Recibimos tu consulta y ya la estamos viendo. Un profesional del equipo de la Maternidad va a responderte a la brevedad.`,
    ``,
    `Fecha/hora: ${fechaLarga(consulta.created_at)}`,
    `Tema:       ${temaLabel(consulta.tema)}`,
    `Respuesta:  ${privada ? "por mail, a esta dirección" : "se publica en el foro y te avisamos por mail"}`,
    ``,
    `LO QUE NOS ESCRIBISTE`,
    consulta.mensaje,
    ``,
    `SI ES UNA URGENCIA: durante la internación, llamá o acercate al personal de enfermería del piso.`,
    ``,
    `— ${SITE.institucion}`,
  ].join("\n");

  const html = layout({
    preheader: "Recibimos tu consulta. Un profesional te responderá a la brevedad.",
    antetitulo: "Portal de consultas",
    titulo: "Recibimos tu consulta",
    emoji: "🤱",
    cuerpo,
  });

  return { asunto, texto, html };
}

export async function sendAcuseRecibo(consulta: Consulta): Promise<void> {
  if (!consulta.email) return; // sin email no hay a quién escribirle

  const from =
    process.env.MAIL_FROM ||
    `${SITE.institucion} <${process.env.SMTP_USER || "no-reply@localhost"}>`;
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

// ── 3) Respuesta del profesional al paciente ─────────────────

/** Arma (sin enviar) el mail con la respuesta del equipo. */
export function buildRespuestaEmail(consulta: Consulta): MailArmado {
  const asunto = `Respuesta a tu consulta 💙 — ${SITE.institucion}`;
  const respuesta = consulta.respuesta ?? "";
  const publica = consulta.visibilidad === "publico";

  const cuerpo = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
      ¡Hola <strong>${escapeHtml(consulta.nombre)}</strong>! Un profesional del equipo de la Maternidad
      respondió tu consulta.
    </p>
    ${destacado({
      rotulo: "Respuesta del equipo",
      contenido: parrafos(respuesta),
      color: AZUL_OSCURO,
    })}
    ${datos([
      { etiqueta: "Tu consulta", valor: parrafos(consulta.mensaje) },
      { etiqueta: "Tema", valor: `${temaEmoji(consulta.tema)} ${escapeHtml(temaLabel(consulta.tema))}` },
      { etiqueta: "Enviada", valor: escapeHtml(fechaLarga(consulta.created_at)) },
      {
        etiqueta: "Respondida",
        valor: escapeHtml(
          consulta.respondido_at ? fechaLarga(consulta.respondido_at) : "—"
        ),
      },
    ])}
    ${
      publica
        ? `<p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${TENUE};">
             Como elegiste dejar un comentario público, tu consulta y esta respuesta
             quedan visibles en el foro para ayudar a otras mamás.
           </p>`
        : `<p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${TENUE};">
             Tu consulta fue privada: ni la pregunta ni esta respuesta se publican en el foro.
           </p>`
    }
    ${destacado({
      rotulo: "Importante",
      contenido:
        "Esta respuesta es orientativa y no reemplaza la consulta con tu equipo de salud. Ante cualquier duda, preguntá al personal de enfermería o a tu pediatra.",
      color: "#B4682B",
      fondo: "#FDF4EC",
    })}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 14px;"><tr>
      <td style="border-radius:6px;background:${AZUL};">
        <a href="${SITE.url}/foro" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:6px;">Volver a la guía →</a>
      </td>
    </tr></table>`;

  const texto = [
    `¡Hola ${consulta.nombre}!`,
    ``,
    `Un profesional del equipo de la Maternidad respondió tu consulta.`,
    ``,
    `RESPUESTA DEL EQUIPO`,
    respuesta,
    ``,
    `Tu consulta: ${consulta.mensaje}`,
    `Tema:        ${temaLabel(consulta.tema)}`,
    `Enviada:     ${fechaLarga(consulta.created_at)}`,
    `Respondida:  ${consulta.respondido_at ? fechaLarga(consulta.respondido_at) : "—"}`,
    ``,
    publica
      ? `Tu consulta y esta respuesta quedan visibles en el foro.`
      : `Tu consulta fue privada: no se publica en el foro.`,
    ``,
    `IMPORTANTE: esta respuesta es orientativa y no reemplaza la consulta con tu equipo de salud.`,
    ``,
    `— ${SITE.institucion}`,
  ].join("\n");

  const html = layout({
    preheader: `Respondimos tu consulta sobre ${temaLabel(consulta.tema).toLowerCase()}`,
    antetitulo: "Portal de consultas",
    titulo: "Respondimos tu consulta",
    emoji: "💙",
    cuerpo,
    pie: `${SITE.programa} · Si necesitás algo más, escribinos desde la guía`,
  });

  return { asunto, texto, html };
}

/** Envía la respuesta del profesional al paciente. */
export async function sendRespuesta(consulta: Consulta): Promise<void> {
  if (!consulta.email || !consulta.respuesta) return;

  const from =
    process.env.MAIL_FROM ||
    `${SITE.institucion} <${process.env.SMTP_USER || "no-reply@localhost"}>`;
  const { asunto, texto, html } = buildRespuestaEmail(consulta);

  if (!smtpConfigured()) {
    console.log("\n──────── [MODO DEMO · respuesta al paciente no enviada] ────────");
    console.log(`Para: ${consulta.email}\nAsunto: ${asunto}\n\n${texto}`);
    console.log("─────────────────────────────────────────────────────────────────\n");
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
