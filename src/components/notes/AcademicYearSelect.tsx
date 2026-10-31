import React from 'react';
import { CalendarRange } from 'lucide-react';
import { ACADEMIC_YEARS, currentAcademicYear } from '../../lib/notesShared';

interface Props {
  value: string;
  onChange: (year: string) => void;
  className?: string;
}

const AcademicYearSelect: React.FC<Props> = ({ value, onChange, className = '' }) => (
  <label className={`inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm ${className}`}>
    <CalendarRange size={16} className="text-gray-500" />
    <span className="text-gray-600 whitespace-nowrap">Année académique</span>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
    >
      {ACADEMIC_YEARS.map(y => (
        <option key={y} value={y}>
          {y}{y === currentAcademicYear() ? ' (en cours)' : ''}
        </option>
      ))}
    </select>
  </label>
);

export default AcademicYearSelect;
