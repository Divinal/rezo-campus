-- Sécurité : la clé publique du site ne donne plus accès qu'à ce qui est destiné au public.
-- Le personnel (admin, direction, enseignants) se connecte avec un vrai compte Supabase inscrit dans la table staff.
-- Les étudiants accèdent à leurs notes avec leur numéro ET leur code d'accès, via des fonctions vérifiées côté base.
-- À exécuter une fois dans l'éditeur SQL de Supabase, APRÈS tous les autres scripts. Peut être relancé sans risque.
--
-- AVANT de déployer le nouveau site :
--   1. Authentication > Users > Add user : créer un compte (email + mot de passe solide) par membre du personnel.
--   2. Exécuter ce script.
--   3. Ajouter chaque compte au personnel :
--        insert into staff (user_id) select id from auth.users where email = 'prenom.nom@exemple.com';

create extension if not exists pgcrypto with schema extensions;

-- 1. Personnel autorisé
create table if not exists staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table staff enable row level security;
revoke all on staff from anon, authenticated;

create or replace function is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from staff where user_id = auth.uid());
$$;

grant execute on function is_staff() to anon, authenticated;

-- 2. On repart de zéro : suppression de toutes les règles existantes sur les tables du site
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'students', 'notes', 'inscriptions', 'disciplines', 'evaluations', 'cours', 'emploi_du_temps',
        'classes_ouvertes', 'Articles', 'proprietes', 'ContactMessages', 'Inscription', 'foire_inscriptions',
        'Comments', 'commentaires_proprietes', 'messages', 'user_profiles'
      )
  loop
    execute format('drop policy %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- 3. Règles par type de table (les tables absentes de la base sont ignorées)
do $$
declare t text;
begin
  -- Personnel uniquement : données des étudiants
  foreach t in array array['students', 'notes', 'inscriptions'] loop
    continue when to_regclass(format('public.%I', t)) is null;
    execute format('alter table %I enable row level security', t);
    execute format('create policy "staff" on %I for all to authenticated using (is_staff()) with check (is_staff())', t);
  end loop;

  -- Lecture publique, modification par le personnel
  foreach t in array array[
    'disciplines', 'evaluations', 'cours', 'emploi_du_temps', 'classes_ouvertes', 'Articles', 'proprietes'
  ] loop
    continue when to_regclass(format('public.%I', t)) is null;
    execute format('alter table %I enable row level security', t);
    execute format('create policy "lecture publique" on %I for select to anon, authenticated using (true)', t);
    execute format('create policy "staff" on %I for all to authenticated using (is_staff()) with check (is_staff())', t);
  end loop;

  -- Formulaires : tout le monde envoie, seul le personnel lit
  foreach t in array array['ContactMessages', 'Inscription', 'foire_inscriptions'] loop
    continue when to_regclass(format('public.%I', t)) is null;
    execute format('alter table %I enable row level security', t);
    execute format('create policy "envoi public" on %I for insert to anon, authenticated with check (true)', t);
    execute format('create policy "staff" on %I for all to authenticated using (is_staff()) with check (is_staff())', t);
  end loop;

  -- Commentaires : publics en lecture et en ajout, modération par le personnel
  foreach t in array array['Comments', 'commentaires_proprietes'] loop
    continue when to_regclass(format('public.%I', t)) is null;
    execute format('alter table %I enable row level security', t);
    execute format('create policy "lecture publique" on %I for select to anon, authenticated using (true)', t);
    execute format('create policy "envoi public" on %I for insert to anon, authenticated with check (true)', t);
    execute format('create policy "staff" on %I for all to authenticated using (is_staff()) with check (is_staff())', t);
  end loop;
end $$;

-- Colonnes des étudiants : plus rien pour les visiteurs anonymes ; le code d'accès n'est jamais relu
revoke all on students from anon;
revoke select on students from authenticated;
grant select (id, nom, prenom, classe, numero, groupe, telephone, code_verification, acces_genere_le)
  on students to authenticated;
grant insert, update, delete on students to authenticated;

-- Commentaires des annonces : l'e-mail de l'auteur reste réservé à l'équipe, le public lit via property_comments()
drop policy if exists "lecture publique" on commentaires_proprietes;

create or replace function property_comments(p_propriete_id bigint)
returns table (id bigint, propriete_id bigint, auteur_nom text, contenu text, cree_le timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select c.id::bigint, c.propriete_id::bigint, c.auteur_nom::text, c.contenu::text, c.cree_le::timestamptz
  from commentaires_proprietes c
  where c.propriete_id = p_propriete_id
  order by c.cree_le desc;
$$;

grant execute on function property_comments(bigint) to anon, authenticated;

-- Messagerie : chaque utilisateur ne voit que sa conversation avec l'équipe
alter table messages enable row level security;
create policy "ma conversation" on messages for select to authenticated
  using (user_id::text = auth.uid()::text);
create policy "envoyer un message" on messages for insert to authenticated
  with check (user_id::text = auth.uid()::text and sender_id::text = auth.uid()::text);
create policy "marquer comme lu" on messages for update to authenticated
  using (user_id::text = auth.uid()::text) with check (user_id::text = auth.uid()::text);
create policy "staff" on messages for all to authenticated using (is_staff()) with check (is_staff());

-- Profils : chacun le sien, le personnel voit tout
alter table user_profiles enable row level security;
create policy "mon profil" on user_profiles for select to authenticated using (id::text = auth.uid()::text);
create policy "creer mon profil" on user_profiles for insert to authenticated with check (id::text = auth.uid()::text);
create policy "modifier mon profil" on user_profiles for update to authenticated
  using (id::text = auth.uid()::text) with check (id::text = auth.uid()::text);
create policy "staff" on user_profiles for all to authenticated using (is_staff()) with check (is_staff());

-- Le profil est créé côté base à l'inscription (le site n'a pas encore de session si l'email doit être confirmé)
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into user_profiles (id, full_name, email, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email, new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- 4. Fichiers de cours : lecture publique, ajout et suppression par le personnel
drop policy if exists "cours ajout" on storage.objects;
drop policy if exists "cours suppression" on storage.objects;
create policy "cours ajout" on storage.objects for insert to authenticated
  with check (bucket_id = 'cours' and public.is_staff());
create policy "cours suppression" on storage.objects for delete to authenticated
  using (bucket_id = 'cours' and public.is_staff());

-- 5. Espace étudiant : chaque appel revérifie le numéro et le code d'accès
create or replace function student_id_for(p_numero text, p_code text)
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select id::bigint from students
  where numero = p_numero and code_acces is not null and code_acces = p_code
  limit 1;
$$;

revoke execute on function student_id_for(text, text) from public, anon, authenticated;

create or replace function student_parcours(p_numero text, p_code text)
returns table (annee_academique text, classe text, groupe text)
language sql
stable
security definer
set search_path = public
as $$
  select i.annee_academique::text, i.classe::text, i.groupe::text
  from inscriptions i
  where i.student_id = student_id_for(p_numero, p_code)
  order by i.annee_academique desc;
$$;

create or replace function student_notes(p_numero text, p_code text, p_annee text)
returns setof notes
language sql
stable
security definer
set search_path = public
as $$
  select * from notes
  where student_id = student_id_for(p_numero, p_code) and annee_academique = p_annee;
$$;

grant execute on function student_parcours(text, text) to anon, authenticated;
grant execute on function student_notes(text, text, text) to anon, authenticated;

-- 6. Inscription en ligne : la base crée l'étudiant et son code, le site ne touche plus à la table students
create or replace function new_access_code()
returns text
language sql
volatile
set search_path = public
as $$
  select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', get_byte(r.b, i) % 31 + 1, 1), '' order by i)
  from (select extensions.gen_random_bytes(6) as b) r, generate_series(0, 5) i;
$$;

revoke execute on function new_access_code() from public, anon, authenticated;

create or replace function letters_only(p text)
returns text
language sql
immutable
as $$
  select regexp_replace(upper(normalize(coalesce(p, ''), NFD)), '[^A-Z]', '', 'g');
$$;

-- Nouvel étudiant : IGIC + deux premières lettres du nom + année, puis IGICBO2026-2, IGICBO2026-3…
create or replace function register_student(p_nom text, p_prenom text, p_telephone text, p_classe text, p_annee text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_nom text := upper(trim(coalesce(p_nom, '')));
  v_prenom text := trim(coalesce(p_prenom, ''));
  v_prefix text;
  v_numero text;
  v_code text := new_access_code();
  v_id bigint;
  n int;
begin
  if v_nom = '' or v_prenom = '' or trim(coalesce(p_telephone, '')) = '' then
    raise exception 'Champs manquants';
  end if;
  if not exists (select 1 from classes_ouvertes where annee_academique = p_annee and nom = p_classe) then
    raise exception 'Classe non ouverte aux inscriptions';
  end if;

  v_prefix := 'IGIC' || rpad(left(letters_only(v_nom), 2), 2, 'X') || left(p_annee, 4);

  -- Une autre inscription peut prendre le même numéro au même moment : on réessaie.
  for attempt in 1..5 loop
    v_numero := v_prefix;
    n := 2;
    while exists (select 1 from students where upper(numero) = upper(v_numero)) loop
      v_numero := v_prefix || '-' || n;
      n := n + 1;
    end loop;
    begin
      insert into students (nom, prenom, numero, telephone, classe, groupe, code_acces, acces_genere_le)
      values (v_nom, v_prenom, v_numero, trim(p_telephone), p_classe, null, v_code, now())
      returning id into v_id;
      exit;
    exception when unique_violation then
      v_id := null;
    end;
  end loop;

  if v_id is null then
    raise exception 'Numéro indisponible';
  end if;

  insert into inscriptions (student_id, annee_academique, classe, groupe)
  values (v_id, p_annee, p_classe, null)
  on conflict (student_id, annee_academique) do update set classe = excluded.classe, groupe = null;

  return json_build_object('numero', v_numero, 'code', v_code);
end $$;

-- Ancien étudiant : renvoie null si le numéro et le nom ne correspondent pas.
-- Un code n'est créé que pour un étudiant qui n'en a jamais eu : un numéro connu ne permet pas de prendre un compte existant.
create or replace function reregister_student(p_numero text, p_nom text, p_telephone text, p_classe text, p_annee text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  s students%rowtype;
  v_tel text := nullif(trim(coalesce(p_telephone, '')), '');
  v_code text;
begin
  if not exists (select 1 from classes_ouvertes where annee_academique = p_annee and nom = p_classe) then
    raise exception 'Classe non ouverte aux inscriptions';
  end if;

  select * into s from students where numero = trim(coalesce(p_numero, ''));
  if not found or letters_only(s.nom) <> letters_only(p_nom) then
    return null;
  end if;

  if s.acces_genere_le is null then
    v_code := new_access_code();
  end if;

  update students
  set telephone = coalesce(v_tel, telephone),
      code_acces = coalesce(v_code, code_acces),
      acces_genere_le = case when v_code is null then acces_genere_le else now() end
  where id = s.id;

  insert into inscriptions (student_id, annee_academique, classe, groupe)
  values (s.id, p_annee, p_classe, null)
  on conflict (student_id, annee_academique) do update set classe = excluded.classe, groupe = null;

  return json_build_object(
    'prenom', s.prenom, 'numero', s.numero, 'code', v_code, 'telephone', coalesce(v_tel, s.telephone)
  );
end $$;

grant execute on function register_student(text, text, text, text, text) to anon, authenticated;
grant execute on function reregister_student(text, text, text, text, text) to anon, authenticated;

-- 7. Compteur de vues des annonces immobilières (les visiteurs ne peuvent plus modifier les annonces)
create or replace function increment_vues(p_id bigint)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  update proprietes set vues = coalesce(vues, 0) + 1 where id = p_id;
$$;

grant execute on function increment_vues(bigint) to anon, authenticated;

-- 8. Consultation des notes par numéro (sans compte), comme les années précédentes.
-- Ne renvoie que la fiche du numéro demandé ; les camarades de groupe sont donnés sans leur numéro.
create or replace function public_student_results(p_numero text, p_annee text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  with s as (
    select id, nom, prenom, numero from students where numero = trim(coalesce(p_numero, '')) limit 1
  ),
  i as (
    select classe, groupe from inscriptions
    where student_id = (select id from s) and annee_academique = p_annee
  )
  select case when not exists (select 1 from s) then null else json_build_object(
    'student', (
      select json_build_object(
        'id', s.id, 'nom', s.nom, 'prenom', s.prenom, 'numero', s.numero,
        'classe', coalesce((select classe from i), ''), 'groupe', (select groupe from i)
      ) from s
    ),
    'notes', coalesce((
      select json_agg(n) from notes n
      where n.student_id = (select id from s) and n.annee_academique = p_annee
    ), '[]'::json),
    'groupe_membres', coalesce((
      select json_agg(json_build_object('id', st.id, 'nom', st.nom, 'prenom', st.prenom) order by st.nom, st.prenom)
      from inscriptions gi
      join students st on st.id = gi.student_id
      cross join i
      where gi.annee_academique = p_annee
        and gi.classe = i.classe
        and gi.groupe = i.groupe
        and gi.student_id <> (select id from s)
    ), '[]'::json)
  ) end;
$$;

grant execute on function public_student_results(text, text) to anon, authenticated;
