import React, { useState } from 'react';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import StudentSpace from './StudentSpace';
import AuthGuard from '../components/AuthGuard';

const GradesSystem: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'student' | 'teacher' | 'space'>(
    () => (localStorage.getItem('studentSpaceSession') ? 'space' : 'student')
  );

  return (
    <>
      {currentPage === 'student' && (
        <StudentPage
          onAccessTeacher={() => setCurrentPage('teacher')}
          onAccessSpace={() => setCurrentPage('space')}
        />
      )}
      {currentPage === 'space' && (
        <StudentSpace onBack={() => setCurrentPage('student')} />
      )}
      {currentPage === 'teacher' && (
        <AuthGuard title="Accès Enseignant" onBack={() => setCurrentPage('student')}>
          <TeacherPage onBack={() => setCurrentPage('student')} />
        </AuthGuard>
      )}
    </>
  );
};

export default GradesSystem;
