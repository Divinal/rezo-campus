
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">Conditions d'utilisation</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptation des conditions</h2>
                <p className="mb-4">
                  En accédant et en utilisant la plateforme RézoCampus, vous acceptez d'être lié par 
                  ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez 
                  pas utiliser notre service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Description du service</h2>
                <p className="mb-4">
                  RézoCampus est une plateforme éducative qui facilite la recherche d'établissements 
                  d'enseignement et de formations. Nous fournissons des informations sur les écoles, 
                  leurs programmes, et facilitons les processus d'inscription.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Utilisation autorisée</h2>
                <h3 className="text-xl font-semibold mb-3">3.1 Vous pouvez :</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Consulter les informations sur les établissements</li>
                  <li>Soumettre des demandes d'inscription</li>
                  <li>Contacter les établissements via notre plateforme</li>
                  <li>Partager du contenu approprié</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.2 Vous ne pouvez pas :</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Utiliser le service à des fins illégales</li>
                  <li>Publier du contenu offensant ou inapproprié</li>
                  <li>Tenter de pirater ou d'endommager la plateforme</li>
                  <li>Copier ou redistribuer notre contenu sans autorisation</li>
                  <li>Créer de faux comptes ou usurper l'identité d'autrui</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Comptes utilisateurs</h2>
                <p className="mb-4">
                  Vous êtes responsable de maintenir la confidentialité de vos informations de compte 
                  et de toutes les activités qui se produisent sous votre compte. Vous devez nous 
                  notifier immédiatement de toute utilisation non autorisée de votre compte.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Contenu utilisateur</h2>
                <p className="mb-4">
                  En publiant du contenu sur notre plateforme, vous nous accordez une licence 
                  non-exclusive pour utiliser, reproduire et afficher ce contenu dans le cadre 
                  de nos services. Vous restez propriétaire de votre contenu.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Propriété intellectuelle</h2>
                <p className="mb-4">
                  Tout le contenu de RézoCampus, incluant mais non limité aux textes, graphiques, 
                  logos, et logiciels, est protégé par les droits d'auteur et autres lois sur la 
                  propriété intellectuelle.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Limitation de responsabilité</h2>
                <p className="mb-4">
                  RézoCampus ne peut être tenu responsable des dommages directs, indirects, 
                  accessoires ou consécutifs résultant de l'utilisation de notre service. 
                  Les informations fournies le sont "en l'état" sans garantie d'aucune sorte.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Modifications du service</h2>
                <p className="mb-4">
                  Nous nous réservons le droit de modifier, suspendre ou discontinuer tout ou 
                  partie de notre service à tout moment, avec ou sans préavis.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Résiliation</h2>
                <p className="mb-4">
                  Nous pouvons résilier ou suspendre votre accès à notre service immédiatement, 
                  sans préavis, pour violation de ces conditions d'utilisation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Droit applicable</h2>
                <p className="mb-4">
                  Ces conditions d'utilisation sont régies par le droit marocain. Tout litige 
                  sera soumis à la juridiction exclusive des tribunaux de Casablanca, Maroc.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Contact</h2>
                <p className="mb-4">
                  Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
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

export default TermsOfService;
