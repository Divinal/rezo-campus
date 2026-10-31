import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from '../ui/sonner';
import { fetchYearStudents, classesOf, YearStudent } from '../../lib/inscriptions';

interface Props {
  annee: string;
  currentStudents: YearStudent[];
  onDone: () => void;
}

const previousYear = (annee: string) => {
  const y = parseInt(annee, 10);
  return `${y - 1}-${y}`;
};

const ReinscriptionPanel: React.FC<Props> = ({ annee, currentStudents, onDone }) => {
  const source = previousYear(annee);
  const [previous, setPrevious] = useState<YearStudent[]>([]);
  const [sourceClasse, setSourceClasse] = useState('');
  const [targetClasse, setTargetClasse] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSourceClasse('');
    fetchYearStudents(source).then(r => setPrevious(r.data));
  }, [source]);

  const alreadyInscribed = new Set(currentStudents.map(s => s.id));
  const candidates = previous.filter(s => s.classe === sourceClasse);

  useEffect(() => {
    setSelected(new Set(candidates.filter(s => !alreadyInscribed.has(s.id)).map(s => s.id)));
  }, [sourceClasse, previous, currentStudents]);

  if (previous.length === 0) return null;

  const toggle = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const reinscribe = async () => {
    const classe = targetClasse.trim();
    if (!classe) {
      toast.error('Indiquez la classe de destination');
      return;
    }
    if (selected.size === 0) {
      toast.error('Sélectionnez au moins un étudiant');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('inscriptions')
      .upsert(
        [...selected].map(id => ({ student_id: id, annee_academique: annee, classe, groupe: null })),
        { onConflict: 'student_id,annee_academique' }
      );
    setSaving(false);
    if (error) {
      toast.error('Erreur lors de la réinscription');
      return;
    }
    toast.success(`${selected.size} étudiant(s) inscrit(s) en ${classe} pour ${annee}`);
    onDone();
  };

  return (
    <div className="bg-amber-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <ArrowRightLeft size={20} className="text-amber-600" />
        Réinscrire des étudiants de {source}
      </h2>
      <p className="text-sm text-gray-600 mt-1 mb-4">
        Pour les étudiants qui continuent : ils gardent leur numéro, leur code d'accès et leurs notes de {source}.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Classe en {source}</label>
          <select
            value={sourceClasse}
            onChange={e => setSourceClasse(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
          >
            <option value="">-- Choisir une classe --</option>
            {classesOf(previous).map(c => <option key={c} value={c}>Classe {c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" size={18} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nouvelle classe en {annee}</label>
          <input
            value={targetClasse}
            onChange={e => setTargetClasse(e.target.value)}
            list="classes-annee"
            placeholder="ex. TS-Développeur Informatique (2ème Année)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <datalist id="classes-annee">
            {classesOf(currentStudents).map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      {sourceClasse && (
        <>
          <div className="bg-white rounded-lg border border-amber-100 max-h-64 overflow-y-auto divide-y mb-4">
            {candidates.map(s => {
              const done = alreadyInscribed.has(s.id);
              return (
                <label key={s.id} className={`flex items-center gap-3 px-4 py-2 text-sm ${done ? 'opacity-50' : 'cursor-pointer hover:bg-amber-50'}`}>
                  <input
                    type="checkbox"
                    checked={selected.has(s.id)}
                    disabled={done}
                    onChange={() => toggle(s.id)}
                    className="h-4 w-4 accent-amber-600"
                  />
                  <span className="flex-1">{s.nom} {s.prenom}</span>
                  <span className="text-xs text-gray-500">
                    {done ? `déjà inscrit en ${currentStudents.find(c => c.id === s.id)?.classe}` : `N°${s.numero}`}
                  </span>
                </label>
              );
            })}
          </div>
          <button
            onClick={reinscribe}
            disabled={saving}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            {saving ? 'Inscription…' : `Inscrire ${selected.size} étudiant(s) en ${annee}`}
          </button>
        </>
      )}
    </div>
  );
};

export default ReinscriptionPanel;
