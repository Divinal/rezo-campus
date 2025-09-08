
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from "../../lib/supabaseClient";

interface Comment {
  id: number;
  id_article: number;
  author: string;
  content: string;
  created_at: string;
}

const CommentsTable: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error(error);
      } else {
        setComments(data || []);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const filteredComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des commentaires...</p>
          </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher un commentaire..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-gray-600">
          {filteredComments.length} commentaire(s) trouvé(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auteur</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Article ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.author}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{comment.content}</div>
                </TableCell>
                <TableCell>{comment.id_article}</TableCell>
                <TableCell>
                  {new Date(comment.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                    Reçu
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredComments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun commentaire trouvé
        </div>
      )}
    </div>
  );
};

export default CommentsTable;
