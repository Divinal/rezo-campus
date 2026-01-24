import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, ArrowLeft, Lock, ChevronDown, Users } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/sonner';

interface Discipline {
  id: number;
  nom: string;
}

interface Note {
  id: number;
  discipline_id: number;
  note1: number | null;
  note2: number | null;
}

interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
}

interface NewStudent {
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
}

interface TeacherPageProps {
  isAuthenticated: boolean;
  onAuthenticate: (auth: boolean) => void;
  onBack: () => void;
}

const TeacherPage: React.FC<TeacherPageProps> = ({ isAuthenticated, onAuthenticate, onBack }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentNotes, setStudentNotes] = useState<Note[]>([]);
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newStudent, setNewStudent] = useState<NewStudent>({ 
    nom: '', 
    prenom: '', 
    classe: '', 
    numero: '' 
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('enseignant2025');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem('teacherPassword');
    if (savedPassword) setTeacherPassword(savedPassword);
    else localStorage.setItem('teacherPassword', teacherPassword);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    await Promise.all([
      loadDisciplines(),
      loadStudents()
    ]);
  };

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
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('nom', { ascending: true });

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des étudiants");
    } else {
      setStudents(data || []);
    }
  };

  const loadStudentNotes = async (studentId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('student_id', studentId);

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des notes");
      setStudentNotes([]);
    } else {
      setStudentNotes(data || []);
    }
    setLoading(false);
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    loadStudentNotes(student.id);
  };

  const checkTeacherPassword = () => {
    if (passwordInput === teacherPassword) {
      onAuthenticate(true);
      setPasswordInput('');
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }
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

    const { error } = await supabase
      .from('students')
      .insert([newStudent])
      .select();

    if (error) {
      if (error.code === '23505') {
        toast.error("Ce numéro est déjà utilisé");
      } else {
        console.error('Erreur:', error);
        toast.error("Erreur lors de l'ajout de l'étudiant");
      }
    } else {
      toast.success("Étudiant ajouté avec succès");
      setNewStudent({ nom: '', prenom: '', classe: '', numero: '' });
      loadStudents();
    }
  };

  const deleteStudent = async (id: number) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Étudiant supprimé");
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
        setStudentNotes([]);
      }
      loadStudents();
    }
  };

  const updateNote = async (disciplineId: number, noteType: 'note1' | 'note2', noteValue: string) => {
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
        [noteType]: parsedNote,
        [noteType === 'note1' ? 'note2' : 'note1']: null
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

  const calculateAverage = (note1: number | null, note2: number | null): string => {
    if (note1 === null && note2 === null) return '-';
    if (note1 === null) return note2?.toFixed(2) || '-';
    if (note2 === null) return note1?.toFixed(2) || '-';
    return ((note1 + note2) / 2).toFixed(2);
  };

  const calculateGeneralAverage = (): string => {
    const validNotes = studentNotes.filter(n => n.note1 !== null || n.note2 !== null);
    if (validNotes.length === 0) return '0.00';

    const sum = validNotes.reduce((acc, n) => {
      const avg = calculateAverage(n.note1, n.note2);
      return acc + (avg !== '-' ? parseFloat(avg) : 0);
    }, 0);

    return (sum / validNotes.length).toFixed(2);
  };

  const changePassword = (newPassword: string) => {
    if (newPassword && newPassword.length >= 6) {
      setTeacherPassword(newPassword);
      localStorage.setItem('teacherPassword', newPassword);
      toast.success('Mot de passe modifié avec succès !');
    } else {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
    }
  };

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <BookOpen size={40} className="text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Accès Enseignant</h1>
              <p className="text-gray-600 text-sm mt-2">Entrez votre mot de passe</p>
            </div>

            <div className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkTeacherPassword()}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              
              {showPasswordError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm text-center">
                  Mot de passe incorrect
                </div>
              )}

              <button
                onClick={checkTeacherPassword}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          
          <button
            onClick={() => {
              const newPass = prompt('Nouveau mot de passe (min. 6 caractères):');
              if (newPass) changePassword(newPass);
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Lock size={16} />
            Changer le mot de passe
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BookOpen size={32} className="text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Espace Enseignant</h1>
          </div>

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
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un étudiant</h2>
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
              </div>
              <button
                onClick={addStudent}
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Ajouter l'étudiant
              </button>
            </div>
          </div>

          {/* Sélection d'étudiant et saisie des notes */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Saisie des notes</h2>
            
            {/* Liste de sélection d'étudiant */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionnez un étudiant
              </label>
              <div className="relative">
                <select
                  value={selectedStudent?.id || ''}
                  onChange={(e) => {
                    const student = students.find(s => s.id === parseInt(e.target.value));
                    if (student) handleStudentSelect(student);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">-- Choisir un étudiant --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nom} {student.prenom} - Classe: {student.classe} (N°{student.numero})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

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
                    </p>
                  </div>
                  <button
                    onClick={() => deleteStudent(selectedStudent.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Supprimer
                  </button>
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
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Discipline</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Contrôle 1</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Contrôle 2</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Moyenne</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disciplines.map((disc) => {
                            const note = studentNotes.find(n => n.discipline_id === disc.id);
                            const moyenne = calculateAverage(note?.note1 || null, note?.note2 || null);
                            
                            return (
                              <tr key={disc.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{disc.nom}</td>
                                <td className="py-3 px-4">
                                  <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.25"
                                    value={note?.note1 ?? ''}
                                    onChange={(e) => updateNote(disc.id, 'note1', e.target.value)}
                                    placeholder="Note 1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.25"
                                    value={note?.note2 ?? ''}
                                    onChange={(e) => updateNote(disc.id, 'note2', e.target.value)}
                                    placeholder="Note 2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`font-bold text-lg ${
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
                <p>Sélectionnez un étudiant pour saisir ses notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;