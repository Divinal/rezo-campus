-- Points de participation (bonus) par contrôle, avec justification visible par l'étudiant.
-- Note finale d'un contrôle = note saisie + bonus, plafonnée à 20 (calculée par le site).
-- À exécuter une fois dans l'éditeur SQL de Supabase, APRÈS securite.sql.

create table if not exists bonus_notes (
  id bigint generated always as identity primary key,
  student_id bigint not null references students(id) on delete cascade,
  discipline_id bigint not null references disciplines(id) on delete cascade,
  annee_academique text not null,
  controle text not null check (controle in ('note1', 'note2', 'note3')),
  points numeric(4, 2) not null check (points > 0 and points <= 20),
  justification text not null check (length(trim(justification)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists bonus_notes_eleve_annee_idx on bonus_notes (student_id, annee_academique);

-- Personnel uniquement, comme les notes
alter table bonus_notes enable row level security;
drop policy if exists "staff" on bonus_notes;
create policy "staff" on bonus_notes for all to authenticated using (is_staff()) with check (is_staff());

-- Espace étudiant : ses bonus de l'année, après vérification du numéro et du code d'accès
create or replace function student_bonus(p_numero text, p_code text, p_annee text)
returns table (
  id bigint, discipline_id bigint, controle text, points numeric, justification text, created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select b.id, b.discipline_id::bigint, b.controle, b.points, b.justification, b.created_at
  from bonus_notes b
  where b.student_id = student_id_for(p_numero, p_code) and b.annee_academique = p_annee
  order by b.created_at desc;
$$;

grant execute on function student_bonus(text, text, text) to anon, authenticated;

-- Les notes ne se consultent plus par simple numéro : uniquement dans l'espace étudiant (numéro + code).
drop function if exists public_student_results(text, text);
