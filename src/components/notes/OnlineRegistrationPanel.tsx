import React, { useEffect, useState } from 'react';
import { ClipboardList, Plus, X, Copy, MessageCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from '../ui/sonner';
import { registrationUrl } from '../../lib/notesShared';

interface Props {
  annee: string;
  suggestions: string[];
}

const OnlineRegistrationPanel: React.FC<Props> = ({ annee, suggestions }) => {
  const [classes, setClasses] = useState<{ id: number; nom: string }[]>([]);
  const [nouvelle, setNouvelle] = useState('');

  useEffect(() => {
    load();
  }, [annee]);

  const load = async () => {
    const { data, error } = await supabase
      .from('classes_ouvertes')
      .select('id, nom')
      .eq('annee_academique', annee)
      .order('nom');
    if (error) toast.error('Erreur lors du chargement des classes ouvertes');
    setClasses(data || []);
  };

  const add = async () => {
    const nom = nouvelle.trim();
    if (!nom) return;
    const { error } = await supabase.from('classes_ouvertes').insert([{ annee_academique: annee, nom }]);
    if (error) {
      toast.error(error.code === '23505' ? 'Cette classe est déjà ouverte' : "Erreur lors de l'ajout");
      return;
    }
    setNouvelle('');
    load();
  };

  const remove = async (id: number) => {
    const { error } = await supabase.from('classes_ouvertes').delete().eq('id', id);
    if (error) toast.error('Erreur lors de la suppression');
    else load();
  };

  const shareText =
    `Inscriptions ${annee} : inscrivez-vous dans votre classe et recevez vos accès à l'espace étudiant ici :\n${registrationUrl()}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(registrationUrl());
      toast.success('Lien copié');
    } catch {
      toast.error('Copie impossible');
    }
  };

  return (
    <div className="bg-teal-50 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <ClipboardList size={20} className="text-teal-600" />
        Inscriptions en ligne {annee}
      </h2>
      <p className="text-sm text-gray-600 mt-1 mb-4">
        Les étudiants choisissent leur classe parmi celles ouvertes ci-dessous. Les nouveaux reçoivent un identifiant
        IGIC + 2 lettres du nom + {annee.slice(0, 4)} ; les anciens gardent leur identifiant.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {classes.length === 0 && <p className="text-sm text-amber-700">Aucune classe ouverte : le formulaire est fermé.</p>}
        {classes.map(c => (
          <span key={c.id} className="inline-flex items-center gap-1.5 bg-white border border-teal-200 rounded-full pl-3 pr-1.5 py-1 text-sm">
            {c.nom}
            <button onClick={() => remove(c.id)} className="text-gray-400 hover:text-red-600" title="Fermer cette classe">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        <input
          value={nouvelle}
          onChange={e => setNouvelle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          list="classes-suggestions"
          placeholder="Nom de la classe à ouvrir"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <datalist id="classes-suggestions">
          {suggestions.map(s => <option key={s} value={s} />)}
        </datalist>
        <button onClick={add} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg">
          <Plus size={20} />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-teal-100 p-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <code className="flex-1 text-sm text-gray-700 break-all">{registrationUrl()}</code>
        <div className="flex gap-2">
          <button onClick={copyLink} className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
            <Copy size={15} /> Copier
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
          >
            <MessageCircle size={15} /> Partager
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnlineRegistrationPanel;
