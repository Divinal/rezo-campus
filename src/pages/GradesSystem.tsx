import React, { useState } from 'react';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import StudentSpace from './StudentSpace';

const GradesSystem: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'student' | 'teacher' | 'space'>(
    () => (localStorage.getItem('studentSpaceSession') ? 'space' : 'student')
  );
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);

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
        <TeacherPage
          isAuthenticated={isTeacherAuthenticated}
          onAuthenticate={(auth) => setIsTeacherAuthenticated(auth)}
          onBack={() => {
            setCurrentPage('student');
            setIsTeacherAuthenticated(false);
          }}
        />
      )}
    </>
  );
};

export default GradesSystem;
