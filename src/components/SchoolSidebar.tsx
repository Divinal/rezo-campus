
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

interface School {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface SchoolSidebarProps {
  school: {
    address: string;
    contact: {
      phone: string;
      email: string;
      website: string;
    };
  };
  relatedSchools: School[];
}

const SchoolSidebar: React.FC<SchoolSidebarProps> = ({ school, relatedSchools }) => {
  const navigate = useNavigate();

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (school.contact.website) {
      const websiteUrl = school.contact.website.startsWith('http') 
        ? school.contact.website 
        : `https://${school.contact.website}`;
      
      // Extraire le nom de l'école à partir de l'URL actuelle ou utiliser un nom par défaut
      const currentPath = window.location.pathname;
      const schoolId = currentPath.split('/').pop();
      
      navigate(`/formulaire?redirect=${encodeURIComponent(websiteUrl)}&school=${encodeURIComponent(schoolId || 'École')}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Informations de contact */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Informations de contact</h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-600">{school.address}</span>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
            <a 
              href={`tel:${school.contact.phone}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {school.contact.phone}
            </a>
          </div>
          
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
            <a 
              href={`mailto:${school.contact.email}`}
              className="text-gray-600 hover:text-primary transition-colors break-all"
            >
              {school.contact.email}
            </a>
          </div>
          
          {school.contact.website && (
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
              <button
                onClick={handleWebsiteClick}
                className="text-gray-600 hover:text-primary transition-colors break-all text-left"
              >
                {school.contact.website}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Écoles recommandées */}
      {relatedSchools.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Autres établissements</h3>
          <div className="space-y-4">
            {relatedSchools.map((relatedSchool) => (
              <Link
                key={relatedSchool.id}
                to={`/school/${relatedSchool.id}`}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <img
                  src={relatedSchool.logo}
                  alt={`Logo de ${relatedSchool.name}`}
                  className="w-12 h-12 object-contain rounded-lg mr-4 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {relatedSchool.name}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedSchool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolSidebar;
