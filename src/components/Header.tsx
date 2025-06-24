
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleVisaOptionClick = (option: string) => {
    // Pour l'instant, on peut juste faire un console.log ou rediriger vers une page
    console.log(`Visa option selected: ${option}`);
    // Vous pourrez plus tard créer des pages spécifiques pour chaque option
  };

  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Navigation principale (à gauche du logo sur desktop) */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/" className="text-white hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/index" className="text-white hover:text-secondary transition-colors">
              Schools
            </Link>
            <Link to="/blog" className="text-white hover:text-secondary transition-colors">
              Actu
            </Link>
            
            {/* Menu déroulant Visa */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-secondary transition-colors flex items-center gap-1">
                Visa <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('pays-visa')}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  Pays avec Visa ou AEVM
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('logement')}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  Trouver un logement
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('carte-sejour')}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  Carte de séjour
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="text-white hover:text-secondary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-secondary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Logo (centré) */}
          <Link to="/" className="text-white text-xl lg:text-2xl font-bold flex items-center px-3 py-2">
            <img src="/faviconn.png" alt="Logo" className="mr-2 lg:mr-4 w-16 lg:w-28 h-16 lg:h-30" />
            <span className="hidden sm:inline">Rézo Campus – L'éducation à portée de clic.</span>
            <span className="sm:hidden">Rézo Campus</span>
          </Link>
          
          {/* Login (à droite) */}
          <div className="hidden lg:flex">
            <Link to="/login" className="text-white hover:text-secondary transition-colors flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Menu mobile button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/index" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schools
              </Link>
              <Link 
                to="/blog" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Actu
              </Link>
              
              {/* Menu Visa mobile */}
              <div className="px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-secondary transition-colors flex items-center gap-1 w-full text-left">
                    Visa <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem 
                      onClick={() => {
                        handleVisaOptionClick('pays-visa');
                        setIsMobileMenuOpen(false);
                      }}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Pays avec Visa ou AEVM
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleVisaOptionClick('logement');
                        setIsMobileMenuOpen(false);
                      }}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Trouver un logement
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        handleVisaOptionClick('carte-sejour');
                        setIsMobileMenuOpen(false);
                      }}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Carte de séjour
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link 
                to="/about" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="text-white hover:text-secondary transition-colors flex items-center gap-2 px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
