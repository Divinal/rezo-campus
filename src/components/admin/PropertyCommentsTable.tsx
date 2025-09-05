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
  property_id: string;
  author_name: string;
  author_email: string;
  comment: string;
  created_at: string;
  property?: {
    title: string;
    type: string;
    city: string;
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
        .from('property_comments')
        .select(`
          *,
          property:properties(title, type, city)
        `)
        .order('created_at', { ascending: false });

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
        .from('property_comments')
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
                      {comment.property?.title || 'Propriété supprimée'}
                    </TableCell>
                    <TableCell>
                      {comment.property && (
                        <Badge variant={comment.property.type === 'vente' ? 'default' : 'secondary'}>
                          {comment.property.type}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{comment.property?.city || '-'}</TableCell>
                    <TableCell>{comment.author_name}</TableCell>
                    <TableCell>{comment.author_email}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {comment.comment.length > 50 
                          ? `${comment.comment.substring(0, 50)}...` 
                          : comment.comment
                        }
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(comment.created_at)}</TableCell>
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
                                  <p>{selectedComment.property?.title || 'Propriété supprimée'}</p>
                                  <p className="text-sm text-gray-600">
                                    {selectedComment.property?.type} - {selectedComment.property?.city}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Auteur</h4>
                                  <p>{selectedComment.author_name}</p>
                                  <p className="text-sm text-gray-600">{selectedComment.author_email}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Commentaire</h4>
                                  <p className="whitespace-pre-wrap">{selectedComment.comment}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Date</h4>
                                  <p>{formatDate(selectedComment.created_at)}</p>
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