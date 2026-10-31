import React from 'react';
import { X, Copy, MessageCircle, KeyRound } from 'lucide-react';
import { toast } from '../ui/sonner';
import { accessMessage, normalizePhone, whatsappLink } from '../../lib/notesShared';

export interface GeneratedAccess {
  id: number;
  nom: string;
  prenom: string;
  numero: string;
  telephone: string | null;
  code: string;
}

interface Props {
  accesses: GeneratedAccess[];
  onClose: () => void;
}

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papiers');
  } catch {
    toast.error('Copie impossible, sélectionnez le texte manuellement');
  }
};

const StudentAccessModal: React.FC<Props> = ({ accesses, onClose }) => {
  const fullList = accesses
    .map(a => `${a.nom} ${a.prenom} — Identifiant : ${a.numero} — Code : ${a.code}`)
    .join('\n');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <KeyRound className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-gray-800">
              {accesses.length > 1 ? `Accès générés (${accesses.length})` : 'Accès étudiant généré'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 text-sm text-amber-800">
          Notez ou envoyez ces codes maintenant : pour des raisons de sécurité, ils ne pourront plus être
          affichés ensuite. En cas de perte, générez un nouveau code.
        </div>

        <div className="overflow-y-auto divide-y">
          {accesses.map(a => (
            <div key={a.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{a.nom} {a.prenom}</p>
                <p className="text-sm text-gray-600">
                  Identifiant : <strong>{a.numero}</strong> · Code :{' '}
                  <strong className="font-mono text-indigo-700 tracking-wider">{a.code}</strong>
                </p>
                <p className={`text-xs mt-0.5 ${normalizePhone(a.telephone) ? 'text-green-700' : 'text-amber-700'}`}>
                  {normalizePhone(a.telephone)
                    ? `WhatsApp : +${normalizePhone(a.telephone)}`
                    : 'Aucun numéro valide enregistré : choisissez le contact dans WhatsApp'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copy(accessMessage(a.prenom, a.numero, a.code))}
                  className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
                >
                  <Copy size={15} /> Copier
                </button>
                <a
                  href={whatsappLink(a.telephone, accessMessage(a.prenom, a.numero, a.code))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                  <MessageCircle size={15} /> Envoyer
                </a>
              </div>
            </div>
          ))}
        </div>

        {accesses.length > 1 && (
          <div className="px-6 py-4 border-t">
            <button
              onClick={() => copy(fullList)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium"
            >
              <Copy size={16} /> Copier toute la liste
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAccessModal;
