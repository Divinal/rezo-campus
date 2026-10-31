import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, LogOut, KeyRound, CalendarClock, FileText, BookOpen, ShieldCheck, Link as LinkIcon, Copy, MapPin, Clock,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { toast } from '../components/ui/sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchParcours, YearInscription } from '../lib/inscriptions';
import {
  Evaluation, Cours, Creneau, JOURS, evaluationType, formatDateTime, formatHeure, safeUrl, currentAcademicYear,
} from '../lib/notesShared';

interface SpaceStudent {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
  groupe: string | null;
  code_verification: string | null;
}

interface Discipline { id: number; nom: string; }

interface Note {
  id: number;
  discipline_id: number;
  note1: number | null;
  note2: number | null;
  note3: number | null;
  note_pratique: number | null;
  note_theorique: number | null;
}

const SESSION_KEY = 'studentSpaceSession';

const readSession = (): SpaceStudent | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const average = (n: Note): number | null => {
  const vals = [n.note1, n.note2, n.note3, n.note_pratique, n.note_theorique].filter((v): v is number => v !== null);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
};

const fmt = (v: number | null) => (v !== null ? v.toFixed(2) : '-');

interface Props {
  onBack: () => void;
}

const StudentSpace: React.FC<Props> = ({ onBack }) => {
  const [student, setStudent] = useState<SpaceStudent | null>(readSession);
  const [parcours, setParcours] = useState<YearInscription[]>([]);
  const [annee, setAnnee] = useState<string | null>(null);
  const [numero, setNumero] = useState('');
  const [code, setCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<'rdv' | 'emploi' | 'cours' | 'notes'>('rdv');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [coursList, setCoursList] = useState<Cours[]>([]);
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) loadParcours(student);
  }, [student]);

  useEffect(() => {
    if (student && annee) loadYear(student, annee);
  }, [student, annee]);

  const inscription = parcours.find(p => p.annee_academique === annee) ?? null;

  // The same login gives access to every year the student was enrolled in; the latest year opens first.
  const loadParcours = async (s: SpaceStudent) => {
    const [years, disc] = await Promise.all([
      fetchParcours(s.id),
      supabase.from('disciplines').select('*').order('nom'),
    ]);
    setParcours(years);
    setDisciplines(disc.data || []);
    setAnnee(years[0]?.annee_academique ?? currentAcademicYear());
  };

  const loadYear = async (s: SpaceStudent, year: string) => {
    setLoading(true);
    const current = parcours.find(p => p.annee_academique === year);
    // Without an inscription that year, filter on an impossible class so nothing from another class shows up.
    const classe = current?.classe ?? '';
    const [ev, cr, edt, nt] = await Promise.all([
      supabase.from('evaluations').select('*').eq('classe', classe).eq('annee_academique', year)
        .order('date_evaluation', { ascending: true }),
      supabase.from('cours').select('*').eq('classe', classe).eq('annee_academique', year)
        .order('created_at', { ascending: false }),
      supabase.from('emploi_du_temps').select('*').eq('classe', classe).eq('annee_academique', year)
        .order('jour').order('heure_debut'),
      supabase.from('notes').select('*').eq('student_id', s.id).eq('annee_academique', year),
    ]);
    if (ev.error || cr.error || edt.error || nt.error) toast.error('Certaines informations n\'ont pas pu être chargées');
    setEvaluations(ev.data || []);
    setCoursList(cr.data || []);
    setCreneaux(edt.data || []);
    setNotes(nt.data || []);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    const { data, error } = await supabase.rpc('student_login', {
      p_numero: numero.trim(),
      p_code: code.trim().toUpperCase(),
    });
    setLoggingIn(false);
    if (error) {
      setLoginError('Connexion impossible pour le moment. Réessayez plus tard.');
      return;
    }
    if (!data) {
      setLoginError('Identifiant ou code d\'accès incorrect.');
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    setStudent(data as SpaceStudent);
    setCode('');
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setStudent(null);
    setEvaluations([]);
    setCoursList([]);
    setCreneaux([]);
    setNotes([]);
    setParcours([]);
    setAnnee(null);
  };

  const disciplineName = (id: number | null) => disciplines.find(d => d.id === id)?.nom;

  // ── Connexion ─────────────────────────────────────────────────────────────
  if (!student) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <button onClick={onBack} className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-medium mb-5">
              <ArrowLeft size={20} /> Retour
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-teal-100 p-4 rounded-full mb-4">
                  <KeyRound size={36} className="text-teal-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Mon espace étudiant</h1>
                <p className="text-gray-500 text-sm mt-2 text-center">
                  Utilisez les informations de connexion envoyées par votre enseignant
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identifiant (numéro unique)</label>
                  <input
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code d'accès</label>
                  <input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-mono uppercase tracking-wider"
                    autoComplete="off"
                    required
                  />
                </div>
                {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 font-medium disabled:opacity-50"
                >
                  {loggingIn ? 'Connexion…' : 'Se connecter'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Tableau de bord ───────────────────────────────────────────────────────
  const now = new Date();
  const upcoming = evaluations.filter(ev => new Date(ev.date_evaluation) >= now);
  const past = evaluations.filter(ev => new Date(ev.date_evaluation) < now).reverse();

  const tabs = [
    { id: 'rdv' as const, label: 'Rendez-vous', icon: CalendarClock, count: upcoming.length },
    { id: 'emploi' as const, label: 'Emploi du temps', icon: Clock, count: creneaux.length },
    { id: 'cours' as const, label: 'Cours', icon: FileText, count: coursList.length },
    { id: 'notes' as const, label: 'Mes notes', icon: BookOpen, count: notes.length },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 px-3 sm:px-6 py-6 md:py-10">
        <div className="max-w-5xl mx-auto space-y-5">

          {/* Profil */}
          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <p className="text-sm text-teal-700 font-medium">Bienvenue dans votre espace</p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{student.nom} {student.prenom}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Classe : <strong>{inscription?.classe ?? `non inscrit en ${annee}`}</strong>
                  {' '}· Matricule : <strong>{student.numero}</strong>
                  {inscription?.groupe && <> · Groupe : <strong>{inscription.groupe}</strong></>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3">
                  <p className="text-xs text-teal-700 flex items-center gap-1 font-medium">
                    <ShieldCheck size={14} /> Code de vérification
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-teal-800 tracking-widest">
                      {student.code_verification ?? '—'}
                    </span>
                    {student.code_verification && (
                      <button
                        onClick={() => navigator.clipboard.writeText(student.code_verification!).then(() => toast.success('Code copié'))}
                        className="text-teal-600 hover:text-teal-800"
                        title="Copier"
                      >
                        <Copy size={15} />
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 px-3 py-2"
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Parcours : une année par inscription, même identifiant de connexion */}
          {parcours.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm font-medium text-gray-600 whitespace-nowrap">Mon parcours :</p>
              <div className="flex gap-2 overflow-x-auto">
                {parcours.map(p => (
                  <button
                    key={p.annee_academique}
                    onClick={() => setAnnee(p.annee_academique)}
                    className={`text-left px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition ${
                      annee === p.annee_academique
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-400'
                    }`}
                  >
                    <span className="font-semibold">{p.annee_academique}</span>
                    {p.annee_academique === currentAcademicYear() && <span className="ml-1 text-xs opacity-80">(en cours)</span>}
                    <span className={`block text-xs ${annee === p.annee_academique ? 'text-white/80' : 'text-gray-500'}`}>{p.classe}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Onglets */}
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  tab === id ? 'bg-teal-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} /> {label}
                <span className={`text-xs px-1.5 rounded-full ${tab === id ? 'bg-white/25' : 'bg-gray-100'}`}>{count}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7">
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
              </div>
            ) : tab === 'rdv' ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-3">Évaluations à venir</h2>
                  {upcoming.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4">Aucune évaluation programmée pour le moment.</p>
                  ) : (
                    <div className="space-y-3">
                      {upcoming.map(ev => {
                        const t = evaluationType(ev.type);
                        return (
                          <div key={ev.id} className="border border-gray-200 rounded-xl p-4 flex gap-4">
                            <div className="bg-teal-600 text-white rounded-lg px-3 py-2 text-center flex-shrink-0 w-16">
                              <div className="text-xl font-bold leading-none">{new Date(ev.date_evaluation).getDate()}</div>
                              <div className="text-xs uppercase">
                                {new Date(ev.date_evaluation).toLocaleDateString('fr-FR', { month: 'short' })}
                              </div>
                            </div>
                            <div className="min-w-0">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.badge}`}>{t.label}</span>
                              <p className="font-semibold text-gray-800 mt-1">{ev.titre}</p>
                              <p className="text-sm text-gray-600 capitalize">{formatDateTime(ev.date_evaluation)}</p>
                              <div className="flex flex-wrap gap-x-3 text-xs text-gray-500 mt-0.5">
                                {disciplineName(ev.discipline_id) && <span>{disciplineName(ev.discipline_id)}</span>}
                                {ev.lieu && <span className="flex items-center gap-1"><MapPin size={12} />{ev.lieu}</span>}
                              </div>
                              {ev.description && <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{ev.description}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {past.length > 0 && (
                  <div>
                    <h2 className="text-base font-semibold text-gray-500 mb-2">Évaluations passées</h2>
                    <div className="divide-y border border-gray-100 rounded-xl">
                      {past.map(ev => (
                        <div key={ev.id} className="px-4 py-2.5 text-sm text-gray-500 flex justify-between gap-3">
                          <span>{evaluationType(ev.type).label} — {ev.titre}</span>
                          <span className="whitespace-nowrap">{new Date(ev.date_evaluation).toLocaleDateString('fr-FR')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : tab === 'emploi' ? (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Emploi du temps</h2>
                <p className="text-sm text-gray-500 mb-4">Classe {inscription?.classe ?? '—'} · Année {annee}</p>
                {creneaux.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4">L'emploi du temps n'a pas encore été publié.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {JOURS.map((jour, i) => {
                      const duJour = creneaux.filter(c => c.jour === i + 1);
                      if (duJour.length === 0) return null;
                      const today = (new Date().getDay() + 6) % 7 === i;
                      return (
                        <div key={jour} className={`rounded-xl border ${today ? 'border-teal-500 ring-1 ring-teal-500' : 'border-gray-200'}`}>
                          <p className={`px-4 py-2 font-semibold text-sm rounded-t-xl ${today ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-700'}`}>
                            {jour}{today && " · aujourd'hui"}
                          </p>
                          <div className="divide-y">
                            {duJour.map(c => (
                              <div key={c.id} className="px-4 py-2.5">
                                <p className="font-mono text-xs text-teal-700">{formatHeure(c.heure_debut)} – {formatHeure(c.heure_fin)}</p>
                                <p className="font-medium text-gray-800 text-sm">{disciplineName(c.discipline_id) ?? '—'}</p>
                                {(c.enseignant || c.salle) && (
                                  <p className="text-xs text-gray-500">{[c.enseignant, c.salle].filter(Boolean).join(' · ')}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : tab === 'cours' ? (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">Cours partagés par vos enseignants</h2>
                {coursList.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4">Aucun cours partagé pour le moment.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {coursList.map(c => (
                      <div key={c.id} className="border border-gray-200 rounded-xl p-4">
                        <p className="font-semibold text-gray-800">{c.titre}</p>
                        <p className="text-xs text-gray-500">
                          {[disciplineName(c.discipline_id), new Date(c.created_at).toLocaleDateString('fr-FR')].filter(Boolean).join(' · ')}
                        </p>
                        {c.description && <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{c.description}</p>}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {safeUrl(c.fichier_url) && (
                            <a
                              href={safeUrl(c.fichier_url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg"
                            >
                              <FileText size={14} /> {c.fichier_nom ?? 'Télécharger'}
                            </a>
                          )}
                          {safeUrl(c.lien_url) && (
                            <a
                              href={safeUrl(c.lien_url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg"
                            >
                              <LinkIcon size={14} /> Ouvrir le lien
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">Mes notes — {annee}</h2>
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4">Aucune note enregistrée pour l'année {annee}.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="text-left px-3 py-2.5">Discipline</th>
                          <th className="px-2 py-2.5">C1</th>
                          <th className="px-2 py-2.5">C2</th>
                          <th className="px-2 py-2.5">C3</th>
                          <th className="px-2 py-2.5 text-blue-700">Exam. prat.</th>
                          <th className="px-2 py-2.5 text-purple-700">Exam. théo.</th>
                          <th className="px-2 py-2.5">Moyenne</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {notes.map(n => {
                          const avg = average(n);
                          return (
                            <tr key={n.id} className="text-center">
                              <td className="text-left px-3 py-2.5 font-medium text-gray-800">{disciplineName(n.discipline_id) ?? '—'}</td>
                              <td className="px-2">{fmt(n.note1)}</td>
                              <td className="px-2">{fmt(n.note2)}</td>
                              <td className="px-2">{fmt(n.note3)}</td>
                              <td className="px-2">{fmt(n.note_pratique)}</td>
                              <td className="px-2">{fmt(n.note_theorique)}</td>
                              <td className={`px-2 font-bold ${avg === null ? 'text-gray-400' : avg >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                                {fmt(avg)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentSpace;
