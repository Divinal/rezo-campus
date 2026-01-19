import React, { useState, useEffect } from 'react';
import { Search, Users, Lock } from 'lucide-react';

interface Discipline {
  id: number;
  nom: string;
}

interface Note {
  disciplineId: number;
  note: number;
}

interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  numero: string;
  notes: Note[];
}

interface StudentPageProps {
  onAccessTeacher: () => void;
}

const StudentPage: React.FC<StudentPageProps> = ({ onAccessTeacher }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchNumero, setSearchNumero] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedDisciplines = localStorage.getItem('disciplines');
    const savedStudents = localStorage.getItem('students');
    if (savedDisciplines) setDisciplines(JSON.parse(savedDisciplines));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
  }, []);

  const searchStudent = () => {
    const student = students.find(s => s.numero === searchNumero);
    setSelectedStudent(student || null);
    setShowResults(true);
  };

  const calculateAverage = (notes: Note[]) => {
    if (notes.length === 0) return '0.00';
    const sum = notes.reduce((acc, n) => acc + n.note, 0);
    return (sum / notes.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <div className="max-w-3xl mx-auto">
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
            <button
              onClick={onAccessTeacher}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Accès enseignant"
            >
              <Lock size={20} />
            </button>
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
              />
              <button
                onClick={searchStudent}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Search size={20} />
                Rechercher
              </button>
            </div>

            {showResults && (
              <div className="mt-6">
                {selectedStudent ? (
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedStudent.nom} {selectedStudent.prenom}
                    </h3>
                    <p className="text-gray-600 mb-6">Classe: {selectedStudent.classe}</p>
                    
                    <div className="space-y-3">
                      {selectedStudent.notes.map((note) => {
                        const disc = disciplines.find(d => d.id === note.disciplineId);
                        return disc ? (
                          <div key={note.disciplineId} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <span className="font-medium text-lg">{disc.nom}</span>
                            <span className={`font-bold text-xl ${note.note >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                              {note.note} / 20
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>

                    {selectedStudent.notes.length > 0 && (
                      <div className="mt-6 pt-6 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xl">Moyenne Générale:</span>
                          <span className={`font-bold text-2xl ${
                            parseFloat(calculateAverage(selectedStudent.notes)) >= 10 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {calculateAverage(selectedStudent.notes)} / 20
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {selectedStudent.notes.length === 0 && (
                      <p className="text-gray-500 text-center mt-4 py-8">
                        Aucune note enregistrée pour le moment
                      </p>
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