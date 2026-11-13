import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check, Minus, ArrowRight, School, Phone, Mail, BookOpen, GraduationCap, Users, ClipboardList, ListChecks,
  Presentation, Download, ExternalLink,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// The PDFs live in public/Document_Rezo_Edu; BASE_URL keeps the links valid when the site is served from a sub-path.
const DOCS_PATH = `${import.meta.env.BASE_URL}Document_Rezo_Edu/`;

const documents = [
  {
    file: 'Guide_Administration_Rezo_Edu.pdf',
    title: 'Guide Administration',
    audience: 'Direction, admin pédagogique, financier, secrétariat',
    pages: 23,
    icon: BookOpen,
    description:
      "Tout pour piloter l'établissement : niveaux et matières, inscription des élèves, enseignants et affectations, emplois du temps, notes, suivi, messages, annonces et finances (budget, frais de scolarité, reçus, paie).",
  },
  {
    file: 'Guide_Enseignant_Rezo_Edu.pdf',
    title: 'Guide Enseignant',
    audience: 'Enseignants',
    pages: 8,
    icon: GraduationCap,
    description:
      'Saisir les notes (CC1 à CC3, examens théorique et pratique), remplir le suivi journalier de la classe, consulter son emploi du temps, ses messages et ses bulletins de paie.',
  },
  {
    file: 'Guide_Eleve_Parent_Rezo_Edu.pdf',
    title: 'Guide Élève & Parent',
    audience: 'Élèves et parents',
    pages: 8,
    icon: Users,
    description:
      "Suivre en temps réel les notes, le comportement, l'emploi du temps et les paiements, et recevoir les messages et annonces de l'établissement.",
  },
  {
    file: 'Aide-memoire_Rezo_Edu.pdf',
    title: 'Aide-mémoire',
    audience: 'Tous les utilisateurs',
    pages: 2,
    icon: ClipboardList,
    description:
      'Les gestes courants de chaque rôle en un coup d’œil : « je veux… », où aller et comment faire. À imprimer et à garder à portée de main.',
  },
  {
    file: 'Checklist_Mise_en_place_Rezo_Edu.pdf',
    title: 'Checklist de mise en place',
    audience: "Chef d'établissement et référent Rezo Edu",
    pages: 5,
    icon: ListChecks,
    description:
      "Les données à réunir, l'ordre de paramétrage, le planning du mois d'essai gratuit semaine par semaine et les critères de réussite.",
  },
  {
    file: 'Support_de_formation_Rezo_Edu.pdf',
    title: 'Support de formation',
    audience: 'Formateur et participants',
    pages: 10,
    icon: Presentation,
    description:
      "Le programme en 7 modules, le déroulé des séances, 10 exercices pratiques, un quiz d'évaluation, la feuille d'émargement et le modèle d'attestation.",
  },
];

const packs = [
  {
    pack: 'Pack 1',
    name: 'Socle',
    price: '25 000',
    color: 'text-teal-400',
    borderColor: 'border-gray-600',
    bg: 'bg-gray-800',
    highlight: false,
    description: 'Le site de l\'établissement et la connexion des comptes.',
    features: [
      'Site vitrine et pages publiques',
      'Connexion par rôle',
      'Personnalisation de l\'établissement',
    ],
  },
  {
    pack: 'Pack 2',
    name: 'Essentiel',
    price: '50 000',
    color: 'text-teal-400',
    borderColor: 'border-gray-600',
    bg: 'bg-gray-800',
    highlight: false,
    description: 'La gestion des effectifs et de la structure scolaire.',
    features: [
      'Étudiants et enseignants',
      'Classes et matières',
      'Affectations',
    ],
  },
  {
    pack: 'Pack 3',
    name: 'Pédagogie',
    price: '75 000',
    color: 'text-teal-400',
    borderColor: 'border-gray-600',
    bg: 'bg-gray-800',
    highlight: false,
    description: 'Le suivi pédagogique complet, élève comme enseignant.',
    features: [
      'Notes et cours en ligne',
      'Emplois du temps',
      'Annonces et messagerie',
    ],
  },
  {
    pack: 'Pack 4',
    name: 'Gestion',
    price: '100 000',
    color: 'text-teal-400',
    borderColor: 'border-gray-600',
    bg: 'bg-gray-800',
    highlight: false,
    description: 'La comptabilité de l\'établissement, de bout en bout.',
    features: [
      'Budget prévisionnel',
      'Scolarité et paie',
      'Documents imprimables',
    ],
  },
  {
    pack: 'Pack 5',
    name: 'Direction',
    price: '150 000',
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    bg: 'bg-[#2a2010]',
    highlight: true,
    description: 'L\'accès complet, avec gouvernance à quatre rôles.',
    features: [
      '4 rôles admin différenciés',
      'Comptes administrateurs',
      'Plateforme complète',
    ],
  },
];

type CellValue = true | false | 'partial';

interface FeatureRow {
  label: string;
  values: [CellValue, CellValue, CellValue, CellValue, CellValue];
}

interface FeatureGroup {
  group: string;
  rows: FeatureRow[];
}

const featureGroups: FeatureGroup[] = [
  {
    group: 'SOCLE',
    rows: [
      { label: 'Site vitrine (accueil, contact, mentions)', values: [true, true, true, true, true] },
      { label: 'Connexion sécurisée par rôle', values: [true, true, true, true, true] },
      { label: 'Personnalisation de l\'établissement', values: [true, true, true, true, true] },
    ],
  },
  {
    group: 'GESTION ACADÉMIQUE',
    rows: [
      { label: 'Gestion des étudiants', values: [false, true, true, true, true] },
      { label: 'Gestion des enseignants', values: [false, true, true, true, true] },
      { label: 'Gestion des classes et matières', values: [false, true, true, true, true] },
      { label: 'Affectations élèves / enseignants', values: [false, true, true, true, true] },
    ],
  },
  {
    group: 'PÉDAGOGIE & COMMUNICATION',
    rows: [
      { label: 'Notes (saisie et consultation)', values: [false, false, true, true, true] },
      { label: 'Cours en ligne (dépôt et validation)', values: [false, false, true, true, true] },
      { label: 'Emplois du temps', values: [false, false, true, true, true] },
      { label: 'Annonces et messagerie interne', values: [false, false, true, true, true] },
    ],
  },
  {
    group: 'FINANCE & COMPTABILITÉ',
    rows: [
      { label: 'Budget prévisionnel', values: [false, false, false, true, true] },
      { label: 'Scolarité et reçus imprimables', values: [false, false, false, true, true] },
      { label: 'Paie enseignants et bulletins', values: [false, false, false, true, true] },
      { label: 'Autres recettes / dépenses et comparatif', values: [false, false, false, true, true] },
    ],
  },
  {
    group: 'GOUVERNANCE',
    rows: [
      { label: '4 rôles admin différenciés', values: [false, false, false, false, true] },
      { label: 'Gestion des comptes administrateurs', values: [false, false, false, false, true] },
    ],
  },
];

const cols = ['Socle', 'Essentiel', 'Pédagogie', 'Gestion', 'Direction'];

const RezoEdu: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-teal-950 py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-teal-700/30 border border-teal-600/40 text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <School className="w-4 h-4" />
            Informatique & Digital — Application Scolaire
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Rezo <span className="text-teal-400">Edu</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            La plateforme numérique complète pour la gestion des établissements scolaires.
            Modulable, évolutive et adaptée à chaque budget.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-xl font-semibold transition-colors text-base"
          >
            Demander une démonstration <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Video */}
      <section className="bg-gray-900 pt-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Découvrez Rezo Edu en vidéo</h2>
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-700 shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/j-VN3m75cAY"
              title="Présentation de Rezo Edu"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">Grille tarifaire — 5 modules</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Chaque module est cumulatif : il inclut tout le contenu du module précédent,
              auquel s'ajoute un nouveau bloc de fonctionnalités. L'établissement peut démarrer
              avec le Socle et faire évoluer la plateforme au rythme de ses besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packs.map(({ pack, name, price, color, borderColor, bg, highlight, description, features }) => (
              <div
                key={name}
                className={`${bg} border ${borderColor} rounded-xl p-5 flex flex-col ${highlight ? 'ring-1 ring-amber-500/50' : ''}`}
              >
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">{pack}</p>
                  <h3 className={`text-xl font-bold ${highlight ? 'text-amber-400' : 'text-white'}`}>{name}</h3>
                </div>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${color}`}>{price}</span>
                  <span className="text-gray-500 text-sm ml-1">FCFA</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>
                <ul className="space-y-2 mt-auto">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className={`mt-0.5 flex-shrink-0 ${highlight ? 'text-amber-400' : 'text-teal-400'}`}>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features table */}
      <section className="bg-gray-900 py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">Détail des fonctionnalités incluses par module</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left px-4 py-3 font-semibold text-gray-300 w-64">Fonctionnalité</th>
                  {cols.map(c => (
                    <th key={c} className="text-center px-3 py-3 font-semibold text-gray-300 min-w-[80px]">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureGroups.map(({ group, rows }) => (
                  <React.Fragment key={group}>
                    <tr className="bg-gray-800/50">
                      <td colSpan={6} className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {group}
                      </td>
                    </tr>
                    {rows.map(({ label, values }, ri) => (
                      <tr
                        key={ri}
                        className={`border-b border-gray-800 ${ri % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/60'} hover:bg-gray-800/40 transition-colors`}
                      >
                        <td className="px-4 py-3 text-gray-300">{label}</td>
                        {values.map((v, ci) => (
                          <td key={ci} className="px-3 py-3 text-center">
                            {v === true ? (
                              <Check className="w-4 h-4 text-teal-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Out of scope note */}
          <div className="mt-6 bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-4 text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-300">Hors périmètre actuel :</span>{' '}
            présences/absences, bulletin scolaire imprimable, cantine, transport, bibliothèque, export Excel.
            Ces évolutions peuvent être chiffrées séparément sur demande.
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-gray-950 py-16 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">Documents Rezo Edu</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Des guides pour chaque utilisateur de la plateforme et les outils pour réussir sa mise en place.
              Consultez-les en ligne ou téléchargez-les au format PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(({ file, title, audience, pages, icon: Icon, description }) => (
              <div key={file} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-teal-600/15 border border-teal-600/30 rounded-lg p-2.5 flex-shrink-0">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{audience} · {pages} pages</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow">{description}</p>
                <div className="flex gap-2">
                  <a
                    href={`${DOCS_PATH}${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Consulter
                  </a>
                  <a
                    href={`${DOCS_PATH}${file}`}
                    download
                    className="inline-flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                    title={`Télécharger ${title}`}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-900/40 border-t border-teal-800/40 py-14 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Intéressé par Rezo Edu ?</h2>
          <p className="text-gray-400 mb-8">
            Contactez-nous pour une démonstration personnalisée ou pour obtenir un devis adapté à votre établissement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-xl font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </Link>
            <a
              href="tel:+242068000199"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-7 py-3 rounded-xl font-semibold transition-colors border border-gray-700"
            >
              <Phone className="w-5 h-5" />
              Appeler
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RezoEdu;
