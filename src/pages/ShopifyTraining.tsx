import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingBag, TrendingUp, Megaphone, Palette, CheckCircle, 
  Laptop, Wifi, Users, Award, Clock, DollarSign, Rocket, Target, BarChart3, Globe, Package, Zap, Star, ArrowRight, ChevronRight, Gift, Calendar, Shield} from 'lucide-react';

const ShopifyTraining = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const skills = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Stratégies avancées pour booster vos ventes en ligne",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "E-commerce",
      description: "Maîtrisez Shopify de A à Z et créez votre empire",
      color: "from-green-500 to-green-700"
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Publicité",
      description: "Facebook Ads, Google Ads et TikTok Ads qui convertissent",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design",
      description: "Créez des boutiques qui vendent avec un design pro",
      color: "from-pink-500 to-pink-700"
    }
  ];

  const conditions = [
    {
      icon: <Laptop className="w-6 h-6" />,
      text: "Posséder un ordinateur",
      detail: "PC ou Mac en bon état de fonctionnement"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      text: "Connexion haut débit",
      detail: "Internet stable pour les sessions de formation"
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Âge : 18 à 35 ans",
      detail: "Programme destiné aux jeunes entrepreneurs"
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Connaissances de base",
      detail: "Marketing, e-commerce, publicité ou design"
    }
  ];

  const advantages = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Boutique Shopify Clé en Main",
      description: "1 mois d'accès complet à votre propre boutique",
      highlight: true
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Nom de Domaine Personnalisé",
      description: "Choisissez votre propre nom de domaine professionnel",
      highlight: true
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "20 Produits Gagnants",
      description: "Produits testés et validés avec fort potentiel de vente",
      highlight: true
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accompagnement 7 jours",
      description: "Support quotidien après la formation pour votre lancement",
      highlight: false
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Formation sur Boutique Réelle",
      description: "Apprenez en conditions réelles, pas de théorie pure",
      highlight: false
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Intégration Commerciale",
      description: "Équipement marketing et publicitaire professionnel",
      highlight: false
    }
  ];

  const testimonials = [
    {
      name: "Youssef K.",
      age: 28,
      revenue: "250€/jour",
      text: "En 3 mois, j'ai quitté mon job et je gagne maintenant plus que mon ancien salaire mensuel en une semaine !",
      avatar: "👨‍💼"
    },
    {
      name: "Fatima Z.",
      age: 24,
      revenue: "180€/jour",
      text: "La formation m'a donné toutes les clés. Aujourd'hui je suis ma propre patronne et je vis de ma passion.",
      avatar: "👩‍💼"
    },
    {
      name: "Ahmed M.",
      age: 31,
      revenue: "320€/jour",
      text: "Meilleur investissement de ma vie. Les 500 DH se rentabilisent en 2 jours de ventes !",
      avatar: "🧑‍💻"
    }
  ];

  const stats = [
    { number: "200-300€", label: "Chiffre d'affaires/jour", icon: <DollarSign className="w-6 h-6" /> },
    { number: "2 mois", label: "Durée de formation", icon: <Calendar className="w-6 h-6" /> },
    { number: "500 DH", label: "Investissement unique", icon: <Target className="w-6 h-6" /> },
    { number: "100%", label: "Formation pratique", icon: <Rocket className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
                🔥 PLACES LIMITÉES - Inscription ouverte
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Devenez Votre Propre Patron avec Shopify
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Formation E-commerce Prêt à l'Emploi : De Zéro à 200-300€/jour en 2 mois
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  to="/formulaire-inscription"
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
                >
                  S'inscrire Maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border-2 border-white/50">
                  Voir la vidéo de présentation
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Boutique Shopify offerte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>20 produits gagnants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Formation pratique</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b-4 border-green-500">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex justify-center mb-3 text-green-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi cette formation */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fini les Formations Interminables !
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une formation concrète, sur une vraie boutique, avec des vrais résultats. 
                En 2 mois, vous serez prêt à générer vos premiers revenus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Formation Express</h3>
                <p className="text-gray-600">
                  2 mois intensifs pour maîtriser Shopify et le e-commerce. Pas de blabla, que du concret.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pratique 100%</h3>
                <p className="text-gray-600">
                  Travaillez sur une boutique réelle dès le premier jour. Apprenez en faisant, pas en regardant.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Résultats Garantis</h3>
                <p className="text-gray-600">
                  200-300€ de CA par jour après la formation. Devenez indépendant financièrement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compétences enseignées */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ce Que Vous Allez Maîtriser
              </h2>
              <p className="text-xl text-gray-600">
                4 piliers essentiels pour réussir dans le e-commerce
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => setSelectedModule(skill.title)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className={`bg-gradient-to-br ${skill.color} p-8 text-white text-center`}>
                      <div className="flex justify-center mb-4">
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm">{skill.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions d'admission */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Conditions d'Admission
                </h2>
                <p className="text-xl text-gray-600">
                  Vérifiez si vous êtes éligible pour rejoindre la formation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {conditions.map((condition, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl text-green-600 flex-shrink-0">
                        {condition.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{condition.text}</h3>
                        <p className="text-sm text-gray-600">{condition.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-center">
                <p className="text-gray-900 font-semibold text-lg">
                  ✨ Vous remplissez ces conditions ? Félicitations, vous êtes prêt à démarrer !
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                PACK COMPLET INCLUS
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ce Que Vous Recevez
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tout ce dont vous avez besoin pour lancer votre business en ligne
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    advantage.highlight 
                      ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white' 
                      : 'bg-white'
                  }`}
                >
                  <div className={`flex justify-center mb-4 ${advantage.highlight ? 'text-white' : 'text-green-600'}`}>
                    {advantage.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 text-center ${advantage.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {advantage.title}
                  </h3>
                  <p className={`text-center ${advantage.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                    {advantage.description}
                  </p>
                  {advantage.highlight && (
                    <div className="mt-4 text-center">
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        Valeur : 200€
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Ils l'ont Fait, Pourquoi Pas Vous ?
              </h2>
              <p className="text-xl text-gray-300">
                Rejoignez les centaines d'entrepreneurs qui ont transformé leur vie
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">{testimonial.age} ans</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      {testimonial.revenue}
                    </div>
                  </div>
                  <p className="text-gray-200 italic">"{testimonial.text}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prêt à Devenir Votre Propre Patron ?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Seulement 500 DH pour transformer votre vie et générer 200-300€ par jour
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2 mois</div>
                    <div className="text-sm text-green-100">Formation intensive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500 DH</div>
                    <div className="text-sm text-green-100">Investissement unique</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">200-300€</div>
                    <div className="text-sm text-green-100">CA par jour après formation</div>
                  </div>
                </div>
              </div>

              <Link
                to="/formulaire-inscription"
                className="inline-block bg-yellow-400 text-gray-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6"
              >
                Je M'inscris Maintenant
                <ArrowRight className="inline-block ml-2 w-6 h-6" />
              </Link>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-green-300" />
                  <span>Places limitées - Inscription sécurisée</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="w-5 h-5 text-green-300" />
                  <span>Boutique Shopify + 20 produits offerts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Questions Fréquentes
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: "Ai-je besoin d'expérience préalable en e-commerce ?",
                    a: "Des connaissances de base en marketing, publicité, design ou e-commerce sont recommandées, mais pas obligatoires. Nous vous formons de A à Z."
                  },
                  {
                    q: "Quand puis-je commencer à gagner de l'argent ?",
                    a: "Dès la fin de la formation (2 mois), vous serez prêt à lancer votre boutique et générer vos premiers revenus."
                  },
                  {
                    q: "La boutique Shopify est-elle vraiment offerte ?",
                    a: "Oui ! Vous recevez 1 mois d'accès Shopify, un nom de domaine personnalisé et 20 produits gagnants inclus dans les 500 DH."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 pl-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
        <Footer />
    </div>
  );
};

export default ShopifyTraining;