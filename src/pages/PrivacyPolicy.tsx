
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">Politique de confidentialité</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
                <p className="mb-4">
                  RézoCampus s'engage à protéger la confidentialité et la sécurité des données personnelles 
                  de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, 
                  utilisons, partageons et protégeons vos informations personnelles.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Informations collectées</h2>
                <h3 className="text-xl font-semibold mb-3">2.1 Informations fournies volontairement</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations académiques (niveau d'études, domaine d'intérêt)</li>
                  <li>Messages et commentaires</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">2.2 Informations collectées automatiquement</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et version</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Données de navigation et d'utilisation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Utilisation des données</h2>
                <p className="mb-4">Nous utilisons vos données personnelles pour :</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Fournir et améliorer nos services</li>
                  <li>Traiter vos demandes d'inscription</li>
                  <li>Vous envoyer des informations pertinentes sur les établissements</li>
                  <li>Personnaliser votre expérience utilisateur</li>
                  <li>Analyser l'utilisation de notre plateforme</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Partage des données</h2>
                <p className="mb-4">
                  Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations avec :
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Les établissements d'enseignement partenaires (avec votre consentement)</li>
                  <li>Nos prestataires de services techniques</li>
                  <li>Les autorités légales si requis par la loi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Sécurité des données</h2>
                <p className="mb-4">
                  Nous mettons en place des mesures de sécurité techniques et organisationnelles 
                  appropriées pour protéger vos données contre tout accès, modification, divulgation 
                  ou destruction non autorisés.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Vos droits</h2>
                <p className="mb-4">Vous disposez des droits suivants concernant vos données personnelles :</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Droit d'accès et de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d'opposition</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Cookies</h2>
                <p className="mb-4">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela 
                  pourrait affecter certaines fonctionnalités du site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Contact</h2>
                <p className="mb-4">
                  Pour toute question concernant cette politique de confidentialité ou pour exercer 
                  vos droits, contactez-nous à :
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p><strong>Email :</strong> campusrezo@gmail.com</p>
                  <p><strong>Téléphone :</strong> +212 617-725867</p>
                  <p><strong>Adresse :</strong> 444 Boulevard Grande Ceinture, 20350 Casablanca, Morocco</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
