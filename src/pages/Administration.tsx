import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  CheckCircle, 
  FileText, 
  MapPin, 
  Clock, 
  AlertCircle, 
  GraduationCap,
  Heart,
  Users,
  Camera,
  ExternalLink,
  Download,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('aevm');
  const [activeAevmCategory, setActiveAevmCategory] = useState('tourisme');
  const [expandedCountries, setExpandedCountries] = useState(false);
  
  // Memoized data for better performance
  const visaPriorityCountries = useMemo(() => [
    'République Démocratique du Congo (RDC)',
    'Côte d\'Ivoire', 
    'Bénin',
    'Cameroun'
  ], []);

  const aevmCountries = useMemo(() => [
    'Togo',
    'Sénégal', 
    'Congo Brazzaville',
    'Gabon'
  ], []);

  const visaDocuments = useMemo(() => [
    'Passeport valide (au moins 6 mois)',
    'Formulaire de demande de visa dûment rempli',
    '2 photos d\'identité récentes',
    'Réservation d\'hôtel ou attestation d\'hébergement',
    'Billet d\'avion aller-retour',
    'Justificatifs de ressources financières',
    'Certificat médical (selon le pays)',
    'Assurance voyage'
  ], []);

  const aevmCategories = useMemo(() => ({
    tourisme: {
      title: 'Visite/Tourisme',
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200',
      documents: [
        'Passeport valide (au moins 6 mois)',
        'Formulaire AEVM en ligne',
        'Photo d\'identité numérique',
        'Preuve de moyens financiers (relevé bancaire)',
        'Réservation d\'hôtel confirmée ou attestation d\'hébergement',
        'Billet d\'avion aller-retour',
        'Assurance voyage valide',
        'Programme de voyage détaillé'
      ]
    },
    etudes: {
      title: 'Études',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200',
      documents: [
        'Passeport valide (au moins 6 mois)',
        'Formulaire AEVM en ligne',
        'Photo d\'identité numérique',
        'Lettre d\'acceptation de l\'établissement d\'enseignement',
        'Justificatifs de ressources financières',
        'Attestation de logement étudiant',
        'Assurance santé étudiante',
        'Diplômes et relevés de notes précédents',
        'Certificat médical'
      ]
    },
    medical: {
      title: 'Soins Médicaux',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200',
      documents: [
        'Passeport valide (au moins 6 mois)',
        'Formulaire AEVM en ligne',
        'Photo d\'identité numérique',
        'Rapport médical du pays d\'origine',
        'Attestation de prise en charge médicale au Maroc',
        'Justificatifs de ressources financières',
        'Assurance santé internationale',
        'Réservation d\'hébergement proche du centre médical',
        'Contact du médecin traitant au Maroc'
      ]
    },
    famille: {
      title: 'Regroupement Familial',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200',
      documents: [
        'Passeport valide (au moins 6 mois)',
        'Formulaire AEVM en ligne',
        'Photo d\'identité numérique',
        'Certificats de naissance/mariage (légalisés)',
        'Attestation de prise en charge du parent au Maroc',
        'Justificatifs de liens familiaux',
        'Copie du titre de séjour du parent au Maroc',
        'Assurance voyage',
        'Preuve d\'hébergement familial'
      ]
    }
  }), []);

  const visaSteps = useMemo(() => [
    'Prendre rendez-vous au consulat du Maroc',
    'Rassembler tous les documents requis',
    'Remplir le formulaire de demande',
    'Se présenter au consulat avec les documents',
    'Payer les frais de visa',
    'Attendre le traitement (5-10 jours ouvrables)',
    'Récupérer le passeport avec le visa'
  ], []);

  const aevmSteps = useMemo(() => [
    'Accéder au portail officiel AEVM en ligne',
    'Créer un compte utilisateur',
    'Sélectionner le motif de voyage',
    'Remplir le formulaire électronique',
    'Télécharger les documents requis',
    'Effectuer le paiement en ligne',
    'Attendre la validation (24-72h)',
    "Télécharger l'AEVM approuvée",
    "Imprimer et présenter à l'arrivée"
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      {/* Hero Section - Improved accessibility */}
      <section 
        className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 relative overflow-hidden"
        role="banner"
        aria-label="Page d'administration visa Maroc"
      >
        <div className="absolute inset-0 bg-[url('/Images/Mondial.jpg')] bg-cover bg-center opacity-20" aria-hidden="true"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="sr-only">Administration</span>
              🛂 Administration Visa Maroc
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Guide complet pour vos démarches de visa et AEVM pour voyager au Maroc
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16" role="main">
        <div className="container mx-auto px-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
            aria-label="Types de demande"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger value="visa" className="text-lg font-semibold" aria-label="Demande de visa">
                📋 VISA
              </TabsTrigger>
              <TabsTrigger value="aevm" className="text-lg font-semibold" aria-label="Autorisation électronique AEVM">
                💻 AEVM
              </TabsTrigger>
            </TabsList>

            {/* VISA Content */}
            <TabsContent value="visa" className="space-y-8">
              <div className="animate-fade-in">
                <header className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Demande de Visa pour le Maroc
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Processus complet pour obtenir votre visa d'entrée au Maroc
                  </p>
                </header>

                {/* Priority Countries - Improved UX */}
                <Card className="mb-8 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center justify-between text-primary">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-6 w-6" aria-hidden="true" />
                        Pays Prioritaires Soumis au Visa
                      </div>
                      <button
                        onClick={() => setExpandedCountries(!expandedCountries)}
                        className="flex items-center gap-1 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        aria-expanded={expandedCountries}
                        aria-controls="countries-list"
                      >
                        {expandedCountries ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {expandedCountries ? 'Masquer' : 'Voir plus'}
                      </button>
                    </CardTitle>
                    <CardDescription>
                      Ces pays bénéficient d'un traitement prioritaire pour les demandes de visa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div 
                      id="countries-list"
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ${
                        expandedCountries ? 'max-h-none' : 'max-h-32 overflow-hidden'
                      }`}
                    >
                      {visaPriorityCountries.map((country, index) => (
                        <div 
                          key={country}
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 animate-fade-in hover:shadow-md transition-shadow"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                          <span className="font-medium">{country}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Visa Procedure - Enhanced layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                        Procédure de Demande
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {visaSteps.map((step, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 animate-fade-in p-2 rounded hover:bg-muted/50 transition-colors"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <Badge variant="outline" className="mt-1 text-xs px-2 font-bold">
                              {index + 1}
                            </Badge>
                            <span className="text-sm leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
                        Documents Requis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {visaDocuments.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 p-2 rounded animate-fade-in hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm leading-relaxed">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AEVM Content - Major improvements */}
            <TabsContent value="aevm" className="space-y-8">
              <div className="animate-fade-in">
                <header className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Autorisation Électronique de Voyage au Maroc (AEVM)
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    L'AEVM est une autorisation électronique qui permet aux ressortissants de certains pays d'entrer au Maroc sans visa traditionnel, via une procédure entièrement dématérialisée.
                  </p>
                </header>

                {/* AEVM Countries */}
                <Card className="mb-8 border-secondary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-secondary/5">
                    <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                      Pays Éligibles à l'AEVM
                    </CardTitle>
                    <CardDescription>
                      Ces pays peuvent bénéficier de l'autorisation électronique de voyage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aevmCountries.map((country, index) => (
                        <div 
                          key={country}
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 animate-fade-in hover:shadow-md transition-shadow"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
                          <span className="font-medium">{country}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AEVM Categories */}
                <Card className="mb-8 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center">Choisissez votre motif de voyage</CardTitle>
                    <CardDescription className="text-center">
                      Sélectionnez la catégorie qui correspond à votre situation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs 
                      value={activeAevmCategory} 
                      onValueChange={setActiveAevmCategory}
                      className="w-full"
                      aria-label="Catégories AEVM"
                    >
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                        {Object.entries(aevmCategories).map(([key, category]) => {
                          const IconComponent = category.icon;
                          return (
                            <TabsTrigger 
                              key={key}
                              value={key} 
                              className="text-xs md:text-sm font-semibold flex items-center gap-1 p-2"
                              aria-label={`Catégorie ${category.title}`}
                            >
                              <IconComponent className="h-4 w-4" aria-hidden="true" />
                              <span className="hidden md:inline">{category.title}</span>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      {Object.entries(aevmCategories).map(([key, category]) => {
                        const IconComponent = category.icon;
                        return (
                          <TabsContent key={key} value={key} className="space-y-6">
                            <Card className={`${category.borderColor} ${category.bgColor}`}>
                              <CardHeader>
                                <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                                  Documents requis - {category.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {category.documents.map((doc, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 animate-fade-in hover:shadow-sm transition-shadow"
                                      style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                      <span className="text-sm leading-relaxed">{doc}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </CardContent>
                </Card>

                {/* AEVM Procedure - Enhanced */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-center justify-center">
                      <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                      Procédure AEVM
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {aevmSteps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 animate-fade-in hover:shadow-md transition-all duration-200"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <Badge variant="default" className="mt-1 text-xs px-2 font-bold bg-primary">
                            {index + 1}
                          </Badge>
                          <span className="text-sm leading-relaxed">
                            {index === 1 ? (
                              <a
                                href="https://www.acces-maroc.ma/#/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center gap-1"
                                aria-label="Accéder au portail AEVM (ouverture dans un nouvel onglet)"
                              >
                                {step}
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            ) : (
                              step
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Important Notes - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            Durée de validité
                          </h4>
                          <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                            L'AEVM est valable pour un séjour de maximum 30 jours et doit être utilisée dans les 90 jours suivant sa délivrance. 
                            Elle est à usage unique et ne peut pas être renouvelée sur place.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Download className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            Conseils pratiques
                          </h4>
                          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 leading-relaxed">
                            <li>• Imprimez votre AEVM avant le voyage</li>
                            <li>• Gardez une copie numérique sur votre téléphone</li>
                            <li>• Vérifiez les dates de validité avant le départ</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Administration;