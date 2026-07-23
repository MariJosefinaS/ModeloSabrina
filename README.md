# 🍼 Cuidados en internación conjunta — Sanatorio Modelo S.A.

Página web dinámica para **acompañar a mamás primerizas**: cómo vestir al bebé,
cómo abrigarlo para dormir seguro y cómo amamantar. Incluye **imágenes
interactivas**, un **foro público** de consultas y un **panel de administración**
para que una asesora responda desde el mismo foro. Pensada para publicarse detrás
de un **código QR**.

> Programa del **Sanatorio Modelo S.A.** · San Miguel de Tucumán.

---

## ✨ Qué incluye

- **3 secciones informativas** con contenido verificado y fuentes citadas:
  vestir, dormir seguro y amamantar.
- **3 imágenes interactivas** (el "cómo hacer"):
  - 🌡️ Termómetro que cambia la ropa del bebé según la temperatura.
  - 🛏️ Cuna de sueño seguro con elementos que suman/restan seguridad.
  - 🤱 Selector de posiciones + checklist de buen agarre.
- **Diseño tierno** (paleta pastel, tipografías redondeadas), **efectos 3D** en
  las tarjetas y una **mascota bebé animada** que saluda y parpadea.
- **Foro público**: la mamá deja su consulta → se guarda y **se avisa por email
  interno** → la asesora responde y la respuesta queda publicada en el foro.
- **PDF** con todas las recomendaciones y fuentes, en `pdf/`.

## 🧱 Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL) para el foro
- **Nodemailer** (SMTP) para el aviso por email

## 🚀 Correr en local (modo demo, sin configurar nada)

```bash
npm install
npm run dev
```

Abrí <http://localhost:3000>. En **modo demo** (sin Supabase ni SMTP):

- Las consultas se guardan en `.data/consultas.json`.
- El "email interno" se muestra por **consola** en vez de enviarse.
- El panel admin usa la contraseña de `.env.local` (`ADMIN_PASSWORD`, por defecto `admin123`).

Rutas: `/` (home) · `/foro` (foro público) · `/admin` (panel de asesoras).

## 🗄️ Configurar Supabase (producción)

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecutá el contenido de [`supabase/schema.sql`](supabase/schema.sql).
3. En **Project Settings → API**, copiá la URL y las claves a tu `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...    # ⚠️ secreta, solo servidor
```

> La app accede con la `service_role` desde el servidor. La tabla tiene **RLS
> activado sin políticas públicas**, así la clave anónima no puede tocar los datos.

## ✉️ Configurar el email interno (SMTP)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-casilla@gmail.com
SMTP_PASS=clave-de-aplicacion       # Gmail: usar "Contraseña de aplicación"
MAIL_TO=maternidad@sanatoriomodelosa.com.ar   # a dónde llegan las consultas
MAIL_FROM="Bebé Abrigado <no-reply@sanatoriomodelosa.com.ar>"
```

> Con Gmail necesitás una **contraseña de aplicación** (2FA activado), no tu
> contraseña normal. El campo `Reply-To` se completa con el email de la mamá si
> lo dejó, para poder responderle directo.

## 🔐 Panel de administración

- Entrá a `/admin` y usá la contraseña de `ADMIN_PASSWORD`.
- Podés ver todas las consultas (pendientes primero), responder y actualizar.
- **Cambiá `ADMIN_PASSWORD`** por una contraseña fuerte antes de publicar.

## 📄 Regenerar el PDF de recomendaciones

```bash
npm run pdf
```

Genera `pdf/Recomendaciones-Bebe-Sanatorio-Modelo.pdf` a partir de
`pdf/recomendaciones-bebe.html` usando Edge/Chrome en modo headless.

## ☁️ Publicar + QR

1. Subí el repo a GitHub e importalo en [Vercel](https://vercel.com) (detecta Next.js solo).
2. Cargá las variables de entorno (Supabase, SMTP, `ADMIN_PASSWORD`) en Vercel.
3. Deploy → obtenés una URL pública (o conectá un dominio del sanatorio).
4. Generá un **QR** que apunte a esa URL (por ej. con un generador de QR) y
   ponelo en folletos, la sala de maternidad, etc.

## 🎨 Finalizar la identidad del sanatorio

El sitio del sanatorio es una SPA y no permite extraer el logo/colores
automáticamente. Para dejar la marca 100% oficial:

- Reemplazá **`public/logo-sanatorio.svg`** por el logo oficial (mismo nombre).
- Ajustá los **colores** en `tailwind.config.ts` si querés alinearlos a la marca.
- Editá los datos institucionales en **`lib/site.ts`** (dirección, teléfono, etc.).

## 📁 Estructura

```
app/                 Rutas (home, foro, admin) y API
  api/consultas/     Crear/listar consultas + responder
  api/admin/login/   Login del panel
components/           Mascota, interactivos (termómetro/cuna/lactancia), foro, admin
lib/                  content.ts (datos+fuentes), store, email, supabase, auth, site
public/               logo + favicon
supabase/schema.sql  Esquema de la base
pdf/                  HTML + PDF de recomendaciones
scripts/generate-pdf.mjs
```

## ⚠️ Aviso

La información es orientativa y de divulgación. **No reemplaza** la consulta con
el pediatra o la consultora de lactancia. Fuentes: HealthyChildren.org (AAP), The
Lullaby Trust, AEP, OMS, CDC y NHS (ver detalle en la página y el PDF).
