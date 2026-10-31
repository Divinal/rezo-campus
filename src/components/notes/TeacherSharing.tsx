import React, { useEffect, useState } from 'react';
import { CalendarClock, FileText, Trash2, Plus, Link as LinkIcon, Upload, ChevronDown, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from '../ui/sonner';
import {
  Evaluation, Cours, Creneau, EvaluationType, EVALUATION_TYPES, JOURS, evaluationType, formatDateTime, formatHeure,
  safeUrl, normalizeUrl,
} from '../../lib/notesShared';

interface Discipline { id: number; nom: string; }

interface Props {
  classes: string[];
  disciplines: Discipline[];
  annee: string;
}

const emptyEvaluation = { type: 'controle' as EvaluationType, titre: '', date: '', heure: '', lieu: '', description: '', discipline_id: '' };
const emptyCours = { titre: '', description: '', lien_url: '', discipline_id: '' };
const emptyCreneau = { jour: '1', heure_debut: '08:00', heure_fin: '10:00', discipline_id: '', enseignant: '', salle: '' };

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm';

const TeacherSharing: React.FC<Props> = ({ classes, disciplines, annee }) => {
  const [tab, setTab] = useState<'evaluations' | 'cours' | 'emploi'>('evaluations');
  const [classe, setClasse] = useState('');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [coursList, setCoursList] = useState<Cours[]>([]);
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [evalForm, setEvalForm] = useState(emptyEvaluation);
  const [coursForm, setCoursForm] = useState(emptyCours);
  const [creneauForm, setCreneauForm] = useState(emptyCreneau);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (classe) loadShared(classe);
    else { setEvaluations([]); setCoursList([]); setCreneaux([]); }
  }, [classe, annee]);

  const loadShared = async (c: string) => {
    const [ev, cr, edt] = await Promise.all([
      supabase.from('evaluations').select('*').eq('classe', c).eq('annee_academique', annee).order('date_evaluation', { ascending: true }),
      supabase.from('cours').select('*').eq('classe', c).eq('annee_academique', annee).order('created_at', { ascending: false }),
      supabase.from('emploi_du_temps').select('*').eq('classe', c).eq('annee_academique', annee)
        .order('jour').order('heure_debut'),
    ]);
    if (ev.error || cr.error || edt.error) toast.error('Erreur lors du chargement des partages');
    setEvaluations(ev.data || []);
    setCoursList(cr.data || []);
    setCreneaux(edt.data || []);
  };

  const addCreneau = async () => {
    if (creneauForm.heure_fin <= creneauForm.heure_debut) {
      toast.error("L'heure de fin doit être après l'heure de début");
      return;
    }
    if (!creneauForm.discipline_id) {
      toast.error('Choisissez la discipline');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('emploi_du_temps').insert([{
      classe,
      annee_academique: annee,
      jour: parseInt(creneauForm.jour),
      heure_debut: creneauForm.heure_debut,
      heure_fin: creneauForm.heure_fin,
      discipline_id: parseInt(creneauForm.discipline_id),
      enseignant: creneauForm.enseignant.trim() || null,
      salle: creneauForm.salle.trim() || null,
    }]);
    setSaving(false);
    if (error) {
      toast.error("Erreur lors de l'ajout du créneau");
      return;
    }
    toast.success("Créneau ajouté à l'emploi du temps");
    setCreneauForm({ ...emptyCreneau, jour: creneauForm.jour });
    loadShared(classe);
  };

  const deleteCreneau = async (id: number) => {
    if (!confirm('Supprimer ce créneau ?')) return;
    const { error } = await supabase.from('emploi_du_temps').delete().eq('id', id);
    if (error) toast.error('Erreur lors de la suppression');
    else loadShared(classe);
  };

  const disciplineName = (id: number | null) => disciplines.find(d => d.id === id)?.nom;

  const addEvaluation = async () => {
    if (!evalForm.titre.trim() || !evalForm.date) {
      toast.error('Le titre et la date sont obligatoires');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('evaluations').insert([{
      classe,
      annee_academique: annee,
      type: evalForm.type,
      titre: evalForm.titre.trim(),
      date_evaluation: new Date(`${evalForm.date}T${evalForm.heure || '08:00'}`).toISOString(),
      lieu: evalForm.lieu.trim() || null,
      description: evalForm.description.trim() || null,
      discipline_id: evalForm.discipline_id ? parseInt(evalForm.discipline_id) : null,
    }]);
    setSaving(false);
    if (error) {
      toast.error("Erreur lors de l'ajout du rendez-vous");
      return;
    }
    toast.success('Rendez-vous partagé avec la classe');
    setEvalForm(emptyEvaluation);
    loadShared(classe);
  };

  const addCours = async () => {
    if (!coursForm.titre.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }
    if (!coursForm.lien_url.trim() && !file) {
      toast.error('Ajoutez un lien ou un fichier');
      return;
    }
    setSaving(true);

    let fichier_url: string | null = null;
    let fichier_nom: string | null = null;
    if (file) {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error: upErr } = await supabase.storage.from('cours').upload(path, file);
      if (upErr) {
        setSaving(false);
        toast.error("Erreur lors de l'envoi du fichier");
        return;
      }
      fichier_url = supabase.storage.from('cours').getPublicUrl(path).data.publicUrl;
      fichier_nom = file.name;
    }

    const { error } = await supabase.from('cours').insert([{
      classe,
      annee_academique: annee,
      titre: coursForm.titre.trim(),
      description: coursForm.description.trim() || null,
      lien_url: normalizeUrl(coursForm.lien_url),
      fichier_url,
      fichier_nom,
      discipline_id: coursForm.discipline_id ? parseInt(coursForm.discipline_id) : null,
    }]);
    setSaving(false);
    if (error) {
      toast.error("Erreur lors de l'ajout du cours");
      return;
    }
    toast.success('Cours partagé avec la classe');
    setCoursForm(emptyCours);
    setFile(null);
    loadShared(classe);
  };

  const deleteEvaluation = async (id: number) => {
    if (!confirm('Supprimer ce rendez-vous ?')) return;
    const { error } = await supabase.from('evaluations').delete().eq('id', id);
    if (error) toast.error('Erreur lors de la suppression');
    else loadShared(classe);
  };

  const deleteCours = async (c: Cours) => {
    if (!confirm('Supprimer ce cours ?')) return;
    if (c.fichier_url) {
      const path = c.fichier_url.split('/cours/').pop();
      if (path) await supabase.storage.from('cours').remove([decodeURIComponent(path)]);
    }
    const { error } = await supabase.from('cours').delete().eq('id', c.id);
    if (error) toast.error('Erreur lors de la suppression');
    else loadShared(classe);
  };

  const disciplineSelect = (value: string, onChange: (v: string) => void) => (
    <select value={value} onChange={e => onChange(e.target.value)} className={inputClass}>
      <option value="">Discipline (optionnel)</option>
      {disciplines.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
    </select>
  );

  return (
    <div className="bg-indigo-50 p-6 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">Partager avec les étudiants</h2>
      <p className="text-sm text-gray-600 mb-4">
        Les rendez-vous, les cours et l'emploi du temps apparaissent dans l'espace de chaque étudiant de la classe
        choisie, pour l'année académique {annee}.
      </p>

      <div className="relative max-w-sm mb-5">
        <select
          value={classe}
          onChange={e => setClasse(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
        >
          <option value="">-- Choisir une classe --</option>
          {classes.map(c => <option key={c} value={c}>Classe {c}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      </div>

      {!classe ? (
        <p className="text-center text-gray-500 py-6">Choisissez une classe pour partager des rendez-vous ou des cours</p>
      ) : (
        <>
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setTab('evaluations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === 'evaluations' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <CalendarClock size={16} /> Rendez-vous d'évaluation ({evaluations.length})
            </button>
            <button
              onClick={() => setTab('cours')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === 'cours' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FileText size={16} /> Cours ({coursList.length})
            </button>
            <button
              onClick={() => setTab('emploi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === 'emploi' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <Clock size={16} /> Emploi du temps ({creneaux.length})
            </button>
          </div>

          {tab === 'evaluations' ? (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm space-y-3">
                <h3 className="font-semibold text-gray-800">Nouveau rendez-vous</h3>
                <select
                  value={evalForm.type}
                  onChange={e => setEvalForm({ ...evalForm, type: e.target.value as EvaluationType })}
                  className={inputClass}
                >
                  {EVALUATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <input
                  value={evalForm.titre}
                  onChange={e => setEvalForm({ ...evalForm, titre: e.target.value })}
                  placeholder="Titre (ex. Contrôle n°2 – Réseaux)"
                  className={inputClass}
                />
                {disciplineSelect(evalForm.discipline_id, v => setEvalForm({ ...evalForm, discipline_id: v }))}
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" value={evalForm.date} onChange={e => setEvalForm({ ...evalForm, date: e.target.value })} className={inputClass} />
                  <input type="time" value={evalForm.heure} onChange={e => setEvalForm({ ...evalForm, heure: e.target.value })} className={inputClass} />
                </div>
                <input
                  value={evalForm.lieu}
                  onChange={e => setEvalForm({ ...evalForm, lieu: e.target.value })}
                  placeholder="Lieu / salle (optionnel)"
                  className={inputClass}
                />
                <textarea
                  value={evalForm.description}
                  onChange={e => setEvalForm({ ...evalForm, description: e.target.value })}
                  placeholder="Consignes, chapitres à réviser… (optionnel)"
                  rows={3}
                  className={inputClass}
                />
                <button
                  onClick={addEvaluation}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium disabled:opacity-50"
                >
                  <Plus size={18} /> Partager le rendez-vous
                </button>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {evaluations.length === 0 && <p className="text-gray-500 text-sm text-center py-6">Aucun rendez-vous pour cette classe</p>}
                {evaluations.map(ev => {
                  const t = evaluationType(ev.type);
                  const past = new Date(ev.date_evaluation) < new Date();
                  return (
                    <div key={ev.id} className={`bg-white p-4 rounded-lg shadow-sm ${past ? 'opacity-60' : ''}`}>
                      <div className="flex justify-between gap-3">
                        <div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.badge}`}>{t.label}</span>
                          <p className="font-semibold text-gray-800 mt-1.5">{ev.titre}</p>
                          <p className="text-sm text-gray-600 capitalize">{formatDateTime(ev.date_evaluation)}</p>
                          {(disciplineName(ev.discipline_id) || ev.lieu) && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {[disciplineName(ev.discipline_id), ev.lieu].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                        <button onClick={() => deleteEvaluation(ev.id)} className="text-red-500 hover:text-red-700 self-start">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : tab === 'cours' ? (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm space-y-3">
                <h3 className="font-semibold text-gray-800">Nouveau cours</h3>
                <input
                  value={coursForm.titre}
                  onChange={e => setCoursForm({ ...coursForm, titre: e.target.value })}
                  placeholder="Titre du cours"
                  className={inputClass}
                />
                {disciplineSelect(coursForm.discipline_id, v => setCoursForm({ ...coursForm, discipline_id: v }))}
                <textarea
                  value={coursForm.description}
                  onChange={e => setCoursForm({ ...coursForm, description: e.target.value })}
                  placeholder="Description (optionnel)"
                  rows={3}
                  className={inputClass}
                />
                <input
                  value={coursForm.lien_url}
                  onChange={e => setCoursForm({ ...coursForm, lien_url: e.target.value })}
                  placeholder="Lien (Google Drive, YouTube…) – optionnel"
                  className={inputClass}
                />
                <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-600 cursor-pointer hover:border-indigo-400">
                  <Upload size={16} />
                  {file ? file.name : 'Joindre un fichier (PDF, Word, PowerPoint…)'}
                  <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
                </label>
                <button
                  onClick={addCours}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium disabled:opacity-50"
                >
                  <Plus size={18} /> {saving ? 'Envoi en cours…' : 'Partager le cours'}
                </button>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {coursList.length === 0 && <p className="text-gray-500 text-sm text-center py-6">Aucun cours pour cette classe</p>}
                {coursList.map(c => (
                  <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800">{c.titre}</p>
                        {disciplineName(c.discipline_id) && <p className="text-xs text-gray-500">{disciplineName(c.discipline_id)}</p>}
                        <div className="flex flex-wrap gap-3 mt-1.5 text-sm">
                          {safeUrl(c.lien_url) && (
                            <a href={safeUrl(c.lien_url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                              <LinkIcon size={14} /> Lien
                            </a>
                          )}
                          {safeUrl(c.fichier_url) && (
                            <a href={safeUrl(c.fichier_url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline truncate">
                              <FileText size={14} /> {c.fichier_nom ?? 'Fichier'}
                            </a>
                          )}
                        </div>
                      </div>
                      <button onClick={() => deleteCours(c)} className="text-red-500 hover:text-red-700 self-start">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm space-y-3 self-start">
                <h3 className="font-semibold text-gray-800">Nouveau créneau</h3>
                <select
                  value={creneauForm.jour}
                  onChange={e => setCreneauForm({ ...creneauForm, jour: e.target.value })}
                  className={inputClass}
                >
                  {JOURS.map((j, i) => <option key={j} value={i + 1}>{j}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs text-gray-500">
                    Début
                    <input type="time" value={creneauForm.heure_debut} onChange={e => setCreneauForm({ ...creneauForm, heure_debut: e.target.value })} className={inputClass} />
                  </label>
                  <label className="text-xs text-gray-500">
                    Fin
                    <input type="time" value={creneauForm.heure_fin} onChange={e => setCreneauForm({ ...creneauForm, heure_fin: e.target.value })} className={inputClass} />
                  </label>
                </div>
                <select
                  value={creneauForm.discipline_id}
                  onChange={e => setCreneauForm({ ...creneauForm, discipline_id: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Discipline</option>
                  {disciplines.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
                </select>
                <input
                  value={creneauForm.enseignant}
                  onChange={e => setCreneauForm({ ...creneauForm, enseignant: e.target.value })}
                  placeholder="Enseignant (optionnel)"
                  className={inputClass}
                />
                <input
                  value={creneauForm.salle}
                  onChange={e => setCreneauForm({ ...creneauForm, salle: e.target.value })}
                  placeholder="Salle (optionnel)"
                  className={inputClass}
                />
                <button
                  onClick={addCreneau}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium disabled:opacity-50"
                >
                  <Plus size={18} /> Ajouter le créneau
                </button>
              </div>

              <div className="space-y-3 max-h-[560px] overflow-y-auto">
                {creneaux.length === 0 && <p className="text-gray-500 text-sm text-center py-6">Aucun créneau pour cette classe</p>}
                {JOURS.map((jour, i) => {
                  const duJour = creneaux.filter(c => c.jour === i + 1);
                  if (duJour.length === 0) return null;
                  return (
                    <div key={jour} className="bg-white rounded-lg shadow-sm">
                      <p className="px-4 py-2 font-semibold text-indigo-700 border-b text-sm">{jour}</p>
                      {duJour.map(c => (
                        <div key={c.id} className="px-4 py-2.5 flex items-center justify-between gap-3 text-sm border-b last:border-b-0">
                          <div>
                            <span className="font-mono text-gray-700">{formatHeure(c.heure_debut)} – {formatHeure(c.heure_fin)}</span>
                            <span className="ml-3 font-medium text-gray-800">{disciplineName(c.discipline_id) ?? '—'}</span>
                            {(c.enseignant || c.salle) && (
                              <span className="ml-2 text-xs text-gray-500">{[c.enseignant, c.salle].filter(Boolean).join(' · ')}</span>
                            )}
                          </div>
                          <button onClick={() => deleteCreneau(c.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherSharing;
