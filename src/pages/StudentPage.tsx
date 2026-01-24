import React, { useState, useEffect } from 'react';
import { Search, Users, Lock } from 'lucide-react';
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

interface StudentPageProps {
  onAccessTeacher: () => void;
}

const StudentPage: React.FC<StudentPageProps> = ({ onAccessTeacher }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [searchNumero, setSearchNumero] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentNotes, setStudentNotes] = useState<Note[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDisciplines();
  }, []);

  const loadDisciplines = async () => {
    const { data, error } = await supabase
      .from('disciplines')
      .select('*')
      .order('nom');

    if (error) {
      console.error('Erreur lors du chargement des disciplines:', error);
    } else {
      setDisciplines(data || []);
    }
  };

  const searchStudent = async () => {
    if (!searchNumero.trim()) {
      toast.error("Veuillez entrer un numéro");
      return;
    }

    setLoading(true);

    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('numero', searchNumero)
      .single();

    if (studentError || !studentData) {
      setSelectedStudent(null);
      setStudentNotes([]);
      setShowResults(true);
      setLoading(false);
      return;
    }

    setSelectedStudent(studentData);

    const { data: notesData, error: notesError } = await supabase
      .from('notes')
      .select('*')
      .eq('student_id', studentData.id);

    if (notesError) {
      console.error('Erreur lors du chargement des notes:', notesError);
      setStudentNotes([]);
    } else {
      setStudentNotes(notesData || []);
    }

    setShowResults(true);
    setLoading(false);
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
    },0);
return (sum / validNotes.length).toFixed(2);
};
return (
<div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
<div className="max-w-5xl mx-auto">
<div className="bg-white rounded-2xl shadow-xl p-8">
    <div className="flex items-center justify-between mb-8">
  <div className="flex items-center gap-3">
    <div className="bg-green-100 p-3 rounded-lg">
      <Users size={32} className="text-green-600" />
    </div>
    <h1 className="text-3xl font-bold text-gray-800">Consultation des Notes</h1>
  </div>
  
  {/* <button
    onClick={onAccessTeacher}
    className="text-gray-400 hover:text-gray-600 transition"
    title="Accès enseignant"
  >
    <Lock size={20} />
  </button> */}
</div>
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Consulter mes notes
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchNumero}
            onChange={(e) => setSearchNumero(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchStudent()}
            placeholder="Entrez votre numéro unique"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            disabled={loading}
          />
          <button
            onClick={searchStudent}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={20} />
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>

        {showResults && (
          <div className="mt-6">
            {selectedStudent ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {selectedStudent.nom} {selectedStudent.prenom}
                  </h3>
                  <p className="text-gray-600">
                    Classe: {selectedStudent.classe} | N°: {selectedStudent.numero}
                  </p>
                </div>
                
                {studentNotes.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                              Discipline
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                              Contrôle 1
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                              Contrôle 2
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                              Moyenne
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentNotes.map((note) => {
                            const disc = disciplines.find(d => d.id === note.discipline_id);
                            const moyenne = calculateAverage(note.note1, note.note2);
                            
                            return disc ? (
                              <tr key={note.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium">
                                  {disc.nom}
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                  <span className={note.note1 !== null ? 'font-semibold' : 'text-gray-400'}>
                                    {note.note1 !== null ? note.note1.toFixed(2) : '-'}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                  <span className={note.note2 !== null ? 'font-semibold' : 'text-gray-400'}>
                                    {note.note2 !== null ? note.note2.toFixed(2) : '-'}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-center">
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
                            ) : null;
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 pt-6 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                        <span className="text-xl font-bold text-gray-800">Moyenne Générale:</span>
                        <span className={`text-3xl font-bold ${
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
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Aucune note enregistrée pour le moment
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-lg text-center">
                <p className="font-semibold text-lg">
                  ❌ Aucun étudiant trouvé avec ce numéro
                </p>
                <p className="text-sm mt-2">
                  Vérifiez votre numéro et réessayez
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
);
};

export default StudentPage;