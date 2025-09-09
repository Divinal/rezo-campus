import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Eye } from 'lucide-react';

interface Property {
  id: string;
  titre: string;
  description: string;
  type_offre: 'vente' | 'location';
  prix: number;
  surface: number;
  chambres: number;
  salles_bain: number;
  type_propriete: 'appartement' | 'studio' | 'maison' | 'villa';
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

interface PropertyCardProps {
  type_propriete: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ type_propriete: property, onViewDetails }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        {/* Image du bien */}
        {property.images && property.images.length > 0 && (
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.titre}
              className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
            />
            <Badge 
              variant={property.type_offre === 'location' ? 'default' : 'secondary'}
              className="absolute top-2 left-2 text-xs"
            >
              {property.type_offre === 'vente' ? '🏠 VENTE' : '🔑 LOCATION'}
            </Badge>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="text-xs">
              {property.type_propriete}
            </Badge>
          </div>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {property.titre}
          </CardTitle>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.quartier}, {property.ville}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-2xl font-bold text-green-600">
            {property.prix.toLocaleString()} DH
            {property.type_offre === 'location' && (
              <span className="text-sm text-gray-500">/mois</span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4 text-blue-500" />
                <span>{property.surface} m²</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-green-500" />
                <span>{property.chambres}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-purple-500" />
                <span>{property.salles_bain}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{property.vues || 0}</span>
            </div>
          </div>

          <CardDescription className="line-clamp-2 text-sm">
            {property.description}
          </CardDescription>

          <Button 
            onClick={() => onViewDetails(property)}
            className="w-full group-hover:bg-primary/90 transition-colors"
          >
            Voir les détails
          </Button>
        </CardContent>
</Card>

  );
};

export default PropertyCard;