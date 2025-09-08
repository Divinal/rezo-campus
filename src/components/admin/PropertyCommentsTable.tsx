import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PropertyComment {
  id: string;
  propriete_id: string;
  auteur_nom: string;
  auteur_email: string;
  contenu: string;
  cree_le: string;
  proprietes?: {
    titre: string;
    type_offre: string;
    ville: string;
  };
}

const PropertyCommentsTable: React.FC = () => {
  const [comments, setComments] = useState<PropertyComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState<PropertyComment | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('commentaires_proprietes')
        .select(`
          *,
          proprietes(titre, type_offre, ville)
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
    return <div className="text-center py-8">Chargement des commentaires...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Commentaires sur les propriétés ({comments.length})</CardTitle>
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