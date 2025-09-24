import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle2, Circle, FileText, Clock, Phone, User, GraduationCap, Briefcase, Heart, Info, DollarSign} from "lucide-react";

const CarteSejour = () => {
  const [selectedProfile, setSelectedProfile] = useState('etudiant');
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [completedDocs, setCompletedDocs] = useState(new Set());

  const profiles = [
    { 
      id: 'etudiant', 
      name: 'Étudiant', 
      icon: <GraduationCap className="w-5 h-5" />, 
      description: 'Pour les étudiants internationaux'
    },
    { 
      id: 'travailleur', 
      name: 'Travailleur', 
      icon: <Briefcase className="w-5 h-5" />, 
      description: 'Pour les professionnels'
    },
    { 
      id: 'famille', 
      name: 'Regroupement familial', 
      icon: <Heart className="w-5 h-5" />, 
      description: 'Pour rejoindre la famille'
    }
  ];

  const etapesDetaillees = [
    {
      id: 1,
      title: "Préparation du dossier",
      description: "Rassembler tous les documents requis selon votre profil",
      duree: "3-7 jours",
      conseils: "Vérifiez que tous vos documents sont à jour et conformes"
    },
    {
      id: 2,
      title: "Prise de rendez-vous",
      description: "Réserver un créneau au commissariat ou à la wilaya",
      duree: "1-14 jours",
      conseils: "Appelez tôt le matin pour plus de chances d'avoir un rendez-vous"
    },
    {
      id: 3,
      title: "Dépôt de la demande",
      description: "Présentation du dossier complet aux autorités",
      duree: "2-4 heures",
      conseils: "Apportez tous les documents originaux et leurs copies"
    },
    {
      id: 4,
      title: "Paiement des frais administratifs",
      description: "Règlement des frais requis selon votre profil",
      duree: "15 minutes",
      conseils: "Préparez l'appoint exact et demandez un reçu"
    },
    {
      id: 5,
      title: "Suivi et attente",
      description: "Traitement administratif de votre demande",
      duree: "2-8 semaines",
      conseils: "Notez votre numéro de dossier pour le suivi"
    },
    {
      id: 6,
      title: "Récupération de la carte",
      description: "Retrait de votre titre de séjour",
      duree: "30 minutes",
      conseils: "Vérifiez les informations avant de partir"
    }
  ];

  const documentsParProfil = {
    etudiant: [
      { id: 1, nom: "Passeport valide + copies", obligatoire: true },
      { id: 2, nom: "Formulaire de demande complété", obligatoire: true },
      { id: 3, nom: "8 Photos d'identité récentes", obligatoire: true },
      { id: 4, nom: "Justificatif de résidence", obligatoire: true },
      { id: 5, nom: "Copie CIN du propriétaire", obligatoire: true },
      { id: 6, nom: "Certificat d'inscription + attestation", obligatoire: true },
      { id: 7, nom: "Prise en charge de l'ambassade", obligatoire: false },
      { id: 8, nom: "Certificat médical récent", obligatoire: true },
      { id: 9, nom: "Casier judiciaire + certificat de nationalité", obligatoire: true },
      { id: 10, nom: "Extrait de naissance légalisé", obligatoire: true }
    ],
    travailleur: [
      { id: 1, nom: "Passeport valide + copies", obligatoire: true },
      { id: 2, nom: "Contrat de travail visé", obligatoire: true },
      { id: 3, nom: "Autorisation de travail ANAPEC", obligatoire: true },
      { id: 4, nom: "Justificatif de résidence", obligatoire: true },
      { id: 5, nom: "Certificat médical", obligatoire: true },
      { id: 6, nom: "Diplômes légalisés et traduits", obligatoire: true },
      { id: 7, nom: "Casier judiciaire du pays d'origine", obligatoire: true }
    ],
    famille: [
      { id: 1, nom: "Passeport valide + copies", obligatoire: true },
      { id: 2, nom: "Acte de mariage/naissance légalisé", obligatoire: true },
      { id: 3, nom: "Titre de séjour du garant", obligatoire: true },
      { id: 4, nom: "Prise en charge financière", obligatoire: true },
      { id: 5, nom: "Justificatifs de revenus du garant", obligatoire: true },
      { id: 6, nom: "Certificat de résidence familiale", obligatoire: true }
    ]
  };

  const fraisParProfil = {
    etudiant: "100 DH pour une année",
    travailleur: "100 DH L'Année", 
    famille: "çà dépends de nombre de membre de famille"
  };

  const toggleStep = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const toggleDoc = (docId) => {
    const newCompleted = new Set(completedDocs);
    if (newCompleted.has(docId)) {
      newCompleted.delete(docId);
    } else {
      newCompleted.add(docId);
    }
    setCompletedDocs(newCompleted);
  };

  const getStepsCompletion = () => {
    return Math.round((completedSteps.size / etapesDetaillees.length) * 100);
  };

  const getDocsCompletion = () => {
    const currentDocs = documentsParProfil[selectedProfile];
    const obligatoryDocs = currentDocs.filter(doc => doc.obligatoire);
    const completedObligatory = obligatoryDocs.filter(doc => completedDocs.has(doc.id)).length;
    return Math.round((completedObligatory / obligatoryDocs.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Procedure de la Carte de Séjour au Maroc</h1>
          <p className="text-lg text-gray-600">Guide complet pour obtenir votre titre de séjour</p>
        </div>

        {/* Sélection du profil */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Choisissez votre profil</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedProfile === profile.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => {
                  setSelectedProfile(profile.id);
                  setCompletedSteps(new Set());
                  setCompletedDocs(new Set());
                }}
              >
                <Card className={`h-full ${
                  selectedProfile === profile.id ? 'bg-blue-50 border-blue-200' : 'hover:shadow-md'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      selectedProfile === profile.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {profile.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Progression */}
        <div className="bg-blue-600 rounded-xl p-6 text-white mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-bold mb-2">📋 Étapes</h3>
              <div className="text-2xl font-bold mb-2">{getStepsCompletion()}%</div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${getStepsCompletion()}%` }}
                />
              </div>
              <p className="text-sm mt-1 opacity-90">{completedSteps.size}/{etapesDetaillees.length} terminées</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">📄 Documents</h3>
              <div className="text-2xl font-bold mb-2">{getDocsCompletion()}%</div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${getDocsCompletion()}%` }}
                />
              </div>
              <p className="text-sm mt-1 opacity-90">Documents obligatoires</p>
            </div>

            <div>
              <h3 className="font-bold mb-2 flex items-center justify-center">
                <DollarSign className="w-5 h-5 mr-1" />
                Frais
              </h3>
              <div className="text-2xl font-bold">{fraisParProfil[selectedProfile]}</div>
              <p className="text-sm opacity-90">Tarif {selectedProfile}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Étapes */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-xl flex items-center">
                <Clock className="mr-2" />
                Étapes de la procédure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {etapesDetaillees.map((etape) => {
                  const isCompleted = completedSteps.has(etape.id);
                  
                  return (
                    <div
                      key={etape.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => toggleStep(etape.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : etape.id}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{etape.title}</h4>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {etape.duree}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{etape.description}</p>
                          <div className="flex items-center text-xs text-blue-600">
                            <Info className="w-3 h-3 mr-1" />
                            {etape.conseils}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-500 text-white">
              <CardTitle className="text-xl flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="mr-2" />
                  Documents - {profiles.find(p => p.id === selectedProfile)?.name}
                </span>
                <span>
                  {documentsParProfil[selectedProfile].filter(doc => completedDocs.has(doc.id)).length}/
                  {documentsParProfil[selectedProfile].length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {documentsParProfil[selectedProfile].map((doc) => {
                  const isCompleted = completedDocs.has(doc.id);
                  
                  return (
                    <div
                      key={doc.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => toggleDoc(doc.id)}
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        
                        <div className="flex-1">
                          <span className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                            {doc.nom}
                            {doc.obligatoire && <span className="text-red-500 ml-1">*</span>}
                          </span>
                        </div>
                        
                        <span className={`text-xs px-2 py-1 rounded ${
                          doc.obligatoire ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {doc.obligatoire ? 'Obligatoire' : 'Optionnel'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">💡 Important :</span> Les documents marqués d'un * sont obligatoires. 
                  Assurez-vous que tous les documents étrangers sont traduits et légalisés.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contactez-nous pour plus d'informations
          </Link>
          
          {(getStepsCompletion() === 100 && getDocsCompletion() === 100) && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg max-w-md mx-auto">
              <p className="text-green-800 font-medium">
                🎉 Félicitations ! Votre dossier semble complet !
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarteSejour;