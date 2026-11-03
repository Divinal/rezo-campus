import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, ArrowLeft, ChevronDown, Users, KeyRound, ShieldCheck, Phone } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { toast } from '../components/ui/sonner';
import {
  STUDENT_COLUMNS, generateAccessCode, currentAcademicYear, normalizePhone,
  Bonus, CONTROLES, applyBonuses, bonusTotal, withBonus,
} from '../lib/notesShared';
import BonusPanel from '../components/notes/BonusPanel';
import StudentAccessModal, { GeneratedAccess } from '../components/notes/StudentAccessModal';
import TeacherSharing from '../components/notes/TeacherSharing';
import AcademicYearSelect from '../components/notes/AcademicYearSelect';
import ReinscriptionPanel from '../components/notes/ReinscriptionPanel';
import OnlineRegistrationPanel from '../components/notes/OnlineRegistrationPanel';
import { fetchYearStudents, classesOf } from '../lib/inscriptions';

interface Discipline {
  id: number;
  nom: string;
}

interface Note {
  id: number;
  discipline_id: number;
  note1: number | null;
  note2: number | null;
  note3: number | null;
  note_pratique: number | null;
  note_theorique: number | null;
}

interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
  groupe: string | null;
  telephone: string | null;
  code_verification: string | null;
  acces_genere_le: string | null;
}

interface NewStudent {
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
  groupe: string;
  telephone: string;
}

const emptyNewStudent: NewStudent = { nom: '', prenom: '', classe: '', numero: '', groupe: '', telephone: '' };

interface TeacherPageProps {
  onBack: () => void;
}

const TeacherPage: React.FC<TeacherPageProps> = ({ onBack }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentNotes, setStudentNotes] = useState<Note[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newStudent, setNewStudent] = useState<NewStudent>(emptyNewStudent);
  const [annee, setAnnee] = useState(currentAcademicYear);
  const [phoneDraft, setPhoneDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedClasse, setSelectedClasse] = useState<string>('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [generatedAccesses, setGeneratedAccesses] = useState<GeneratedAccess[] | null>(null);
  const [generating, setGenerating] = useState(false);

  // The old teacher password was kept in plain text in the browser: remove it.
  useEffect(() => {
    localStorage.removeItem('teacherPassword');
    loadDisciplines();
  }, []);

    useEffect(() => {
    if (selectedClasse) {
      setFilteredStudents(students.filter(s => s.classe === selectedClasse));
    }
  }, [students, selectedClasse]);

  const loadDisciplines = async () => {
    const { data, error } = await supabase
      .from('disciplines')
      .select('*')
      .order('nom');

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des disciplines");
    } else {
      setDisciplines(data || []);
    }
  };

  const loadStudents = async () => {
    const { data, error } = await fetchYearStudents(annee);
    if (error) toast.error("Erreur lors du chargement des étudiants");
    else setStudents(data);
  };

  // Class names from the previous year, suggested when opening classes for online registration.
  const [previousClasses, setPreviousClasses] = useState<string[]>([]);
  useEffect(() => {
    const y = parseInt(annee, 10);
    fetchYearStudents(`${y - 1}-${y}`).then(r => setPreviousClasses(classesOf(r.data)));
  }, [annee]);

  // Runs on mount too: the page is only rendered once AuthGuard has confirmed a staff session.
  useEffect(() => {
    handleClasseSelect('');
    loadStudents();
  }, [annee]);

  useEffect(() => {
    setPhoneDraft(selectedStudent?.telephone ?? '');
  }, [selectedStudent?.id]);

  const loadBonuses = async (studentId: number) => {
    const { data, error } = await supabase
      .from('bonus_notes')
      .select('id, discipline_id, controle, points, justification, created_at')
      .eq('student_id', studentId)
      .eq('annee_academique', annee)
      .order('created_at', { ascending: false });
    if (error) toast.error('Erreur lors du chargement des points de participation');
    setBonuses(data || []);
  };

  const loadStudentNotes = async (studentId: number) => {
    setLoading(true);
    loadBonuses(studentId);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('student_id', studentId)
      .eq('annee_academique', annee);

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des notes");
      setStudentNotes([]);
    } else {
      setStudentNotes(data || []);
    }
    setLoading(false);
  };

    // Extraire les classes uniques depuis la liste des étudiants
  const getClasses = (): string[] => {
    const classes = students.map(s => s.classe);
    return [...new Set(classes)].sort();
  };

  // Filtrer les étudiants par classe
  const handleClasseSelect = (classe: string) => {
    setSelectedClasse(classe);
    setSelectedStudent(null);
    setStudentNotes([]);
    if (classe) {
      setFilteredStudents(students.filter(s => s.classe === classe));
    } else {
      setFilteredStudents([]);
    }
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    loadStudentNotes(student.id);
  };

  const addDiscipline = async () => {
    if (!newDiscipline.trim()) return;

    const { error } = await supabase
      .from('disciplines')
      .insert([{ nom: newDiscipline }])
      .select();

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de l'ajout de la discipline");
    } else {
      toast.success("Discipline ajoutée avec succès");
      setNewDiscipline('');
      loadDisciplines();
    }
  };

  const deleteDiscipline = async (id: number) => {
    const { error } = await supabase
      .from('disciplines')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Discipline supprimée");
      loadDisciplines();
    }
  };

  const addStudent = async () => {
    if (!newStudent.nom || !newStudent.prenom || !newStudent.classe || !newStudent.numero) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const classe = newStudent.classe.trim();
    const groupe = newStudent.groupe.trim() || null;

    const { data: created, error } = await supabase
      .from('students')
      .insert([{ ...newStudent, classe, groupe, telephone: newStudent.telephone.trim() || null }])
      .select('id')
      .single();

    let studentId: number | null = created?.id ?? null;

    if (error) {
      if (error.code !== '23505') {
        console.error('Erreur:', error);
        toast.error("Erreur lors de l'ajout de l'étudiant");
        return;
      }
      // The numero already exists: this is a returning student, so only add this year's inscription.
      const { data: existing } = await supabase
        .from('students')
        .select(STUDENT_COLUMNS)
        .eq('numero', newStudent.numero.trim())
        .maybeSingle();
      if (!existing) {
        toast.error('Ce numéro est déjà utilisé');
        return;
      }
      if (!confirm(`Le numéro ${existing.numero} appartient déjà à ${existing.nom} ${existing.prenom}. L'inscrire en ${classe} pour ${annee} ?`)) return;
      studentId = existing.id;
    }

    const { error: inscError } = await supabase
      .from('inscriptions')
      .upsert([{ student_id: studentId, annee_academique: annee, classe, groupe }], { onConflict: 'student_id,annee_academique' });

    if (inscError) {
      console.error('Erreur:', inscError);
      toast.error("L'étudiant n'a pas pu être inscrit pour cette année");
      return;
    }
    toast.success(`Étudiant inscrit en ${classe} pour ${annee}`);
    setNewStudent(emptyNewStudent);
    loadStudents();
  };

  const removeFromYear = async (id: number) => {
    if (!confirm(`Retirer cet étudiant de l'année ${annee} ? Ses notes et ses autres années sont conservées.`)) return;
    const { error } = await supabase
      .from('inscriptions')
      .delete()
      .eq('student_id', id)
      .eq('annee_academique', annee);

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du retrait");
      return;
    }
    toast.success(`Étudiant retiré de ${annee}`);
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
      setStudentNotes([]);
    }
    loadStudents();
  };

  const generateAccess = async (targets: Student[]) => {
    if (targets.length === 0) return;
    setGenerating(true);
    const results: GeneratedAccess[] = [];
    let failures = 0;
    for (const s of targets) {
      const code = generateAccessCode();
      // RLS can silently skip the update, so a zero row count is a failure too.
      const { error, count } = await supabase
        .from('students')
        .update({ code_acces: code, acces_genere_le: new Date().toISOString() }, { count: 'exact' })
        .eq('id', s.id);
      if (error || count === 0) failures++;
      else results.push({ id: s.id, nom: s.nom, prenom: s.prenom, numero: s.numero, telephone: s.telephone, code });
    }
    setGenerating(false);
    if (failures) toast.error(`${failures} accès n'ont pas pu être générés`);
    if (results.length) setGeneratedAccesses(results);
    await loadStudents();
  };

  const savePhone = async () => {
    if (!selectedStudent) return;
    const value = phoneDraft.trim();
    if (value && !normalizePhone(value)) {
      toast.error('Numéro invalide : indiquez l\'indicatif du pays, ex. +212 1 23 456 789');
      return;
    }
    const { error, count } = await supabase
      .from('students')
      .update({ telephone: value || null }, { count: 'exact' })
      .eq('id', selectedStudent.id);
    if (error || count === 0) {
      toast.error("Le numéro n'a pas pu être enregistré");
      return;
    }
    toast.success('Numéro enregistré');
    setSelectedStudent({ ...selectedStudent, telephone: value || null });
    loadStudents();
  };

  const generateClassAccess = () => {
    const withoutAccess = filteredStudents.filter(s => !s.acces_genere_le);
    if (withoutAccess.length > 0) {
      generateAccess(withoutAccess);
    } else if (confirm('Tous les étudiants de cette classe ont déjà un accès. Régénérer tous les codes ? Les anciens codes ne fonctionneront plus.')) {
      generateAccess(filteredStudents);
    }
  };

  const updateNote = async (disciplineId: number, noteType: 'note1' | 'note2' | 'note3' | 'note_pratique' | 'note_theorique', noteValue: string) => {
    if (!selectedStudent) return;

    const parsedNote = noteValue === '' ? null : parseFloat(noteValue);
    
    if (parsedNote !== null && (isNaN(parsedNote) || parsedNote < 0 || parsedNote > 20)) {
      toast.error("La note doit être entre 0 et 20");
      return;
    }

    // Vérifier si la note existe déjà
    const existingNote = studentNotes.find(n => n.discipline_id === disciplineId);

    if (existingNote) {
      // Mettre à jour
      const updateData = {
        [noteType]: parsedNote
      };

      const { error } = await supabase
        .from('notes')
        .update(updateData)
        .eq('id', existingNote.id);

      if (error) {
        console.error('Erreur:', error);
        toast.error("Erreur lors de la mise à jour");
      } else {
        loadStudentNotes(selectedStudent.id);
      }
    } else {
      // Insérer
     const insertData = {
      student_id: selectedStudent.id,
      discipline_id: disciplineId,
      annee_academique: annee,
      [noteType]: parsedNote,
      ...(noteType !== 'note1' && { note1: null }),
      ...(noteType !== 'note2' && { note2: null }),
      ...(noteType !== 'note3' && { note3: null }),
      ...(noteType !== 'note_pratique' && { note_pratique: null }),
      ...(noteType !== 'note_theorique' && { note_theorique: null }),
    };
      const { error } = await supabase
        .from('notes')
        .insert([insertData]);

      if (error) {
        console.error('Erreur:', error);
        toast.error("Erreur lors de l'ajout de la note");
      } else {
        loadStudentNotes(selectedStudent.id);
      }
    }
  };

  {/*const calculateAverage = (note1: number | null, note2: number | null): string => {
    if (note1 === null && note2 === null) return '-';
    if (note1 === null) return note2?.toFixed(2) || '-';
    if (note2 === null) return note1?.toFixed(2) || '-';
    return ((note1 + note2) / 2).toFixed(2);
  };*/}

  const calculateAverage = (
    note1: number | null,
    note2: number | null,
    note3: number | null,
    notePratique: number | null,
    noteTheorique: number | null
  ): string => {
    const notes = [note1, note2, note3, notePratique, noteTheorique].filter(n => n !== null) as number[];
    if (notes.length === 0) return '-';
    return (notes.reduce((acc, n) => acc + n, 0) / notes.length).toFixed(2);
  };

  const calculateGeneralAverage = (): string => {
    const validNotes = studentNotes.map(n => applyBonuses(n, bonuses)).filter(n =>
      n.note1 !== null || n.note2 !== null || n.note3 !== null ||
      n.note_pratique !== null || n.note_theorique !== null
    );
    if (validNotes.length === 0) return '0.00';

    const sum = validNotes.reduce((acc, n) => {
      const avg = calculateAverage(n.note1, n.note2, n.note3, n.note_pratique, n.note_theorique);
      return acc + (avg !== '-' ? parseFloat(avg) : 0);
    }, 0);

    return (sum / validNotes.length).toFixed(2);
  };

  // Page enseignant authentifié
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium"
          >
            <ArrowLeft size={20} />
            Retour à la page étudiants
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookOpen size={32} className="text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Espace Enseignant</h1>
            </div>
            <AcademicYearSelect value={annee} onChange={setAnnee} />
          </div>
          {annee !== currentAcademicYear() && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-6">
              Vous travaillez sur l'année {annee} : classes, inscriptions, notes et partages concernent cette année.
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Gestion des disciplines */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Disciplines</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newDiscipline}
                  onChange={(e) => setNewDiscipline(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDiscipline()}
                  placeholder="Nom de la discipline"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addDiscipline}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {disciplines.map((disc) => (
                  <div key={disc.id} className="bg-white p-3 rounded-lg flex justify-between items-center">
                    <span className="font-medium text-sm">{disc.nom}</span>
                    <button
                      onClick={() => deleteDiscipline(disc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {disciplines.length === 0 && (
                  <p className="text-gray-500 text-center py-4 text-sm">Aucune discipline</p>
                )}
              </div>
            </div>

            {/* Gestion des étudiants */}
            <div className="bg-green-50 p-6 rounded-lg lg:col-span-2">
              <h2 className="text-xl font-semibold mb-1 text-gray-800">Inscrire un étudiant en {annee}</h2>
              <p className="text-xs text-gray-500 mb-4">
                Si le numéro existe déjà, l'étudiant est simplement inscrit dans cette classe pour {annee}.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <input
                  type="text"
                  value={newStudent.nom}
                  onChange={(e) => setNewStudent({...newStudent, nom: e.target.value})}
                  placeholder="Nom"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newStudent.prenom}
                  onChange={(e) => setNewStudent({...newStudent, prenom: e.target.value})}
                  placeholder="Prénom"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newStudent.classe}
                  onChange={(e) => setNewStudent({...newStudent, classe: e.target.value})}
                  placeholder="Classe"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newStudent.numero}
                  onChange={(e) => setNewStudent({...newStudent, numero: e.target.value})}
                  placeholder="Numéro unique"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {/* NOUVEAU : Champ Groupe */}
                <input
                  type="text"
                  value={newStudent.groupe}
                  onChange={(e) => setNewStudent({...newStudent, groupe: e.target.value})}
                  placeholder="Groupe (optionnel)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  value={newStudent.telephone}
                  onChange={(e) => setNewStudent({...newStudent, telephone: e.target.value})}
                  placeholder="WhatsApp avec indicatif, ex. +212 1 23 456 789"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={addStudent}
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Inscrire l'étudiant
              </button>
            </div>
          </div>

          {annee === currentAcademicYear() && (
            <OnlineRegistrationPanel annee={annee} suggestions={[...new Set([...getClasses(), ...previousClasses])].sort()} />
          )}

          <ReinscriptionPanel annee={annee} currentStudents={students} onDone={loadStudents} />

          {/* Sélection d'étudiant et saisie des notes */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Saisie des notes — {annee}</h2>

         {/* Sélection de la classe puis de l'étudiant */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Sélection de la classe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1. Sélectionnez une classe
                </label>
                <div className="relative">
                  <select
                    value={selectedClasse}
                    onChange={(e) => handleClasseSelect(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">-- Choisir une classe --</option>
                    {getClasses().map((classe) => (
                      <option key={classe} value={classe}>
                        Classe {classe}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Sélection de l'étudiant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2. Sélectionnez un étudiant
                </label>
                <div className="relative">
                  <select
                    value={selectedStudent?.id || ''}
                    onChange={(e) => {
                      const student = filteredStudents.find(s => s.id === parseInt(e.target.value));
                      if (student) handleStudentSelect(student);
                    }}
                    disabled={!selectedClasse}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {selectedClasse ? '-- Choisir un étudiant --' : '-- Choisissez d\'une classe d\'abord --'}
                    </option>
                    {filteredStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.nom} {student.prenom} (N°{student.numero})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
                {selectedClasse && filteredStudents.length === 0 && (
                  <p className="text-sm text-orange-600 mt-2">
                    Aucun étudiant dans cette classe
                  </p>
                )}
              </div>
            </div>

            {selectedClasse && filteredStudents.length > 0 && (
              <div className="bg-white border border-indigo-100 rounded-lg px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-gray-700">
                  <KeyRound size={16} className="inline text-indigo-600 mr-1.5 -mt-0.5" />
                  Accès à l'espace étudiant :{' '}
                  <strong>{filteredStudents.filter(s => s.acces_genere_le).length}/{filteredStudents.length}</strong>{' '}
                  étudiants de la classe ont un accès
                </p>
                <button
                  onClick={generateClassAccess}
                  disabled={generating}
                  className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  {generating ? 'Génération…' : 'Générer les accès de la classe'}
                </button>
              </div>
            )}

            {/* Affichage des champs de notes pour l'étudiant sélectionné */}
            {selectedStudent && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedStudent.nom} {selectedStudent.prenom}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Classe: {selectedStudent.classe} | N°: {selectedStudent.numero}
                    {selectedStudent.groupe && (
                      <span className="ml-2 text-purple-600 font-medium">
                        | Groupe: {selectedStudent.groupe}
                      </span>
                    )}
                  </p>
                  {(() => {
                    const current = students.find(s => s.id === selectedStudent.id) ?? selectedStudent;
                    return (
                      <p className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1 text-teal-700">
                          <ShieldCheck size={14} /> Code de vérification :{' '}
                          <strong className="font-mono tracking-wider">{current.code_verification ?? '—'}</strong>
                        </span>
                        <span className="text-gray-500">
                          {current.acces_genere_le
                            ? `Accès créé le ${new Date(current.acces_genere_le).toLocaleDateString('fr-FR')}`
                            : 'Pas encore d\'accès à l\'espace étudiant'}
                        </span>
                      </p>
                    );
                  })()}
                  <div className="flex items-center gap-2 mt-2">
                    <Phone size={15} className="text-green-600" />
                    <input
                      type="tel"
                      value={phoneDraft}
                      onChange={e => setPhoneDraft(e.target.value)}
                      placeholder="WhatsApp, ex. +212 1 23 456 789"
                      className="w-60 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    />
                    {phoneDraft.trim() !== (selectedStudent.telephone ?? '') && (
                      <button
                        onClick={savePhone}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg"
                      >
                        Enregistrer
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const current = students.find(s => s.id === selectedStudent.id) ?? selectedStudent;
                      if (current.acces_genere_le && !confirm("Régénérer le code ? L'ancien code ne fonctionnera plus.")) return;
                      generateAccess([current]);
                    }}
                    disabled={generating}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 disabled:opacity-50"
                  >
                    <KeyRound size={18} />
                    {(students.find(s => s.id === selectedStudent.id) ?? selectedStudent).acces_genere_le
                      ? 'Nouveau code d\'accès'
                      : 'Créer l\'accès'}
                  </button>
                  <button
                    onClick={() => removeFromYear(selectedStudent.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Retirer de {annee}
                  </button>
                </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <p className="mt-2 text-gray-600">Chargement des notes...</p>
                  </div>
                ) : disciplines.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 bg-gray-50">
                            <th className="text-left py-3 px-3 font-semibold text-gray-700 text-sm">Discipline</th>
                            <th className="text-center py-3 px-3 font-semibold text-gray-700 text-sm">Contrôle 1</th>
                            <th className="text-center py-3 px-3 font-semibold text-gray-700 text-sm">Contrôle 2</th>
                            <th className="text-center py-3 px-3 font-semibold text-gray-700 text-sm">Contrôle 3</th>
                            <th className="text-center py-3 px-3 font-semibold text-blue-700 text-sm bg-blue-50">Exam. Pratique</th>
                            <th className="text-center py-3 px-3 font-semibold text-purple-700 text-sm bg-purple-50">Exam. Théorique</th>
                            <th className="text-center py-3 px-3 font-semibold text-gray-700 text-sm">Moyenne</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disciplines.map((disc) => {
                            const note = studentNotes.find(n => n.discipline_id === disc.id);
                            const effective = note ? applyBonuses(note, bonuses) : undefined;
                            const moyenne = calculateAverage(
                              effective?.note1 ?? null,
                              effective?.note2 ?? null,
                              effective?.note3 ?? null,
                              effective?.note_pratique ?? null,
                              effective?.note_theorique ?? null
                            );

                            return (
                              <tr key={disc.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-3 font-medium text-sm">{disc.nom}</td>
                                {CONTROLES.map(({ value: field }) => {
                                  const raw = note?.[field] ?? null;
                                  const bonus = bonusTotal(bonuses, disc.id, field);
                                  const final = withBonus(raw, bonus);
                                  return (
                                    <td key={field} className="py-2 px-2 align-top">
                                      <input
                                        type="number" min="0" max="20" step="0.25"
                                        value={raw ?? ''}
                                        onChange={(e) => updateNote(disc.id, field, e.target.value)}
                                        placeholder="-"
                                        className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center text-sm"
                                      />
                                      {bonus > 0 && (
                                        <p className="text-xs text-amber-600 mt-1 text-center whitespace-nowrap" title="Note saisie + points de participation, plafonnée à 20">
                                          +{bonus} {final === null ? 'en attente' : `→ ${final.toFixed(2)}`}
                                          {final === 20 && raw !== null && raw + bonus > 20 && ' (max)'}
                                        </p>
                                      )}
                                    </td>
                                  );
                                })}
                                <td className="py-2 px-2 bg-blue-50/40">
                                  <input
                                    type="number" min="0" max="20" step="0.25"
                                    value={note?.note_pratique ?? ''}
                                    onChange={(e) => updateNote(disc.id, 'note_pratique', e.target.value)}
                                    placeholder="-"
                                    className="w-20 px-2 py-1.5 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-sm"
                                  />
                                </td>
                                <td className="py-2 px-2 bg-purple-50/40">
                                  <input
                                    type="number" min="0" max="20" step="0.25"
                                    value={note?.note_theorique ?? ''}
                                    onChange={(e) => updateNote(disc.id, 'note_theorique', e.target.value)}
                                    placeholder="-"
                                    className="w-20 px-2 py-1.5 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center text-sm"
                                  />
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <span className={`font-bold text-base ${
                                    moyenne !== '-' && parseFloat(moyenne) >= 10
                                      ? 'text-green-600'
                                      : moyenne !== '-'
                                      ? 'text-red-600'
                                      : 'text-gray-400'
                                  }`}>
                                    {moyenne}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Moyenne générale */}
                    <div className="mt-6 pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Moyenne Générale:</span>
                        <span className={`text-2xl font-bold ${
                          parseFloat(calculateGeneralAverage()) >= 10 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {calculateGeneralAverage()} / 20
                        </span>
                      </div>
                    </div>

                    <BonusPanel
                      studentId={selectedStudent.id}
                      studentName={`${selectedStudent.nom} ${selectedStudent.prenom}`}
                      annee={annee}
                      disciplines={disciplines}
                      bonuses={bonuses}
                      onChanged={() => loadBonuses(selectedStudent.id)}
                    />
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Ajoutez d'abord des disciplines pour saisir les notes
                  </div>
                )}
              </div>
            )}

           {!selectedStudent && (
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>
                  {!selectedClasse
                    ? 'Choisissez une classe puis un étudiant pour saisir ses notes'
                    : 'Choisissez un étudiant de cette classe pour saisir ses notes'}
                </p>
              </div>
            )}
          </div>

          <TeacherSharing classes={getClasses()} disciplines={disciplines} annee={annee} />
        </div>
      </div>

      {generatedAccesses && (
        <StudentAccessModal accesses={generatedAccesses} onClose={() => setGeneratedAccesses(null)} />
      )}
    </div>
  );
};

export default TeacherPage;