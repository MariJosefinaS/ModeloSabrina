-- ─────────────────────────────────────────────────────────────
--  Esquema de la base de datos del foro "Bebé Abrigado"
--  Ejecutá esto en el SQL Editor de tu proyecto Supabase.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.consultas (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  email         text,
  tema          text not null default 'otro'
                  check (tema in ('vestir', 'dormir', 'amamantar', 'otro')),
  mensaje       text not null,
  respuesta     text,
  respondido_at timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists consultas_created_at_idx
  on public.consultas (created_at desc);

-- El servidor de la app accede con la clave service_role (que ignora RLS).
-- Activamos RLS y NO creamos políticas públicas: así la clave anónima no
-- puede leer ni escribir directamente en la tabla.
alter table public.consultas enable row level security;
