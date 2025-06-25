
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Dubois",
      role: "Directrice Générale",
      description: "Diplômée en commerce international avec 8 ans d'expérience dans le secteur éducatif. Passionnée par l'innovation pédagogique et l'accompagnement des étudiants.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      email: "sarah.dubois@rezocampus.com",
      phone: "+33 1 23 45 67 89"
    },
    {
      id: 2,
      name: "Marc Thompson",
      role: "Responsable Partenariats",
      description: "Expert en développement commercial et relations institutionnelles. Il gère les partenariats avec nos écoles et universités partenaires depuis 5 ans.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      email: "marc.thompson@rezocampus.com",
      phone: "+33 1 23 45 67 90"
    },
    {
      id: 3,
      name: "Amina Benali",
      role: "Conseillère Orientation",
      description: "Psychologue de l'éducation spécialisée dans l'orientation scolaire et professionnelle. Elle accompagne les étudiants dans leurs choix de formation depuis 6 ans.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      email: "amina.benali@rezocampus.com",
      phone: "+33 1 23 45 67 91"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">À propos RézoCampus</h1>
            
            <div className="prose prose-lg">
              <p className="mb-4">
                RézoCampus est une plateforme dédiée à la gestion et à la présentation des établissements d'enseignement.
                Notre mission est de faciliter l'accès aux informations essentielles concernant les différentes 
                institutions éducatives, leurs programmes, et leurs modalités d'inscription.
              </p>
              
              <p className="mb-4">
                Que vous soyez un étudiant à la recherche de la formation idéale ou un administrateur souhaitant
                présenter votre établissement, notre plateforme offre une interface intuitive et complète pour répondre à vos besoins.
              </p>
              
              <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Notre vision</h2>
              
              <p className="mb-4">
                Nous croyons que l'éducation est la clé du développement personnel et professionnel. C'est pourquoi nous
                nous efforçons de créer un pont entre les institutions éducatives et les étudiants potentiels, en fournissant
                des informations claires, précises et à jour.
              </p>
              
              <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Nos services</h2>
              
              <ul className="list-disc pl-5 mb-4">
                <li className="mb-2">
                  <strong>Présentation des établissements</strong>: Description détaillée de chaque institution, avec informations pratiques et contacts.
                </li>
                <li className="mb-2">
                  <strong>Catalogue de programmes</strong>: Liste complète des formations disponibles dans chaque établissement.
                </li>
                <li className="mb-2">
                  <strong>Modalités d'inscription</strong>: Informations détaillées sur les procédures d'admission, conditions requises et dates limites.
                </li>
                <li className="mb-2">
                  <strong>Navigation intuitive</strong>: Interface conviviale permettant de passer facilement d'un établissement à l'autre.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Notre Équipe */}
        <section className="py-16 bg-gray-50 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Rencontrez les professionnels passionnés qui font de RézoCampus une plateforme d'excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                    <p className="text-secondary font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <p className="mt-8 text-gray-600 italic text-center">
              Pour toute question ou suggestion concernant notre plateforme, n'hésitez pas à nous contacter via notre page de contact.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
