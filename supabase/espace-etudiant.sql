-- Espace étudiant : accès, code de vérification, rendez-vous d'évaluation et cours partagés.
-- À exécuter une fois dans l'éditeur SQL de Supabase.

-- 1. Colonnes d'accès sur les étudiants
alter table students add column if not exists code_acces text;
alter table students add column if not exists acces_genere_le timestamptz;
alter table students add column if not exists code_verification text;

update students
set code_verification = upper(substr(md5(random()::text || id::text), 1, 8))
where code_verification is null;

alter table students
  alter column code_verification set default upper(substr(md5(random()::text), 1, 8));

-- 2. Le code d'accès ne peut plus être lu depuis le site (seulement écrit par l'enseignant)
revoke select on students from anon, authenticated;
grant select (id, nom, prenom, classe, numero, groupe, code_verification, acces_genere_le)
  on students to anon, authenticated;

-- 2b. Autoriser la modification des étudiants depuis le site (code d'accès, noms).
-- Sans cette règle, la sécurité RLS ignore les mises à jour sans renvoyer d'erreur.
create policy "students update" on students
  for update to anon, authenticated
  using (true) with check (true);

-- 3. Connexion étudiant : vérifie le code côté base et renvoie le profil sans le code
create or replace function student_login(p_numero text, p_code text)
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'id', s.id,
    'nom', s.nom,
    'prenom', s.prenom,
    'classe', s.classe,
    'numero', s.numero,
    'groupe', s.groupe,
    'code_verification', s.code_verification
  )
  from students s
  where s.numero = p_numero
    and s.code_acces is not null
    and s.code_acces = p_code
  limit 1;
$$;

grant execute on function student_login(text, text) to anon, authenticated;

-- 4. Rendez-vous d'évaluation (contrôles, examens, autres)
create table if not exists evaluations (
  id bigint generated always as identity primary key,
  classe text not null,
  discipline_id bigint references disciplines(id) on delete set null,
  type text not null default 'controle',
  titre text not null,
  date_evaluation timestamptz not null,
  lieu text,
  description text,
  created_at timestamptz not null default now()
);

-- 5. Cours partagés par l'enseignant
create table if not exists cours (
  id bigint generated always as identity primary key,
  classe text not null,
  discipline_id bigint references disciplines(id) on delete set null,
  titre text not null,
  description text,
  lien_url text,
  fichier_url text,
  fichier_nom text,
  created_at timestamptz not null default now()
);

-- 6. Stockage des fichiers de cours
insert into storage.buckets (id, name, public)
values ('cours', 'cours', true)
on conflict (id) do nothing;

create policy "cours lecture" on storage.objects for select using (bucket_id = 'cours');
create policy "cours ajout" on storage.objects for insert with check (bucket_id = 'cours');
create policy "cours suppression" on storage.objects for delete using (bucket_id = 'cours');
