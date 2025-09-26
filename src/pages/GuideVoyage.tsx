import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plane, Hotel, MapPin, CreditCard, Phone, Shield, Calendar, Clock, Car, Train, AlertTriangle, Heart, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GuideVoyage = () => {
const documentsVisa = [
  { label: 'Passeport valide (6 mois minimum)' },
  { label: 'Formulaire de demande de visa', link: '/documents/formulaire-demande-visa-maroc.pdf' },
  { label: 'Commencer la demande AEVM', link: 'https://www.acces-maroc.ma/#/', external: true },
  { label: "Photos d'identité récentes" },
  { label: 'Justificatifs financiers' },
  { label: "Réservation d'hôtel ou invitation" },
  { label: "Billet d'avion aller-retour" }
];

  const moyensTransport = [
    {
      type: 'Avion',
      description: 'Aéroports principaux : Casablanca (CMN), Rabat (RBA), Marrakech (RAK)',
      icon: Plane,
      conseils: 'Réservez tôt pour la CAN, prix élevés pendant l\'événement'
    },
    {
      type: 'Train',
      description: 'TGV Al Boraq (Tanger-Casablanca) et réseau ONCF',
      icon: Train,
      conseils: 'Service rapide et confortable entre les grandes villes'
    },
    {
      type: 'Location de voiture',
      description: 'Permis international requis, conduite à droite',
      icon: Car,
      conseils: 'Routes en bon état, attention aux différences de conduite'
    }
  ];

  const hebergements = [
    {
      type: 'Hôtels de luxe',
      prix: '150€ - 500€/nuit',
      description: 'Riads, palais, resorts internationaux'
    },
    {
      type: 'Hôtels moyens',
      prix: '50€ - 150€/nuit',
      description: 'Confort moderne, bien situés'
    },
    {
      type: 'Auberges/Riads',
      prix: '20€ - 50€/nuit',
      description: 'Authentique, petit budget'
    }
  ];

  const conseilsSante = [
    'Aucun vaccin obligatoire',
    'Eau en bouteille recommandée',
    'Crème solaire et chapeau',
    'Assurance voyage conseillée',
    'Pharmacie de base'
  ];

  const conseilsCulture = [
    'Respecter les traditions religieuses',
    'Tenue vestimentaire modeste',
    'Négociation dans les souks',
    'Pourboires (10-15%)',
    'Politesse et patience'
  ];

  const budgetEstime = [
    {
      categorie: 'Budget serré',
      montant: '30-50€/jour',
      details: 'Auberge, transports publics, street food'
    },
    {
      categorie: 'Budget moyen',
      montant: '50-100€/jour',
      details: 'Hôtel 3*, restaurants, quelques visites'
    },
    {
      categorie: 'Budget confort',
      montant: '100-200€/jour',
      details: 'Hôtel 4-5*, restaurants, guides, shopping'
    }
  ];

  const villesIncontournables = [
    {
      ville: 'Casablanca',
      description: 'Métropole économique, mosquée Hassan II',
      pourquoi: 'Finale de la CAN, ville moderne'
    },
    {
      ville: 'Marrakech',
      description: 'Ville rouge, jardins, souks animés',
      pourquoi: 'Patrimoine UNESCO, expérience authentique'
    },
    {
      ville: 'Rabat',
      description: 'Capitale politique, patrimoine',
      pourquoi: 'Calme, musées, architecture'
    },
    {
      ville: 'Fès',
      description: 'Ville impériale, médina historique',
      pourquoi: 'Artisanat, université la plus ancienne'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/can-2025" className="inline-flex items-center text-white/80 hover:text-white mb-6 hover-scale">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la CAN 2025
          </Link>
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Guide Voyage Maroc
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Tout ce qu'il faut savoir pour voyager au Maroc pendant la CAN 2025
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Alerte importante */}
        <Alert className="mb-8 animate-fade-in">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important CAN 2025 :</strong> Réservez votre hébergement et transport le plus tôt possible. 
            Les prix augmentent considérablement pendant l'événement !
          </AlertDescription>
        </Alert>

        {/* Visa et formalités */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            🛂 Visa et formalités d'entrée
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Exemption de visa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Pays exempts de visa pour 90 jours :</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Badge variant="outline">France</Badge>
                  <Badge variant="outline">Belgique</Badge>
                  <Badge variant="outline">Suisse</Badge>
                  <Badge variant="outline">Canada</Badge>
                  <Badge variant="outline">Allemagne</Badge>
                  <Badge variant="outline">Espagne</Badge>
                </div>
                <Link to="/pays-visa" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">Voir la liste complète</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
               <CardTitle className="flex items-center flex-wrap gap-2">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Visa ou AEVM Requis —
                  <Link
                    to="/pays-visa"
                    className="text-blue-600 hover:underline text-sm font-normal"
                  >
                    Vérifier ici
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Documents nécessaires :</p>
              <ul className="space-y-2 text-sm">
                {documentsVisa.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                   {doc.link ? (
                      <a
                        href={doc.link}
                        className="text-blue-600 hover:underline"
                        {...(doc.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                      >
                        {doc.label}
                        {doc.external ? ' ↗️' : ' (Télécharger ici 📥)'}
                      </a>
                    ) : (
                      doc.label
                    )}
                  </li>
                ))}
              </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Transport */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            ✈️ Se rendre au Maroc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moyensTransport.map((transport, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <transport.icon className="mr-2 h-5 w-5 text-primary" />
                    {transport.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{transport.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    💡 {transport.conseils}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hébergement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            🏨 Hébergement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hebergements.map((hebergement, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Hotel className="mr-2 h-5 w-5 text-primary" />
                      {hebergement.type}
                    </span>
                    <Badge>{hebergement.prix}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{hebergement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/immo">
              <Button className="hover-scale">
                <Hotel className="mr-2 h-4 w-4" />
                Trouver un logement
              </Button>
            </Link>
          </div>
        </section>

        {/* Budget estimé */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            💰 Budget estimé
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budgetEstime.map((budget, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      {budget.categorie}
                    </span>
                    <Badge variant="outline">{budget.montant}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{budget.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Villes incontournables */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            🏛️ Villes incontournables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villesIncontournables.map((ville, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    {ville.ville}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{ville.description}</p>
                  <Badge variant="secondary">
                    <Heart className="w-3 h-3 mr-1" />
                    {ville.pourquoi}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conseils pratiques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            💡 Conseils pratiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-scale animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Santé et sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conseilsSante.map((conseil, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {conseil}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-scale animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-primary" />
                  Culture et savoir-vivre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conseilsCulture.map((conseil, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {conseil}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Informations utiles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in">
            📱 Informations utiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover-scale animate-fade-in">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Fuseau horaire</h3>
                <p className="text-muted-foreground">GMT+1 (hiver)</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <CreditCard className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Monnaie</h3>
                <p className="text-muted-foreground">Dirham (MAD)</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Langues</h3>
                <p className="text-muted-foreground">Arabe, Français</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale animate-fade-in" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Climat</h3>
                <p className="text-muted-foreground">Doux en hiver</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Que faire pendant la CAN */}
        <section className="mb-16">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🏆 Que faire pendant la CAN 2025 ?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🎫 Matchs et ambiance</h3>
                  <ul className="space-y-2">
                    <li>• Assister aux matchs dans les stades</li>
                    <li>• Fan zones dans les villes</li>
                    <li>• Rencontrer des supporters africains</li>
                    <li>• Découvrir la passion du football</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🎭 Culture et patrimoine</h3>
                  <ul className="space-y-2">
                    <li>• Visiter les médinas historiques</li>
                    <li>• Découvrir l'artisanat local</li>
                    <li>• Déguster la cuisine marocaine</li>
                    <li>• Admirer l'architecture islamique</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🌅 Nature et aventure</h3>
                  <ul className="space-y-2">
                    <li>• Excursions dans l'Atlas</li>
                    <li>• Désert du Sahara</li>
                    <li>• Côtes atlantique et méditerranéenne</li>
                    <li>• Randonnées et trekkings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🛍️ Shopping et détente</h3>
                  <ul className="space-y-2">
                    <li>• Souks traditionnels</li>
                    <li>• Centres commerciaux modernes</li>
                    <li>• Hammams et spas</li>
                    <li>• Cafés et thé à la menthe</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'aide pour organiser votre voyage ?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Notre équipe est là pour vous accompagner dans vos démarches
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover-scale">
                <Phone className="mr-2 h-5 w-5" />
                Nous contacter
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GuideVoyage;