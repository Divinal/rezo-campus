import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Edit } from 'lucide-react';

interface Property {
  id: string;
  titre: string;
  type_offre: 'vente' | 'location';
  prix: number;
  description: string;
  chambres: number;
  salles_bain: number;
  surface: number;
  adresse: string;
  ville: string;
  quartier: string;
  images: string[];
  cree_le: string;
}

const PropertiesManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'vente' as 'vente' | 'location',
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    address: '',
    city: '',
    district: '',
    images: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('proprietes')
        .select('*')
        .order('cree_le', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés:', error);
      toast.error('Erreur lors du chargement des propriétés');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const propertyData = {
        titre: formData.title,
        type_offre: formData.type,
        prix: parseFloat(formData.price),
        description: formData.description,
        chambres: parseInt(formData.bedrooms),
        salles_bain: parseInt(formData.bathrooms),
        surface: parseFloat(formData.area),
        adresse: formData.address,
        ville: formData.city,
        quartier: formData.district,
        images: formData.images ? formData.images.split(',').map(img => img.trim()) : []
      };

      if (editingProperty) {
        const { error } = await supabase
          .from('proprietes')
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (error) throw error;
        toast.success('Propriété modifiée avec succès');
      } else {
        const { error } = await supabase
          .from('proprietes')
          .insert([propertyData]);

        if (error) throw error;
        toast.success('Propriété ajoutée avec succès');
      }

      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.titre,
      type: property.type_offre,
      price: property.prix.toString(),
      description: property.description,
      bedrooms: property.chambres.toString(),
      bathrooms: property.salles_bain.toString(),
      area: property.surface.toString(),
      address: property.adresse,
      city: property.ville,
      district: property.quartier,
      images: property.images.join(', ')
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) return;

    try {
      const { error } = await supabase
        .from('proprietes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Propriété supprimée avec succès');
      fetchProperties();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      type: 'vente',
      price: '',
      description: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      address: '',
      city: '',
      district: '',
      images: ''
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement des propriétés...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingProperty ? 'Modifier la propriété' : 'Ajouter une nouvelle propriété'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Titre de l'annonce"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            
            <Select value={formData.type} onValueChange={(value: 'vente' | 'location') => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type de transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vente">Vente</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Prix (€)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />

            <Input
              type="number"
              placeholder="Nombre de chambres"
              value={formData.bedrooms}
              onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
              required
            />

            <Input
              type="number"
              placeholder="Nombre de salles de bain"
              value={formData.bathrooms}
              onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
              required
            />

            <Input
              type="number"
              step="0.1"
              placeholder="Surface (m²)"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              required
            />

            <Input
              placeholder="Adresse"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />

            <Input
              placeholder="Ville"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />

            <Input
              placeholder="Quartier"
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              required
            />

            <Input
              placeholder="URLs des images (séparées par des virgules)"
              value={formData.images}
              onChange={(e) => setFormData({...formData, images: e.target.value})}
            />

            <div className="md:col-span-2">
              <Textarea
                placeholder="Description de la propriété"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sauvegarde...' : editingProperty ? 'Modifier' : 'Ajouter'}
              </Button>
              {editingProperty && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des propriétés ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Chambres</TableHead>
                <TableHead>Surface</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.titre}</TableCell>
                  <TableCell>
                    <Badge variant={property.type_offre === 'vente' ? 'default' : 'secondary'}>
                      {property.type_offre}
                    </Badge>
                  </TableCell>
                  <TableCell>{property.prix.toLocaleString()} €</TableCell>
                  <TableCell>{property.ville}</TableCell>
                  <TableCell>{property.chambres}</TableCell>
                  <TableCell>{property.surface} m²</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesManagement;