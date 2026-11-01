import { supabase } from './supabaseClient';

// Classe and groupe come from the inscription of the requested academic year, not from the student row.
export interface YearStudent {
  id: number;
  nom: string;
  prenom: string;
  numero: string;
  telephone: string | null;
  code_verification: string | null;
  acces_genere_le: string | null;
  classe: string;
  groupe: string | null;
}

export interface Inscription {
  classe: string;
  groupe: string | null;
}

const EMBEDDED_STUDENT = 'students(id, nom, prenom, numero, telephone, code_verification, acces_genere_le)';

export const fetchYearStudents = async (annee: string): Promise<{ data: YearStudent[]; error: boolean }> => {
  const { data, error } = await supabase
    .from('inscriptions')
    .select(`classe, groupe, ${EMBEDDED_STUDENT}`)
    .eq('annee_academique', annee);

  if (error) return { data: [], error: true };

  const rows: YearStudent[] = (data || [])
    .filter((r: any) => r.students)
    .map((r: any) => ({ ...r.students, classe: r.classe, groupe: r.groupe }));
  rows.sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, 'fr'));
  return { data: rows, error: false };
};

export interface YearInscription extends Inscription {
  annee_academique: string;
}

export const classesOf = (students: { classe: string }[]): string[] =>
  [...new Set(students.map(s => s.classe))].sort();
