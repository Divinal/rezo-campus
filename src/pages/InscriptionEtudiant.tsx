import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, RefreshCcw, CheckCircle2, Copy, MessageCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  currentAcademicYear, generateAccessCode, numeroPrefix, accessMessage, normalizePhone, whatsappLink, STUDENT_COLUMNS,
} from '../lib/notesShared';

type Mode = 'nouveau' | 'ancien';

interface Result {
  prenom: string;
  numero: string;
  code: string | null;
  classe: string;
  telephone: string | null;
}

const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent';

interface UsedRegistration {
  prenom: string;
  numero: string;
  classe: string;
}

// One registration per browser and per academic year. The access code is never stored here.
const usedKey = (annee: string) => `inscriptionUtilisee-${annee}`;

const readUsed = (annee: string): UsedRegistration | null => {
  try {
    const raw = localStorage.getItem(usedKey(annee));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const markUsed = (annee: string, used: UsedRegistration) => {
  try {
    localStorage.setItem(usedKey(annee), JSON.stringify(used));
  } catch {
    // Storage unavailable (private mode): the registration itself is already saved.
  }
};

// Returns the first free identifier: IGICBO2026, then IGICBO2026-2, IGICBO2026-3…
const nextFreeNumero = async (prefix: string): Promise<string> => {
  const { data } = await supabase.from('students').select('numero').ilike('numero', `${prefix}%`);
  const taken = new Set((data || []).map((r: { numero: string }) => r.numero.toUpperCase()));
  if (!taken.has(prefix)) return prefix;
  let n = 2;
  while (taken.has(`${prefix}-${n}`)) n++;
  return `${prefix}-${n}`;
};

const InscriptionEtudiant: React.FC = () => {
  const annee = currentAcademicYear();
  const [mode, setMode] = useState<Mode>('nouveau');
  const [classes, setClasses] = useState<string[] | null>(null);
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', classe: '', numero: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [alreadyUsed] = useState(() => readUsed(annee));

  const finish = (r: Result) => {
    markUsed(annee, { prenom: r.prenom, numero: r.numero, classe: r.classe });
    setResult(r);
  };

  useEffect(() => {
    supabase
      .from('classes_ouvertes')
      .select('nom')
      .eq('annee_academique', annee)
      .order('nom')
      .then(({ data }) => setClasses((data || []).map((c: { nom: string }) => c.nom)));
  }, [annee]);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const inscrire = async (studentId: number, classe: string) =>
    supabase
      .from('inscriptions')
      .upsert([{ student_id: studentId, annee_academique: annee, classe, groupe: null }], {
        onConflict: 'student_id,annee_academique',
      });

  const registerNew = async () => {
    const nom = form.nom.trim().toUpperCase();
    const prenom = form.prenom.trim();
    const telephone = form.telephone.trim();
    if (!nom || !prenom || !form.classe) return setError('Remplissez votre nom, votre prénom et votre classe.');
    if (!normalizePhone(telephone)) return setError('Numéro WhatsApp invalide : indiquez l\'indicatif, ex. +212 1 23 456 789.');

    const code = generateAccessCode();
    const prefix = numeroPrefix(nom, annee);

    // Another registration can take the same identifier at the same time: retry on a unique violation.
    for (let attempt = 0; attempt < 5; attempt++) {
      const numero = await nextFreeNumero(prefix);
      const { data, error: insertError } = await supabase
        .from('students')
        .insert([{
          nom, prenom, numero, telephone, classe: form.classe, groupe: null,
          code_acces: code, acces_genere_le: new Date().toISOString(),
        }])
        .select('id')
        .single();

      if (insertError?.code === '23505') continue;
      if (insertError || !data) return setError('L\'inscription n\'a pas pu être enregistrée. Réessayez.');

      const { error: inscError } = await inscrire(data.id, form.classe);
      if (inscError) return setError('Votre compte est créé mais l\'inscription en classe a échoué. Contactez l\'établissement.');
      finish({ prenom, numero, code, classe: form.classe, telephone });
      return;
    }
    setError('L\'inscription n\'a pas pu être enregistrée. Réessayez.');
  };

  const registerReturning = async () => {
    const numero = form.numero.trim();
    const nom = form.nom.trim();
    if (!numero || !nom || !form.classe) return setError('Remplissez votre numéro, votre nom et votre classe.');

    const { data: student } = await supabase
      .from('students')
      .select(STUDENT_COLUMNS)
      .eq('numero', numero)
      .maybeSingle();

    const sameName = (a: string, b: string) =>
      a.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase() === b.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase();

    if (!student || !sameName(student.nom, nom)) {
      return setError('Aucun étudiant ne correspond à ce numéro et à ce nom.');
    }

    const telephone = form.telephone.trim();
    if (telephone && !normalizePhone(telephone)) {
      return setError('Numéro WhatsApp invalide : indiquez l\'indicatif, ex. +212 1 23 456 789.');
    }

    // A code is only issued to students who never had one, so a known numero cannot take over an existing account.
    const code = student.acces_genere_le ? null : generateAccessCode();
    const update: Record<string, string> = {};
    if (telephone) update.telephone = telephone;
    if (code) {
      update.code_acces = code;
      update.acces_genere_le = new Date().toISOString();
    }
    if (Object.keys(update).length) {
      const { error: updError, count } = await supabase
        .from('students')
        .update(update, { count: 'exact' })
        .eq('id', student.id);
      if (updError || count === 0) return setError('Vos informations n\'ont pas pu être mises à jour. Réessayez.');
    }

    const { error: inscError } = await inscrire(student.id, form.classe);
    if (inscError) return setError('La réinscription n\'a pas pu être enregistrée. Réessayez.');
    finish({ prenom: student.prenom, numero: student.numero, code, classe: form.classe, telephone: telephone || student.telephone });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (mode === 'nouveau') await registerNew();
      else await registerReturning();
    } finally {
      setSaving(false);
    }
  };

  const message = result
    ? result.code
      ? accessMessage(result.prenom, result.numero, result.code)
      : `Bonjour ${result.prenom}, votre réinscription en ${result.classe} pour ${annee} est enregistrée.\n` +
        `Connectez-vous avec votre identifiant ${result.numero} et votre code d'accès habituel.`
    : '';

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 px-4 py-10">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Inscription {annee}</h1>
            <p className="text-gray-600 mt-1">Inscrivez-vous dans votre classe et recevez vos accès à l'espace étudiant.</p>
          </div>

          {result ? (
            <div className="bg-white rounded-2xl shadow-xl p-7 text-center">
              <CheckCircle2 size={52} className="text-green-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Inscription enregistrée</h2>
              <p className="text-gray-600 mt-1">Classe {result.classe} · {annee}</p>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 my-5 text-left">
                <p className="text-sm text-gray-600">Identifiant</p>
                <p className="font-mono text-2xl font-bold text-teal-800 tracking-wider">{result.numero}</p>
                <p className="text-sm text-gray-600 mt-3">Code d'accès</p>
                {result.code ? (
                  <p className="font-mono text-2xl font-bold text-teal-800 tracking-widest">{result.code}</p>
                ) : (
                  <p className="text-sm text-gray-700">Votre code habituel (inchangé)</p>
                )}
              </div>

              {result.code && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                  Gardez ce code : il ne sera plus affiché. Envoyez-le-vous sur WhatsApp maintenant.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappLink(result.telephone, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium"
                >
                  <MessageCircle size={18} /> Recevoir sur WhatsApp
                </a>
                <button
                  onClick={copyMessage}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg font-medium"
                >
                  <Copy size={18} /> {copied ? 'Copié' : 'Copier'}
                </button>
              </div>

              <Link to="/notes" className="inline-flex items-center gap-1 text-teal-700 hover:underline mt-6 text-sm">
                Aller à l'espace étudiant
              </Link>
            </div>
          ) : alreadyUsed ? (
            <div className="bg-white rounded-2xl shadow-xl p-7 text-center">
              <CheckCircle2 size={52} className="text-teal-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Lien déjà utilisé sur cet appareil</h2>
              <p className="text-gray-600 mt-2">
                {alreadyUsed.prenom}, votre inscription en <strong>{alreadyUsed.classe}</strong> pour {annee} est
                déjà enregistrée sous l'identifiant <strong className="font-mono">{alreadyUsed.numero}</strong>.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Code d'accès perdu ou erreur dans l'inscription ? Contactez votre établissement.
              </p>
              <Link
                to="/notes"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium mt-6"
              >
                Aller à l'espace étudiant
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => { setMode('nouveau'); setError(''); }}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 text-sm font-medium transition ${
                    mode === 'nouveau' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-600 hover:border-teal-300'
                  }`}
                >
                  <UserPlus size={22} /> Nouvel étudiant
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('ancien'); setError(''); }}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 text-sm font-medium transition ${
                    mode === 'ancien' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-gray-200 text-gray-600 hover:border-teal-300'
                  }`}
                >
                  <RefreshCcw size={22} /> J'étais déjà inscrit
                </button>
              </div>

              {classes !== null && classes.length === 0 ? (
                <p className="text-center text-gray-600 py-6">
                  Les inscriptions pour {annee} ne sont pas encore ouvertes. Revenez plus tard.
                </p>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {mode === 'ancien' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Votre numéro (identifiant actuel)</label>
                      <input value={form.numero} onChange={set('numero')} className={inputClass} required />
                    </div>
                  )}
                  <div className={mode === 'nouveau' ? 'grid sm:grid-cols-2 gap-4' : ''}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                      <input value={form.nom} onChange={set('nom')} className={inputClass} required />
                    </div>
                    {mode === 'nouveau' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input value={form.prenom} onChange={set('prenom')} className={inputClass} required />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro WhatsApp {mode === 'ancien' && <span className="text-gray-400">(si nouveau numéro)</span>}
                    </label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={set('telephone')}
                      placeholder="+212 1 23 456 789"
                      className={inputClass}
                      required={mode === 'nouveau'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Classe {annee}</label>
                    <select value={form.classe} onChange={set('classe')} className={inputClass} required>
                      <option value="">-- Choisir votre classe --</option>
                      {(classes || []).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 font-medium disabled:opacity-50"
                  >
                    {saving ? 'Enregistrement…' : mode === 'nouveau' ? "M'inscrire" : 'Me réinscrire'}
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/notes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
              <ArrowLeft size={14} /> Retour aux notes
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InscriptionEtudiant;
