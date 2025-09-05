import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Eye, Heart, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PropertyCard from '@/components/PropertyCard';
import PropertyComments from '@/components/PropertyComments';

interface Property {
  id: string;
  title: string;
  description: string;
  type: 'vente' | 'location';
  price: number;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  property_type: 'appartement' | 'studio' | 'maison' | 'villa';
  quartier: string;
  ville: string;
  address: string;
  features: string[];
  images: string[];
  contact_phone: string;
  contact_email: string;
  created_at: string;
  views: number;
}

const Immo: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('vente');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

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

  const incrementViews = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ views: properties.find(p => p.id === propertyId)?.views + 1 || 1 })
        .eq('id', propertyId);

      if (!error) {
        setProperties(prev => 
          prev.map(p => p.id === propertyId ? { ...p, views: (p.views || 0) + 1 } : p)
        );
      }
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error);
    }
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    incrementViews(property.id);
  };

  const filteredProperties = properties.filter(property => property.type === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des propriétés...</p>
          </div>
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
        <section className="bg-gradient-to-b from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🏠 Immo RezoCampus
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Trouvez votre logement idéal - Vente et Location
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="vente" className="text-lg py-3">
                    🏠 Ventes
                  </TabsTrigger>
                  <TabsTrigger value="location" className="text-lg py-3">
                    🔑 Locations
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="vente" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Propriétés à Vendre
                  </h2>
                  <p className="text-gray-600">
                    Découvrez nos offres de vente immobilière
                  </p>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Aucune propriété à vendre pour le moment
                    </h3>
                    <p className="text-gray-500">
                      Revenez bientôt pour découvrir nos nouvelles offres !
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Propriétés à Louer
                  </h2>
                  <p className="text-gray-600">
                    Trouvez votre location idéale
                  </p>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔑</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Aucune propriété à louer pour le moment
                    </h3>
                    <p className="text-gray-500">
                      Revenez bientôt pour découvrir nos nouvelles offres !
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Property Details Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedProperty.quartier}, {selectedProperty.ville}
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedProperty.price.toLocaleString()} DH
                      {selectedProperty.type === 'location' && '/mois'}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Property Details */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Caractéristiques</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Square className="w-4 h-4 text-blue-500" />
                            <span>{selectedProperty.surface} m²</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-green-500" />
                            <span>{selectedProperty.bedrooms} ch.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4 text-purple-500" />
                            <span>{selectedProperty.bathrooms} sdb</span>
                          </div>
                        </div>
                        <div>
                          <Badge variant="secondary">
                            {selectedProperty.property_type}
                          </Badge>
                        </div>
                        <div>
                          <strong>Adresse:</strong> {selectedProperty.address}
                        </div>
                        {selectedProperty.features.length > 0 && (
                          <div>
                            <strong>Équipements:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedProperty.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedProperty.description}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <strong>Téléphone:</strong> {selectedProperty.contact_phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {selectedProperty.contact_email}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Comments Section */}
                  <div>
                    <PropertyComments propertyId={selectedProperty.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Immo;