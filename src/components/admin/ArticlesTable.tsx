
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";
import ArticleEditor from './ArticleEditor';

interface Article {
  article_id: number;
  title: string;
  image_url: string;
  logo_url: string;
  content: string;
  created_at: string;
}

const ArticlesTable: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      console.log('Loading articles...');
      const { data, error } = await supabase
        .from('Articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading articles:', error);
      } else {
        console.log('Articles loaded:', data);
        setArticles(data || []);
      }
    } catch (error) {
      console.error('Error in loadArticles:', error);
    }
    setLoading(false);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('Articles')
      .delete()
      .eq('article_id', id);

    if (error) {
      console.error('Error deleting article:', error);
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Article supprimé");
      loadArticles();
    }
  };

  const handleArticleCreated = () => {
    loadArticles();
  };

  if (loading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des articles...</p>
          </div>;
  }

  return (
    <div className="space-y-4">
      <ArticleEditor onArticleCreated={handleArticleCreated} />
      
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher un article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-gray-600">
          {filteredArticles.length} article(s) trouvé(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.article_id}>
                <TableCell className="max-w-md">
                  <div className="truncate">{article.title}</div>
                </TableCell>
                <TableCell>
                  {article.image_url && (
                    <img src={article.image_url} alt="Article" className="w-12 h-12 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell>
                  {article.logo_url && (
                    <img src={article.logo_url} alt="Logo" className="w-12 h-12 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{article.content}</div>
                </TableCell>
                <TableCell>
                  {new Date(article.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.article_id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun article trouvé
        </div>
      )}
    </div>
  );
};

export default ArticlesTable;
