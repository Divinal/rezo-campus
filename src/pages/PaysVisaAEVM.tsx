import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronDown, MapPin, FileText, Clock, CheckCircle2, ExternalLink, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaysVisaAEVM = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const visaCountries = [
    {
      name: "République Démocratique du Congo (RDC)",
    
      procedure: [
        {
          step: 1,
          title: "Rendez-vous consulat",
          description: "Prendre rendez-vous au consulat du Maroc à Kinshasa",
          details: "Contactez le +243 81 000 0000 ou visitez le site web du consulat",
          duration: "1-2 jours"
        },
        {
          step: 2,
          title: "Préparation documents",
          description: "Rassembler tous les documents requis",
          details: "Passeport, photos, justificatifs financiers, réservation hôtel",
          duration: "3-5 jours"
        },
        {
          step: 3,
          title: "Dépôt du dossier",
          description: "Soumettre le dossier complet au consulat",
          details: "Présentation en personne avec tous les originaux",
          duration: "1 jour"
        },
        {
          step: 4,
          title: "Traitement",
          description: "Attendre le traitement de la demande",
          details: "Le consulat examine votre dossier",
          duration: "5-10 jours ouvrables"
        }
      ],
      specialInfo: "Traitement prioritaire pour les ressortissants congolais"
    },
    {
      name: "Côte d'Ivoire",
      procedure: [
        {
          step: 1,
          title: "Pré-inscription en ligne",
          description: "Remplir le formulaire en ligne",
          details: "Visitez le portail consulaire marocain",
          duration: "30 minutes"
        },
        {
          step: 2,
          title: "Rendez-vous consulat",
          description: "Prendre rendez-vous à Abidjan",
          details: "Consulat du Maroc - Cocody, Abidjan",
          duration: "1-3 jours"
        },
        {
          step: 3,
          title: "Préparation documents",
          description: "Rassembler les documents requis",
          details: "Documents spécifiques pour les ivoiriens",
          duration: "2-4 jours"
        },
        {
          step: 4,
          title: "Soumission et traitement",
          description: "Dépôt et attente du traitement",
          details: "Traitement accéléré disponible",
          duration: "3-7 jours ouvrables"
        }
      ],
      specialInfo: "Service express disponible pour 48h"
    },
    {
      name: "Bénin",
      procedure: [
        {
          step: 1,
          title: "Contact consulat",
          description: "Contacter le consulat du Maroc",
          details: "Ambassade du Maroc à Cotonou",
          duration: "1 jour"
        },
        {
          step: 2,
          title: "Préparation dossier",
          description: "Préparer tous les documents",
          details: "Liste spécifique pour les béninois",
          duration: "3-5 jours"
        },
        {
          step: 3,
          title: "Dépôt et traitement",
          description: "Soumission du dossier complet",
          details: "Traitement standard",
          duration: "7-14 jours ouvrables"
        }
      ],
      specialInfo: "Entretien consulaire parfois requis"
    },
    {
      name: "Cameroun",
      procedure: [
        {
          step: 1,
          title: "Prise de rendez-vous",
          description: "Rendez-vous à l'ambassade à Yaoundé",
          details: "Ou consulat à Douala selon votre région",
          duration: "1-2 jours"
        },
        {
          step: 2,
          title: "Documents requis",
          description: "Préparation du dossier complet",
          details: "Documents biométriques requis",
          duration: "3-6 jours"
        },
        {
          step: 3,
          title: "Soumission",
          description: "Dépôt du dossier et paiement",
          details: "Frais consulaires à régler",
          duration: "1 jour"
        },
        {
          step: 4,
          title: "Suivi et récupération",
          description: "Traitement et récupération du visa",
          details: "Possibilité de suivi en ligne",
          duration: "5-12 jours ouvrables"
        }
      ],
      specialInfo: "Deux points de service : Yaoundé et Douala"
    }
  ];

  const aevmCountries = [
    {
      name: "Mali",
      procedure: [
        {
          step: 1,
          title: "Inscription sur le portail AEVM",
          description: "Créer un compte sur acces-maroc.ma",
          details: "Utiliser une adresse email valide",
          duration: "15 minutes"
        },
        {
          step: 2,
          title: "Remplissage formulaire",
          description: "Compléter le formulaire en ligne",
          details: "Informations personnelles et de voyage",
          duration: "30 minutes"
        },
        {
          step: 3,
          title: "Upload documents",
          description: "Télécharger les documents scannés",
          details: "Passeport, photo, justificatifs",
          duration: "20 minutes"
        },
        {
          step: 4,
          title: "Paiement et validation",
          description: "Paiement en ligne et soumission",
          details: "Carte bancaire ou mobile money",
          duration: "10 minutes"
        },
        {
          step: 5,
          title: "Traitement automatique",
          description: "Traitement électronique de la demande",
          details: "Système automatisé",
          duration: "24-72 heures"
        }
      ],
      specialInfo: "100% électronique - Pas de déplacement nécessaire"
    },
    {
      name: "Ghana",
      procedure: [
        {
          step: 1,
          title: "Accès portail AEVM",
          description: "Connexion sur la plateforme officielle",
          details: "acces-maroc.ma - Section Sénégal",
          duration: "5 minutes"
        },
        {
          step: 2,
          title: "Formulaire de demande",
          description: "Remplir les informations requises",
          details: "Données personnelles et motif de voyage",
          duration: "25 minutes"
        },
        {
          step: 3,
          title: "Documents numériques",
          description: "Joindre tous les justificatifs",
          details: "Format PDF ou JPG acceptés",
          duration: "15 minutes"
        },
        {
          step: 4,
          title: "Validation et paiement",
          description: "Révision et paiement sécurisé",
          details: "Paiement par carte ou Wave/Orange Money",
          duration: "10 minutes"
        },
        {
          step: 5,
          title: "Réception AEVM",
          description: "Récupération de l'autorisation",
          details: "Par email sous format PDF",
          duration: "12-48 heures"
        }
      ],
      specialInfo: "Service ultra-rapide avec Wave et Orange Money"
    },
    {
      name: "Congo Brazzaville",
      procedure: [
        {
          step: 1,
          title: "Création compte AEVM",
          description: "Inscription sur le portail",
          details: "Email et numéro de téléphone requis",
          duration: "10 minutes"
        },
        {
          step: 2,
          title: "Saisie informations",
          description: "Formulaire de demande en ligne",
          details: "Informations voyage et hébergement",
          duration: "35 minutes"
        },
        {
          step: 3,
          title: "Justificatifs électroniques",
          description: "Upload des documents requis",
          details: "Qualité scanné haute résolution",
          duration: "20 minutes"
        },
        {
          step: 4,
          title: "Soumission et paiement",
          description: "Finalisation de la demande",
          details: "Paiement sécurisé en ligne",
          duration: "15 minutes"
        },
        {
          step: 5,
          title: "Délivrance AEVM",
          description: "Réception de l'autorisation",
          details: "Email avec QR code",
          duration: "24-96 heures"
        }
      ],
      specialInfo: "QR Code pour vérification rapide à l'aéroport"
    },
    {
      name: "Guinée",
      procedure: [
        {
          step: 1,
          title: "Portail AEVM Gabon",
          description: "Accès à la section gabonaise",
          details: "Interface en français",
          duration: "5 minutes"
        },
        {
          step: 2,
          title: "Demande électronique",
          description: "Formulaire spécifique Gabon",
          details: "Champs adaptés aux gabonais",
          duration: "30 minutes"
        },
        {
          step: 3,
          title: "Pièces justificatives",
          description: "Téléchargement des documents",
          details: "Formats acceptés : PDF, JPG, PNG",
          duration: "25 minutes"
        },
        {
          step: 4,
          title: "Contrôle et paiement",
          description: "Vérification et règlement",
          details: "Carte bancaire internationale",
          duration: "12 minutes"
        },
        {
          step: 5,
          title: "AEVM délivrée",
          description: "Autorisation électronique prête",
          details: "Valide pour entrée unique",
          duration: "48-120 heures"
        }
      ],
      specialInfo: "Support client en français 24/7"
    }
  ];

  const toggleStep = (stepIndex) => {
    const stepId = `${selectedCountry}-${stepIndex}`;
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getCompletionPercentage = () => {
    if (!selectedCountry) return 0;
    const countryData = selectedType === 'visa' ? 
      visaCountries.find(c => c.name === selectedCountry) :
      aevmCountries.find(c => c.name === selectedCountry);
    
    if (!countryData) return 0;
    
    const totalSteps = countryData.procedure.length;
    const completedCount = countryData.procedure.filter((_, index) => 
      completedSteps.has(`${selectedCountry}-${index}`)
    ).length;
    
    return Math.round((completedCount / totalSteps) * 100);
  };

  const CountryCard = ({ country, type, onSelect }) => (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={() => onSelect(country.name, type)}
    >
      <Card className="h-full border-2 border-transparent hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">{country.flag}</div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{country.name}</h3>
          <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
            <Clock className="w-4 h-4 mr-1" />
            {country.procedure.length} étapes
          </div>
          <Button variant="outline" size="sm" className="w-full group">
            Voir la procédure
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ProcedureView = () => {
    const countryData = selectedType === 'visa' ? 
      visaCountries.find(c => c.name === selectedCountry) :
      aevmCountries.find(c => c.name === selectedCountry);

    if (!countryData) return null;

    const completionPercent = getCompletionPercentage();

    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        className="space-y-6"
      >
        {/* Header avec retour */}
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg">
          <Button
            variant="ghost"
            onClick={() => setSelectedCountry(null)}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold flex items-center justify-center">
              
              <span className="ml-2">{countryData.name}</span>
            </h2>
            <p className="text-gray-600">
              {selectedType === 'visa' ? 'Procédure Visa' : 'Procédure AEVM'}
            </p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">📊 Progression</h3>
            <span className="text-2xl font-bold">{completionPercent}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-sm mt-2 opacity-90">{countryData.specialInfo}</p>
        </div>

        {/* Étapes de la procédure */}
        <div className="space-y-4">
          {countryData.procedure.map((step, index) => {
            const isCompleted = completedSteps.has(`${selectedCountry}-${index}`);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    isCompleted 
                      ? 'border-green-500 bg-green-50 shadow-lg' 
                      : 'hover:shadow-md border-gray-200'
                  }`}
                  onClick={() => toggleStep(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : step.step}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-lg font-semibold ${
                            isCompleted ? 'text-green-800' : 'text-gray-800'
                          }`}>
                            {step.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {step.duration}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <p className="text-sm text-blue-600">{step.details}</p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            isCompleted 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isCompleted ? '✅ Terminé' : 'En attente'}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            isCompleted ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Actions finales */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">🚀 Prêt à commencer ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedType === 'visa' ? (
              <>
                <a
                    href="/documents/formulaire-demande-visa-maroc.pdf"
                    download
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Télécharger le formulaire de visa
                  </a>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link to="/administration">
                    <FileText className="w-4 h-4 mr-2" />
                    Guide détaillé pour la demande de visa
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open('https://www.acces-maroc.ma/#/', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Commencer la demande AEVM
                </Button>                
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link to="/administration">
                    <FileText className="w-4 h-4 mr-2" />
                    Guide détaillé
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {completionPercent === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-center"
            >
              <p className="text-green-800 font-medium">
                🎉 Félicitations ! Vous avez terminé toutes les étapes !
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <AnimatePresence mode="wait">
          {!selectedCountry ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  🌍 Pays Visa & AEVM
                </h1>
                <p className="text-xl text-gray-600">
                  Découvrez les procédures détaillées pour chaque pays
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Section Visa */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                    <h2 className="text-3xl font-bold mb-2 text-red-700 flex items-center">
                      📋 Pays avec Visa
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Procédure consulaire traditionnelle avec rendez-vous
                    </p>
                    <div className="grid gap-6">
                      {visaCountries.map((country, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CountryCard 
                            country={country} 
                            type="visa" 
                            onSelect={(name, type) => {
                              setSelectedCountry(name);
                              setSelectedType(type);
                            }} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Section AEVM */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-green-500">
                    <h2 className="text-3xl font-bold mb-2 text-green-700 flex items-center">
                      💻 Pays avec AEVM
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Autorisation Électronique de Voyage au Maroc - 100% en ligne
                    </p>
                    <div className="grid gap-6">
                      {aevmCountries.map((country, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          <CountryCard 
                            country={country} 
                            type="aevm" 
                            onSelect={(name, type) => {
                              setSelectedCountry(name);
                              setSelectedType(type);
                            }} 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <ProcedureView key="procedure" />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default PaysVisaAEVM;