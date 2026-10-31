-- Année académique, emploi du temps et téléphone des étudiants.
-- À exécuter une fois dans l'éditeur SQL de Supabase.

-- 1. Téléphone des étudiants (pour l'envoi WhatsApp)
alter table students add column if not exists telephone text;
grant select (telephone) on students to anon, authenticated;

-- 2. Année académique sur les notes : les notes existantes sont celles de 2025-2026
alter table notes add column if not exists annee_academique text;
update notes set annee_academique = '2025-2026' where annee_academique is null;
alter table notes alter column annee_academique set not null;

-- Un étudiant peut maintenant avoir une ligne de notes par matière ET par année :
-- on retire les anciennes contraintes d'unicité (étudiant, matière) si elles existent.
do $$
declare c record;
begin
  for c in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    where rel.relname = 'notes' and con.contype = 'u'
  loop
    execute format('alter table notes drop constraint %I', c.conname);
  end loop;
end $$;

create index if not exists notes_annee_idx on notes (annee_academique, student_id);

-- 3. Année académique sur les rendez-vous et les cours partagés
alter table evaluations add column if not exists annee_academique text;
update evaluations set annee_academique = '2026-2027' where annee_academique is null;
alter table evaluations alter column annee_academique set not null;

alter table cours add column if not exists annee_academique text;
update cours set annee_academique = '2026-2027' where annee_academique is null;
alter table cours alter column annee_academique set not null;

-- 4. Emploi du temps (créneaux hebdomadaires par classe et par année)
create table if not exists emploi_du_temps (
  id bigint generated always as identity primary key,
  classe text not null,
  annee_academique text not null,
  jour smallint not null check (jour between 1 and 7),
  heure_debut time not null,
  heure_fin time not null,
  discipline_id bigint references disciplines(id) on delete set null,
  enseignant text,
  salle text,
  created_at timestamptz not null default now()
);
