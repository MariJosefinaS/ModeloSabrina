-- ─────────────────────────────────────────────────────────────
--  Esquema de la base de datos del portal de consultas
--  "Cuidados en internación conjunta"
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
  -- 'publico' = comentario que se ve en el foro
  -- 'privado' = consulta que se responde SÓLO por mail
  visibilidad   text not null default 'privado'
                  check (visibilidad in ('publico', 'privado')),
  respuesta     text,
  respondido_at timestamptz,
  created_at    timestamptz not null default now()
);

-- Para bases creadas antes de que existieran las dos vías. En aquel momento
-- el foro publicaba todo, así que lo viejo queda como público.
alter table public.consultas
  add column if not exists visibilidad text not null default 'publico';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'consultas_visibilidad_check'
  ) then
    alter table public.consultas
      add constraint consultas_visibilidad_check
      check (visibilidad in ('publico', 'privado'));
  end if;
end $$;

create index if not exists consultas_created_at_idx
  on public.consultas (created_at desc);

create index if not exists consultas_visibilidad_idx
  on public.consultas (visibilidad, created_at desc);

-- El servidor de la app accede con la clave service_role (que ignora RLS).
-- Activamos RLS y NO creamos políticas públicas: así la clave anónima no
-- puede leer ni escribir directamente en la tabla.
alter table public.consultas enable row level security;
