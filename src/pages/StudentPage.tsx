import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock, KeyRound, ArrowRight, UserPlus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface StudentPageProps {
  onAccessTeacher: () => void;
  onAccessSpace: () => void;
}

// Grades are only shown inside the student space (numero + access code), never by numero alone.
const StudentPage: React.FC<StudentPageProps> = ({ onAccessTeacher, onAccessSpace }) => (
  <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 px-3 sm:px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-green-400 to-teal-500 p-2 sm:p-3 rounded-lg md:rounded-xl shadow-md">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">Mes notes</h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Vos notes, rendez-vous et cours sont dans votre espace étudiant
                </p>
              </div>
            </div>
            <button
              onClick={onAccessTeacher}
              className="text-gray-300 hover:text-gray-500 transition p-1"
              title="Accès enseignant"
            >
              <Lock size={18} />
            </button>
          </div>
        </div>

        <button
          onClick={onAccessSpace}
          className="w-full text-left bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 text-white flex items-center gap-4 transition"
        >
          <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
            <KeyRound size={26} />
          </div>
          <div className="flex-1">
            <p className="text-lg md:text-xl font-bold">Accéder à mon espace étudiant</p>
            <p className="text-sm text-white/85">
              Notes et points de participation, rendez-vous d'examens et de contrôles, cours de vos enseignants
              et code de vérification. Connectez-vous avec votre identifiant et votre code d'accès.
            </p>
          </div>
          <ArrowRight size={22} className="flex-shrink-0" />
        </button>

        <Link
          to="/inscription-etudiant"
          className="flex items-center gap-4 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition"
        >
          <div className="bg-teal-50 p-3 rounded-xl flex-shrink-0">
            <UserPlus size={24} className="text-teal-700" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Pas encore d'identifiant ?</p>
            <p className="text-sm text-gray-600">Inscrivez-vous dans votre classe pour recevoir vos accès.</p>
          </div>
          <ArrowRight size={20} className="text-gray-500 flex-shrink-0" />
        </Link>
      </div>
    </div>
    <Footer />
  </>
);

export default StudentPage;
