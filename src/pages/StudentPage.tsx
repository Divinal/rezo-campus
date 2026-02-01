import React, { useState, useEffect } from 'react';
import { Search, Users, Lock, BookOpen, Trophy, TrendingUp, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      .eq('numero', searchNumero.trim())
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

  const resetSearch = () => {
    setSearchNumero('');
    setSelectedStudent(null);
    setStudentNotes([]);
    setShowResults(false);
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

  const getValidatedSubjects = (): number => {
    return studentNotes.filter(n => {
      const avg = calculateAverage(n.note1, n.note2);
      return avg !== '-' && parseFloat(avg) >= 10;
    }).length;
  };

  const getNoteColor = (value: number | null): string => {
    if (value === null) return 'text-gray-400';
    return value >= 10 ? 'text-green-600' : 'text-red-600';
  };

  const getNoteBg = (value: number | null): string => {
    if (value === null) return 'bg-gray-100';
    return value >= 10 ? 'bg-green-50' : 'bg-red-50';
  };

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 px-3 sm:px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">

          {/* En-tête */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-green-400 to-teal-500 p-2 sm:p-3 rounded-lg md:rounded-xl shadow-md">
                  <Users size={22} className="text-white sm:hidden" />
                  <Users size={28} className="text-white hidden sm:block md:hidden" />
                  <Users size={32} className="text-white hidden md:block" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
                    Consultation des Notes
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    Consultez vos résultats scolaires
                  </p>
                </div>
              </div>
               {/*<button
                onClick={onAccessTeacher}
                className="text-gray-300 hover:text-gray-500 transition p-1"
                title="Accès enseignant"
              >
                <Lock size={18} />
              </button>*/}
            </div>
          </div>

          {/* Zone de recherche */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Search className="text-green-600" size={20} />
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                  Rechercher mes notes
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  value={searchNumero}
                  onChange={(e) => setSearchNumero(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchStudent()}
                  placeholder="Entrez votre numéro unique"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all text-base md:text-lg"
                  disabled={loading}
                />
                <button
                  onClick={searchStudent}
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md font-medium"
                >
                  <Search size={18} />
                  {loading ? 'Recherche...' : 'Rechercher'}
                </button>
              </div>

              {showResults && selectedStudent && (
                <button
                  onClick={resetSearch}
                  className="mt-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RotateCcw size={14} />
                  Initialiser la recherche
                </button>
              )}
            </div>

            {/* État initial - pas de recherche */}
            {!showResults && (
              <div className="mt-8 text-center py-8 md:py-12">
                <div className="text-gray-200 flex justify-center mb-3">
                  <Search size={48} />
                </div>
                <p className="text-gray-500 text-base md:text-lg">
                  Entrez votre numéro unique pour consulter vos notes
                </p>
                <p className="text-gray-400 text-sm mt-1">
                 Si vous ne vous rappelez plus de votre numéro unique veillez contacter Mr Aldriche
                </p>
              </div>
            )}

            {/* Résultats */}
            {showResults && (
              <div className="mt-5 md:mt-8">

                {/* Étudiant trouvé */}
                {selectedStudent ? (
                  <div className="space-y-4 md:space-y-5">

                    {/* Carte infos étudiant */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 md:p-5 rounded-lg md:rounded-xl">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                            {selectedStudent.nom} {selectedStudent.prenom}
                          </h3>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BookOpen size={14} />
                              Classe: <strong>{selectedStudent.classe}</strong>
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>
                              Matricule: <strong>{selectedStudent.numero}</strong>
                            </span>
                          </div>
                        </div>

                        {studentNotes.length > 0 && (
                          <div className="flex gap-2 sm:gap-3">
                            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-center flex-1 sm:flex-none">
                              <div className="text-xs text-gray-500">Validées</div>
                              <div className="text-lg font-bold text-green-600">
                                {getValidatedSubjects()}<span className="text-sm text-gray-400">/{studentNotes.length}</span>
                              </div>
                            </div>
                            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-center flex-1 sm:flex-none">
                              <div className="text-xs text-gray-500">Moyenne</div>
                              <div className={`text-lg font-bold ${parseFloat(calculateGeneralAverage()) >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                                {calculateGeneralAverage()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes existantes */}
                    {studentNotes.length > 0 ? (
                      <>
                        {/* Tableau - version desktop */}
                        <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                  <th className="text-left px-5 py-4 font-semibold text-gray-700 border-b-2 border-gray-200">Discipline</th>
                                  <th className="text-center px-5 py-4 font-semibold text-gray-700 border-b-2 border-gray-200">Contrôle 1</th>
                                  <th className="text-center px-5 py-4 font-semibold text-gray-700 border-b-2 border-gray-200">Contrôle 2</th>
                                  <th className="text-center px-5 py-4 font-semibold text-gray-700 border-b-2 border-gray-200">Moyenne</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {studentNotes.map((note) => {
                                  const disc = disciplines.find(d => d.id === note.discipline_id);
                                  const moyenne = calculateAverage(note.note1, note.note2);
                                  const isValidated = moyenne !== '-' && parseFloat(moyenne) >= 10;

                                  return disc ? (
                                    <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                                      <td className="px-5 py-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                          {isValidated && <Trophy size={16} className="text-green-500" />}
                                          {disc.nom}
                                        </div>
                                      </td>
                                      <td className="px-5 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${getNoteBg(note.note1)} ${getNoteColor(note.note1)}`}>
                                          {note.note1 !== null ? note.note1.toFixed(2) : '-'}
                                        </span>
                                      </td>
                                      <td className="px-5 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${getNoteBg(note.note2)} ${getNoteColor(note.note2)}`}>
                                          {note.note2 !== null ? note.note2.toFixed(2) : '-'}
                                        </span>
                                      </td>
                                      <td className="px-5 py-4 text-center">
                                        <span className={`inline-block px-4 py-1.5 rounded-lg font-bold text-lg ${
                                          moyenne !== '-' && parseFloat(moyenne) >= 10
                                            ? 'bg-green-100 text-green-700'
                                            : moyenne !== '-'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-400'
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
                        </div>

                        {/* Cards - version mobile */}
                        <div className="md:hidden space-y-3">
                          {studentNotes.map((note) => {
                            const disc = disciplines.find(d => d.id === note.discipline_id);
                            const moyenne = calculateAverage(note.note1, note.note2);
                            const isValidated = moyenne !== '-' && parseFloat(moyenne) >= 10;

                            return disc ? (
                              <div key={note.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                {/* Nom discipline */}
                                <div className={`px-4 py-2.5 flex items-center justify-between ${isValidated ? 'bg-green-50' : 'bg-gray-50'}`}>
                                  <div className="flex items-center gap-2">
                                    {isValidated && <Trophy size={15} className="text-green-500" />}
                                    <span className="font-semibold text-gray-800">{disc.nom}</span>
                                  </div>
                                  <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                                    moyenne !== '-' && parseFloat(moyenne) >= 10
                                      ? 'bg-green-100 text-green-700'
                                      : moyenne !== '-'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-200 text-gray-500'
                                  }`}>
                                    Moy: {moyenne}
                                  </span>
                                </div>
                                {/* Notes */}
                                <div className="grid grid-cols-2 divide-x divide-gray-100">
                                  <div className="p-3 text-center">
                                    <div className="text-xs text-gray-500 mb-1">Contrôle 1</div>
                                    <div className={`font-bold text-lg ${getNoteColor(note.note1)}`}>
                                      {note.note1 !== null ? note.note1.toFixed(2) : '-'}
                                    </div>
                                  </div>
                                  <div className="p-3 text-center">
                                    <div className="text-xs text-gray-500 mb-1">Contrôle 2</div>
                                    <div className={`font-bold text-lg ${getNoteColor(note.note2)}`}>
                                      {note.note2 !== null ? note.note2.toFixed(2) : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </div>

                        {/* Moyenne générale */}
                        <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm p-4 md:p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingUp size={20} className="text-gray-600" />
                              <span className="text-base md:text-lg font-bold text-gray-800">Moyenne Générale</span>
                            </div>
                            <span className={`text-2xl md:text-3xl font-bold px-4 py-1 rounded-lg ${
                              parseFloat(calculateGeneralAverage()) >= 10
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {calculateGeneralAverage()} <span className="text-sm md:text-base opacity-60">/ 20</span>
                            </span>
                          </div>
                        </div>

                        {/* Message encouragement */}
                        <div className={`p-3 md:p-4 rounded-lg text-center ${
                          parseFloat(calculateGeneralAverage()) >= 10
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-orange-50 border border-orange-200'
                        }`}>
                          <p className={`font-medium text-sm md:text-base ${
                            parseFloat(calculateGeneralAverage()) >= 10 ? 'text-green-700' : 'text-orange-700'
                          }`}>
                            {parseFloat(calculateGeneralAverage()) >= 10
                              ? '🎉 Félicitations ! Vous avez validé ces disciplines !'
                              : '💪 Continuez vos efforts, vous pouvez y arriver !'}
                          </p>
                        </div>
                      </>
                    ) : (
                      /* Aucune note */
                      <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500 text-base">Aucune note enregistrée pour le moment</p>
                        <p className="text-gray-400 text-sm mt-1">Vos notes apparaîtront ici une fois saisies par votre enseignant</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Étudiant non trouvé */
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 md:p-6 text-center">
                    <div className="text-red-400 flex justify-center mb-3">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-red-700 font-semibold text-base md:text-lg">
                      Aucun étudiant trouvé
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Aucun compte n'est associé au numéro <strong>{searchNumero}</strong>
                    </p>
                    <button
                      onClick={resetSearch}
                      className="mt-4 bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 mx-auto"
                    >
                      <RotateCcw size={14} />
                      Réessayer
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;