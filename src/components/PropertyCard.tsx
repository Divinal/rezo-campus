import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Eye } from 'lucide-react';

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

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant={property.type === 'vente' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {property.type === 'vente' ? '🏠 VENTE' : '🔑 LOCATION'}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {property.property_type}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {property.quartier}, {property.ville}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-green-600">
          {property.price.toLocaleString()} DH
          {property.type === 'location' && (
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
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-purple-500" />
              <span>{property.bathrooms}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Eye className="w-4 h-4" />
            <span>{property.views || 0}</span>
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