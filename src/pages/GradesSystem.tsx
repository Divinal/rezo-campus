import React, { useState } from 'react';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';

const GradesSystem: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'student' | 'teacher'>('student');
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);

  return (
    <>
      {currentPage === 'student' && (
        <StudentPage onAccessTeacher={() => setCurrentPage('teacher')} />
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