import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, MapPin, Clock, Trophy, Users, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CAN2025 = () => {
  const villes = [
    {
      nom: 'Casablanca',
      stades: ['Grand Stade Hassan II', 'Stade Mohammed V'],
      capacite: '93 000 / 67 000'
    },
    {
      nom: 'Rabat',
      stades: ['Grand Stade de Rabat'],
      capacite: '68 000'
    },
    {
      nom: 'Marrakech',
      stades: ['Grand Stade de Marrakech'],
      capacite: '45 000'
    },
    {
      nom: 'Fès',
      stades: ['Complexe sportif de Fès'],
      capacite: '35 000'
    },
    {
      nom: 'Agadir',
      stades: ['Stade Adrar'],
      capacite: '45 000'
    },
    {
      nom: 'Tanger',
      stades: ['Stade Ibn Batouta'],
      capacite: '65 000'
    }
  ];

  const calendrierPhases = [
    {
      phase: 'Phase de groupes',
      dates: '21 - 30 décembre 2025',
      matchs: 36,
      description: 'Les 24 équipes réparties en 6 groupes de 4'
    },
    {
      phase: 'Huitièmes de finale',
      dates: '2 - 4 janvier 2026',
      matchs: 8,
      description: 'Les 16 équipes qualifiées'
    },
    {
      phase: 'Quarts de finale',
      dates: '7 - 8 janvier 2026',
      matchs: 4,
      description: 'Les 8 meilleures équipes'
    },
    {
      phase: 'Demi-finales',
      dates: '12 janvier 2026',
      matchs: 2,
      description: 'Les 4 dernières équipes'
    },
    {
      phase: 'Finale',
      dates: '18 janvier 2026',
      matchs: 1,
      description: 'Le match décisif au Grand Stade Hassan II'
    }
  ];

  const groupes = [
    {
      groupe: 'A',
      equipes: ['Maroc (Pays hôte)', 'Mali', 'Zambie', 'Comores']
    },
    {
      groupe: 'B',
      equipes: ['Egypte', 'Afrique du Sud', 'Angola', 'Zimbabwe']
    },
    {
      groupe: 'C',
      equipes: ['Nigeria', 'Tunisie', 'Ouganda', 'Tanzanie']
    },
    {
      groupe: 'D',
      equipes: ['Sénégal', 'RD Congo', 'Bénin', 'Botswana']
    },
    {
      groupe: 'E',
      equipes: ['Algérie', 'Burkina Faso', 'Guinée Équatoriale', 'Soudan']
    },
    {
      groupe: 'F',
      equipes: ['Côte d\'Ivoire', 'Cameroun', 'Gabon', 'Mozambique']
    }
  ];

  const infosGenerales = [
    {
      titre: 'Dates du tournoi',
      contenu: '21 décembre 2025 - 18 janvier 2026',
      icone: Calendar
    },
    {
      titre: 'Nombre d\'équipes',
      contenu: '24 équipes qualifiées',
      icone: Users
    },
    {
      titre: 'Nombre de matchs',
      contenu: '52 matchs au total',
      icone: Trophy
    },
    {
      titre: 'Villes hôtes',
      contenu: '6 villes - 9 stades',
      icone: MapPin
    }
  ];

  const handleDownloadCalendar = () => {
    // Création d'un calendrier au format ICS
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CAN2025//Calendrier//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:20251221T160000Z
DTEND:20251221T180000Z
SUMMARY:Match d'ouverture CAN 2025 - Maroc vs Mali
DESCRIPTION:Coup d'envoi de la CAN 2025 au Grand Stade Hassan II
LOCATION:Casablanca, Maroc
END:VEVENT
BEGIN:VEVENT
DTSTART:20260118T190000Z
DTEND:20260118T210000Z
SUMMARY:Finale CAN 2025
DESCRIPTION:Match final de la CAN 2025
LOCATION:Casablanca, Maroc
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendrier-can-2025.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-red-600 to-red-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              CAN 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Coupe d'Afrique des Nations - Maroc 🇲🇦
            </p>
            <p className="text-lg md:text-xl mb-8">
              21 décembre 2025 - 18 janvier 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownloadCalendar}
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 hover-scale"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger le calendrier
              </Button>
              <Link to="/guide-voyage">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 hover-scale"
                >
                  <Plane className="mr-2 h-5 w-5" />
                  Guide complet voyage CAN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Informations générales */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Informations générales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infosGenerales.map((info, index) => (
              <Card key={index} className="text-center hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <info.icone className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{info.titre}</h3>
                  <p className="text-muted-foreground">{info.contenu}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Villes et Stades */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Villes hôtes et Stades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villes.map((ville, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    {ville.nom}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {ville.stades.map((stade, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium">{stade}</span>
                        <Badge variant="secondary">{ville.capacite.split(' / ')[idx] || ville.capacite}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Calendrier des phases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Calendrier du tournoi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendrierPhases.map((phase, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    {phase.phase}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-2">{phase.dates}</p>
                  <p className="text-muted-foreground mb-2">{phase.description}</p>
                  <Badge>{phase.matchs} match{phase.matchs > 1 ? 's' : ''}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Groupes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Composition des groupes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupes.map((groupe, index) => (
              <Card key={index} className="hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="text-center">
                    Groupe {groupe.groupe}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupe.equipes.map((equipe, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className={equipe.includes('Maroc') ? 'font-bold text-primary' : ''}>
                          {equipe}
                        </span>
                        {equipe.includes('Maroc') && <Badge variant="default">Hôte</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Informations importantes */}
        <section className="mb-16">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Informations importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">📅 Jours de repos</h3>
                  <ul className="space-y-2">
                    <li>• 25 décembre 2025 (Noël)</li>
                    <li>• 1er janvier 2026 (Nouvel An)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🏆 Records</h3>
                  <ul className="space-y-2">
                    <li>• 35ème édition de la CAN</li>
                    <li>• 2ème fois au Maroc (après 1988)</li>
                    <li>• Plus grand stade : Hassan II (93 000 places)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🎫 Billetterie</h3>
                  <ul className="space-y-2">
                    <li>• Ouverture prévue fin 2025</li>
                    <li>• Tarifs préférentiels pour les résidents</li>
                    <li>• Packages disponibles pour les touristes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">🌟 Équipe favorite</h3>
                  <ul className="space-y-2">
                    <li>• Maroc : Avantage du terrain</li>
                    <li>• Côte d'Ivoire : Tenant du titre</li>
                    <li>• Sénégal, Egypte, Nigeria : Favoris</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to action */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">
              Préparez votre voyage pour la CAN 2025 !
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Découvrez notre guide complet avec tous les conseils pour voyager au Maroc
            </p>
            <Link to="/guide-voyage">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover-scale">
                <Plane className="mr-2 h-5 w-5" />
                Consulter le guide voyage
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CAN2025;