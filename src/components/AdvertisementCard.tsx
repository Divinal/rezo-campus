
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  created_at: string;
}

interface AdvertisementCardProps {
  advertisement: Advertisement;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ advertisement }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('ad_comments')
        .select('*')
        .eq('ad_id', advertisement.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, advertisement.id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ad_comments')
        .insert([
          {
            ad_id: advertisement.id,
            author: author.trim(),
            content: content.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setAuthor('');
      setContent('');
      
      toast({
        title: "Succès",
        description: "Votre commentaire a été ajouté !",
      });

      loadComments();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de votre commentaire.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
          <img 
            src={advertisement.image_url || 'https://via.placeholder.com/400x200'} 
            alt={advertisement.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-xl">{advertisement.title}</CardTitle>
        <CardDescription>{advertisement.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advertisement.link_url && (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.open(advertisement.link_url, '_blank')}
            >
              En savoir plus
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Masquer les commentaires' : `Voir les commentaires (${comments.length})`}
          </Button>

          {showComments && (
            <div className="space-y-4">
              {/* Formulaire de commentaire */}
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <Input
                  placeholder="Votre nom"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Votre commentaire..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                  size="sm"
                >
                  {isSubmitting ? 'Envoi...' : 'Commenter'}
                </Button>
              </form>

              {/* Liste des commentaires */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-center text-gray-500 text-sm">Aucun commentaire pour le moment</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;
