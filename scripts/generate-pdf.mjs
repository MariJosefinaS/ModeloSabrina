// Genera el PDF de recomendaciones desde el HTML usando Edge/Chrome headless.
// Uso: npm run pdf
import { existsSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const htmlPath = path.join(root, "pdf", "recomendaciones-bebe.html");
const outPath = path.join(root, "pdf", "Recomendaciones-Bebe-Sanatorio-Modelo.pdf");

const candidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("✖ No encontré Edge ni Chrome para generar el PDF.");
  process.exit(1);
}

const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
const profile = mkdtempSync(path.join(tmpdir(), "bebe-pdf-"));
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--no-first-run",
  `--user-data-dir=${profile}`,
  `--print-to-pdf=${outPath}`,
  fileUrl,
];

console.log("→ Navegador:", browser);
const r = spawnSync(browser, args, { stdio: "inherit" });
if (existsSync(outPath)) {
  console.log("✔ PDF generado:", outPath);
} else {
  console.error("✖ No se generó el PDF.");
  process.exit(r.status ?? 1);
}
