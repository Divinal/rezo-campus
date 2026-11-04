-- Exercices envoyés par les enseignants à une classe, pour une année académique.
-- Mêmes droits que les cours : lecture publique, modification par le personnel.
-- Les fichiers joints sont rangés dans l'espace de stockage "cours", déjà configuré.
-- À exécuter une fois dans l'éditeur SQL de Supabase, APRÈS securite.sql. Peut être relancé sans risque.

create table if not exists exercices (
  id bigint generated always as identity primary key,
  classe text not null,
  annee_academique text not null,
  discipline_id bigint references disciplines(id) on delete set null,
  titre text not null check (length(trim(titre)) > 0),
  enonce text,
  lien_url text,
  fichier_url text,
  fichier_nom text,
  date_limite date,
  created_at timestamptz not null default now()
);

create index if not exists exercices_classe_annee_idx on exercices (classe, annee_academique);

alter table exercices enable row level security;

drop policy if exists "lecture publique" on exercices;
create policy "lecture publique" on exercices for select to anon, authenticated using (true);

drop policy if exists "staff" on exercices;
create policy "staff" on exercices for all to authenticated using (is_staff()) with check (is_staff());
