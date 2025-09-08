import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, User, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  propriete_id: string;
  auteur_nom: string;
  auteur_email: string | null;
  contenu: string;
  cree_le: string;
}

interface PropertyCommentsProps {
  propertyId: string;
}

const PropertyComments: React.FC<PropertyCommentsProps> = ({ propertyId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });

  useEffect(() => {
    fetchComments();
  }, [propertyId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('commentaires_proprietes')
        .select('*')
        .eq('propriete_id', propertyId)
        .order('cree_le', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des commentaires:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author_name.trim() || !formData.content.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir au moins le nom et le commentaire",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('commentaires_proprietes')
        .insert([
          {
            propriete_id: propertyId,
            auteur_nom: formData.author_name.trim(),
            auteur_email: formData.author_email.trim() || null,
            contenu: formData.content.trim()
          }
        ]);

      if (error) {
        console.error('Erreur lors de la soumission:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le commentaire",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Commentaire envoyé !",
        description: "Votre commentaire a été publié avec succès",
      });

      // Reset form and fetch comments
      setFormData({ author_name: '', author_email: '', content: '' });
      setShowForm(false);
      fetchComments();
      
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Commentaires ({comments.length})
        </CardTitle>
        <CardDescription>
          Partagez votre avis sur cette propriété
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Comment Button */}
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            variant="outline" 
            className="w-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ajouter un commentaire
          </Button>
        )}

        {/* Comment Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Nom *</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <Label htmlFor="author_email">Email (optionnel)</Label>
                <Input
                  id="author_email"
                  type="email"
                  value={formData.author_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Commentaire *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Partagez votre avis sur cette propriété..."
                rows={4}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Envoi...' : 'Publier'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                disabled={submitting}
              >
                Annuler
              </Button>
            </div>
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-primary/20 pl-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800">
                    {comment.auteur_nom}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                    <Clock className="w-3 h-3" />
                    {formatDate(comment.cree_le)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.contenu}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucun commentaire pour le moment</p>
              <p className="text-sm">Soyez le premier à donner votre avis !</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyComments;