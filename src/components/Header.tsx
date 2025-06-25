
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown, Search } from 'lucide-react';
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleVisaOptionClick = (option: string) => {
    console.log(`Visa option selected: ${option}`);
  };

  const handleSearchSelect = (value: string) => {
    console.log(`Search selected: ${value}`);
    setIsSearchOpen(false);
    // Ici vous pourrez ajouter la logique de navigation vers l'école ou formation sélectionnée
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
        id: `${school.id}-${program.nom}`,
        name: `${program.nom} - ${school.name}`,
        type: 'formation' as const,
        url: `/school/${school.id}`
      }))
    )
  ];

  return (
    <header className="bg-primary shadow-md">
      {/* Navigation principale en haut */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Navigation principale (à gauche) */}
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

          {/* Recherche et Login (à droite) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Bouton de recherche */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher...
            </Button>

            {/* Login */}
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

              {/* Recherche mobile */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:text-secondary transition-colors flex items-center gap-2 px-3 py-2"
              >
                <Search className="w-4 h-4" />
                Rechercher
              </button>

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

      {/* Logo et slogan - maintenant en dessous */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <Link to="/" className="text-white inline-flex flex-col items-center">
            <img src="/faviconn.png" alt="Logo" className="mb-4 w-20 lg:w-32 h-20 lg:h-32" />
            <div className="text-xl lg:text-2xl font-bold">
              <span className="block sm:inline">Rézo Campus – L'éducation à portée de clic.</span>
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
