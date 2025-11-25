import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, FileText, MapPin, Bed, Car, Shield, Star, Check, X, CreditCard, Users, Calendar, Globe, Phone, Mail, Clock, Award, Camera, Utensils, Navigation, Heart, Crown, ChevronDown, ChevronUp} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CANMoroccoPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState({});
  const [orderData, setOrderData] = useState({
    package: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    arrivalDate: '',
    departureDate: '',
    travelers: 1,
    specialRequests: '',
    paymentMethod: 'paypal'
  });

  // Packages data
  const packages = [
    {
      id: 'visa-only',
      name: 'Pack Visa Essential',
      price: 299,
      duration: '15-20 jours de traitement',
      color: 'from-blue-500 to-blue-700',
      icon: <FileText className="w-8 h-8" />,
      badge: 'POPULAIRE',
      description: 'Parfait pour les voyageurs indépendants qui ont juste besoin d\'aide avec les formalités administratives.',
      services: [
        'Assistance complète pour visa touristique/AEVM',
        'Vérification et préparation de tous vos documents',
        'Suivi personnalisé de votre dossier',
        'Support 24/7 pendant le processus',
        'Assurance visa (remboursement si refus)',
        'Guide des formalités douanières',
        'Certificat de vaccination si requis'
      ],
      includes: [
        'Frais de service visa/AEVM',
        'Assistance documentaire complète',
        'Suivi temps réel',
        'Support multilingue',
        'Garantie satisfaction'
      ],
      notIncludes: [
        'Frais consulaires officiels',
        'Transport vers consulat',
        'Hébergement',
        'Billets d\'avion'
      ]
    },
    {
      id: 'visa-welcome',
      name: 'Pack Accueil VIP',
      price: 999,
      duration: '10-15 jours de traitement',
      color: 'from-green-500 to-green-700',
      icon: <MapPin className="w-8 h-8" />,
      badge: 'RECOMMANDÉ',
      description: 'Pour ceux qui veulent arriver au Maroc en toute sérénité avec un accueil personnalisé.',
      services: [
        'Tout du Pack Visa Essential',
        'Accueil VIP à l\'aéroport',
        'Transport privé aéroport ↔ hébergement',
        '25 jours d\'hébergement ou logement privé',
        'Orientation city tour le premier jour',
        'Carte SIM locale + data illimitée',
        'Assistant personnel pendant 48h',
        'Recommandations restaurants & activités',
        'Support local 24/7 pendant votre séjour'
      ],
      includes: [
        'Pack Visa Essential complet',
        'Accueil personnalisé aéroport',
        'Transport privé',
        'Hébergement 7 nuits minimum',
        'City tour découverte',
        'Kit de bienvenue'
      ],
      notIncludes: [
        'Billets d\'avion',
        'Repas (sauf petit-déjeuner hôtel)',
        'Activités touristiques payantes',
        'Frais personnels'
      ]
    },
    {
      id: 'complete-experience',
      name: 'Pack Expérience Complète',
      price: 2500 ,
      duration: '7-15 jours de traitement',
      color: 'from-purple-500 to-purple-700',
      icon: <Crown className="w-8 h-8" />,
      badge: 'PREMIUM',
      description: 'L\'expérience CAN ultime ! Tout est inclus pour un voyage inoubliable sans stress.',
      services: [
        'Tout du Pack Accueil VIP',
        'Billets d\'avion aller-retour',
        '10 Billets matchs CAN  Catégorie 1 (selon disponibilité)',
        'Excursions organisées (Marrakech, Fès, Chefchaouen)',
        'Guide touristique français/anglais',
        'Dîner traditionnel marocain',
        'Séance photos professionnelle',
        'Souvenirs CAN Morocco 2025',
        'Certificat d\'expérience personnalisé'
      ],
      includes: [
        'Pack Accueil VIP complet',
        'Vol aller-retour',
        'Assurance voyage premium',
        'Excursions organisées',
        'Guide personnel',
        'Repas traditionnels',
        'Cadeaux souvenirs'
      ],
      notIncludes: [
        'Achats personnels',
        'Excès bagages',
        'Activités non mentionnées',
        'Pourboires guides (facultatif)'
      ]
    }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setOrderData({...orderData, package: pkg.id});
    setShowOrderForm(true);
  };

  const toggleExpandPackage = (packageId) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };

  const handleInputChange = (field, value) => {
    setOrderData({...orderData, [field]: value});
  };

  const handleSubmitOrder = async () => {
    console.log('Commande soumise:', orderData);
    
    // Validation des champs obligatoires
    if (!orderData.firstName || !orderData.lastName || !orderData.email || !orderData.nationality || !orderData.arrivalDate || !orderData.departureDate) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      // Préparer les données pour l'envoi d'email
      const bookingData = {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        nationality: orderData.nationality,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        travelers: orderData.travelers,
        totalPrice: selectedPackage.price * orderData.travelers,
        paymentMethod: orderData.paymentMethod,
        arrivalDate: orderData.arrivalDate,
        departureDate: orderData.departureDate,
        specialRequests: orderData.specialRequests
      };

      // Envoyer l'email de confirmation
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: bookingData
      });

      if (error) {
        console.error('Erreur envoi email:', error);
        toast.error('Erreur lors de l\'envoi de l\'email de confirmation');
        return;
      }

      toast.success('Email de confirmation envoyé avec succès !');
      
      if (orderData.paymentMethod === 'paypal') {
        // Le composant PayPal gérera le paiement
        console.log('Paiement PayPal en cours...');
      } else {
        // Pour le virement bancaire, l'email contient déjà le RIB
        toast.success('Instructions de virement bancaire envoyées par email');
        setShowOrderForm(false);
      }
    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
      toast.error('Erreur lors du traitement de votre commande');
    }
  };

  const handlePayPalSuccess = (details) => {
    console.log('Paiement PayPal réussi:', details);
    toast.success(`Paiement réussi ! Référence: ${details.id}`);
    setShowOrderForm(false);
  };

  const handlePayPalError = (error) => {
    console.error('Erreur PayPal:', error);
    toast.error('Erreur lors du paiement PayPal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50">
      <Header />
      {/* Hero Section */}
      <section className="py-10 bg-gradient-to-r from-green-600 via-green-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Vivez la CAN 2025 au Maroc ! 
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Des packs tout inclus pour une expérience inoubliable lors de la Coupe d'Afrique des Nations
            </p>            
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choisissez Votre Pack CAN 2025
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trois options adaptées à vos besoins pour vivre pleinement la CAN au Maroc
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.id} 
                className={`relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  index === 1 ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute top-4 right-4 z-10`}>
                    <Badge className={`bg-gradient-to-r ${pkg.color} text-white font-bold px-3 py-1`}>
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${pkg.color} text-white p-6 text-center`}>
                  <div className="flex justify-center mb-4">
                    {pkg.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                  <div className="text-4xl font-bold mb-2">
                    {pkg.price}€
                    <span className="text-lg font-normal opacity-80"> / personne</span>
                  </div>
                  <p className="text-sm opacity-90">{pkg.duration}</p>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  
                  {/* Services avec expand/collapse */}
                  <div className="space-y-4 mb-6">
                    <h5 className="font-bold text-gray-800 flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Services inclus:
                    </h5>
                    <ul className="space-y-2">
                      {/* Afficher les 4 premiers services */}
                      {pkg.services.slice(0, 4).map((service, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                      
                      {/* Afficher les services supplémentaires si expandé */}
                      {expandedPackages[pkg.id] && pkg.services.length > 4 && (
                        <>
                          {pkg.services.slice(4).map((service, idx) => (
                            <li 
                              key={idx + 4} 
                              className="flex items-start text-sm animate-in slide-in-from-top duration-300"
                            >
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </>
                      )}
                      
                      {/* Bouton pour afficher/masquer les services supplémentaires */}
                      {pkg.services.length > 4 && (
                        <li>
                          <button
                            onClick={() => toggleExpandPackage(pkg.id)}
                            className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-all duration-200 w-full justify-center group"
                          >
                            {expandedPackages[pkg.id] ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-1 group-hover:animate-bounce" />
                                Voir moins de services
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-1 group-hover:animate-bounce" />
                                + {pkg.services.length - 4} autres services
                              </>
                            )}
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white font-bold py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    Choisir ce Pack
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showOrderForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Réservation - {selectedPackage.name}
                  </h3>
                  <p className="text-lg text-green-600 font-bold">
                    {selectedPackage.price}€ / personne
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom *</label>
                    <Input
                      value={orderData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <Input
                      value={orderData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={orderData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone *</label>
                    <Input
                      value={orderData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nationalité *</label>
                  <Select value={orderData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="andorre">Andorre</SelectItem>
                      <SelectItem value="angola">Angola</SelectItem>
                      <SelectItem value="benin">Bénin</SelectItem>
                      <SelectItem value="belgique">Belgique</SelectItem>
                      <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                      <SelectItem value="burundi">Burundi</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="comores">Comores</SelectItem>
                      <SelectItem value="cote-ivoire">Côte d'Ivoire</SelectItem>
                      <SelectItem value="djibouti">Djibouti</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="guinee">Guinée</SelectItem>
                      <SelectItem value="guinee-bissau">Guinée-Bissau</SelectItem>
                      <SelectItem value="guinee-equatoriale">Guinée équatoriale</SelectItem>
                      <SelectItem value="haiti">Haïti</SelectItem>
                      <SelectItem value="liban">Liban</SelectItem>
                      <SelectItem value="luxembourg">Luxembourg</SelectItem>
                      <SelectItem value="madagascar">Madagascar</SelectItem>
                      <SelectItem value="mali">Mali</SelectItem>
                      <SelectItem value="maurice">Île Maurice</SelectItem>
                      <SelectItem value="niger">Niger</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="rc">République du Congo</SelectItem>
                      <SelectItem value="rdc">République Démocratique du Congo</SelectItem>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                      <SelectItem value="senegal">Sénégal</SelectItem>
                      <SelectItem value="seychelles">Seychelles</SelectItem>
                      <SelectItem value="suisse">Suisse</SelectItem>
                      <SelectItem value="tchad">Tchad</SelectItem>
                      <SelectItem value="togo">Togo</SelectItem>
                      <SelectItem value="vanuatu">Vanuatu</SelectItem>
                      <SelectItem value="vietnam">Vietnam</SelectItem>
                      <SelectItem value="autres">Autres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates de voyage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date d'arrivée *</label>
                    <Input
                      type="date"
                      value={orderData.arrivalDate}
                      onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                      min="2025-10-01"
                      max="2025-12-31"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date de départ *</label>
                    <Input
                      type="date"
                      value={orderData.departureDate}
                      onChange={(e) => handleInputChange('departureDate', e.target.value)}
                      min="2025-01-01"
                      max="2026-12-31"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de voyageurs</label>
                  <Select 
                    value={orderData.travelers.toString()} 
                    onValueChange={(value) => handleInputChange('travelers', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'personne' : 'personnes'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Demandes spéciales</label>
                  <Textarea
                    value={orderData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Régime alimentaire, mobilité réduite, préférences d'hébergement..."
                    rows={3}
                  />
                </div>

                {/* Prix total */}
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total à payer:</span>
                    <span className="text-green-600">
                      {selectedPackage.price * orderData.travelers}€
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedPackage.price}€ × {orderData.travelers} {orderData.travelers === 1 ? 'personne' : 'personnes'}
                  </p>
                </div>

                <div className="space-y-4">
                  {orderData.paymentMethod === 'paypal' && orderData.firstName && orderData.email && orderData.nationality ? (
                    <div className="space-y-4">
                      <Button
                        onClick={handleSubmitOrder}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Envoyer email de confirmation et procéder au paiement
                      </Button>
                      
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              amount: {
                                value: (selectedPackage.price * orderData.travelers).toString(),
                                currency_code: "EUR"
                              },
                              description: `${selectedPackage.name} - ${orderData.travelers} personne(s)`
                            }]
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            handlePayPalSuccess(details);
                          });
                        }}
                        onError={handlePayPalError}
                      />
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowOrderForm(false)}
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir Nos Services ?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h4 className="text-lg font-bold mb-2">Support 24/7</h4>
              <p className="text-gray-600">Assistance disponible à tout moment pendant votre séjour</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="text-lg font-bold mb-2">100% Sécurisé</h4>
              <p className="text-gray-600">Paiements cryptés et données personnelles protégées</p>
            </div>
            <div className="text-center p-6">
              <Globe className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h4 className="text-lg font-bold mb-2">Expert Local</h4>
              <p className="text-gray-600">Équipe marocaine experte qui connaît le pays</p>
            </div>
            <div className="text-center p-6">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h4 className="text-lg font-bold mb-2">Satisfaction Garantie</h4>
              <p className="text-gray-600">Remboursement si visa refusé (Pack Visa)</p>
            </div>            
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-green-600 via-green-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-lg font-bold mb-2">100% Sécurisé</h3>
              <p className="text-sm text-green-100">Paiements sécurisés et assistance 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-lg font-bold mb-2">Service Premium</h3>
              <p className="text-sm text-green-100">Accompagnement personnalisé de A à Z</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Heart className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-lg font-bold mb-2">Expérience Unique</h3>
              <p className="text-sm text-green-100">Découvrez le Maroc comme jamais</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CANMoroccoPackages;