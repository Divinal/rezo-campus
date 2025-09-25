import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { schools, categories } from '../data/schools';
import SchoolCard from '../components/SchoolCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Search, Filter, X, ArrowUp, RotateCcw, SortAsc } from "lucide-react";

// Hook personnalisé pour debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Composant de loading skeleton
const SchoolCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  const itemsPerPage = 9;
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Gestion du scroll pour le bouton "Retour en haut"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulation du loading lors des changements de filtres
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, selectedCategory, sortBy]);

  // Filter schools based on category selection and search query avec optimisation
  const filteredAndSortedSchools = useMemo(() => {
    let filtered = schools.filter(school => {
      // Category filter
      const matchesCategory = selectedCategory 
        ? school.programs.some(program => program.category === selectedCategory)
        : true;
      
      // Search query filter
      const matchesSearch = debouncedSearchQuery.trim() === "" 
        ? true 
        : (
            school.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
            school.programs.some(program => 
              program.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              program.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            )
          );
      
      return matchesCategory && matchesSearch;
    });

    // Tri des résultats
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "programs":
          return b.programs.length - a.programs.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [schools, selectedCategory, debouncedSearchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedSchools.length / itemsPerPage);
  const currentSchools = filteredAndSortedSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gestionnaires d'événements optimisés
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value || null);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    setSortBy("name");
    setCurrentPage(1);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const hasActiveFilters = selectedCategory !== null || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Trouvez l'établissement parfait pour votre avenir
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
              Explorez les programmes, modalités d'inscription et parcours de nos établissements partenaires.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              Toutes les formations et Etablissements Agréés par l'Etat
            </h2>
            
            {/* Search bar améliorée */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher une école, formation ou catégorie..."
                  className="pl-12 pr-4 py-6 text-lg shadow-lg border-2 border-transparent focus:border-primary/50 transition-all duration-200 rounded-xl"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Champ de recherche d'établissements"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Effacer la recherche"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Barre d'outils avec filtres et contrôles */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              {/* Filtres par catégorie - Desktop */}
              <div className="hidden lg:block">
                <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
                  <ToggleGroup 
                    type="single"
                    className="flex flex-wrap justify-center gap-2"
                    value={selectedCategory || ""}
                    onValueChange={handleCategoryChange}
                  >
                    <ToggleGroupItem 
                      value="" 
                      className="rounded-lg px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 hover:scale-105"
                    >
                      VOIR TOUS
                    </ToggleGroupItem>
                    {categories.map((category) => (
                      <ToggleGroupItem 
                        key={category} 
                        value={category}
                        className="rounded-lg px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 hover:scale-105"
                      >
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>

              {/* Bouton filtres mobile */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition-all duration-200"
                aria-label="Ouvrir les filtres"
              >
                <Filter className="h-5 w-5" />
                Filtres {hasActiveFilters && <span className="bg-white text-primary rounded-full px-2 py-0.5 text-xs font-bold ml-1">1</span>}
              </button>

              {/* Contrôles de tri et actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    aria-label="Trier les résultats par"
                  >
                    <option value="name">Nom A-Z</option>
                    <option value="programs">Nb. formations</option>
                  </select>
                </div>
                
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    aria-label="Effacer tous les filtres"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-sm font-medium">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal filtres mobile */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title">
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Fermer les filtres"
                ></div>
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 id="mobile-filters-title" className="text-xl font-bold text-gray-800">Filtres</h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      aria-label="Fermer les filtres"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-700">Catégories</h4>
                      <ToggleGroup 
                        type="single"
                        className="flex flex-wrap gap-3"
                        value={selectedCategory || ""}
                        onValueChange={handleCategoryChange}
                      >
                        <ToggleGroupItem 
                          value="" 
                          className="rounded-lg px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white border border-gray-200"
                        >
                          VOIR TOUS
                        </ToggleGroupItem>
                        {categories.map((category) => (
                          <ToggleGroupItem 
                            key={category} 
                            value={category}
                            className="rounded-lg px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-white border border-gray-200"
                          >
                            {category}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compteur de résultats et statut */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    <span className="text-lg font-medium text-gray-600">Recherche en cours...</span>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {filteredAndSortedSchools.length} établissement{filteredAndSortedSchools.length !== 1 ? 's' : ''} trouvé{filteredAndSortedSchools.length !== 1 ? 's' : ''}
                    </h3>
                    {hasActiveFilters && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCategory && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                            {selectedCategory}
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                              aria-label={`Retirer le filtre ${selectedCategory}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                        {searchQuery && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                            "{searchQuery}"
                            <button
                              onClick={() => setSearchQuery("")}
                              className="hover:bg-blue-100 rounded-full p-0.5 transition-colors duration-200"
                              aria-label="Retirer la recherche"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {totalPages > 1 && !isLoading && (
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Page {currentPage} sur {totalPages}
                </div>
              )}
            </div>
            
            {/* Grille des établissements avec gestion des états */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SchoolCardSkeleton key={index} />
                ))}
              </div>
            ) : currentSchools.length > 0 ? (
              <>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  role="region"
                  aria-label="Liste des établissements"
                  aria-live="polite"
                  aria-atomic="false"
                >
                  {currentSchools.map(school => (
                    <div key={school.id} className="transform hover:scale-90 transition-transform duration-150">
                      <SchoolCard school={school} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination améliorée */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        scrollToTop();
                      }}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                      aria-label="Page précédente"
                    >
                      ← Précédent
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              scrollToTop();
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm ${
                              currentPage === pageNum
                                ? 'bg-primary text-white shadow-md'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:scale-105'
                            }`}
                            aria-label={`Aller à la page ${pageNum}`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        scrollToTop();
                      }}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                      aria-label="Page suivante"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6 opacity-50">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Aucun établissement trouvé
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Nous n'avons pas trouvé d'établissement correspondant à vos critères. 
                    Essayez de modifier votre recherche ou vos filtres.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Effacer tous les filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-primary">
              Pourquoi choisir notre plateforme ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
                <div className="text-5xl mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">📚</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Information complète</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accédez à toutes les informations nécessaires pour faire un choix éclairé sur votre avenir académique et professionnel.
                </p>
              </div>
              
              <div className="group p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
                <div className="text-5xl mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">🔍</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Navigation facile</h3>
                <p className="text-gray-600 leading-relaxed">
                  Une interface moderne et intuitive avec des outils de recherche avancés pour trouver rapidement ce que vous cherchez.
                </p>
              </div>
              
              <div className="group p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
                <div className="text-5xl mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Mise à jour régulière</h3>
                <p className="text-gray-600 leading-relaxed">
                  Des informations toujours à jour sur les programmes, modalités d'inscription et opportunités disponibles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Bouton scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-50 border-4 border-white"
          aria-label="Retourner en haut de la page"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Index;