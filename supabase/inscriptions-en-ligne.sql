-- Inscriptions en ligne : classes proposées dans le formulaire d'inscription, par année académique.
-- À exécuter une fois dans l'éditeur SQL de Supabase.

create table if not exists classes_ouvertes (
  id bigint generated always as identity primary key,
  annee_academique text not null,
  nom text not null,
  created_at timestamptz not null default now(),
  unique (annee_academique, nom)
);

alter table classes_ouvertes enable row level security;
drop policy if exists "acces site" on classes_ouvertes;
create policy "acces site" on classes_ouvertes
  for all to anon, authenticated using (true) with check (true);
