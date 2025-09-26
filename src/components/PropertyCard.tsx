import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Eye, Heart, Share2 } from 'lucide-react';

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
  onToggleFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
  onShare?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  type_propriete: property, 
  onViewDetails, 
  onToggleFavorite,
  isFavorite = false,
  onShare
}) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card border border-border/50 hover:border-primary/30 transform hover:-translate-y-1">
      {/* Property Image */}
      <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 relative overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div className={`absolute inset-0 flex items-center justify-center text-muted-foreground ${property.images && property.images.length > 0 ? 'hidden' : ''}`}>
          <div className="text-center">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🏠</div>
            <div className="text-sm">Photo non disponible</div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={property.type_offre === 'location' ? 'default' : 'secondary'}
            className="bg-background/95 backdrop-blur text-foreground font-medium border shadow-sm"
          >
            {property.type_offre === 'location' ? '🔑 Location' : '🏠 Vente'}
          </Badge>
        </div>
        
        {/* Views counter */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-background/95 backdrop-blur text-muted-foreground text-xs border shadow-sm">
            <Eye className="w-3 h-3 mr-1" />
            {property.vues || 0}
          </Badge>
        </div>

        {/* Favorite button overlay */}
        {onToggleFavorite && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 bg-background/95 backdrop-blur hover:bg-background shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
            >
              <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {property.titre}
          </h3>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
            <span className="text-sm truncate">{property.quartier}, {property.ville}</span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold text-green-600">
            {property.prix.toLocaleString()} DH
            {property.type_offre === 'location' && (
              <span className="text-sm font-normal text-muted-foreground">/mois</span>
            )}
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/50">
            <div className="text-center">
              <Square className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <div className="text-sm font-medium text-foreground">{property.surface} m²</div>
              <div className="text-xs text-muted-foreground">Surface</div>
            </div>
            <div className="text-center">
              <Bed className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <div className="text-sm font-medium text-foreground">{property.chambres}</div>
              <div className="text-xs text-muted-foreground">Chambres</div>
            </div>
            <div className="text-center">
              <Bath className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <div className="text-sm font-medium text-foreground">{property.salles_bain}</div>
              <div className="text-xs text-muted-foreground">Salles de bain</div>
            </div>
          </div>
          
          {/* Property type */}
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs hover-scale">
              {property.type_propriete.charAt(0).toUpperCase() + property.type_propriete.slice(1)}
            </Badge>
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(property);
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Actions */}
          <div className="pt-2">
            <Button 
              onClick={() => onViewDetails(property)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover-scale"
            >
              Voir les détails
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;