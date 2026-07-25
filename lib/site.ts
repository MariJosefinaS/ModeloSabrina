// ─────────────────────────────────────────────────────────────
//  Identidad del proyecto. Editá acá para actualizar toda la app.
//
//  Datos institucionales de Sanatorio Modelo S.A. (San Miguel de
//  Tucumán), extraídos de la página oficial guardada en la carpeta.
//   · Logo oficial: /public/logo-sanatorio.png (azul, para fondo claro)
//     y /public/logo-sanatorio-white.png (blanco, para fondo de color).
//   · Azul institucional: #0056A2 (color `marca` en tailwind.config.ts).
// ─────────────────────────────────────────────────────────────

export const SITE = {
  programa: "Cuidados en internación conjunta",
  tagline: "Guía de cuidados para mamás primerizas",
  institucion: "Sanatorio Modelo S.A.",
  ciudad: "San Miguel de Tucumán, Tucumán",
  direccion: "25 de Mayo 559",
  telefono: "+54 381 497-9500",
  telefonoHref: "tel:+543814979500",
  // Internos que pidió la Maternidad (2026-07-25): Neonatología e
  // Internación conjunta.
  internos: "Internos 412 y 404 (Neonatología e Internación conjunta)",
  whatsapp: "+54 9 381 416-1127",
  whatsappHref: "https://api.whatsapp.com/send?phone=5493814161127",
  instagram: "https://instagram.com/sanatoriomodelo",
  facebook: "https://facebook.com/sanatoriomodelotuc",
  web: "https://www.sanatoriomodelosa.com.ar",
  webLabel: "sanatoriomodelosa.com.ar",
  // URL pública del sitio (la que codifica el QR de la hoja impresa).
  // Se configura al hacer deploy con NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bebe-abrigado.vercel.app",
  // Email interno donde llegan las consultas del foro (configurable por env).
  mailInterno: process.env.NEXT_PUBLIC_MAIL_INTERNO || "maternidad@sanatoriomodelosa.com.ar",
};
