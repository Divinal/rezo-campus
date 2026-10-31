// code_acces is never selected: the database only grants read access to these columns.
export const STUDENT_COLUMNS = 'id, nom, prenom, classe, numero, groupe, telephone, code_verification, acces_genere_le';

// The academic year switches in September.
export const currentAcademicYear = (d = new Date()): string => {
  const y = d.getFullYear();
  return d.getMonth() >= 8 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
};

const FIRST_ACADEMIC_YEAR = 2025;

export const ACADEMIC_YEARS: string[] = (() => {
  const current = parseInt(currentAcademicYear(), 10);
  const years: string[] = [];
  for (let y = current; y >= FIRST_ACADEMIC_YEAR; y--) years.push(`${y}-${y + 1}`);
  return years;
})();

export interface Creneau {
  id: number;
  classe: string;
  annee_academique: string;
  jour: number;
  heure_debut: string;
  heure_fin: string;
  discipline_id: number | null;
  enseignant: string | null;
  salle: string | null;
}

export const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const formatHeure = (t: string) => t.slice(0, 5).replace(':', 'h');

// wa.me needs the full international number (country code, no "+" or leading "00").
export const normalizePhone = (phone: string | null): string | null => {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length < 8 || digits.startsWith('0')) return null;
  return digits;
};

export const whatsappLink = (phone: string | null, text: string): string => {
  const number = normalizePhone(phone);
  return `https://wa.me/${number ?? ''}?text=${encodeURIComponent(text)}`;
};

export interface Evaluation {
  id: number;
  classe: string;
  discipline_id: number | null;
  type: EvaluationType;
  titre: string;
  date_evaluation: string;
  lieu: string | null;
  description: string | null;
  annee_academique: string;
}

export interface Cours {
  id: number;
  classe: string;
  discipline_id: number | null;
  titre: string;
  description: string | null;
  lien_url: string | null;
  fichier_url: string | null;
  fichier_nom: string | null;
  created_at: string;
  annee_academique: string;
}

export type EvaluationType = 'controle' | 'examen_pratique' | 'examen_theorique' | 'autre';

export const EVALUATION_TYPES: { value: EvaluationType; label: string; badge: string }[] = [
  { value: 'controle', label: 'Contrôle', badge: 'bg-amber-100 text-amber-800' },
  { value: 'examen_pratique', label: 'Examen pratique', badge: 'bg-blue-100 text-blue-800' },
  { value: 'examen_theorique', label: 'Examen théorique', badge: 'bg-purple-100 text-purple-800' },
  { value: 'autre', label: 'Autre évaluation', badge: 'bg-gray-100 text-gray-700' },
];

export const evaluationType = (type: string) =>
  EVALUATION_TYPES.find(t => t.value === type) ?? EVALUATION_TYPES[3];

const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const generateAccessCode = (length = 6): string => {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
};

// IGIC + first two letters of the family name + the academic year's start year, e.g. IGICBO2026.
export const numeroPrefix = (nom: string, annee: string): string => {
  const letters = nom.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase();
  return `IGIC${letters.slice(0, 2).padEnd(2, 'X')}${annee.slice(0, 4)}`;
};

export const registrationUrl = () =>
  `${window.location.origin}${window.location.pathname}#/inscription-etudiant`;

export const studentSpaceUrl = () =>
  `${window.location.origin}${window.location.pathname}#/notes`;

export const accessMessage = (prenom: string, numero: string, code: string) =>
  `Bonjour ${prenom}, voici vos accès à votre espace étudiant Rézo Campus :\n` +
  `Identifiant : ${numero}\n` +
  `Code d'accès : ${code}\n` +
  `Lien : ${studentSpaceUrl()} (choisir « Accéder à mon espace »)`;

export const safeUrl = (url: string | null): string | undefined =>
  url && /^https?:\/\//i.test(url) ? url : undefined;

export const normalizeUrl = (url: string): string | null => {
  const trimmed = url.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
