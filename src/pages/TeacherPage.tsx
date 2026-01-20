import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, ArrowLeft, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/sonner';

interface Discipline {
  id: number;
  nom: string;
}

interface Note {
  id: number;
  discipline_id: number;
  note: number;
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
  const [studentNotes, setStudentNotes] = useState<{[key: number]: Note[]}>({});
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newStudent, setNewStudent] = useState<NewStudent>({ nom: '', prenom: '', classe: '', numero: '' });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('enseignant2025');

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
      .order('nom');

    if (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des étudiants");
    } else {
      setStudents(data || []);
      // Charger les notes pour chaque étudiant
      if (data) {
        data.forEach(student => loadStudentNotes(student.id));
      }
    }
  };

  const loadStudentNotes = async (studentId: number) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('student_id', studentId);

    if (!error && data) {
      setStudentNotes(prev => ({ ...prev, [studentId]: data }));
    }
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

    const { data, error } = await supabase
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

    const { data, error } = await supabase
      .from('students')
      .insert([newStudent])
      .select();

    if (error) {
      if (error.code === '23505') { // Code d'erreur pour contrainte unique
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
      loadStudents();
    }
  };

  const updateNote = async (studentId: number, disciplineId: number, noteValue: string) => {
    const parsedNote = parseFloat(noteValue);
    
    if (isNaN(parsedNote) || parsedNote < 0 || parsedNote > 20) {
      return;
    }

    // Vérifier si la note existe déjà
    const { data: existingNote } = await supabase
      .from('notes')
      .select('id')
      .eq('student_id', studentId)
      .eq('discipline_id', disciplineId)
      .single();

    if (existingNote) {
      // Mettre à jour
      const { error } = await supabase
        .from('notes')
        .update({ note: parsedNote })
        .eq('id', existingNote.id);

      if (error) {
        console.error('Erreur:', error);
        toast.error("Erreur lors de la mise à jour");
      } else {
        loadStudentNotes(studentId);
      }
    } else {
      // Insérer
      const { error } = await supabase
        .from('notes')
        .insert([{
          student_id: studentId,
          discipline_id: disciplineId,
          note: parsedNote
        }]);

      if (error) {
        console.error('Erreur:', error);
        toast.error("Erreur lors de l'ajout de la note");
      } else {
        loadStudentNotes(studentId);
      }
    }
  };

  const calculateAverage = (notes: Note[]) => {
    if (notes.length === 0) return '0.00';
    const sum = notes.reduce((acc, n) => acc + n.note, 0);
    return (sum / notes.length).toFixed(2);
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

              <p className="text-xs text-gray-500 text-center mt-4">
                Mot de passe par défaut: enseignant2025
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page enseignant authentifié
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
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

          <div className="space-y-8">
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
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {disciplines.map((disc) => (
                  <div key={disc.id} className="bg-white p-3 rounded-lg flex justify-between items-center">
                    <span className="font-medium">{disc.nom}</span>
                    <button
                      onClick={() => deleteDiscipline(disc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {disciplines.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune discipline ajoutée</p>
                )}
              </div>
            </div>

            {/* Gestion des étudiants */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un étudiant</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
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

            {/* Liste des étudiants avec notes */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Étudiants et Notes</h2>
              <div className="space-y-4">
                {students.map((student) => {
                  const notes = studentNotes[student.id] || [];
                  return (
                    <div key={student.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {student.nom} {student.prenom}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Classe: {student.classe} | Numéro: {student.numero}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {disciplines.map((disc) => {
                          const note = notes.find(n => n.discipline_id === disc.id);
                          return (
                            <div key={disc.id}>
                              <label className="text-sm text-gray-600 block mb-1">
                                {disc.nom}
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={note?.note || ''}
                                onChange={(e) => updateNote(student.id, disc.id, e.target.value)}
                                placeholder="Note"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          );
                        })}
                      </div>
                      {notes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="font-semibold">
                            Moyenne: {calculateAverage(notes)} / 20
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {students.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucun étudiant ajouté</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;