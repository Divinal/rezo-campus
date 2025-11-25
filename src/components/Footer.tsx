
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
           <img src="/faviconn.png" alt="Logo" className="mr-4 w-12 h-12" /> RézoCampus
            <p className="text-sm text-gray-300">
              Est une plateforme de gestion des établissements scolaires permettant d'accéder facilement
              aux informations sur les programmes, modalités d'inscription et parcours.
            </p>
            <p>
              Notre WhatsApp : <img src="Images/code.jpg" alt="Lien WhatsApp" className="mr-4 w-16 h-18"/>
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-blue-600 px-2 py-1">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
               <li>
                <Link to="/Blog" className="text-gray-300 hover:text-secondary transition-colors">
                  Les Actualité
                </Link>
              </li>
                  <li>
                <Link to="/pays-visa" className="text-gray-300 hover:text-secondary transition-colors">
                  Voyager au Maroc
                </Link>
              </li>
               <li>
                <Link to="/Index" className="text-gray-300 hover:text-secondary transition-colors">
                  Les Formations & Etablissements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 bg-blue-600 px-2 py-1">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-secondary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-secondary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
                  <li>
                <Link to="/administration" className="text-gray-300 hover:text-secondary transition-colors">
                  Procédure de voyage au Maroc
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-blue-600 px-2 py-1">Contact</h3>
            <address className="not-italic text-gray-300 mb-4">
              <p>64, Rue Allal Ben Abdellah Casablanca</p>
              <p>20000 Casablanca, Morocco </p>
              <p className="mt-2">Email: campusrezo@gmail.com</p>
              <p>Tél: +212 617-725867</p>
            </address>

            <div>
              <h4 className="font-semibold mb-2">Suivez-nous</h4>
              <div className="flex gap-3">
                <a
                href="https://web.facebook.com/profile.php?id=61577756490219"
                target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                href="https://www.instagram.com/rezocampus"
                target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                href="https://www.linkedin.com/company/104015534/"
                target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                href="https://www.youtube.com/@RezoCAMPUS"
                target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} RézoCampus. Tous droits réservés. by mister Divin</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
