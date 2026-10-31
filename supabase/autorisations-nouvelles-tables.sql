-- Correctif : la sécurité RLS est activée sur les nouvelles tables sans aucune règle,
-- donc le site ne peut ni les lire ni y écrire (les classes 2025-2026 paraissent vides).
-- Ce script donne au site le même accès que sur les tables existantes (notes, students).
-- Il peut être exécuté plusieurs fois sans risque.

do $$
declare t text;
begin
  foreach t in array array['inscriptions', 'evaluations', 'cours', 'emploi_du_temps'] loop
    execute format('drop policy if exists "acces site" on %I', t);
    execute format(
      'create policy "acces site" on %I for all to anon, authenticated using (true) with check (true)', t
    );
  end loop;
end $$;

-- Inscrit en 2025-2026 tous les étudiants existants qui ne le sont pas encore.
insert into inscriptions (student_id, annee_academique, classe, groupe)
select id, '2025-2026', classe, groupe
from students
where classe is not null
on conflict (student_id, annee_academique) do nothing;
