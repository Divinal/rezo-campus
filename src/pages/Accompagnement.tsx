
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Camera, FileCheck, Home, ArrowRight, CheckCircle, MapPin, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { schools } from '../data/schools';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { Card, CardContent } from '../components/ui/card';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const miniCards = [
  { icon: '🎓', label: 'Écoles & Formations', sub: 'Écoles partenaires au Maroc', target: 'ecoles', bg: 'from-[#1a365d] to-blue-700' },
  { icon: '📸', label: 'Forum & Événements', sub: 'Galerie photos et vidéos', target: 'forum', bg: 'from-gray-800 to-gray-700' },
  { icon: '🛂', label: 'Visa & AEVM', sub: 'Démarches administratives', target: 'visa', bg: 'from-green-800 to-green-600' },
  { icon: '🏠', label: 'Logement', sub: 'Résidences & appartements', target: 'logement', bg: 'from-purple-800 to-purple-600' },
];

const Accompagnement: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero avec petites bannières */}
      <section
        className="relative bg-[url('/Images/Forum.jpeg')] bg-cover bg-center bg-no-repeat text-white"
        style={{ minHeight: '460px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25 z-0" />
        <div className="relative z-10 container mx-auto px-8 py-14 flex items-center gap-10 min-h-[460px]">

          {/* Contenu gauche */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Accompagnement des Étudiants
            </h1>
            <p className="text-lg text-white/80 mb-7 max-w-xl">
              De l'orientation académique à l'intégration au Maroc, Rézo Campus vous
              accompagne à chaque étape de votre parcours.
            </p>
            <button
              onClick={() => scrollTo('ecoles')}
              className="inline-flex items-center gap-2 bg-[#ff7f50] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-[#ff7f50]/90 transition-colors"
            >
              Commencer <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Grille 2×2 de petites bannières cliquables */}
          <div className="hidden lg:grid grid-cols-2 gap-3 flex-shrink-0" style={{ width: '300px' }}>
            {miniCards.map(({ icon, label, sub, target, bg }) => (
              <button
                key={target}
                onClick={() => scrollTo(target)}
                className={`relative rounded-xl bg-gradient-to-br ${bg} p-4 text-left hover:scale-105 hover:brightness-110 transition-all duration-200`}
                style={{ height: '115px' }}
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-white font-bold text-xs mt-2 leading-tight">{label}</p>
                <p className="text-white/60 text-xs mt-0.5 leading-tight">{sub}</p>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Navigation rapide */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'ecoles', label: '🎓 Écoles & Formations' },
              { id: 'forum', label: '📸 Forum & Événements' },
              { id: 'visa', label: '🛂 Visa & AEVM' },
              { id: 'logement', label: '🏠 Logement' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-[#1a365d] hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Bannières cliquables */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: '🎓',
                title: 'Écoles & Formations',
                desc: 'Parcourez notre sélection d\'écoles partenaires au Maroc et trouvez la formation qui correspond à vos ambitions.',
                target: 'ecoles',
                bg: 'from-[#1a365d] to-blue-700',
              },
              {
                icon: '📸',
                title: 'Forum & Événements',
                desc: 'Revivez le Forum du 16 mai 2026 — 112 photos et vidéos du grand forum d\'orientation scolaire.',
                target: 'forum',
                bg: 'from-gray-800 to-gray-700',
                img: '/Images/Forum.jpeg',
              },
              {
                icon: '🛂',
                title: 'Visa & AEVM',
                desc: 'Nous vous accompagnons dans toutes vos démarches : Visa étudiant, AEVM et carte de séjour.',
                target: 'visa',
                bg: 'from-green-800 to-green-600',
              },
              {
                icon: '🏠',
                title: 'Logement',
                desc: 'Trouvez le logement idéal pour vos études — résidences, appartements et familles d\'accueil.',
                target: 'logement',
                bg: 'from-purple-800 to-purple-600',
              },
            ].map(({ icon, title, desc, target, bg, img }) => (
              <button
                key={target}
                onClick={() => scrollTo(target)}
                className="relative rounded-2xl overflow-hidden text-left group hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{ minHeight: '220px' }}
              >
                {/* Fond image ou dégradé */}
                {img && (
                  <div className="absolute inset-0">
                    <img src={img} alt="" className="w-full h-full object-cover opacity-30" />
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${bg} ${img ? 'opacity-80' : ''}`} />
                {/* Contenu */}
                <div className="relative z-10 p-5 flex flex-col h-full justify-between" style={{ minHeight: '220px' }}>
                  <span className="text-4xl">{icon}</span>
                  <div>
                    <p className="text-white font-bold text-base mb-2">{title}</p>
                    <p className="text-white/70 text-xs leading-relaxed">{desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-white/90 text-xs font-semibold group-hover:text-white transition-colors">
                      En savoir plus <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Écoles */}
      <section id="ecoles" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1a365d]/10 rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-[#1a365d]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Écoles & Formations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Parcourez nos écoles partenaires au Maroc et trouvez la formation qui correspond à vos ambitions.
            </p>
          </div>

          <Carousel
            opts={{ align: 'start', loop: true }}
            autoplay={{ delay: 3000 }}
            className="w-full max-w-5xl mx-auto mb-8"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {schools.map((school) => (
                <CarouselItem key={school.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      <img
                        src={school.logo}
                        alt={`Logo ${school.name}`}
                        className="w-full h-28 object-contain bg-gray-50 rounded-lg mb-3"
                      />
                      <h3 className="text-base font-bold text-[#1a365d] mb-2 line-clamp-2">{school.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 flex-grow mb-3">{school.description}</p>
                      <Link
                        to={`/school/${school.id}`}
                        className="bg-[#1a365d] text-white text-sm py-2 px-3 rounded-md text-center hover:bg-[#1a365d]/90 transition-colors"
                      >
                        Voir les formations
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center">
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 bg-[#1a365d] text-white px-6 py-3 rounded-lg hover:bg-[#1a365d]/90 transition-colors font-semibold"
            >
              Voir toutes les écoles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Forum */}
      <section id="forum" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl mb-4">
                <Camera className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Forum & Événements</h2>
              <p className="text-gray-600 mb-4">
                Rézo Campus organise des forums d'orientation scolaire pour rapprocher les étudiants
                des universités partenaires. Revivez les moments forts de nos événements.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Forum d'orientation scolaire et technologique",
                  "Rencontres avec les représentants des universités",
                  "Galerie photos et vidéos des événements passés",
                  "Inscriptions aux prochains événements",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/forum-galerie"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Voir la galerie du Forum <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="bg-[#1a365d] rounded-2xl p-8 text-center text-white">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-2">Forum 2026</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Retour sur le Forum du 16 mai 2026 — 112 photos et vidéos
                </p>
                <Link
                  to="/forum-galerie"
                  className="inline-flex items-center gap-2 bg-[#ff7f50] text-white px-5 py-2 rounded-lg hover:bg-[#ff7f50]/90 transition-colors font-semibold text-sm"
                >
                  Ouvrir la galerie →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Visa & AEVM */}
      <section id="visa" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl mb-4">
              <FileCheck className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Visa, AEVM & Démarches Administratives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous vous accompagnons dans toutes vos démarches pour étudier au Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Link
              to="/administration"
              className="group bg-white rounded-xl border-2 border-gray-100 hover:border-[#1a365d] p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1a365d]/20 transition-colors">
                <FileCheck className="w-6 h-6 text-[#1a365d]" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Administration Visa & AEVM</h3>
              <p className="text-gray-600 text-sm">
                Constitution du dossier, dépôt et suivi de votre demande d'AEVM.
              </p>
              <span className="text-[#1a365d] text-sm font-semibold mt-3 inline-flex items-center gap-1">
                En savoir plus <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/pays-visa"
              className="group bg-white rounded-xl border-2 border-gray-100 hover:border-green-600 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Globe className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Pays avec Visa ou AEVM</h3>
              <p className="text-gray-600 text-sm">
                Consultez les pays qui nécessitent un visa ou une AEVM pour étudier au Maroc.
              </p>
              <span className="text-green-700 text-sm font-semibold mt-3 inline-flex items-center gap-1">
                Voir la liste <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/carte-sejour"
              className="group bg-white rounded-xl border-2 border-gray-100 hover:border-blue-600 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <MapPin className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Carte de Séjour</h3>
              <p className="text-gray-600 text-sm">
                Obtenez votre titre de séjour pour un séjour régulier et serein au Maroc.
              </p>
              <span className="text-blue-700 text-sm font-semibold mt-3 inline-flex items-center gap-1">
                En savoir plus <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* AEVM Steps */}
          <div className="bg-[#1a365d]/5 rounded-2xl p-6 border border-[#1a365d]/20">
            <h3 className="font-bold text-[#1a365d] text-lg mb-4">
              Les 3 étapes pour obtenir votre AEVM
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: "Inscription à l'école",
                  desc: "Obtenez votre lettre d'admission officielle et réglez les frais d'inscription.",
                },
                {
                  step: '2',
                  title: "Constitution du dossier",
                  desc: "Rézo Campus prépare et vérifie votre dossier complet (documents d'état civil, photos, justificatifs).",
                },
                {
                  step: '3',
                  title: "Dépôt & suivi",
                  desc: "Nous déposons votre dossier auprès des services compétents et assurons le suivi jusqu'à l'obtention.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{title}</p>
                    <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Logement */}
      <section id="logement" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="bg-purple-700 rounded-2xl p-8 text-center text-white">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-bold mb-2">Logement Étudiant</h3>
                <p className="text-purple-200 text-sm mb-4">
                  Résidences universitaires, appartements partagés, familles d'accueil
                </p>
                <Link
                  to="/immo"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-sm"
                >
                  Voir les logements →
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-2xl mb-4">
                <Home className="w-8 h-8 text-purple-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Logement</h2>
              <p className="text-gray-600 mb-4">
                Trouver un logement est l'une des premières préoccupations de tout étudiant qui part étudier
                à l'étranger. Rézo Campus vous aide à trouver le logement idéal selon votre budget et votre
                ville d'études.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Résidences universitaires et cités étudiantes",
                  "Appartements partagés en colocation",
                  "Studios et logements privés",
                  "Familles d'accueil",
                  "Estimation du coût de la vie selon la ville",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/immo"
                className="inline-flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold"
              >
                Trouver un logement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accompagnement;
