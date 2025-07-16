
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Star, ArrowRight, GraduationCap, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AvisGoogle from '../components/AvisGoogle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { schools } from '../data/schools';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: "Recherche Facile",
      description: "Trouvez rapidement l'établissement qui correspond à vos critères et aspirations."
    },
    {
      icon: BookOpen,  
      title: "Programmes Détaillés",
      description: "Consultez tous les détails des formations, diplômes et spécialisations proposés."
    },
    {
      icon: Users,
      title: "Accompagnement Personnalisé", 
      description: "Bénéficiez d'un accompagnement sur mesure dans vos démarches d'inscription."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
        <section className="relative bg-[url('/Images/Master.png')] bg-cover bg-center bg-no-repeat text-white py-20">
      {/* Superposition sombre semi-transparente */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Contenu principal, au-dessus de l'overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Trouvez Votre École Idéale
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Découvrez les meilleures écoles et universités, explorez leurs programmes 
          et simplifiez vos démarches d'inscription.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/index"
            className="bg-secondary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            Explorer les Écoles <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            En Savoir Plus
          </Link>
        </div>
      </div>
    </section>


      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir RézoCampus ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous facilitons votre parcours éducatif avec des outils innovants et un accompagnement personnalisé.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schools Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Écoles Partenaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les établissements d'excellence qui font confiance à RézoCampus
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            autoplay={{ delay: 3000 }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {schools.map((school) => (
                <CarouselItem key={school.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-shrink-0 mb-4">
                        <img
                          src={school.logo}
                          alt={`Logo de ${school.name}`}
                          className="w-full h-32 object-contain bg-gray-50 rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">{school.name}</h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {school.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[...new Set(school.programs.map(program => program.niveau))].slice(0, 2).map(niveau => (
                          <span 
                            key={niveau}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {niveau}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/school/${school.id}`}
                        className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors text-center font-semibold"
                      >
                        Voir les Formations
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Formations
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les différents domaines de formation disponibles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Commerce & Gestion</h3>
              <p className="text-gray-600">Formations en commerce, marketing, finance et gestion d'entreprise.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Informatique</h3>
              <p className="text-gray-600">Développement web, mobile, intelligence artificielle et cybersécurité.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Design & Arts</h3>
              <p className="text-gray-600">Design graphique, architecture, mode et arts appliqués.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ingénierie</h3>
              <p className="text-gray-600">Génie civil, mécanique, électrique et industriel.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Communication</h3>
              <p className="text-gray-600">Journalisme, relations publiques et communication digitale.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Santé</h3>
              <p className="text-gray-600">Médecine, pharmacie, soins infirmiers et paramédical.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Information Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tous ce qui a savoir sur les Démarches administratives pour voyager en toute sérénité.
            </h2>
            <p className="text-xl">
              Nous vous accompagnons dans toutes vos démarches administratives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Visa Étudiant</h3>
              <p className="mb-4">Assistance complète pour l'obtention de votre visa étudiant.</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Préparation du dossier</li>
                <li>Prise de rendez-vous</li>
                <li>Accompagnement personnalisé</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Logement</h3>
              <p className="mb-4">Trouvez le logement idéal pour vos études.</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Résidences universitaires</li>
                <li>Appartements privés</li>
                <li>Familles d'accueil</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Carte de Séjour</h3>
              <p className="mb-4">Obtenez votre titre de séjour rapidement.</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Constitution du dossier</li>
                <li>Suivi de la demande</li>
                <li>Renouvellement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Prêt à Commencer Votre Parcours ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui ont trouvé leur voie grâce à RézoCampus
          </p>
          <Link
            to="/index"
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
          >
            <GraduationCap className="w-6 h-6" />
            Commencer Maintenant
          </Link>
        </div>
      </section>

      {/* Avis Google Section */}
      <AvisGoogle />

      <Footer />
    </div>
  );
};

export default Landing;
