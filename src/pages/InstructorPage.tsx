import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Printer, Lock, LogOut, BookOpen } from 'lucide-react';
import { toast } from '../components/ui/sonner';

interface Discipline { id: number; nom: string; }
interface Student { id: number; nom: string; prenom: string; classe: string; numero: string; groupe: string | null; }
interface Note {
  id: number;
  student_id: number;
  discipline_id: number;
  note1: number | null;
  note2: number | null;
  note3: number | null;
  note_pratique: number | null;
  note_theorique: number | null;
}

type NoteField = 'note1' | 'note2' | 'note3' | 'note_pratique' | 'note_theorique';

const INSTRUCTOR_USER = 'Direction';
const INSTRUCTOR_PASS = 'DirectionIGIC12';

const fmt = (n: number | null): string => (n !== null ? n.toFixed(2) : '');

const calcMC = (n1: number | null, n2: number | null, n3: number | null): string => {
  const vals = [n1, n2, n3].filter((v): v is number => v !== null);
  if (vals.length === 0) return '';
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
};

const calcMG = (n1: number | null, n2: number | null, n3: number | null, np: number | null, nt: number | null): string => {
  const vals = [n1, n2, n3, np, nt].filter((v): v is number => v !== null);
  if (vals.length === 0) return '';
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
};

const InstructorPage: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [students, setStudents] = useState<Student[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [classStudents, setClassStudents] = useState<Student[]>([]);
  const [notes, setNotes] = useState<Record<number, Note | null>>({});
  const [nameEdits, setNameEdits] = useState<Record<number, { nom: string; prenom: string }>>({});
  const [loading, setLoading] = useState(false);
  const [teacherName, setTeacherName] = useState('MVOUAMA Divin Aldriche');

  useEffect(() => {
    if (localStorage.getItem('instructorAuth') === 'true') setIsAuth(true);
  }, []);

  useEffect(() => {
    if (isAuth) loadData();
  }, [isAuth]);

  useEffect(() => {
    if (selectedClasse) {
      setClassStudents(students.filter(s => s.classe === selectedClasse));
    } else {
      setClassStudents([]);
    }
    setNotes({});
    setSelectedDiscipline(null);
  }, [selectedClasse, students]);

  useEffect(() => {
    const edits: Record<number, { nom: string; prenom: string }> = {};
    classStudents.forEach(s => { edits[s.id] = { nom: s.nom, prenom: s.prenom }; });
    setNameEdits(edits);
  }, [classStudents]);

  useEffect(() => {
    if (classStudents.length > 0 && selectedDiscipline) {
      loadNotes();
    }
  }, [classStudents, selectedDiscipline]);

  const loadData = async () => {
    const [{ data: disc }, { data: stud }] = await Promise.all([
      supabase.from('disciplines').select('*').order('nom'),
      supabase.from('students').select('*').order('nom'),
    ]);
    setDisciplines(disc || []);
    setStudents(stud || []);
  };

  const loadNotes = async () => {
    if (!selectedDiscipline || classStudents.length === 0) return;
    setLoading(true);
    const ids = classStudents.map(s => s.id);
    const { data } = await supabase
      .from('notes')
      .select('*')
      .in('student_id', ids)
      .eq('discipline_id', selectedDiscipline.id);

    const map: Record<number, Note | null> = {};
    classStudents.forEach(s => { map[s.id] = null; });
    (data || []).forEach(n => { map[n.student_id] = n; });
    setNotes(map);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === INSTRUCTOR_USER && passwordInput === INSTRUCTOR_PASS) {
      setIsAuth(true);
      localStorage.setItem('instructorAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('instructorAuth');
    setSelectedClasse('');
    setSelectedDiscipline(null);
    setNotes({});
  };

  const handleNoteChange = async (studentId: number, field: NoteField, value: string) => {
    const note = notes[studentId];
    if (!note) return;

    const numVal = value === '' ? null : parseFloat(value);
    if (numVal !== null && (isNaN(numVal) || numVal < 0 || numVal > 20)) return;

    setNotes(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId]!, [field]: numVal },
    }));

    const { error } = await supabase
      .from('notes')
      .update({ [field]: numVal })
      .eq('id', note.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
      loadNotes();
    }
  };

  const handleNameChange = (studentId: number, field: 'nom' | 'prenom', value: string) => {
    setNameEdits(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value },
    }));
  };

  const handleNameSave = async (studentId: number) => {
    const edit = nameEdits[studentId];
    const original = classStudents.find(s => s.id === studentId);
    if (!edit || !original) return;
    if (edit.nom === original.nom && edit.prenom === original.prenom) return;

    const { error } = await supabase
      .from('students')
      .update({ nom: edit.nom.trim(), prenom: edit.prenom.trim() })
      .eq('id', studentId);

    if (error) {
      toast.error('Erreur lors de la mise à jour du nom');
    } else {
      toast.success('Nom mis à jour');
      setStudents(prev => prev.map(s =>
        s.id === studentId ? { ...s, nom: edit.nom.trim(), prenom: edit.prenom.trim() } : s
      ));
      setClassStudents(prev => prev.map(s =>
        s.id === studentId ? { ...s, nom: edit.nom.trim(), prenom: edit.prenom.trim() } : s
      ));
    }
  };

  const classes = [...new Set(students.map(s => s.classe))].sort();

  // ── Login ─────────────────────────────────────────────────────────────────
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-primary mb-1">Accès Instructeur</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Modification et impression des notes</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; margin: 0; }
          @page { margin: 1.5cm; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Header */}
      <div className="no-print bg-primary text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold">Gestion des Notes – Instructeur</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>

      {/* Selectors */}
      <div className="no-print max-w-6xl mx-auto px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4 text-lg">Sélection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Classe</label>
              <select
                value={selectedClasse}
                onChange={e => setSelectedClasse(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Choisir une classe --</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Discipline</label>
              <select
                value={selectedDiscipline?.id ?? ''}
                onChange={e => {
                  const disc = disciplines.find(d => d.id === parseInt(e.target.value));
                  setSelectedDiscipline(disc || null);
                }}
                disabled={!selectedClasse}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">-- Choisir une discipline --</option>
                {disciplines.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nom de l'enseignant(e)</label>
              <input
                type="text"
                value={teacherName}
                onChange={e => setTeacherName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Notes table */}
        {selectedClasse && selectedDiscipline && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{selectedClasse} – {selectedDiscipline.nom}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {classStudents.length} étudiant(s) • Cliquez sur un champ pour modifier
                </p>
              </div>
              <button
                onClick={() => window.print()}
                disabled={loading}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Printer className="w-4 h-4" />
                Imprimer la liste
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3" />
                Chargement...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">Nom</th>
                      <th className="text-left px-2 py-3 font-semibold text-gray-600 border-b border-gray-200">Prénom</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600 border-b border-gray-200">C1</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600 border-b border-gray-200">C2</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600 border-b border-gray-200">N.P</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-500 border-b border-gray-200 bg-gray-100">MC</th>
                      <th className="text-center px-3 py-3 font-semibold text-blue-700 border-b border-gray-200 bg-blue-50">N.PRAT</th>
                      <th className="text-center px-3 py-3 font-semibold text-purple-700 border-b border-gray-200 bg-purple-50">N.THEO</th>
                      <th className="text-center px-3 py-3 font-semibold text-green-700 border-b border-gray-200 bg-green-50">M.G</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {classStudents.map(student => {
                      const note = notes[student.id];
                      const mc = note ? calcMC(note.note1, note.note2, note.note3) : '';
                      const mg = note ? calcMG(note.note1, note.note2, note.note3, note.note_pratique, note.note_theorique) : '';
                      const edit = nameEdits[student.id] ?? { nom: student.nom, prenom: student.prenom };

                      return (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          {/* Nom éditable */}
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={edit.nom}
                              onChange={e => handleNameChange(student.id, 'nom', e.target.value)}
                              onBlur={() => handleNameSave(student.id)}
                              className="w-28 border border-gray-300 rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                            />
                          </td>
                          {/* Prénom éditable */}
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={edit.prenom}
                              onChange={e => handleNameChange(student.id, 'prenom', e.target.value)}
                              onBlur={() => handleNameSave(student.id)}
                              className="w-28 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </td>
                          {note ? (
                            <>
                              {(['note1', 'note2', 'note3'] as const).map(field => (
                                <td key={field} className="px-2 py-2 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.25"
                                    value={note[field] !== null ? note[field]! : ''}
                                    onChange={e => handleNoteChange(student.id, field, e.target.value)}
                                    className="w-16 text-center border border-gray-300 rounded px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </td>
                              ))}
                              <td className="px-3 py-2 text-center bg-gray-50">
                                <span className="font-semibold text-gray-700">{mc || '-'}</span>
                              </td>
                              <td className="px-2 py-2 text-center bg-blue-50/30">
                                <input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.25"
                                  value={note.note_pratique !== null ? note.note_pratique : ''}
                                  onChange={e => handleNoteChange(student.id, 'note_pratique', e.target.value)}
                                  className="w-16 text-center border border-blue-300 rounded px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-purple-50/30">
                                <input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.25"
                                  value={note.note_theorique !== null ? note.note_theorique : ''}
                                  onChange={e => handleNoteChange(student.id, 'note_theorique', e.target.value)}
                                  className="w-16 text-center border border-purple-300 rounded px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                              </td>
                              <td className="px-3 py-2 text-center bg-green-50/30">
                                <span className={`font-bold text-base ${
                                  mg && parseFloat(mg) >= 10 ? 'text-green-700' : mg ? 'text-red-600' : 'text-gray-400'
                                }`}>
                                  {mg || '-'}
                                </span>
                              </td>
                            </>
                          ) : (
                            <td colSpan={7} className="px-4 py-2 text-center text-gray-400 italic text-xs">
                              Aucune note enregistrée pour cette discipline
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!selectedClasse && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">Sélectionnez une classe pour commencer</p>
          </div>
        )}
      </div>

      {/* ── Print view ────────────────────────────────────────────────────────── */}
      <div className="print-only" style={{ fontFamily: 'Arial, sans-serif', padding: '0' }}>
        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: '14px', border: '2px solid black', padding: '10px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>LISTE DES NOTES</div>
          <div style={{ fontSize: '14px', marginTop: '4px' }}>{selectedClasse}</div>
        </div>

        {/* Info block */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px 12px', fontWeight: 'bold', width: '22%', fontSize: '13px' }}>
                Matière
              </td>
              <td style={{ border: '1px solid black', padding: '6px 12px', fontSize: '13px' }}>
                {selectedDiscipline?.nom}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px 12px', fontWeight: 'bold', fontSize: '13px' }}>
                Enseignant(e)
              </td>
              <td style={{ border: '1px solid black', padding: '6px 12px', fontSize: '13px' }}>
                {teacherName}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes table – toutes les colonnes remplies */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e8e8e8' }}>
              <th style={{ border: '1px solid black', padding: '7px 10px', textAlign: 'left', fontWeight: 'bold', fontSize: '13px' }}>
                NOM ET PRENOM
              </th>
              {['C1', 'C2', 'N.P', 'MC', 'N.PRAT', 'N.THEO', 'M.G'].map(col => (
                <th
                  key={col}
                  style={{
                    border: '1px solid black',
                    padding: '7px 8px',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    minWidth: '52px',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student, idx) => {
              const note = notes[student.id];
              const edit = nameEdits[student.id];
              const displayNom = edit ? edit.nom : student.nom;
              const displayPrenom = edit ? edit.prenom : student.prenom;
              const mc = note ? calcMC(note.note1, note.note2, note.note3) : '';
              const mg = note ? calcMG(note.note1, note.note2, note.note3, note.note_pratique, note.note_theorique) : '';
              return (
                <tr key={student.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ border: '1px solid black', padding: '5px 10px', fontSize: '12px' }}>
                    {displayNom} {displayPrenom}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center' }}>
                    {note ? fmt(note.note1) : ''}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center' }}>
                    {note ? fmt(note.note2) : ''}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center' }}>
                    {note ? fmt(note.note3) : ''}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center', fontWeight: '500' }}>
                    {mc}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center' }}>
                    {note ? fmt(note.note_pratique) : ''}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center' }}>
                    {note ? fmt(note.note_theorique) : ''}
                  </td>
                  <td style={{ border: '1px solid black', padding: '5px 8px', textAlign: 'center', fontWeight: 'bold' }}>
                    {mg}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Signature */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'center', minWidth: '220px' }}>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              Fait à Brazzaville, le {new Date().toLocaleDateString('fr-FR')}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '60px' }}>
              L'Enseignant(e)
            </div>
            <div style={{ borderTop: '1px solid black', paddingTop: '4px', fontSize: '12px' }}>
              {teacherName}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#777' }}>
          <span>Rézo Campus – Liste générée automatiquement</span>
          <span>{new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
