import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, LogIn, Menu, X, ChevronDown, Search, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { schools } from '../data/schools';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleVisaOptionClick = (option: string) => {
    console.log(`Visa option selected: ${option}`);
  };

  const handleSearchSelect = (value: string) => {
    console.log(`Search selected: ${value}`);
    setIsSearchOpen(false);
    
    // Naviguer vers la page de l'école
    const schoolId = value.split('/school/')[1];
    if (schoolId) {
      navigate(`/school/${schoolId}`);
    }
  };

  // Préparer les données de recherche
  const searchData = [
    ...schools.map(school => ({
      id: school.id,
      name: school.name,
      type: 'école' as const,
      url: `/school/${school.id}`
    })),
    ...schools.flatMap(school => 
      school.programs.map(program => ({
        id: `${school.id}-${program.name}`,
        name: `${program.name} - ${school.name}`,
        type: 'formation' as const,
        url: `/school/${school.id}`
      }))
    )
  ];

  return (
    <header className="bg-primary shadow-md animate-fade-in">
      {/* Navigation principale en haut */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Navigation principale (à gauche) */}
          <nav className="hidden lg:flex space-x-6 animate-fade-in">
            <Link to="/" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              Home
            </Link>
            <Link to="/schools" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              Schools
            </Link>
            <Link to="/blog" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              Actualités
            </Link>            
            {/* Menu déroulant Visa */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-secondary transition-all duration-300 hover-scale flex items-center gap-1 group">
                Visa <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50 animate-scale-in">
                <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer transition-colors">
                  <Link to="/administration">
                    Administration Visa & AEVM
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('pays-visa')}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                 <Link to="/pays-visa">
                    Pays avec Visa ou AEVM
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('logement')}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                   <Link to="/immo">
                    Trouver un logement
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleVisaOptionClick('carte-sejour')}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                 <Link to="/carte-sejour">
                  Carte de séjour
                </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              <Link to="/immo" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              🏠 Immo
            </Link>
          
            <Link to="/about" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-secondary transition-all duration-300 hover-scale story-link">
              Contact
            </Link>
          </nav>
      {/* <Link
          to="/FoireOrientationForm"
          className="group relative inline-flex items-center bg-red-600 text-white border border-red-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-transparent hover:text-red-600"
        >
          <span className="transition-all duration-300 group-hover:mr-2">
           𝐈𝐧𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 Master Class
          </span>
          <span
            className="opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-600"
          >
            →
          </span>
        </Link> */}

          {/* Recherche, Réseaux sociaux et Login (à droite) */}
          <div className="hidden lg:flex items-center gap-4 animate-fade-in">
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2">
              <a
                href="https://web.facebook.com/profile.php?id=61577756490219"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-all duration-300 hover-scale p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rezocampus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-all duration-300 hover-scale p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/104015534/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-all duration-300 hover-scale p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@RezoCAMPUS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-all duration-300 hover-scale p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            {/* Bouton de recherche */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale transition-all duration-300"
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher...
            </Button>

            {/* Login */}
             <Link to="/Shopify-Training" className="text-white hover:text-secondary transition-all duration-300 hover-scale flex items-center gap-2">
              <Users className="w-4 h-4" />
              Post
            </Link>
            <Link to="/login" className="text-white hover:text-secondary transition-all duration-300 hover-scale flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <li>
             <Link to="/notes" className="text-gray-300 hover:text-secondary transition-colors">
              Consulter les notes
              </Link>
            </li>
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
          <nav className="lg:hidden mt-4 pb-4 animate-slide-in-right">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/schools" 
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
              <Link 
                to="/immo" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Immo
              </Link>
              {/*Link 
                to="/can-2025" 
                className="text-white hover:text-secondary transition-colors block px-3 py-2 hover-scale"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏆 CAN 2025
              Link>*/}
              
              {/* Menu Visa mobile */}
              <div className="px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-secondary transition-colors flex items-center gap-1 w-full text-left">
                    Visa <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link to="/administration" onClick={() => setIsMobileMenuOpen(false)}>
                        Administration Visa & AEVM
                      </Link>
                    </DropdownMenuItem>
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
                          <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale transition-all duration-300"
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher...
            </Button>

              {/* Réseaux sociaux mobile */}
              <div className="flex items-center gap-4 px-3 py-2">
                <span className="text-white text-sm">Suivez-nous :</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
               <li>
             <Link to="/notes" className="text-gray-300 hover:text-secondary transition-colors">
              Consulter les notes
              </Link>
             </li>

              {/* Login mobile */}
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

      {/* Logo et slogan - sur la même ligne sous la navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="text-white flex items-center gap-4 group">
            <img src="/faviconn.png" alt="Logo" className="w-16 h-16 lg:w-20 lg:h-20 group-hover:scale-110 transition-transform duration-500 animate-fade-in" />
            <div className="text-lg lg:text-2xl font-bold group-hover:text-secondary transition-all duration-300 animate-fade-in">
              Rézo Campus – L'éducation à portée de clic.
            </div>
          </Link>
        </div>
      </div>
      
      {/* Dialog de recherche */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Rechercher une école ou une formation..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Écoles">
            {searchData
              .filter(item => item.type === 'école')
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSearchSelect(item.url)}
                >
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Formations">
            {searchData
              .filter(item => item.type === 'formation')
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSearchSelect(item.url)}
                >
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
