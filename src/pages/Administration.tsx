import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, MapPin, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('visa');

  const visaPriorityCountries = [
    'République Démocratique du Congo (RDC)',
    'Côte d\'Ivoire', 
    'Bénin',
    'Cameroun'
  ];

  const aevmCountries = [
    'Togo',
    'Sénégal', 
    'Congo Brazzaville',
    'Gabon'
  ];

  const visaDocuments = [
    'Passeport valide (au moins 6 mois)',
    'Formulaire de demande de visa dûment rempli',
    '2 photos d\'identité récentes',
    'Réservation d\'hôtel ou attestation d\'hébergement',
    'Billet d\'avion aller-retour',
    'Justificatifs de ressources financières',
    'Certificat médical (selon le pays)',
    'Assurance voyage'
  ];

  const aevmDocuments = [
    'Passeport valide (au moins 6 mois)',
    'Formulaire AEVM en ligne',
    'Photo d\'identité numérique',
    'Preuve de moyens financiers',
    'Réservation d\'hôtel confirmée',
    'Billet d\'avion aller-retour',
    'Assurance voyage valide'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Images/Mondial.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🛂 Administration Visa Maroc
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Guide complet pour vos démarches de visa et AEVM pour voyager au Maroc
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger value="visa" className="text-lg font-semibold">
                📋 VISA
              </TabsTrigger>
              <TabsTrigger value="aevm" className="text-lg font-semibold">
                💻 AEVM
              </TabsTrigger>
            </TabsList>

            {/* VISA Content */}
            <TabsContent value="visa" className="space-y-8">
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Demande de Visa pour le Maroc
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Processus complet pour obtenir votre visa d'entrée au Maroc
                  </p>
                </div>

                {/* Priority Countries */}
                <Card className="mb-8 border-primary/20 shadow-lg hover-scale">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <MapPin className="h-6 w-6" />
                      Pays Prioritaires Soumis au Visa
                    </CardTitle>
                    <CardDescription>
                      Ces pays bénéficient d'un traitement prioritaire pour les demandes de visa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {visaPriorityCountries.map((country, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="font-medium">{country}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Visa Procedure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg hover-scale">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary" />
                        Procédure de Demande
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {[
                          'Prendre rendez-vous au consulat du Maroc',
                          'Rassembler tous les documents requis',
                          'Remplir le formulaire de demande',
                          'Se présenter au consulat avec les documents',
                          'Payer les frais de visa',
                          'Attendre le traitement (5-10 jours ouvrables)',
                          'Récupérer le passeport avec le visa'
                        ].map((step, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <Badge variant="outline" className="mt-1 text-xs px-2">
                              {index + 1}
                            </Badge>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg hover-scale">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Documents Requis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {visaDocuments.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 p-2 rounded animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AEVM Content */}
            <TabsContent value="aevm" className="space-y-8">
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Autorisation Électronique de Voyage au Maroc (AEVM)
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    L'AEVM est une autorisation électronique qui permet aux ressortissants de certains pays d'entrer au Maroc sans visa traditionnel, via une procédure entièrement dématérialisée.
                  </p>
                </div>

                {/* AEVM Countries */}
                <Card className="mb-8 border-secondary/20 shadow-lg hover-scale">
                  <CardHeader className="bg-secondary/5">
                    <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                      <MapPin className="h-6 w-6" />
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
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CheckCircle className="h-5 w-5 text-secondary-foreground" />
                          <span className="font-medium">{country}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AEVM Procedure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg hover-scale">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary" />
                        Procédure AEVM
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {[
                          'Accéder au portail officiel AEVM en ligne',
                          'Créer un compte utilisateur',
                          'Remplir le formulaire électronique',
                          'Télécharger les documents requis',
                          'Effectuer le paiement en ligne',
                          'Attendre la validation (24-72h)',
                          'Télécharger l\'AEVM approuvée',
                          'Imprimer et présenter à l\'arrivée'
                        ].map((step, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <Badge variant="outline" className="mt-1 text-xs px-2">
                              {index + 1}
                            </Badge>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg hover-scale">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Documents AEVM
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {aevmDocuments.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-start gap-3 p-2 rounded animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Note */}
                <Card className="mt-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                          Information Importante
                        </h4>
                        <p className="text-amber-700 dark:text-amber-300 text-sm">
                          L'AEVM est valable pour un séjour de maximum 30 jours et doit être utilisée dans les 90 jours suivant sa délivrance. 
                          Elle est à usage unique et ne peut pas être renouvelée sur place.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Administration;