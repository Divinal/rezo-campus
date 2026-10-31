-- Classes par année académique : chaque étudiant a une inscription (classe, groupe) par année.
-- L'étudiant garde son numéro, son code d'accès et l'historique de ses notes d'une année à l'autre.
-- À exécuter une fois dans l'éditeur SQL de Supabase, APRÈS annee-emploi-telephone.sql.

create table if not exists inscriptions (
  id bigint generated always as identity primary key,
  student_id bigint not null references students(id) on delete cascade,
  annee_academique text not null,
  classe text not null,
  groupe text,
  created_at timestamptz not null default now(),
  unique (student_id, annee_academique)
);

create index if not exists inscriptions_annee_classe_idx on inscriptions (annee_academique, classe);

-- Les étudiants déjà enregistrés appartiennent à l'année 2025-2026
insert into inscriptions (student_id, annee_academique, classe, groupe)
select id, '2025-2026', classe, groupe
from students
where classe is not null
on conflict (student_id, annee_academique) do nothing;
