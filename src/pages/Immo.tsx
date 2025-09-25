import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Bed, Bath, Square, Eye, Heart, MessageCircle, Filter, Search, X, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PropertyCard from '@/components/PropertyCard';
import PropertyComments from '@/components/PropertyComments';

interface Property {
  id: string;
  titre: string;
  description: string;
  type_offre: "location" | "vente";
  prix: number;
  surface: number;
  chambres: number;
  salles_bain: number;
  type_propriete: "appartement" | "studio" | "maison" | "villa";
  quartier: string;
  ville: string;
  adresse: string;
  equipements?: string[];
  images?: string[];
  telephone_contact: string;
  email_contact: string;
  cree_le: string;
  vues: number;
}

const Immo: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('location');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 500]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [maxSurface, setMaxSurface] = useState(500);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      const prices = properties.map(p => p.prix);
      const surfaces = properties.map(p => p.surface);
      const maxPriceValue = Math.max(...prices);
      const maxSurfaceValue = Math.max(...surfaces);
      
      setMaxPrice(maxPriceValue);
      setMaxSurface(maxSurfaceValue);
      setPriceRange([0, maxPriceValue]);
      setSurfaceRange([0, maxSurfaceValue]);
    }
  }, [properties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('proprietes')
        .select('*')
        .order('cree_le', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des propriétés:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les propriétés",
          variant: "destructive",
        });
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('proprietes')
        .select('type_propriete')
        .not('type_propriete', 'is', null);

      if (error) {
        console.error('Erreur lors du chargement des types:', error);
        return;
      }

      const uniqueTypes = [...new Set(data?.map(item => item.type_propriete) || [])] as string[];
      setPropertyTypes(uniqueTypes);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const incrementViews = useCallback(async (propertyId: string) => {
    try {
      const currentProperty = properties.find(p => p.id === propertyId);
      const currentViews = currentProperty?.vues || 0;
      const newViews = currentViews + 1;

      const { error } = await supabase
        .from('proprietes')
        .update({ vues: newViews })
        .eq('id', propertyId);

      if (!error) {
        setProperties(prev => 
          prev.map(p => p.id === propertyId ? { ...p, vues: newViews } : p)
        );
      } else {
        console.error('Erreur lors de l\'incrémentation des vues:', error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error);
    }
  }, [properties]);

  const handleViewDetails = useCallback((property: Property) => {
    setSelectedProperty(property);
    incrementViews(property.id);
  }, [incrementViews]);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
        toast({ title: "Retiré des favoris", description: "Propriété retirée de vos favoris" });
      } else {
        newFavorites.add(propertyId);
        toast({ title: "Ajouté aux favoris", description: "Propriété ajoutée à vos favoris" });
      }
      return newFavorites;
    });
  }, []);

  const shareProperty = useCallback((property: Property) => {
    if (navigator.share) {
      navigator.share({
        title: property.titre,
        text: `Découvrez cette propriété: ${property.titre}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Lien copié", description: "Le lien a été copié dans le presse-papiers" });
    }
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Filtre par type d'offre (location/vente)
      if (property.type_offre !== activeTab) return false;
      
      // Filtre par recherche
      if (searchTerm && !property.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.quartier.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.ville.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Filtre par type de propriété
      if (selectedPropertyType !== 'all' && property.type_propriete !== selectedPropertyType) return false;
      
      // Filtre par prix
      if (property.prix < priceRange[0] || property.prix > priceRange[1]) return false;
      
      // Filtre par superficie
      if (property.surface < surfaceRange[0] || property.surface > surfaceRange[1]) return false;
      
      return true;
    });
  }, [properties, activeTab, searchTerm, selectedPropertyType, priceRange, surfaceRange]);

  const resetFilters = useCallback(() => {
    setSelectedPropertyType('all');
    setPriceRange([0, maxPrice]);
    setSurfaceRange([0, maxSurface]);
    setSearchTerm('');
  }, [maxPrice, maxSurface]);

  const LoadingCard = () => (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow">
          <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <Skeleton className="h-12 w-96 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-64 mx-auto bg-white/20" />
            </div>
          </section>
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
         <section className="py-3 bg-gradient-to-b from-background to-muted/100">
          <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher une propriété, quartier, ville..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/95 backdrop-blur border border-green-500 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
        </section>
        {/* Main Content */}
        <section className="py-12 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-card border shadow-sm">
                  <TabsTrigger value="location" className="text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                    🔑 Locations
                  </TabsTrigger>
                  <TabsTrigger value="vente" className="text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                    🏠 Ventes
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Filtres - Version Mobile */}
              <div className="md:hidden mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                </Button>
                {showFilters && (
                  <Card className="mt-4 animate-slide-in">
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <label className="text-sm font-medium">Type de propriété</label>
                        <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Tous les types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Prix: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DH
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          max={maxPrice}
                          min={0}
                          step={1000}
                          className="w-full mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Superficie: {surfaceRange[0]} - {surfaceRange[1]} m²
                        </label>
                        <Slider
                          value={surfaceRange}
                          onValueChange={(value) => setSurfaceRange(value as [number, number])}
                          max={maxSurface}
                          min={0}
                          step={5}
                          className="w-full mt-2"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          {filteredProperties.length} propriété(s) trouvée(s)
                        </p>
                        <Button variant="outline" onClick={resetFilters} size="sm">
                          Réinitialiser
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Filtres - Version Desktop */}
              <Card className="mb-8 hidden md:block border-0 shadow-lg bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Filter className="w-5 h-5 text-primary" />
                    Filtres de recherche
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Type de propriété</label>
                      <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                        <SelectTrigger className="bg-background border hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="all">Tous les types</SelectItem>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Prix: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DH
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        max={maxPrice}
                        min={0}
                        step={1000}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Superficie: {surfaceRange[0]} - {surfaceRange[1]} m²
                      </label>
                      <Slider
                        value={surfaceRange}
                        onValueChange={(value) => setSurfaceRange(value as [number, number])}
                        max={maxSurface}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-3 sm:mb-0">
                      {filteredProperties.length} propriété(s) trouvée(s)
                    </p>
                    <Button variant="outline" onClick={resetFilters} className="hover-scale">
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <TabsContent value="location" className="space-y-8">
                <div className="text-center mb-8 animate-fade-in">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Propriétés à Louer
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Trouvez votre location idéale parmi notre sélection de propriétés
                  </p>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                    {filteredProperties.map((property, index) => (
                      <div 
                        key={property.id} 
                        className="animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <PropertyCard
                          type_propriete={property}
                          onViewDetails={handleViewDetails}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={favorites.has(property.id)}
                          onShare={shareProperty}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="text-8xl mb-6">🔑</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Aucune propriété à louer trouvée
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Essayez d'ajuster vos filtres ou revenez bientôt pour découvrir nos nouvelles offres !
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="vente" className="space-y-8">
                <div className="text-center mb-8 animate-fade-in">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Propriétés à Vendre
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Découvrez nos offres exclusives de vente immobilière
                  </p>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                    {filteredProperties.map((property, index) => (
                      <div 
                        key={property.id} 
                        className="animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <PropertyCard
                          type_propriete={property}
                          onViewDetails={handleViewDetails}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={favorites.has(property.id)}
                          onShare={shareProperty}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="text-8xl mb-6">🏠</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Aucune propriété à vendre trouvée
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Essayez d'ajuster vos filtres ou revenez bientôt pour découvrir nos nouvelles offres !
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        {/* Property Details Modal */}
        <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
            {selectedProperty && (
              <>
                <DialogHeader className="p-6 pb-4 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <DialogTitle className="text-2xl md:text-3xl font-bold text-primary mb-3">
                        {selectedProperty.titre}
                      </DialogTitle>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-lg">{selectedProperty.quartier}, {selectedProperty.ville}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold text-green-600">
                          {selectedProperty.prix.toLocaleString()} DH
                          {selectedProperty.type_offre === 'location' && (
                            <span className="text-lg font-normal text-muted-foreground">/mois</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{selectedProperty.vues} vues</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFavorite(selectedProperty.id)}
                          className="flex items-center gap-2"
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(selectedProperty.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          {favorites.has(selectedProperty.id) ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareProperty(selectedProperty)}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          Partager
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="p-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Property Details */}
                    <div className="space-y-6">
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-primary">
                            <Square className="w-5 h-5" />
                            Caractéristiques
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <Square className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                              <div className="font-semibold text-blue-900">{selectedProperty.surface} m²</div>
                              <div className="text-xs text-blue-600">Surface</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <Bed className="w-6 h-6 text-green-600 mx-auto mb-1" />
                              <div className="font-semibold text-green-900">{selectedProperty.chambres}</div>
                              <div className="text-xs text-green-600">Chambres</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <Bath className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                              <div className="font-semibold text-purple-900">{selectedProperty.salles_bain}</div>
                              <div className="text-xs text-purple-600">Salles de bain</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <Badge variant="secondary" className="text-sm px-3 py-1">
                                {selectedProperty.type_propriete.charAt(0).toUpperCase() + selectedProperty.type_propriete.slice(1)}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="font-medium text-foreground">Adresse:</span>
                                <span className="text-muted-foreground">{selectedProperty.adresse}</span>
                              </div>
                            </div>
                            {selectedProperty.equipements && selectedProperty.equipements.length > 0 && (
                              <div>
                                <h4 className="font-medium text-foreground mb-2">Équipements:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProperty.equipements.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs hover-scale">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-primary">Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedProperty.description}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-primary">Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              📞
                            </div>
                            <div>
                              <div className="font-medium">Téléphone</div>
                              <div className="text-muted-foreground">{selectedProperty.telephone_contact}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              📧
                            </div>
                            <div>
                              <div className="font-medium">Email</div>
                              <div className="text-muted-foreground">{selectedProperty.email_contact}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Comments Section */}
                    <div className="xl:border-l xl:pl-8 border-border">
                      <PropertyComments propertyId={selectedProperty.id} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
         <section className="bg-gradient-to-br from-primary via-primary/50 to-primary/40 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              🏠 Rezo Immo 
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in opacity-90">
              Trouvez votre logement idéal - Vente et Location
            </p>           
          </div>
        </section>
      </main>      
      <Footer />
    </div>
  );
};

export default Immo;