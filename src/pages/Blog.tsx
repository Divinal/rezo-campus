
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogArticle from '../components/BlogArticle';
import AdvertisementCard from '../components/AdvertisementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabaseClient';

interface Article {
  article_id: number;
  title: string;
  content: string;
  created_at: string;
  comment_count?: number;
  logo_url?: string;
}

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
}

const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les publicités (données statiques pour l'exemple)
  useEffect(() => {
    const staticAds: Advertisement[] = [
        {
        id: 1,
        title: "Grand Forum D'orientatiion Scolaire et Technologique -  2eme ÉDITION",
        description: "Tu es étudiant(e) et tu ne sais pas encore quelle filière choisir ? Cette journée est FAITE POUR TOI ! \n\ 🙌 ✅ Rencontre directement les représentants des meilleures universités marocaines partenaires : \n\
         📍 Rep. du Congo Brazzaville ",
        image_url: "/Images/bonderolle 2.png",
        link_url: "/contact"
      },
      {
        id: 2,
        title: "1ère ÉDITION – FORMATION SPÉCIALE VACANCES",
        description: "Tu es au Maroc pendant les vacances ? Profite-en pour obtenir une certification professionnelle reconnue, 100% en dialecte marocain (Darija) ! 🧠 Informatique, communication, outils modernes… Tout ça, gratuitement 😲 \n\
         📆 Date du début: le 05 Aout 2025 \n\
         📍 Ecole Miage Casa",
        image_url: "/Images/Formation.jpg",
        link_url: "/contact"
      },
      {
        id: 3,
        title: "Bourse d’Études en Russie 2026 | Programme Open Doors – Étudier gratuitement !",
        description: "Vous rêvez étudier à l'étranger ? la Russie met à votre disposition une bourse d'étude 100% financier, alors ne cherchez plus ! Le Programme Open Doors (Russian Scholarship Project) offre aux étudiants internationaux la possibilité de rejoindre des cycles Licence, Master, Doctorat, voire Post‑Doctorat dans des universités russes prestigieuses—le tout entièrement gratuit et à distance.",
        image_url: "/Images/Bourse.png", 
        link_url: "https://youtu.be/i02klmIgH94"
      }
    ];
    setAdvertisements(staticAds);
  }, []);

  // Charger les articles depuis Supabase
  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('Articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Pour chaque article, récupérer le nombre de commentaires
      const articlesWithCount = await Promise.all(
        (data || []).map(async (article) => {
          const { count } = await supabase
            .from('Comments')
            .select('*', { count: 'exact', head: true })
            .eq('id_article', article.article_id);
          
          return {
            ...article,
            comment_count: count || 0
          };
        })
      );

      setArticles(articlesWithCount);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      // Fallback avec un article d'exemple
      setArticles([{
        article_id: 1,
        title: "École Supérieure de Commerce et Management - Nouvelle Formation en Marketing Digital",
        content: "Découvrez notre nouvelle formation en Marketing Digital ! Formation certifiante de 2 ans avec stages en entreprise. Nos étudiants bénéficient d'un accompagnement personnalisé et d'un réseau professionnel solide. Taux d'insertion professionnelle : 95%. Candidatures ouvertes jusqu'au 30 juin. Venez nous rencontrer lors de nos journées portes ouvertes tous les samedis de 9h à 17h.",
        created_at: new Date().toISOString(),
        comment_count: 0
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleCommentAdded = () => {
    loadArticles(); // Recharger les articles pour mettre à jour les compteurs
  };

  // Fonction pour grouper les articles par 3
  const groupArticlesByThree = (articles: Article[]) => {
    const groups = [];
    for (let i = 0; i < articles.length; i += 3) {
      groups.push(articles.slice(i, i + 3));
    }
    return groups;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des contenus...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {selectedArticle ? (
              <div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="mb-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  ← Retour aux actualités
                </button>
                <BlogArticle 
                  article={selectedArticle} 
                  onCommentAdded={handleCommentAdded}
                />
              </div>
            ) : (
              <div className="space-y-12">
                {/* Section Publicités */}
                <section>
                  <h2 className="text-2xl font-bold text-center mb-8 text-primary">
                    Opportunités à ne pas manquer
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advertisements.map((ad) => (
                      <AdvertisementCard key={ad.id} advertisement={ad} />
                    ))}
                  </div>
                </section>

                {/* Section Actualités */}
                <section>
                  <h1 className="text-3xl font-bold text-center mb-8">
                    Actualités - Avis sur nos établissements
                  </h1>
                  
                  {/* Affichage des articles par groupes de 3 */}
                  <div className="space-y-8">
                    {groupArticlesByThree(articles).map((group, groupIndex) => (
                      <div key={groupIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.map((article) => (
                          <Card key={article.article_id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                            <CardHeader className="flex-grow">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={article.logo_url || '/Images/images.jpeg'}
                                    alt="Logo école"
                                    className="w-full h-full object-contain rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                                  <CardDescription className="text-sm">
                                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                                {article.content.substring(0, 150)}...
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                                    {article.comment_count || 0} avis
                                  </span>
                                </span>
                                <button
                                  onClick={() => setSelectedArticle(article)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                                >
                                  Lire et commenter
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Lien vers la foire d'orientation */}
                {/* <section className="text-center py-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">
                      🎓 1ère ÉDITION – FORMATION SPÉCIALE VACANCES !
                    </h3>
                    <p className="text-lg mb-6">
                      Tu es au Maroc pendant les vacances ? Profite-en pour obtenir une certification professionnelle reconnue, 100% en dialecte marocain (Darija) ! 🧠 Informatique, communication, outils modernes… Tout ça, gratuitement 😲 📆 Date du début: le 05 Aout 2025 📍 Ecole Miage Casa
                    </p>
                   <a href="mailto:campusrezo@gmail.com">
                      <Button 
                        size="lg" 
                        className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3"
                      >
                        Reserve ta place sur → campusrezo@gmail.com
                      </Button>
                    </a>
                  </div>
                </section> */}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
