import React, { useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from '../ui/sonner';
import { Bonus, CONTROLES, ControleField, controleLabel } from '../../lib/notesShared';

interface Discipline { id: number; nom: string; }

interface Props {
  studentId: number;
  studentName: string;
  annee: string;
  disciplines: Discipline[];
  bonuses: Bonus[];
  onChanged: () => void;
}

const emptyForm = { discipline_id: '', controle: 'note1' as ControleField, points: '', justification: '' };

const BonusPanel: React.FC<Props> = ({ studentId, studentName, annee, disciplines, bonuses, onChanged }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const disciplineName = (id: number) => disciplines.find(d => d.id === id)?.nom ?? '—';

  const add = async () => {
    const points = parseFloat(form.points);
    if (!form.discipline_id) return toast.error('Choisissez la discipline');
    if (isNaN(points) || points <= 0 || points > 20) return toast.error('Les points doivent être entre 0 et 20');
    if (!form.justification.trim()) return toast.error('La justification est obligatoire');

    setSaving(true);
    const { error } = await supabase.from('bonus_notes').insert([{
      student_id: studentId,
      discipline_id: parseInt(form.discipline_id),
      annee_academique: annee,
      controle: form.controle,
      points,
      justification: form.justification.trim(),
    }]);
    setSaving(false);
    if (error) {
      toast.error("Le bonus n'a pas pu être enregistré");
      return;
    }
    toast.success(`+${points} ajouté au ${controleLabel(form.controle)}`);
    setForm({ ...emptyForm, discipline_id: form.discipline_id });
    onChanged();
  };

  const remove = async (b: Bonus) => {
    if (!confirm(`Supprimer le bonus de +${b.points} (${controleLabel(b.controle)}, ${disciplineName(b.discipline_id)}) ?`)) return;
    const { error } = await supabase.from('bonus_notes').delete().eq('id', b.id);
    if (error) toast.error('Erreur lors de la suppression');
    else onChanged();
  };

  const input = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm';

  return (
    <div className="mt-6 pt-5 border-t-2 border-gray-200">
      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <Award size={20} className="text-amber-500" />
        Points de participation — {studentName}
      </h4>
      <p className="text-sm text-gray-600 mt-1 mb-4">
        Les points s'ajoutent automatiquement à la note du contrôle choisi, dès qu'elle est saisie.
        Le total est plafonné à 20 : l'excédent est perdu. La justification est visible par l'étudiant.
      </p>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.discipline_id}
              onChange={e => setForm({ ...form, discipline_id: e.target.value })}
              className={input}
            >
              <option value="">Discipline</option>
              {disciplines.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
            </select>
            <select
              value={form.controle}
              onChange={e => setForm({ ...form, controle: e.target.value as ControleField })}
              className={input}
            >
              {CONTROLES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <input
            type="number"
            min="0.25"
            max="20"
            step="0.25"
            value={form.points}
            onChange={e => setForm({ ...form, points: e.target.value })}
            placeholder="Points (ex. 2)"
            className={input}
          />
          <textarea
            value={form.justification}
            onChange={e => setForm({ ...form, justification: e.target.value })}
            placeholder="Justification (ex. participation active et exposé sur les réseaux)"
            rows={3}
            className={input}
          />
          <button
            onClick={add}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            <Plus size={18} /> Ajouter les points
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {bonuses.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">Aucun point de participation pour {annee}</p>
          )}
          {bonuses.map(b => (
            <div key={b.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex gap-3">
              <span className="font-bold text-amber-600 whitespace-nowrap">+{Number(b.points)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {controleLabel(b.controle)} · {disciplineName(b.discipline_id)}
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{b.justification}</p>
                <p className="text-xs text-gray-500 mt-0.5">{new Date(b.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
              <button onClick={() => remove(b)} className="text-red-500 hover:text-red-700 self-start" title="Supprimer">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BonusPanel;
