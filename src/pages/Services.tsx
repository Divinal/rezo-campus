
import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, ShoppingCart, Handshake, GraduationCap, Home, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const servicesList = [
  {
    id: 'informatique',
    Icon: Monitor,
    bgHeader: 'bg-blue-700',
    bgDot: 'bg-blue-700',
    title: 'Informatique & Digital',
    subtitle: 'Prestations de services informatiques et numériques',
    description: "Des solutions informatiques sur mesure pour particuliers et entreprises.",
    items: [
      "Conseil, étude et développement de logiciels et d'applications",
      "Création et hébergement de sites web",
      "Maintenance informatique, installation et configuration réseau",
      "Assistance technique, cybersécurité, infogérance",
      "Intégration de solutions digitales et transformation numérique",
      "Formation en informatique"
    ],
    cta: 'Nous contacter',
    ctaLink: '/contact',
    ctaClass: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    id: 'commerce',
    Icon: ShoppingCart,
    bgHeader: 'bg-orange-600',
    bgDot: 'bg-orange-600',
    title: 'Commerce & Distribution',
    subtitle: "Achat, vente et importation de matériels informatiques & télécoms",
    description: "Distribution et commercialisation de produits technologiques de qualité.",
    items: [
      "Achat, vente, importation et exportation de matériels",
      "Distribution de produits informatiques et électroniques",
      "Équipements de télécommunications et accessoires",
      "Logiciels, consommables et périphériques",
      "Représentation de marques et fournisseurs"
    ],
    cta: 'Nous contacter',
    ctaLink: '/contact',
    ctaClass: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    id: 'conciergerie',
    Icon: Handshake,
    bgHeader: 'bg-green-700',
    bgDot: 'bg-green-700',
    title: 'Services de Conciergerie',
    subtitle: "Assistance et services pour particuliers, professionnels et entreprises",
    description: "Des services personnalisés pour simplifier votre quotidien.",
    items: [
      "Assistance administrative pour particuliers et professionnels",
      "Organisation de services et gestion de prestations",
      "Mise en relation avec des prestataires qualifiés",
      "Gestion de tâches et services courants",
      "Toutes prestations de conciergerie (hors activités réglementées)"
    ],
    cta: 'Nous contacter',
    ctaLink: '/contact',
    ctaClass: 'bg-green-700 hover:bg-green-800',
  },
  {
    id: 'accompagnement',
    Icon: GraduationCap,
    bgHeader: 'bg-[#1a365d]',
    bgDot: 'bg-[#1a365d]',
    title: 'Accompagnement des Étudiants',
    subtitle: "Orientation, inscription et mobilité internationale",
    description: "Nous guidons chaque étudiant de la sélection de l'école jusqu'à l'intégration.",
    items: [
      "Orientation académique et choix de la formation",
      "Assistance dans les démarches administratives",
      "Aide à l'inscription dans les établissements",
      "Accompagnement à la mobilité nationale et internationale",
      "Démarches Visa, AEVM et titre de séjour",
      "Recherche de logement étudiant",
      "Forum d'orientation et événements étudiants"
    ],
    cta: 'Découvrir',
    ctaLink: '/accompagnement',
    ctaClass: 'bg-[#1a365d] hover:bg-[#1a365d]/90',
  },
  {
    id: 'immobilier',
    Icon: Home,
    bgHeader: 'bg-purple-700',
    bgDot: 'bg-purple-700',
    title: 'Immobilier',
    subtitle: "Location, gestion et mise à disposition de biens",
    description: "Gestion immobilière complète pour particuliers et investisseurs.",
    items: [
      "Location et sous-location de biens résidentiels",
      "Gestion et exploitation de biens immobiliers",
      "Mise à disposition de biens mobiliers et immobiliers",
      "Conseil en investissement immobilier",
      "Accompagnement dans la recherche de logements étudiants"
    ],
    cta: 'Voir les logements',
    ctaLink: '/immo',
    ctaClass: 'bg-purple-700 hover:bg-purple-800',
  }
];

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#1a365d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Rézo Campus vous propose une gamme complète de services pour accompagner
            votre réussite académique, professionnelle et quotidienne.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {servicesList.map(({ id, Icon, bgHeader, bgDot, title, subtitle, description, items, cta, ctaLink, ctaClass }) => (
              <div
                key={id}
                id={id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className={`${bgHeader} px-6 py-5 flex items-center gap-4`}>
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <p className="text-white/80 text-sm">{subtitle}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-5">{description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className={`w-2 h-2 rounded-full ${bgDot} flex-shrink-0 mt-1.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={ctaLink}
                    className={`inline-flex items-center gap-2 ${ctaClass} text-white px-5 py-2.5 rounded-lg transition-colors font-semibold text-sm self-start`}
                  >
                    {cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
