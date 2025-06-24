
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Star, ArrowRight, GraduationCap, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AvisGoogle from '../components/AvisGoogle';

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

  const stats = [
    { number: "100+", label: "Établissements Partenaires" },
    { number: "50+", label: "Programmes de Formation" },
    { number: "1000+", label: "Étudiants Accompagnés" },
    { number: "95%", label: "Taux de Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Étudiante en Commerce",
      content: "Grâce à RézoCampus, j'ai trouvé l'école parfaite pour mes études. L'accompagnement a été exceptionnel !",
      rating: 5
    },
    {
      name: "Jean-Pierre Martin",
      role: "Étudiant en Informatique", 
      content: "Une plateforme intuitive qui m'a fait gagner un temps précieux dans mes recherches d'école.",
      rating: 5
    },
    {
      name: "Fatima El-Amrani",
      role: "Étudiante en Design",
      content: "L'équipe de RézoCampus m'a aidée à naviguer dans toutes les démarches administratives.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
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

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Chiffres Parlent d'Eux-Mêmes
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
                  {stat.number}
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ce Que Disent Nos Étudiants
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de ceux qui ont fait confiance à RézoCampus
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
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
