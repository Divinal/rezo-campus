import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Eye, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PropertyComment {
  id: string;
  propriete_id: string;
  auteur_nom: string;
  auteur_email: string;
  contenu: string;
  cree_le: string;
  proprietes?: {
    id?: string;
    titre: string;
    type_offre: string;
    ville: string;
  };
}

const PropertyCommentsTable: React.FC = () => {
  const [comments, setComments] = useState<PropertyComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState<PropertyComment | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Formulaire d'ajout
  const [newComment, setNewComment] = useState({
    propriete_id: '',
    auteur_nom: '',
    auteur_email: '',
    contenu: ''
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('commentaires_proprietes')
        .select(`
          *,
          proprietes(id, titre, type_offre, ville)
        `)
        .order('cree_le', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
      toast.error('Erreur lors du chargement des commentaires');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) return;

    try {
      const { error } = await supabase
        .from('commentaires_proprietes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Commentaire supprimé avec succès');
      fetchComments();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.propriete_id || !newComment.auteur_nom || !newComment.contenu) {
      toast.error("Merci de remplir tous les champs obligatoires");
      return;
    }

    try {
      const { error } = await supabase
        .from('commentaires_proprietes')
        .insert([{
          propriete_id: newComment.propriete_id,
          auteur_nom: newComment.auteur_nom,
          auteur_email: newComment.auteur_email || null,
          contenu: newComment.contenu
        }]);

      if (error) throw error;

      toast.success("Commentaire ajouté !");
      setShowAddDialog(false);
      setNewComment({ propriete_id: '', auteur_nom: '', auteur_email: '', contenu: '' });
      fetchComments();
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Impossible d'ajouter le commentaire");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des commentaires...</p>
          </div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Commentaires sur les propriétés ({comments.length})</CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Ajouter un commentaire
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un commentaire</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label>Propriété ID *</Label>
                  <Input
                    value={newComment.propriete_id}
                    onChange={(e) => setNewComment(prev => ({ ...prev, propriete_id: e.target.value }))}
                    placeholder="ID de la propriété liée"
                    required
                  />
                </div>
                <div>
                  <Label>Nom *</Label>
                  <Input
                    value={newComment.auteur_nom}
                    onChange={(e) => setNewComment(prev => ({ ...prev, auteur_nom: e.target.value }))}
                    placeholder="Nom de l'auteur"
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newComment.auteur_email}
                    onChange={(e) => setNewComment(prev => ({ ...prev, auteur_email: e.target.value }))}
                    placeholder="Email de l'auteur (optionnel)"
                  />
                </div>
                <div>
                  <Label>Commentaire *</Label>
                  <Textarea
                    value={newComment.contenu}
                    onChange={(e) => setNewComment(prev => ({ ...prev, contenu: e.target.value }))}
                    placeholder="Votre commentaire"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>Annuler</Button>
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucun commentaire trouvé</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Propriété</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">
                      {comment.proprietes?.titre || 'Propriété supprimée'}
                    </TableCell>
                    <TableCell>
                      {comment.proprietes && (
                        <Badge variant={comment.proprietes.type_offre === 'vente' ? 'default' : 'secondary'}>
                          {comment.proprietes.type_offre}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{comment.proprietes?.ville || '-'}</TableCell>
                    <TableCell>{comment.auteur_nom}</TableCell>
                    <TableCell>{comment.auteur_email}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {comment.contenu.length > 50 
                          ? `${comment.contenu.substring(0, 50)}...` 
                          : comment.contenu
                        }
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(comment.cree_le)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedComment(comment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails du commentaire</DialogTitle>
                            </DialogHeader>
                            {selectedComment && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Propriété</h4>
                                  <p>{selectedComment.proprietes?.titre || 'Propriété supprimée'}</p>
                                  <p className="text-sm text-gray-600">
                                    {selectedComment.proprietes?.type_offre} - {selectedComment.proprietes?.ville}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Auteur</h4>
                                  <p>{selectedComment.auteur_nom}</p>
                                  <p className="text-sm text-gray-600">{selectedComment.auteur_email}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Commentaire</h4>
                                  <p className="whitespace-pre-wrap">{selectedComment.contenu}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Date</h4>
                                  <p>{formatDate(selectedComment.cree_le)}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(comment.id)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyCommentsTable;