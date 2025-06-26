export interface School {
  id: string;
  name: string;
  description: string;
  logo: string;
  address: string;
  video?: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  registrationInfo: {
    [parcours: string]: {
      description: string;
      procedure: string[];
      fees: String;
      scholarships: boolean;
      contact: {
        phone: string;
        email: string;
      };
    };
  };
  programs: Program[];
}

export interface Program {
  name: string;
  description: string;
  category: string;
  parcours: string;
  niveau: string;
  cycle: string;
  duration: string;
  diploma: string;
  admissionRequirements: string[];
  objectives: string[];
  skillsDeveloped: string[];
  opportunities: string[];
}

export const categories = [  
  // "Arts",
  // "Banque-Assurance",
  "Audiovisuel",
  "Commerce",  
  "Communication",
  "Comptabilité",
  "Cyber-Sécurité",
  "Digital-Innovation",
  "Douane",
  // "Droit",
  "Data-IA",
  // "Economie",
  "Environnement-Energie",
  "Finances",
  // "Gestion-Comptable",  
  "Gestion-Entreprise",
  "Gestion-Financière",
  "Gestion-Informatisée",
  "Infographie",
  // "Informatique-Digital",
  "Informatique",
  // "Ingénierie",
  // "Langues",
  "Logistique",
  // "Management-Gestion",
  "Management-Informatique",
  "Marketing-Digital",
  "Marketing",
  "Multimédia",
  // "Réseaux-Télécommunications",
  "Ressources-Humaines",
  "Santé",  
  // "Sciences",
  "Sécurité-Informatique",
  "Transport-Logistique",
  "Formation-Continue"
];

export const niveau = [
  "Technicien Spécialisé",
  "Technicien",
  "Licence",
  "Bachelor",
  "Master",
  "Ingénierie",
  "Formation Continue",
  "Doctorat"
];

export const cycles = [
  "Cycle Initial",
  "Technicien",
  "Formation",
  "Licence",
  "Bachelor",
  "Master",
  "Ingénierie",
  "Doctorat",
  "Formation Continue"
];

export const schools: School[] = [
      {
        id: "Groupe-Miage",
        name: "Groupe Miage Etablissement Privé",
        description: "Un établissement d'excellence dédié à l'enseignement technologique avec des programmes innovants et des partenariats industriels.",
        logo: "Images/images.png", 
        address: "64, Rue Allal Ben Abdellah 20000 Casablanca",
        video: "https://youtu.be/AotfqzZf4oo",
        contact: {
          phone: "+212 522-279600",
          email: "miagecasa@groupemiage.net",
          website: "groupemiage.net"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes à partir du 1er juin jusqu'au 30 septembre. Les dossiers peuvent être soumis en ligne ou directement au bureau des admissions.",
            procedure: [
              "Formulaire de candidature en ligne dûment complété",
              "Baccalauréat original + copies certifiées conformes",
              "Relevés de notes du baccalauréat",
              "Copie de la carte d’identité ou passeport",
              "Curriculum vitæ (facultatif mais recommandé)",
              "Lettre de motivation précisant votre projet professionnel",
              "Frais de dossier",
              "Entretien de sélection avec le coordinateur pédagogique"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "+212 5 22 27 96 00",
              email: "miagecasa@groupemiage.net"
            }
          }
        },
        programs: [

          /* ─────────────── Technicien Specialisé (Bac + 2) ─────────────── */
          {
            name: "Développement Informatique",
            description: "Prépare des développeurs polyvalents capables de concevoir, coder et maintenir des applications web, mobiles et desktop en respectant les bonnes pratiques de qualité logicielle.",
            category: "Informatique",
            parcours: "Technicien Spécialisé Développement",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "Diplôme de Technicien Spécialisé en Développement Informatique",
            admissionRequirements: ["Baccalauréat scientifique ou technique", "Dossier de candidature", "Test logique & motivation", "Entretien"], objectives: ["Maîtriser les langages front-end et back-end", "Concevoir des bases de données", "Utiliser frameworks MVC & API REST", "Déployer et maintenir des applications"], skillsDeveloped: ["Programmation orientée objet", "Frameworks (Laravel, Spring, .NET)", "SQL / NoSQL", "Versioning (Git)", "Tests unitaires"], opportunities: ["Développeur full-stack", "Intégrateur web", "Testeur logiciel", "Assistant chef de projet IT"]
          },
          {
            name: "Systèmes & Réseaux Informatiques",
            description: "Forme des spécialistes capables de déployer, administrer et sécuriser des infrastructures réseau et des systèmes d’exploitation hétérogènes.",
            category: "Informatique",
            parcours: "Technicien Spécialisé Réseaux",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "Diplôme de Technicien Spécialisé en Systèmes & Réseaux",
            admissionRequirements: ["Baccalauréat scientifique/technique", "Dossier + entretien", "Test réseau de base"], objectives: ["Installer et configurer serveurs Windows/Linux", "Déployer des réseaux LAN/WAN sécurisés", "Gérer AD, DNS, DHCP", "Mettre en place sauvegarde & cybersécurité"], skillsDeveloped: ["TCP/IP & routage", "Virtualisation", "Firewall & VLAN", "Monitoring réseau", "Scripts d’automatisation"], opportunities: ["Administrateur systèmes", "Technicien réseau", "Support IT N2", "Assistant ingénieur sécurité"]
          },
          {
            name: "Finance & Comptabilité",
            description: "Prépare des professionnels capables de tenir la comptabilité, de réaliser l’analyse financière et d’appuyer la gestion budgétaire d’une PME ou d’un cabinet comptable.",
            category: "Gestion-Financière",
            parcours: "Technicien Spécialisé Finance-Comptabilité",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "Diplôme de Technicien Spécialisé en Finance & Comptabilité",
            admissionRequirements: ["Bac économique ou scientifique", "Dossier scolaire", "Test de math financières", "Entretien"], objectives: ["Tenir la comptabilité générale et analytique", "Établir bilans et comptes de résultat", "Réaliser déclarations fiscales", "Assister contrôle de gestion"], skillsDeveloped: ["Plan comptable marocain & IFRS", "ERP (Sage…)", "Analyse financière", "Gestion de trésorerie", "Paie"], opportunities: ["Comptable", "Assistant financier", "Gestionnaire de paie", "Aide-contrôleur de gestion"]
          },

          /* ─────────────── Technicien (Bac + 2) ─────────────── */

          // {
          //   name: "Infographiste",
          //   description: "Apprend à créer des supports visuels print et web, à maîtriser la chaîne graphique et à produire des contenus multimédias attractifs.",
          //   category: "Arts & Multimédia",
          //   parcours: "Technicien Infographiste",
          //   niveau: "Technicien",
          //   cycle: "Technicien",
          //   duration: "2 ans",
          //   diploma: "Diplôme de Technicien Infographiste",
          //   admissionRequirements: ["Baccalauréat toutes séries", "Portfolio ou test de dessin", "Entretien"], objectives: ["Maîtriser Photoshop, Illustrator, InDesign", "Réaliser mises en page print & web", "Gérer colorimétrie et impression", "Produire animations simples"], skillsDeveloped: ["Design graphique", "Typographie", "Retouche photo", "Maquettes UI", "Pré-presse"], opportunities: ["Graphiste", "Maquettiste PAO", "Webdesigner junior", "Assistant créatif"]
          // },
          {
            name: "Gestion Informatisée",
            description: "Combine informatique de gestion, bureautique avancée et bases de données pour automatiser les processus administratifs d’une entreprise.",
            category: "Gestion-Informatisée",
            parcours: "Technicien Gestion Informatisée",
            niveau: "Technicien",
            cycle: "Technicien",
            duration: "2 ans",
            diploma: "Diplôme de Technicien en Gestion Informatisée",
            admissionRequirements: ["Bac sciences économiques ou techniques", "Dossier + entretien"], objectives: ["Concevoir applications de gestion simples", "Administrer bases de données PME", "Automatiser tableaux de bord Excel", "Assurer support bureautique"], skillsDeveloped: ["Modélisation de données", "VBA/SQL de base", "ERP PME", "Dashboards avancés", "Support utilisateur"], opportunities: ["Technicien bureautique", "Assistant ERP", "Gestionnaire BD", "Support administratif IT"]
          },

      /* ─────────────── Bachelors Européens (Licence Professionnelle) ─────────────── */

          {
            name: "Transport & Logistique",
            description: "Couvre la planification des flux, la gestion d’entrepôt, le transport multimodal et la logistique durable afin d’optimiser la chaîne d’approvisionnement.",
            category: "Logistique",
            parcours: "Transport et Logistique",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Transport & Logistique",
            admissionRequirements: ["Baccalauréat (toutes séries)", "Dossier académique", "Entretien de motivation"],
            objectives: ["Maîtriser les opérations de transport multimodal", "Gérer les stocks et les entrepôts", "Piloter la chaîne logistique à l’international", "Intégrer les pratiques de logistique verte"],
            skillsDeveloped: ["Gestion des flux", "Incoterms & douanes", "Outils WMS/TMS", "Planification & APS", "Lean logistics"],
            opportunities: ["Coordinateur logistique", "Agent d’exploitation transport", "Gestionnaire d’entrepôt", "Acheteur transport"]
          },
          {
            name: "Management & Gestion des PME",
            description: "Forme des cadres intermédiaires capables de gérer les fonctions clés (finance, marketing, RH) et d’accompagner la croissance des petites et moyennes entreprises.",
            category: "Gestion-Entreprise",
            parcours: "Management PME",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Management & Gestion des PME",
            admissionRequirements: ["Baccalauréat économique ou scientifique", "Dossier + entretien"],
            objectives: ["Piloter la performance financière d’une PME", "Développer la stratégie marketing", "Superviser la gestion RH", "Assurer la conformité juridique"],
            skillsDeveloped: ["Tableaux de bord", "Marketing opérationnel", "Comptabilité PME", "RH de proximité", "Gestion de projet"],
            opportunities: ["Assistant manager", "Adjoint de direction", "Chef de projet PME", "Responsable administratif"]
          },
          {
            name: "Assistant de Gestion Ressources Humaines",
            description: "Prépare à la gestion administrative du personnel, au recrutement et à la formation dans des environnements digitaux et en mutation.",
            category: "Ressources-Humaines",
            parcours: "Gestion RH",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Assistant de Gestion RH",
            admissionRequirements: ["Baccalauréat", "Dossier", "Entretien"],
            objectives: ["Administrer les dossiers du personnel", "Participer au recrutement", "Mettre en œuvre la formation", "Gérer la paie et la veille sociale"],
            skillsDeveloped: ["SIRH", "Techniques d’entretien", "Droit du travail", "Gestion de la paie", "Communication interne"],
            opportunities: ["Assistant RH", "Gestionnaire de paie", "Chargé de formation junior", "Assistant recrutement"]
          },
          {
            name: "Finance",
            description: "Spécialise en comptabilité financière, analyse de performance et gestion de trésorerie pour accompagner la prise de décision des organisations.",
            category: "Finances",
            parcours: "Finance d’Entreprise",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Finance",
            admissionRequirements: ["Bac ES, S ou équivalent", "Test quantitatif", "Entretien"],
            objectives: ["Établir et analyser les états financiers", "Gérer la trésorerie", "Contrôler les coûts", "Participer aux décisions d’investissement"],
            skillsDeveloped: ["Comptabilité générale & analytique", "Analyse financière", "Budget & prévisions", "Fiscalité de base", "ERP finance"],
            opportunities: ["Assistant financier", "Analyste crédit", "Comptable", "Contrôleur de gestion junior"]
          },
          {
            name: "Informatique Réseau & Sécurité",
            description: "Donne les bases solides pour installer, administrer et sécuriser des réseaux et des systèmes, répondant aux besoins des entreprises connectées.",
            category: "Sécurité-Informatique",
            parcours: "Réseau & Sécurité",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Informatique Réseau & Sécurité",
            admissionRequirements: ["Bac scientifique/technique", "Dossier + test technique"],
            objectives: ["Installer des infrastructures réseau", "Configurer services TCP/IP", "Mettre en place des politiques de sécurité", "Superviser la disponibilité des systèmes"],
            skillsDeveloped: ["Cisco/HP switching", "Linux & Windows Server", "Pare-feu & VPN", "Scripts Bash/PowerShell", "Supervision Nagios/Zabbix"],
            opportunities: ["Administrateur réseau junior", "Technicien sécurité", "Support système", "Opérateur NOC"]
          },
          {
            name: "Marketing Digital",
            description: "Couvre les leviers web (SEO, SEA, social media, email) pour concevoir et piloter des campagnes marketing performantes orientées ROI.",
            category: "Marketing-Digital",
            parcours: "Marketing Digital",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Marketing Digital",
            admissionRequirements: ["Bac toutes séries", "Dossier + entretien", "Portfolio digital (souhaité)"],
            objectives: ["Élaborer une stratégie digitale", "Gérer la présence social media", "Optimiser le référencement SEO/SEA", "Mesurer la performance via analytics"],
            skillsDeveloped: ["Google Analytics/GA4", "SEO on-page/off-page", "Facebook Ads/Google Ads", "Content marketing", "Automatisation marketing"],
            opportunities: ["Community manager", "Chargé e-marketing", "Traffic manager", "Assistant SEO/SEA"]
          },
          {
            name: "Marketing",
            description: "Initie aux études de marché, au mix-marketing et au développement produit pour répondre aux attentes d’un marché concurrentiel.",
            category: "Marketing",
            parcours: "Marketing Opérationnel",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Marketing",
            admissionRequirements: ["Bac ES, STMG ou équivalent", "Dossier + entretien"],
            objectives: ["Réaliser des études de marché", "Concevoir une stratégie produit", "Définir la politique prix", "Mettre en place la communication"],
            skillsDeveloped: ["Analyse de données marketing", "Techniques de vente", "Branding", "Plan d’action commerciale", "CRM"],
            opportunities: ["Assistant chef de produit", "Chargé d’études", "Responsable merchandising junior", "Assistant communication"]
          },
          {
            name: "Informatique & Réseau – Option B Administration Système & Réseau",
            description: "Approfondit l’administration des serveurs, la virtualisation et la sécurité pour assurer la haute disponibilité des infrastructures.",
            category: "Sécurité-Informatique",
            parcours: "Administration Système & Réseau",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen ASR",
            admissionRequirements: ["Bac scientifique/technique", "Dossier + test réseau/système"],
            objectives: ["Déployer services réseau avancés", "Administrer serveurs Linux/Windows", "Mettre en place solutions de virtualisation", "Gérer backups & disaster recovery"],
            skillsDeveloped: ["VMware/Proxmox", "Active Directory", "Shell scripting", "Sécurité réseau", "Surveillance & alerting"],
            opportunities: ["Administrateur système", "Administrateur réseau", "Technicien support N2/N3", "Ingénieur infrastructure junior"]
          },
          {
            name: "Informatique & Réseau – Option A Développement de Bases de Données",
            description: "Spécialise en conception, optimisation et administration de bases de données relationnelles et NoSQL au service des applications.",
            category: "Informatique",
            parcours: "Développement Bases de Données",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen BDD",
            admissionRequirements: ["Bac scientifique/technique", "Dossier + test SQL", "Entretien"],
            objectives: ["Modéliser des schémas de données", "Créer et optimiser requêtes SQL", "Mettre en œuvre procédures stockées", "Assurer la sécurité et la sauvegarde"],
            skillsDeveloped: ["UML & Merise", "SQL Server / MySQL / PostgreSQL", "Indexation & tuning", "NoSQL (MongoDB)", "ETL & reporting"],
            opportunities: ["Développeur SQL", "Administrateur BDD junior", "Data analyst junior", "Support BI"]
          },
          {
            name: "Développement Web",
            description: "Forme des développeurs capables de réaliser des sites et applications web responsive, performantes et sécurisées.",
            category: "Informatique",
            parcours: "Développement Web",
            niveau: "Licence",
            cycle: "Bachelor européen",
            duration: "3 ans",
            diploma: "Bachelor Européen Développement Web",
            admissionRequirements: ["Bac scientifique/technique ou équivalent", "Dossier + test de code", "Entretien"],
            objectives: ["Coder en HTML, CSS, JavaScript", "Utiliser frameworks front-end et back-end", "Concevoir APIs REST", "Assurer accessibilité et sécurité"],
            skillsDeveloped: ["HTML5/CSS3", "JavaScript (React/Vue)", "Node.js / PHP / Python", "Git & CI-CD", "Tests unitaires"],
            opportunities: ["Développeur front-end", "Développeur back-end", "Intégrateur web", "Webmaster technique"]
          },

      /* ─────────────── Masters Européens (Master Professionnelle) ─────────────── */

          {
        name: "Manager de Projet Informatique",
        description: "Formation de haut niveau pour piloter des projets IT complexes : cadrage des besoins, planification, gestion d’équipes techniques et déploiement de solutions numériques.",
        category: "Management-Informatique",
        parcours: "Management de Projet IT",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Manager de Projet Informatique",
        admissionRequirements: ["Licence ou équivalent en informatique ou gestion", "Dossier académique", "Entretien de motivation", "Niveau B2 en anglais recommandé"],
        objectives: ["Maîtriser les méthodologies Agile/Scrum et Waterfall", "Planifier, suivre et livrer des projets IT", "Gérer les risques et les budgets", "Animer et coordonner des équipes pluridisciplinaires"],
        skillsDeveloped: ["Gestion de projet (Gantt, PERT, Kanban)", "Leadership & communication", "Pilotage budgétaire", "Outils DevOps / CI-CD", "Management de la qualité logicielle"],
        opportunities: ["Chef de projet informatique", "Product owner", "Consultant PMO", "Scrum master", "IT program manager"]
      },
      {
        name: "Expert IT Cybersécurité",
        description: "Programme spécialisé pour prévenir, détecter et contrer les menaces numériques : audit de sécurité, cryptographie, réponse à incident et conformité réglementaire.",
        category: "Cyber-Sécurité",
        parcours: "Expertise Cybersécurité",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Expert IT Cybersécurité",
        admissionRequirements: ["Licence en informatique, réseaux ou équivalent", "Connaissances réseaux/OS", "Dossier + entretien", "Test technique de sécurité"],
        objectives: ["Élaborer une politique de sécurité", "Mettre en œuvre des architectures sécurisées", "Superviser les SIEM et SOC", "Réagir aux incidents et réaliser des forensics"],
        skillsDeveloped: ["Pentest & ethical hacking", "Gestion des vulnérabilités", "Cryptographie avancée", "Normes ISO 27001 / RGPD", "Analyse forensique & réponse à incident"],
        opportunities: ["Ingénieur sécurité", "Analyste SOC", "Consultant cybersécurité", "Architecte sécurité", "CISO"]
      },
      {
        name: "Expert IT Applications Intelligence Artificielle & Big Data",
        description: "Formation pointue sur la data science, le machine learning et les architectures Big Data pour concevoir des solutions basées sur l’IA et exploiter des volumes massifs de données.",
        category: "Data-IA",
        parcours: "Big Data & IA",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Expert IA & Big Data",
        admissionRequirements: ["Licence en informatique, mathématiques ou statistique", "Compétences Python/SQL", "Dossier + entretien + test de logique", "Projet data apprécié"],
        objectives: ["Concevoir des pipelines Big Data", "Développer et déployer des modèles IA", "Optimiser le stockage et la gouvernance des données", "Traduire les analyses en recommandations business"],
        skillsDeveloped: ["Machine learning", "Deep learning", "Écosystème Hadoop/Spark", "Data engineering & ETL", "Visualisation avancée"],
        opportunities: ["Data scientist", "Ingénieur ML", "Architecte Big Data", "Consultant IA", "Chief Data Officer"]
      },
      {
        name: "Management Environnemental & Énergie",
        description: "Prépare des cadres capables de concilier performance économique et développement durable : audits environnementaux, transition énergétique, normes ISO 14001 et stratégie RSE.",
        category: "Environnement-Energie",
        parcours: "Management Durable",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Management Environnemental & Énergétique",
        admissionRequirements: ["Licence scientifique ou ingénierie", "Dossier + projet professionnel", "Entretien de motivation", "Niveau B2 en anglais"],
        objectives: ["Élaborer une stratégie environnementale", "Gérer l’efficacité énergétique", "Mettre en place des systèmes de management ISO 14001", "Conduire des projets d’économie circulaire"],
        skillsDeveloped: ["Bilan carbone & ACV", "Gestion des déchets", "Énergies renouvelables", "Veille réglementaire", "Reporting développement durable"],
        opportunities: ["Consultant RSE", "Energy manager", "Responsable HSE", "Chef de projet environnement", "Auditeur ISO 14001"]
      },
      {
        name: "Management et Stratégie d'Entreprise",
        description: "Forme des dirigeants capables de définir et piloter la stratégie globale d’une organisation, d’analyser les marchés et de conduire le changement.",
        category: "Gestion-Entreprise",
        parcours: "Management Global",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Management & Stratégie d’Entreprise",
        admissionRequirements: ["Licence en gestion, économie ou équivalent", "Dossier + entretien", "Test de management"],
        objectives: ["Diagnostiquer l’environnement concurrentiel", "Définir des plans stratégiques", "Piloter la performance et le changement", "Manager des équipes pluridisciplinaires"],
        skillsDeveloped: ["Analyse stratégique", "Contrôle de gestion avancé", "Leadership & négociation", "Gestion du changement", "Intelligence économique"],
        opportunities: ["Consultant en stratégie", "Directeur de business unit", "Chef d’entreprise", "PMO", "Analyste organisation"]
      },
      {
        name: "Communication & Marketing Numérique",
        description: "Couvre le branding, la publicité digitale, les médias sociaux et l’analyse de données pour élaborer des campagnes 360° performantes.",
        category: "Communication",
        parcours: "Digital Communication",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Communication & Marketing Numérique",
        admissionRequirements: ["Licence communication, marketing ou équivalent", "Portfolio ou projet digital", "Dossier + entretien"],
        objectives: ["Définir une stratégie de communication digitale", "Gérer la présence multicanale d’une marque", "Mesurer l’efficacité des campagnes", "Optimiser l’engagement et la conversion"],
        skillsDeveloped: ["SEO/SEA & content marketing", "Social media management", "Data analytics & KPI", "Brand storytelling", "Gestion de budget publicitaire"],
        opportunities: ["Responsable com’ digitale", "Chef de produit digital", "Media planner", "Community manager senior", "Consultant e-marketing"]
      },
      {
        name: "Management et Stratégie Financière",
        description: "Prépare des experts à la décision financière stratégique, à la gestion des risques, au contrôle interne et aux fusions-acquisitions.",
        category: "Finances",
        parcours: "Finance Stratégique",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Management & Stratégie Financière",
        admissionRequirements: ["Licence finance, économie ou gestion", "Test quantitatif", "Dossier académique solide", "Entretien"],
        objectives: ["Élaborer des politiques financières", "Optimiser la structure de capital", "Piloter la gestion des risques", "Superviser les opérations M&A"],
        skillsDeveloped: ["Analyse financière avancée", "Évaluation d’entreprise", "Gestion de trésorerie", "Risk management", "Contrôle interne & audit"],
        opportunities: ["Directeur financier", "Analyste M&A", "Contrôleur de gestion senior", "Consultant stratégie financière", "Risk manager"]
      },
      {
        name: "Management des Ressources Humaines",
        description: "Développe les compétences pour attirer, fidéliser et développer les talents, gérer la relation sociale et accompagner la transformation des organisations.",
        category: "Ressources-Humaines",
        parcours: "RH Stratégique",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Management des Ressources Humaines",
        admissionRequirements: ["Licence RH, psychologie ou gestion", "Dossier + entretien", "Test de personnalité / mise en situation"],
        objectives: ["Définir la politique RH", "Conduire le dialogue social", "Mettre en œuvre la gestion des talents", "Piloter la transformation organisationnelle"],
        skillsDeveloped: ["Talent management", "Compensation & benefits", "Droit du travail", "Change management", "Analytics RH"],
        opportunities: ["Responsable RH", "Talent acquisition manager", "Consultant RH", "HR business partner", "Responsable formation"]
      },
      {
        name: "Logistique et Supply Chain",
        description: "Forme des experts capables d’optimiser les flux physiques et d’information, d’intégrer les technologies 4.0 et de piloter des réseaux logistiques internationaux.",
        category: "Logistique",
        parcours: "Supply Chain Management",
        niveau: "Master",
        cycle: "Master",
        duration: "5 ans",
        diploma: "Master Européen Logistique & Supply Chain",
        admissionRequirements: ["Licence logistique, ingénierie ou gestion", "Connaissances de base en statistiques", "Dossier + entretien"],
        objectives: ["Concevoir des chaînes logistiques efficaces", "Mettre en place des systèmes ERP et WMS", "Maîtriser la gestion des stocks et la prévision", "Intégrer la logistique durable"],
        skillsDeveloped: ["Planification avancée (APS)", "Lean & Six Sigma", "ERP (SAP, Oracle)", "Transport multimodal", "Analyse des données supply chain"],
        opportunities: ["Supply chain manager", "Consultant logistique", "Responsable entrepôt", "Acheteur international", "Directeur opérations"]
      }
        ]
      },
      {
        id: "Comsup",
        name: "Com'Sup, Ecole Supérieure De Communication Et De Publicité",
        description: "Depuis plus de 20 ans, Com’Sup accompagne le secteur de la communication au Maroc, en proposant des formations spécialisées adaptées à ses évolutions. En tant que pionnier dans ce domaine, Com’Sup a formé plus de 1000 managers de la communication.",
        logo: "Images/comsup.png", 
        address: " 15 Rue Abderrahmane Abi Laïla, Casablanca, MAROC",
        video: "https://youtu.be/-TwjJbHVTnM?si=aCqfr-NSZjWu_MVT",
        contact: {
          phone: "+(212) 05 22 47 30 67 – 06 18 06 09 37",
          email: "comsup@comsup.ma",
          website: "comsup.ma"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "05 22 47 30 67 – 06 18 06 09 37",
              email: "comsup@comsup.ma"
            }
          }
        },
        programs:[
         {
  name: "Evènementiel",
  description: "Prépare à l'organisation professionnelle d'évènements, de la conception à la logistique, en passant par la communication et le suivi budgétaire.",
  category: "Communication & Evènementiel",
  parcours: "Gestion d'Événements",
  niveau: "Licence",
  cycle: "Bac+3",
  duration: "3 ans",
  diploma: "Bachelor Evènementiel",
  admissionRequirements: ["Baccalauréat toutes séries", "Dossier de candidature", "Entretien de motivation"],
  objectives: ["Concevoir et organiser des événements", "Gérer la logistique et les prestataires", "Piloter le budget et les délais", "Assurer la promotion d’un événement"],
  skillsDeveloped: ["Gestion de projet", "Relations publiques", "Communication événementielle", "Planification logistique", "Budget et coordination"],
  opportunities: ["Chargé de projet événementiel", "Coordinateur événementiel", "Responsable communication", "Chef de projet en agence événementielle"]
},
{
  name: "Communication des Organisations",
  description: "Développe des compétences pour gérer la communication interne et externe d'une entreprise ou d'une institution.",
  category: "Communication",
  parcours: "Communication des Organisations",
  niveau: "Licence",
  cycle: "Bac+3",
  duration: "3 ans",
  diploma: "Bachelor Communication des Organisations",
  admissionRequirements: ["Baccalauréat toutes séries", "Dossier + entretien"],
  objectives: ["Élaborer une stratégie de communication", "Assurer la cohérence du discours d’entreprise", "Maîtriser les outils et canaux de communication", "Gérer la communication en situation de crise"],
  skillsDeveloped: ["Rédaction professionnelle", "Relations presse", "Communication institutionnelle", "Outils numériques", "Communication de crise"],
  opportunities: ["Chargé de communication", "Attaché de presse", "Chargé de relations publiques", "Responsable communication interne"]
},
{
  name: "Communication des Organisations",
  description: "Approfondissement des stratégies de communication institutionnelle et de l'influence dans les grandes organisations.",
  category: "Communication",
  parcours: "Communication des Organisations",
  niveau: "Master",
  cycle: "Bac+5",
  duration: "2 ans",
  diploma: "Master Communication des Organisations",
  admissionRequirements: ["Licence en communication ou domaine connexe", "Entretien de motivation", "Dossier académique"],
  objectives: ["Développer une stratégie globale de communication", "Superviser la production de contenus stratégiques", "Piloter des campagnes multicanal", "Gérer la réputation d'une organisation"],
  skillsDeveloped: ["Stratégie de communication", "Veille médiatique", "Brand content", "Communication politique", "Leadership communicationnel"],
  opportunities: ["Directeur communication", "Consultant communication", "Responsable RP", "Chargé de mission communication institutionnelle"]
},
{
  name: "Communication, Médias et Journalisme",
  description: "Formation avancée pour maîtriser les codes du journalisme et les médias numériques dans une approche stratégique et éthique.",
  category: "Médias & Journalisme",
  parcours: "Communication et Médias",
  niveau: "Master",
  cycle: "Bac+5",
  duration: "2 ans",
  diploma: "Master Communication, Médias et Journalisme",
  admissionRequirements: ["Licence en communication, journalisme ou équivalent", "Entretien + épreuve rédactionnelle"],
  objectives: ["Réaliser des contenus médiatiques professionnels", "Analyser les enjeux éthiques de l’information", "Gérer des médias digitaux", "Élaborer une ligne éditoriale"],
  skillsDeveloped: ["Journalisme digital", "Écriture web", "Veille média", "Podcasting", "Gestion de médias sociaux"],
  opportunities: ["Journaliste", "Rédacteur en chef", "Content manager", "Responsable média", "Consultant communication médias"]
}

        ]
      },
      {
    id: "Best-Institut",
    name: "Best Institut ECOLE DE FORMATION PROFESSIONELLE PRIVÉE",
    description: "BEST INSTITUT porte une attention particulière sur l’avenir de ses étudiants, et leurs responsabilités. C’est pourquoi, nous mettons tout en œuvre pour donner à chacun un métier, mais aussi une vraie capacité d’intégration professionnelle en lui assurant une meilleure opportunité de recrutement en entreprise.",
    logo: "Images/Best.png", 
    address: "95 Bd Mohammed V, Casablanca 20250",
    video: "https://youtu.be/hwcRRzL39dQ",
    contact: {
      phone: "+212 5 22 54 15 47",
      email: "Contact@bestinstitut.com",
      website: "bestinstitut.com"
    },
    registrationInfo: {
      "Tous les parcours": {
        description: "Les inscriptions sont ouvertes toute l'année, mais il est conseillé de s'inscrire avant le début des sessions pour garantir une place. Les dossiers peuvent être soumis en ligne ou directement au bureau des admissions.",
        procedure: ["Remplir le formulaire de candidature en ligne", "Soumettre les copies certifiées conformes des diplômes", "Fournir une pièce d'identité", "Payer les frais d'inscription" ],
        fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
        scholarships: false,
        contact: {
          phone: "+212 5 22 44 88 00",
          email: "contact@best-institut.ma"
        }
      }
    },
    programs: [
     /* ─────────────  TECHNICIENS  ───────────── */

  {
    name: "Technicien Gestion Informatisée",
    description: "Initie à l’administration de bases de données, aux ERP et à la bureautique avancée pour gérer les informations de l’entreprise.",
    category: "Gestion-Informatisée",
    parcours: "Technicien Gestion Informatisée",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien en Gestion Informatisée",
    admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Dossier + entretien"],
    objectives: ["Créer bases de données Access/SQL", "Automatiser reporting Excel/Power Query", "Assurer support utilisateurs", "Paramétrer modules ERP"],
    skillsDeveloped: ["SQL basique", "Suite Office avancée", "ERP (Odoo/SAGE)", "Gestion documentaire", "Support help-desk"],
    opportunities: ["Assistant ERP", "Technicien support", "Gestionnaire base de données", "Opérateur saisie"]
  },
  {
    name: "Technicien en Infographie",
    description: "Forme à la création de supports visuels (print & digital), au pré-presse et à la retouche photo pour la communication graphique.",
    category: "Infographie",
    parcours: "Infographie",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien Infographiste",
    admissionRequirements: ["Attestation de scolarité terminale", "Portfolio créatif", "Dossier + entretien"],
    objectives: ["Concevoir affiches et brochures", "Maîtriser chaîne graphique", "Préparer fichiers pour impression", "Adapter visuels aux réseaux sociaux"],
    skillsDeveloped: ["Adobe Photoshop", "Illustrator", "InDesign", "Colorimétrie", "PAO"],
    opportunities: ["Infographiste", "Opérateur PAO", "Assistant studio créa", "Designer visuel junior"]
  },
  {
    name: "Technicien Action Commerciale & Marketing",
    description: "Prépare des commerciaux capables de prospecter, négocier et promouvoir des offres grâce aux techniques de vente et outils CRM.",
    category: "Marketing",
    parcours: "Action Commerciale",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien Action Commerciale & Marketing",
    admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Dossier + entretien"],
    objectives: ["Identifier prospects", "Conduire argumentaire de vente", "Gérer portefeuille clients", "Renseigner données CRM"],
    skillsDeveloped: ["Techniques de vente", "CRM (HubSpot)", "Prospection téléphonique", "Négociation", "Reporting ventes"],
    opportunities: ["Commercial terrain", "Télé-conseiller", "Assistant marketing", "Chargé clientèle"]
  },

  /* ─────────────  TECHNICIENS SPÉCIALISÉS  ───────────── */

  {
    name: "Technicien Spécialisé Finance & Comptabilité",
    description: "Développe les compétences pour gérer la comptabilité générale, établir les états financiers et réaliser l’analyse budgétaire.",
    category: "Gestion-Financière",
    parcours: "Finance & Comptabilité",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Finance & Comptabilité",
    admissionRequirements: ["Baccalauréat (toutes séries)", "Relevés de notes Bac", "Dossier + entretien"],
    objectives: ["Tenir comptabilité journalière", "Établir bilans & liasses fiscales", "Analyser coûts & marges", "Utiliser logiciels comptables"],
    skillsDeveloped: ["SAGE Comptabilité", "Fiscalité", "Analyse financière", "Tableaux de bord", "Paie"],
    opportunities: ["Comptable", "Assistant financier", "Gestionnaire paie", "Technicien audit"]
  },
  {
    name: "Technicien Spécialisé Commerce International",
    description: "Forme à la gestion des opérations import-export, négociation internationale et logistique douanière.",
    category: "Commerce",
    parcours: "Commerce International",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Commerce International",
    admissionRequirements: ["Baccalauréat", "Relevés Bac", "Dossier + entretien"],
    objectives: ["Préparer documents douaniers", "Négocier contrats d’achat/vente", "Maîtriser Incoterms", "Suivre acheminement des marchandises"],
    skillsDeveloped: ["Tarif douanier", "Incoterms 2020", "Anglais affaires", "Gestion transit", "Commerce digital B2B"],
    opportunities: ["Agent export", "Assistant achat international", "Déclarant transit", "Commercial import-export"]
  },
  {
    name: "Technicien Spécialisé Développement Multimédia",
    description: "Apprend à concevoir sites web interactifs, animations et contenus digitaux via les langages front-end et outils de motion design.",
    category: "Multimédia",
    parcours: "Développement Multimédia",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Développement Multimédia",
    admissionRequirements: ["Baccalauréat", "Test logique/HTML-CSS", "Dossier + entretien"],
    objectives: ["Développer front-end responsive", "Intégrer animations CSS/GSAP", "Optimiser UX/UI", "Gérer CMS WordPress"],
    skillsDeveloped: ["HTML/CSS/JS", "React basics", "Figma", "After Effects", "SEO technique"],
    opportunities: ["Développeur web junior", "Intégrateur front-end", "Webdesigner", "Animateur digital"]
  },

  /* ─────────────  BACHELOR (LICENCE PRO)  ───────────── */

  {
    name: "Bachelor Gestion & Management de la Distribution",
    description: "Prépare à la gestion d’unités commerciales (GMS/retail) : merchandising, supply-chain et management d’équipe.",
    category: "Commerce",
    parcours: "Retail Management",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Retail Management",
    admissionRequirements: ["Baccalauréat pour 3 ans ou Bac +2 commerce pour entrée directe", "Dossier + entretien"],
    objectives: ["Optimiser linéaires & merchandising", "Gérer stocks magasin", "Analyser KPI retail", "Animer équipe de vente"],
    skillsDeveloped: ["Merchandising", "Gestion point de vente", "Tableaux de bord retail", "Lean store", "Leadership"],
    opportunities: ["Chef de rayon", "Manager de magasin", "Responsable approvisionnement", "Category manager"]
  },
  {
    name: "Bachelor Management & Gestion des PME",
    description: "Donne les outils pour piloter la stratégie, la finance et les RH d’une petite ou moyenne entreprise.",
    category: "Gestion-Entreprise",
    parcours: "Management PME",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Management PME",
    admissionRequirements: ["Baccalauréat ou Bac +2 gestion", "Dossier + entretien"],
    objectives: ["Élaborer business-plan", "Gérer trésorerie", "Superviser obligations légales", "Manager équipes"],
    skillsDeveloped: ["Comptabilité PME", "Tableaux de bord", "Droit des affaires", "GRH", "Outils collaboratifs"],
    opportunities: ["Assistant manager", "Chef de projet PME", "Responsable administratif", "Adjoint de direction"]
  },
  {
    name: "Bachelor Webmaster",
    description: "Forme à la création, la maintenance et l’optimisation de sites web, incluant HTML/CSS, CMS et web-analytics.",
    category: "Informatique",
    parcours: "Webmaster",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Webmaster",
    admissionRequirements: ["Baccalauréat ou Bac +2 informatique", "Dossier + test web", "Entretien"],
    objectives: ["Intégrer maquettes web", "Administrer CMS", "Optimiser performance & SEO", "Mettre en place tracking analytics"],
    skillsDeveloped: ["HTML/CSS/JS", "WordPress/Drupal", "SEO on-page", "Google Analytics", "Git"],
    opportunities: ["Webmaster", "Intégrateur web", "Administrateur CMS", "Consultant SEO junior"]
  },
  {
    name: "Bachelor Informatique & Réseaux",
    description: "Couvre réseaux, systèmes et développement pour administrer infrastructures IT et assurer la cybersécurité.",
    category: "Sécurité-Informatique",
    parcours: "IT Networks",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Informatique & Réseaux",
    admissionRequirements: ["Baccalauréat scientifique/technique ou Bac +2 IT", "Test technique réseau", "Entretien"],
    objectives: ["Installer équipements Cisco/HP", "Mettre en place VLAN/VPN", "Détecter intrusions", "Superviser SI"],
    skillsDeveloped: ["Switching & routing", "Linux server", "Firewalling", "Scripting Bash/Python", "Monitoring"],
    opportunities: ["Admin réseau junior", "Technicien sécurité", "Support NOC", "Opérateur SOC niveau 1"]
  },
  {
    name: "Bachelor Marketing",
    description: "Explore le marketing stratégique et opérationnel, l’étude de marché et la communication digitale.",
    category: "Marketing",
    parcours: "Marketing",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Marketing",
    admissionRequirements: ["Baccalauréat ou Bac +2 commerce/marketing", "Dossier + entretien"],
    objectives: ["Réaliser études de marché", "Élaborer mix-marketing", "Piloter campagnes 360°", "Mesurer ROI"],
    skillsDeveloped: ["Études quantitatives", "Plan marketing", "CRM", "SEO/SEA basics", "Data-visualisation"],
    opportunities: ["Assistant marketing", "Chef de produit junior", "Chargé communication", "Traffic manager"]
  },
  {
    name: "Bachelor Transport & Logistique",
    description: "Prépare à l’organisation des flux, la réglementation internationale et l’optimisation des coûts logistiques.",
    category: "Logistique",
    parcours: "Transport & Logistique",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Transport & Logistique",
    admissionRequirements: ["Baccalauréat ou Bac +2 logistique", "Dossier + entretien"],
    objectives: ["Planifier transport multimodal", "Optimiser stockage", "Gérer incoterms & douane", "Mettre en place KPIs supply-chain"],
    skillsDeveloped: ["TMS/WMS", "Gestion stock", "Incoterms 2020", "Lean logistics", "Data supply-chain"],
    opportunities: ["Coordinateur logistique", "Agent transit", "Planificateur supply-chain", "Acheteur transport"]
  },
  {
    name: "Bachelor Finance",
    description: "Initie aux fondamentaux de la comptabilité, de la gestion de trésorerie et de l’analyse financière.",
    category: "Finances",
    parcours: "Finance d’Entreprise",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Finance",
    admissionRequirements: ["Baccalauréat ou Bac +2 économie/gestion", "Test logique", "Entretien"],
    objectives: ["Tenir comptabilité", "Établir états financiers", "Analyser ratios", "Gérer trésorerie"],
    skillsDeveloped: ["Comptabilité générale", "Excel avancé", "Analyse financière", "Budget", "Fiscalité de base"],
    opportunities: ["Assistant comptable", "Analyste junior", "Contrôleur de gestion junior", "Caissier back-office banque"]
  },
  {
    name: "Bachelor Techniques Numériques & Multimédia",
    description: "Combine développement web, audiovisuel et design interactif pour produire des contenus innovants.",
    category: "Multimédia",
    parcours: "Techniques Numériques",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Multimédia",
    admissionRequirements: ["Baccalauréat ou Bac +2 multimédia/design", "Portfolio digital", "Entretien"],
    objectives: ["Développer sites & apps", "Créer vidéos & motion design", "Intégrer AR/VR", "Gérer projet multimédia"],
    skillsDeveloped: ["HTML/CSS/JS", "Premiere/After Effects", "3D basics", "UX/UI", "Gestion projet agile"],
    opportunities: ["Développeur multimédia", "Webdesigner", "Motion designer", "Chef de projet digital junior"]
  }
    ]
      },
      {
    id: "CESA-Sup",
    name: "CESA Centre d'Enseignement des Sciences Appliquées Sup",
    description: "Un établissement de premier plan spécialisé dans les formations commerciales, marketing et management, offrant des programmes adaptés aux exigences du marché.",
    logo: "Images/Cesa2.png", 
    address: "15 Rue de champigny (Rond point Cimicolor), 20000 Casablanca",
    video: "https://youtu.be/hwcRRzL39dQ",
    contact: {
      phone: "+212 522-444180",
      email: "contact@cesa.ma",
      website: "cesasup.ma"
    },
    registrationInfo: {
      "Tous les parcours": {
        description: "Les inscriptions sont ouvertes de mars à juillet. Les dossiers peuvent être soumis en ligne ou directement au service des admissions.",
        procedure: [
          "Remplir le formulaire d'inscription",
          "Fournir les copies des diplômes et relevés de notes",
          "Passer un test d'aptitude",
          "Participer à un entretien de motivation"
        ],
        fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
        scholarships: true,
        contact: {
          phone: "+212 522-444180",
          email: "contact@cesa.ma"
        }
      }
    },
    programs: [
       /* ─────────────  TECHNICIENS  ───────────── */

  {
    name: "Technicien Marketing & Action Commerciale",
    description: "Initie aux techniques de prospection, de négociation et de promotion des ventes pour soutenir la force commerciale.",
    category: "Commerce",
    parcours: "Action Commerciale",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien Marketing & Action Commerciale",
    admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Dossier + entretien"],
    objectives: ["Identifier prospects", "Conduire argumentaire de vente", "Renseigner CRM", "Suivre indicateurs de performance"],
    skillsDeveloped: ["Techniques de vente", "CRM (HubSpot)", "Prospection téléphonique", "Négociation", "Reporting ventes"],
    opportunities: ["Commercial terrain", "Télé-conseiller", "Assistant marketing", "Chargé clientèle"]
  },
  {
    name: "Technicien Gestion Informatisée",
    description: "Forme à la gestion de bases de données et à la bureautique avancée pour optimiser les flux d’information en entreprise.",
    category: "Gestion-Informatisée",
    parcours: "Gestion Informatisée",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien en Gestion Informatisée",
    admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Dossier + entretien"],
    objectives: ["Créer bases SQL", "Automatiser reporting", "Assurer support utilisateurs", "Paramétrer modules ERP"],
    skillsDeveloped: ["SQL basique", "Suite Office", "ERP (Odoo/Sage)", "Support help-desk", "Gestion documentaire"],
    opportunities: ["Assistant ERP", "Technicien support", "Gestionnaire base de données", "Opérateur saisie"]
  },
  {
    name: "Technicien Maintenance & Support Technique",
    description: "Prépare à diagnostiquer et dépanner le matériel informatique, installer OS et assurer le support technique N1/N2.",
    category: "Informatique",
    parcours: "Maintenance IT",
    niveau: "Technicien",
    cycle: "Technicien",
    duration: "2 ans",
    diploma: "Diplôme de Technicien Maintenance & Support",
    admissionRequirements: ["Attestation de scolarité terminale", "Test logique", "Dossier + entretien"],
    objectives: ["Diagnostiquer pannes PC", "Installer systèmes Windows/Linux", "Assurer support utilisateurs", "Maintenir parc informatique"],
    skillsDeveloped: ["Hardware PC", "Imaging & déploiement", "Ticketing (GLPI)", "Réseau de base", "Sécurité poste de travail"],
    opportunities: ["Technicien help-desk", "Support N1", "Mainteneur parc IT", "Pré-installateur matériel"]
  },

  /* ─────────────  TECHNICIENS SPÉCIALISÉS  ───────────── */

  {
    name: "Technicien Spécialisé Analyste Marketing",
    description: "Développe la capacité d’analyser données marché, segmenter clientèle et piloter campagnes ciblées.",
    category: "Marketing",
    parcours: "Analyse Marketing",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Analyste Marketing",
    admissionRequirements: ["Baccalauréat", "Relevés Bac", "Dossier + entretien"],
    objectives: ["Collecter data clients", "Construire tableaux de bord KPIs", "Réaliser études quantitatives", "Recommander actions marketing"],
    skillsDeveloped: ["Excel/Power BI", "Statistiques SPSS", "Segmentation RFM", "Google Analytics", "Outils CRM"],
    opportunities: ["Assistant études", "Analyste marketing junior", "Chargé data CRM", "Consultant études terrain"]
  },
  {
    name: "Technicien Spécialisé Commerce International",
    description: "Forme à la gestion des opérations import-export, négociation internationale et logistique douanière.",
    category: "Commerce",
    parcours: "Commerce International",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Commerce International",
    admissionRequirements: ["Baccalauréat", "Relevés Bac", "Dossier + entretien"],
    objectives: ["Préparer documents douaniers", "Négocier contrats", "Maîtriser Incoterms", "Suivre transport international"],
    skillsDeveloped: ["Tarif douanier", "Incoterms 2020", "Anglais affaires", "Gestion transit", "Commerce digital B2B"],
    opportunities: ["Agent export", "Assistant achat international", "Déclarant transit", "Commercial import-export"]
  },
  {
    name: "Technicien Spécialisé Finance & Comptabilité",
    description: "Initie à la tenue de comptabilité, l’établissement des états financiers et l’analyse budgétaire.",
    category: "Comptabilité",
    parcours: "Finance & Comptabilité",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Finance & Comptabilité",
    admissionRequirements: ["Baccalauréat", "Relevés Bac", "Dossier + entretien"],
    objectives: ["Tenir comptabilité", "Établir bilans", "Analyser coûts", "Gérer paie"],
    skillsDeveloped: ["Sage Comptabilité", "Fiscalité", "Analyse financière", "Tableaux de bord", "Paie"],
    opportunities: ["Comptable", "Assistant financier", "Gestionnaire paie", "Technicien audit"]
  },
  {
    name: "Technicien Spécialisé Systèmes & Réseaux Informatique",
    description: "Couvre l’installation, la sécurisation et la supervision d’infrastructures réseau et serveurs.",
    category: "Sécurité-Informatique",
    parcours: "Systèmes & Réseaux",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Systèmes & Réseaux",
    admissionRequirements: ["Baccalauréat scientifique/technique", "Test réseau", "Entretien"],
    objectives: ["Configurer VLAN/VPN", "Administrer serveurs Windows/Linux", "Mettre en place sauvegardes", "Superviser réseau"],
    skillsDeveloped: ["Switching & routing", "Active Directory", "Firewall", "Bash/Python", "Monitoring Zabbix"],
    opportunities: ["Admin réseau junior", "Technicien sécurité", "Support NOC", "Opérateur SOC"]
  },
  {
    name: "Technicien Spécialisé Marketing Digital",
    description: "Apprend à déployer campagnes SEO/SEA, gérer réseaux sociaux et analyser données web.",
    category: "Marketing-Digital",
    parcours: "Marketing Digital",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Marketing Digital",
    admissionRequirements: ["Baccalauréat", "Portfolio digital", "Dossier + entretien"],
    objectives: ["Optimiser SEO on/off page", "Gérer campagnes Google Ads", "Animer réseaux sociaux", "Mesurer KPIs"],
    skillsDeveloped: ["SEO", "Google Ads", "Meta Business Suite", "Content marketing", "GA4"],
    opportunities: ["Community manager", "Traffic manager", "Assistant SEA", "Chargé e-marketing"]
  },
  {
    name: "Technicien Spécialisé Développeur Full Stack",
    description: "Forme à la conception d’applications web front-end & back-end en environnement JavaScript.",
    category: "Informatique",
    parcours: "Full-Stack JS",
    niveau: "Technicien Spécialisé",
    cycle: "Technicien Spécialisé",
    duration: "2 ans",
    diploma: "Diplôme TS Développeur Full Stack",
    admissionRequirements: ["Baccalauréat", "Test logique/JS", "Dossier + entretien"],
    objectives: ["Développer apps Node/Express", "Concevoir interfaces React", "Gérer bases MongoDB", "Déployer sur cloud"],
    skillsDeveloped: ["HTML/CSS/JS", "React", "Node.js", "Git/GitHub", "CI/CD"],
    opportunities: ["Développeur full-stack junior", "Intégrateur web", "DevOps junior", "Consultant JS"]
  },

  /* ─────────────  BACHELORS (LICENCE PRO)  ───────────── */

  {
    name: "Bachelor Informatique & Réseaux",
    description: "Couvre réseaux, systèmes et cybersécurité pour administrer infrastructures IT complexes.",
    category: "Sécurité-Informatique",
    parcours: "IT Networks",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Informatique & Réseaux",
    admissionRequirements: ["Bac scientifique/technique ou Bac +2 IT", "Test réseau", "Entretien"],
    objectives: ["Installer équipements Cisco/HP", "Mettre en place VLAN/VPN", "Détecter intrusions", "Superviser SI"],
    skillsDeveloped: ["Switching/routing", "Linux server", "Firewalling", "Scripting Bash/Python", "Monitoring"],
    opportunities: ["Admin réseau junior", "Technicien sécurité", "Support NOC", "Opérateur SOC niveau 1"]
  },
  {
    name: "Bachelor Marketing International",
    description: "Développe les compétences pour élaborer stratégies marketing globales, adapter produits et gérer exportations.",
    category: "Marketing",
    parcours: "Marketing International",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Marketing International",
    admissionRequirements: ["Baccalauréat ou Bac +2 commerce/marketing", "Dossier + entretien"],
    objectives: ["Analyser marchés étrangers", "Adapter mix-marketing", "Négocier contrats export", "Piloter communication interculturelle"],
    skillsDeveloped: ["Études internationales", "Gestion export", "Anglais affaires", "Intercultural marketing", "CRM"],
    opportunities: ["Assistant export", "Chef de produit junior", "Chargé marketing zone", "Commercial international"]
  },
  {
    name: "Bachelor Transport Logistique",
    description: "Forme à la planification des flux, à la réglementation internationale et aux outils digitaux de la supply-chain.",
    category: "Logistique",
    parcours: "Transport & Logistique",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Transport & Logistique",
    admissionRequirements: ["Baccalauréat ou Bac +2 logistique", "Dossier + entretien"],
    objectives: ["Planifier transport multimodal", "Optimiser stock", "Gérer incoterms & douane", "Mettre en place KPIs"],
    skillsDeveloped: ["TMS/WMS", "Lean logistics", "Incoterms 2020", "Data supply-chain", "ERP"],
    opportunities: ["Coordinateur logistique", "Agent transit", "Planificateur supply-chain", "Acheteur transport"]
  },
  {
    name: "Bachelor Finance & Contrôle de Gestion",
    description: "Apprend à maîtriser la comptabilité, l’analyse financière et le pilotage de la performance.",
    category: "Finances",
    parcours: "Finance & Contrôle",
    niveau: "Licence",
    cycle: "Licence Professionnelle",
    duration: "3 ans",
    diploma: "Bachelor Européen Finance & Contrôle",
    admissionRequirements: ["Baccalauréat ou Bac +2 économie/gestion", "Test logique", "Entretien"],
    objectives: ["Établir états financiers", "Analyser ratios", "Élaborer budgets", "Contrôler écarts"],
    skillsDeveloped: ["Comptabilité générale", "Excel avancé", "Analyse financière", "Contrôle budgétaire", "Reporting"],
    opportunities: ["Contrôleur de gestion junior", "Assistant comptable", "Analyste junior", "Auditeur interne"]
  },

  /* ─────────────  MASTERS  ───────────── */

  {
    name: "Master Informatique",
    description: "Spécialise en développement logiciel, IA et cybersécurité pour concevoir des solutions innovantes.",
    category: "Informatique",
    parcours: "Master Informatique",
    niveau: "Master",
    cycle: "Master",
    duration: "5 ans",
    diploma: "Master Européen Informatique",
    admissionRequirements: ["Licence informatique ou Bac +2 IT pour 3 ans", "Test technique", "Entretien"],
    objectives: ["Concevoir architectures logicielles", "Implémenter IA & data science", "Sécuriser applications", "Gérer projets agiles"],
    skillsDeveloped: ["Microservices", "Python/Java avancé", "Machine learning", "DevSecOps", "Cloud AWS/Azure"],
    opportunities: ["Ingénieur logiciel", "Data engineer", "Consultant cybersécurité", "Chef de projet IT"]
  },
  {
    name: "Master Management & Stratégie d’Entreprise",
    description: "Prépare à piloter la stratégie, le changement organisationnel et la performance globale.",
    category: "Gestion-Entreprise",
    parcours: "Stratégie d’Entreprise",
    niveau: "Master",
    cycle: "Master",
    duration: "5 ans",
    diploma: "Master Européen Management & Stratégie",
    admissionRequirements: ["Licence gestion ou Bac +2 pour 3 ans", "Dossier + entretien"],
    objectives: ["Élaborer plans stratégiques", "Conduire changement", "Manager équipes pluridisciplinaires", "Gérer indicateurs de performance"],
    skillsDeveloped: ["Diagnostic stratégique", "Balanced Scorecard", "Leadership", "Gestion du changement", "Business analytics"],
    opportunities: ["Consultant stratégie", "Directeur adjoint", "Chef de projet organisation", "Entrepreneur"]
  },
  {
    name: "Master E-communication",
    description: "Spécialise en communication digitale, UX et médias sociaux pour construire la visibilité des marques.",
    category: "Communication",
    parcours: "E-communication",
    niveau: "Master",
    cycle: "Master",
    duration: "5 ans",
    diploma: "Master Européen E-communication",
    admissionRequirements: ["Licence communication/marketing ou Bac +2 pour 3 ans", "Portfolio digital", "Entretien"],
    objectives: ["Définir stratégies digitales", "Produire contenus multiplateformes", "Gérer e-réputation", "Mesurer KPI Social Media"],
    skillsDeveloped: ["Content strategy", "UX writing", "SEO/SEA", "Analytics", "Growth hacking"],
    opportunities: ["Responsable communication digitale", "Social media manager", "Chef de projet web", "Consultant e-marketing"]
  },
  {
    name: "Master Logistique",
    description: "Couvre la stratégie supply-chain, la digitalisation 4.0 et la logistique durable à l’échelle mondiale.",
    category: "Logistique",
    parcours: "Logistique",
    niveau: "Master",
    cycle: "Master",
    duration: "5 ans",
    diploma: "Master Européen Logistique",
    admissionRequirements: ["Licence logistique/ingénierie ou Bac +2 pour 3 ans", "Test maths/stat", "Entretien"],
    objectives: ["Concevoir réseaux logistiques internationaux", "Optimiser flux physiques & info", "Mettre en place ERP", "Intégrer logistique verte"],
    skillsDeveloped: ["APS", "Lean Six Sigma", "ERP/SAP WM", "IoT supply-chain", "Risk management"],
    opportunities: ["Supply-chain manager", "Consultant logistique", "Responsable entrepôt", "Directeur opérations"]
  },
  {
    name: "Master Finance Internationale",
    description: "Forme des experts capables de gérer la trésorerie, l’investissement et les risques sur les marchés mondiaux.",
    category: "Finances",
    parcours: "Finance Internationale",
    niveau: "Master",
    cycle: "Master",
    duration: "5 ans",
    diploma: "Master Européen Finance Internationale",
    admissionRequirements: ["Licence finance/éco ou Bac +2 pour 3 ans", "Test GMAT-like", "Entretien"],
    objectives: ["Évaluer investissements internationaux", "Gérer risques de change", "Structurer produits dérivés", "Analyser marchés financiers"],
    skillsDeveloped: ["Analyse quantitative", "Gestion de portefeuille", "Fintech & blockchain", "Risk management", "Modélisation Excel/VBA"],
    opportunities: ["Analyste financier", "Trésorier corporate", "Gestionnaire de portefeuille", "Consultant en finance"]
  }
    ]
      },
      {
    id: "EDD",
    name: "EDD École des Déclarations en Douane",
    description: "EDD s'est créée une très bonne reputation dans le domaine de la formation professionnelle grâce à son sérieux et à son corps professoral qui est constitué d'éminents formateurs... Avec une expertisse dans le domaine du transport, Logistiqueu, Douane, Gestion...",
    logo: "Images/EDD.jpg", 
    address: "12 Rue des Arts, 20000 Casablanca",
    video: "https://youtu.be/hwcRRzL39dQ",
    contact: {
      phone: "+212 5 22 22 00 44",
      email: "contact@edd.ma",
      website: "www.edd.ma"
    },
    registrationInfo: {
      "Tous les parcours": {
        description: "Les inscriptions sont ouvertes de janvier à juin. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
        procedure: [
          "Remplir le formulaire de pré-inscription",
          "Joindre un portfolio de travaux artistiques",
          "Passer un entretien de motivation",
          "Participer à un atelier créatif"
        ],
        fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
        scholarships: true,
        contact: {
          phone: "+212 5 22 22 00 44",
          email: "contact@edd.ma"
        }
      }
    },
    programs: [
        {
          name: "Technicien Déclarant en Douane",
          description: "Prépare des professionnels capables de traiter les formalités douanières, optimiser les régimes suspensifs et sécuriser la chaîne d’approvisionnement internationale.",
          category: "Douane",
          parcours: "Déclarant en Douane",
          niveau: "Technicien",
          cycle: "Technicien",
          duration: "2 ans",
          diploma: "Diplôme de Technicien Déclarant en Douane",
          admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Dossier + entretien"],
          objectives: ["Remplir déclarations import-export", "Appliquer réglementations tarifaires", "Gérer régimes douaniers spéciaux", "Conseiller clients sur classification & origine"],
          skillsDeveloped: ["Incoterms", "Tarif douanier harmonisé", "Système BADR/Bayan", "Gestion documentaire", "Veille réglementaire"],
          opportunities: ["Déclarant en douane", "Agent transit", "Courtier en douane", "Assistant compliance trade"]
        },
        {
          name: "Technicien Spécialisé – Gestion de Transport & Logistique",
          description: "Forme des techniciens capables de planifier les opérations de transport, gérer les stocks et optimiser les coûts logistiques dans un contexte digitalisé.",
          category: "Transport-Logistique",
          parcours: "Gestion de Transport & Logistique",
          niveau: "Technicien Spécialisé",
          cycle: "Technicien Spécialisé",
          duration: "2 ans",
          diploma: "Diplôme de Technicien Spécialisé GTL",
          admissionRequirements: ["Baccalauréat toutes séries", "Relevés de notes Bac", "Dossier + test logique & entretien"],
          objectives: ["Élaborer plans de transport", "Gérer entrepôts & stocks", "Planifier tournées via TMS/GPS", "Suivre indicateurs OTIF & coût/km"],
          skillsDeveloped: ["TMS & WMS", "Optimisation de tournées", "Gestion d’inventaire", "Tableaux de bord logistiques", "Normes HSE transport"],
          opportunities: ["Agent d’exploitation transport", "Gestionnaire entrepôt", "Assistant supply-chain", "Coordinateur logistique"]
        },
        {
          name: "Licence Professionnelle – Transport & Logistique",
          description: "Approfondit la conception de réseaux logistiques, la réglementation internationale et la maîtrise des outils numériques pour piloter la supply-chain.",
          category: "Logistique",
          parcours: "Transport & Logistique",
          niveau: "Licence",
          cycle: "Licence Professionnelle",
          duration: "3 ans",
          diploma: "Bachelor Européen Transport & Logistique",
          admissionRequirements: ["Baccalauréat pour 3 ans ou Bac +2 pour entrée directe", "Dossier académique", "Entretien"],
          objectives: ["Analyser coûts & flux", "Négocier contrats transport", "Mettre en œuvre logistique durable", "Utiliser outils APS & ERP"],
          skillsDeveloped: ["Incoterms 2020", "Lean logistics", "ERP (SAP/Odoo)", "Data supply-chain", "Gestion des risques transport"],
          opportunities: ["Responsable logistique junior", "Coordinateur import-export", "Planificateur supply-chain", "Acheteur transport"]
        },
        {
          name: "Master Européen Logistique",
          description: "Spécialise en stratégie supply-chain mondiale, digitalisation 4.0 et logistique verte pour répondre aux défis de la compétitivité et du développement durable.",
          category: "Logistique",
          parcours: "Supply Chain Strategy",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Logistique",
          admissionRequirements: ["Licence logistique ou génie industriel", "Test maths/statistiques", "Dossier + entretien"],
          objectives: ["Concevoir réseaux logistiques internationaux", "Optimiser flux physiques & informationnels", "Intégrer technologies 4.0 (IoT, blockchain)", "Mettre en œuvre logistique durable"],
          skillsDeveloped: ["APS & Demand planning", "Lean Six Sigma", "ERP/SAP WM", "Transport multimodal", "IoT & data supply-chain"],
          opportunities: ["Supply-chain manager", "Consultant logistique", "Responsable entrepôt", "Directeur opérations"]
        },
        {
          name: "Formation Entreprise – Logistique & Douane",
          description: "Parcours court et modulable destiné aux salariés et cadres visant à mettre à jour leurs compétences en gestion douanière, incoterms et optimisation logistique.",
          category: "Formation-Continue",
          parcours: "Logistique & Douane",
          niveau: "Formation Entreprise",
          cycle: "Formation Continue",
          duration: "3–6 mois (modules à la carte)",
          diploma: "Certificat Professionnel Logistique & Douane",
          admissionRequirements: ["Expérience ≥ 1 an supply-chain", "Formulaire d’inscription", "Accord employeur (le cas échéant)"],
          objectives: ["Actualiser connaissances Incoterms & TARIC", "Réduire coûts de dédouanement", "Améliorer processus transport & entrepôt", "Mettre en place KPI & audit logistique"],
          skillsDeveloped: ["Compliance douanière", "Pilotage KPI", "Process mapping", "Digitalisation flux EDI", "Management HSE transport"],
          opportunities: ["Évolution interne responsable douane", "Chef de projet amélioration continue", "Consultant logistique", "Coordinateur conformité"]
        }
    ]
      },
      {
        id: "isga-casablanca",
        name: "ISGA - Casablanca - Institut Supérieur d'Ingénierie & des Affaires",
        description: "La vocation de l'ISGA est de former des hommes et des femmes créatifs, audacieux, producteurs de valeur pour les entreprises et pour la société.",
        logo: "Images/ISGA.png", 
        address: "393, Route EL Jadida – Oasis",
        video: "https://youtu.be/-TwjJbHVTnM?si=aCqfr-NSZjWu_MVT",
        contact: {
          phone: "+(212) 05 22 25 55 96 – 05 22 25 78 60",
          email: "inforation non disponible",
          website: "isga.ma"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "05 22 25 55 96 – 05 22 25 78 60",
              email: ""
            }
          }
        },
        programs:[
          {
      name: "Design Graphique et Digital",
      description: "Formation Bac+3 en création visuelle, UI/UX, motion design, etc.",
      category: "Design",
      parcours: "Design Graphique",
      niveau: "Licence",
      cycle: "Bac+3",
      duration: "3 ans",
      diploma: "Licence en Design Graphique et Digital",
      admissionRequirements: ["Bac toutes séries", "Dossier de candidature", "Entretien de motivation"],
      objectives: ["Créer des visuels impactants", "Maîtriser les outils Adobe", "Concevoir des identités graphiques", "Intégrer des contenus dans un parcours UX"],
      skillsDeveloped: ["Photoshop", "Illustrator", "After Effects", "UX/UI", "Branding"],
      opportunities: ["Graphiste", "Directeur artistique junior", "Web designer", "Motion designer"]
    },
    {
      name: "Architecture d'Intérieur",
      description: "Formation Bac+3 pour concevoir et aménager des espaces intérieurs fonctionnels et esthétiques.",
      category: "Architecture",
      parcours: "Architecture Intérieure",
      niveau: "Licence",
      cycle: "Bac+3",
      duration: "3 ans",
      diploma: "Licence en Architecture d'intérieur",
      admissionRequirements: ["Bac scientifique ou artistique", "Portfolio (souhaité)", "Entretien de motivation"],
      objectives: ["Analyser les besoins clients", "Concevoir plans et maquettes", "Superviser les travaux d’aménagement"],
      skillsDeveloped: ["SketchUp", "AutoCAD", "Conception d’espace", "Colorimétrie", "Maquette 3D"],
      opportunities: ["Architecte d’intérieur", "Décorateur", "Maquettiste", "Designer d’espace"]
    },
    {
      name: "Communication Visuelle (1 an)",
      description: "Formation Bac+3 accélérée axée sur le branding, la publicité visuelle et le design de l'information.",
      category: "Communication",
      parcours: "Communication Visuelle",
      niveau: "Licence",
      cycle: "Bac+3",
      duration: "1 an",
      diploma: "Licence en Communication Visuelle",
      admissionRequirements: ["Bac+2 en communication ou graphisme", "Portfolio", "Entretien"],
      objectives: ["Maîtriser les outils graphiques", "Créer des campagnes visuelles", "Optimiser la lisibilité des messages"],
      skillsDeveloped: ["Adobe Suite", "Affichage publicitaire", "Charte graphique", "Typographie"],
      opportunities: ["Graphiste", "Chargé de communication visuelle", "Concepteur de supports" ]
    },
    {
      name: "Communication des Organisations",
      description: "Prépare à piloter la communication interne et externe des institutions et entreprises.",
      category: "Communication",
      parcours: "Communication Institutionnelle",
      niveau: "Licence",
      cycle: "Bac+3",
      duration: "3 ans",
      diploma: "Licence en Communication des Organisations",
      admissionRequirements: ["Bac toutes séries", "Dossier + entretien"],
      objectives: ["Développer une stratégie de communication globale", "Créer des contenus adaptés", "Gérer les relations presse et publiques"],
      skillsDeveloped: ["Plan de communication", "Rédaction institutionnelle", "Événementiel", "Relations presse"],
      opportunities: ["Chargé de communication", "Attaché de presse", "Responsable de communication interne"]
    },
    {
      name: "Design Graphique et Digital",
      description: "Formation Bac+5 approfondie alliant direction artistique, design UX, et design interactif.",
      category: "Design",
      parcours: "Design Graphique",
      niveau: "Master",
      cycle: "Bac+5",
      duration: "5 ans",
      diploma: "Master en Design Graphique et Digital",
      admissionRequirements: ["Licence en design/arts visuels", "Portfolio", "Entretien approfondi"],
      objectives: ["Concevoir des identités visuelles complexes", "Superviser des projets créatifs", "Appliquer les tendances design numériques"],
      skillsDeveloped: ["UX/UI avancé", "Branding digital", "Motion design", "Direction artistique"],
      opportunities: ["Directeur artistique", "Designer UX Senior", "Responsable création"]
    },
    {
      name: "Architecture d'Intérieur",
      description: "Formation Bac+5 pour maîtriser la conception architecturale d’espaces, matériaux et volumes.",
      category: "Architecture",
      parcours: "Architecture Intérieure",
      niveau: "Master",
      cycle: "Bac+5",
      duration: "5 ans",
      diploma: "Master en Architecture d'intérieur",
      admissionRequirements: ["Licence architecture ou design", "Portfolio", "Entretien technique"],
      objectives: ["Proposer des projets intégrés et durables", "Maîtriser matériaux et normes", "Coordonner des projets complexes"],
      skillsDeveloped: ["Revit", "Écoconception", "Maquette 3D", "Design mobilier"],
      opportunities: ["Architecte d’intérieur senior", "Chef de projet design", "Consultant en aménagement"]
    }
        ]
      },
      {
        id: "IBEGIS",
        name: "IBEGIS Institut des Hautes Études de Gestion",
        description: "Un institut dédié à l'excellence académique en gestion, économie et administration des entreprises, formant les futurs cadres dirigeants.",
        logo: "Images/ibegis.png", 
        address: "8 Boulevard Mohammed V, 20250 Casablanca",
        video: "https://youtu.be/hwcRRzL39dQ",
        contact: {
          phone: "+212 5 22 20 20 60",
          email: "contact@ibegis.ma",
          website: "www.ibegis.ma"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à juillet. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "+212 5 22 20 20 60",
              email: "contact@ibegis.ma"
            }
          }
        },
        programs: [
          /* ──────────────── Cycle Technicien (2 ans) ──────────────── */

          {
            name: "Technicien Infographiste",
            description: "Initie à la création visuelle (print & web) : maîtrise des logiciels Adobe, mise en page, retouche photo et animation graphique.",
            category: "Infographie",
            parcours: "Design Graphique",
            niveau: "Technicien",
            cycle: "Technicien",
            duration: "2 ans",
            diploma: "Diplôme de Technicien Infographiste",
            admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Portfolio ou test de dessin", "Entretien"],
            objectives: ["Concevoir des supports visuels attractifs", "Gérer une chaîne graphique complète", "Adapter la création aux contraintes clients"],
            skillsDeveloped: ["Photoshop / Illustrator / InDesign", "Typographie & colorimétrie", "Motion design basique", "Maquette UI/UX"],
            opportunities: ["Graphiste junior", "Maquettiste PAO", "Webdesigner", "Assistant créatif"]
          },

          {
            name: "Technicien en Gestion Informatisée",
            description: "Allie bureautique avancée, bases de données et ERP pour automatiser les processus administratifs d’une PME.",
            category: "Gestion-Informatisée",
            parcours: "Informatique de Gestion",
            niveau: "Technicien",
            cycle: "Technicien",
            duration: "2 ans",
            diploma: "Diplôme de Technicien en Gestion Informatisée",
            admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Entretien"],
            objectives: ["Concevoir petites applications de gestion", "Administrer bases de données PME", "Produire tableaux de bord automatisés"],
            skillsDeveloped: ["Excel & VBA", "SQL de base", "ERP PME", "Dashboards Power BI"],
            opportunities: ["Assistant ERP", "Gestionnaire BD", "Technicien bureautique", "Support administratif IT"]
          },

          {
            name: "Technicien Assistant en Gestion Administrative & Comptable",
            description: "Prépare à la tenue des écritures comptables, à la gestion administrative et aux bases de la paie.",
            category: "Comptabilité",
            parcours: "Secrétariat Comptable",
            niveau: "Technicien",
            cycle: "Technicien",
            duration: "2 ans",
            diploma: "Diplôme de Technicien Assistant GAC",
            admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Entretien"],
            objectives: ["Enregistrer opérations comptables", "Assurer suivi de trésorerie", "Gérer dossiers administratifs"],
            skillsDeveloped: ["Plan comptable marocain", "Logiciels Sage / CIEL", "Bureautique avancée", "Archivage numérique"],
            opportunities: ["Assistant comptable", "Aide-gestionnaire de paie", "Secrétaire administratif", "Employé de bureau"]
          },

          {
            name: "Technicien en Action Commerciale & Marketing",
            description: "Donne les bases de la vente, de la négociation et du marketing opérationnel en environnement multicanal.",
            category: "Commerce",
            parcours: "Action Commerciale",
            niveau: "Technicien",
            cycle: "Technicien",
            duration: "2 ans",
            diploma: "Diplôme de Technicien ACM",
            admissionRequirements: ["Attestation de scolarité terminale", "Relevé de notes terminale", "Entretien de motivation"],
            objectives: ["Prospecter et fidéliser la clientèle", "Appliquer le mix-marketing", "Participer à la mise en place d’actions promotionnelles"],
            skillsDeveloped: ["Techniques de vente", "CRM basique", "Merchandising", "Communication commerciale"],
            opportunities: ["Commercial terrain", "Téléconseiller", "Assistant marketing", "Merchandiser"]
          },

          /* ──────────────── Cycle Technicien Spécialisé (2 ans) ──────────────── */

          {
            name: "Technicien Spécialisé Financier Comptable",
            description: "Forme des professionnels capables de tenir la comptabilité, d’élaborer bilans et d’appuyer l’analyse financière.",
            category: "Comptabilité",
            parcours: "Finance-Comptabilité",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "DTS Financier Comptable",
            admissionRequirements: ["Baccalauréat toutes séries", "Relevés de notes Bac", "Lettre de motivation", "Entretien"],
            objectives: ["Tenir comptabilité générale & analytique", "Établir états financiers", "Assurer déclarations fiscales", "Analyser rentabilité"],
            skillsDeveloped: ["ERP comptables (Sage)", "Analyse financière", "Fiscalité marocaine", "Contrôle budgétaire"],
            opportunities: ["Comptable", "Assistant financier", "Gestionnaire de paie", "Contrôleur de gestion junior"]
          },

          {
            name: "Technicien Spécialisé Commerce International",
            description: "Couvre les opérations d’import-export, la logistique douanière et la gestion des contrats internationaux.",
            category: "Commerce",
            parcours: "Trade & Logistics",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "DTS Commerce International",
            admissionRequirements: ["Baccalauréat", "Relevés de notes", "Test d’anglais", "Entretien"],
            objectives: ["Gérer dossiers import-export", "Maîtriser Incoterms & procédures douanières", "Organiser transport multimodal"],
            skillsDeveloped: ["Documentation douanière", "Calcul coûts CIF/FOB", "Négociation internationale", "Logistique portuaire"],
            opportunities: ["Agent import-export", "Assistant transit", "Gestionnaire douane", "Commercial export junior"]
          },

          {
            name: "Technicien Spécialisé Développement Informatique",
            description: "Prépare des développeurs full-stack capables de concevoir et maintenir des applications web et mobiles.",
            category: "Informatique",
            parcours: "Développement Informatique",
            niveau: "Technicien Spécialisé",
            cycle: "Technicien Spécialisé",
            duration: "2 ans",
            diploma: "DTS Développement Informatique",
            admissionRequirements: ["Baccalauréat scientifique ou technique", "Test de logique & programmation", "Entretien"],
            objectives: ["Coder front-end & back-end", "Concevoir bases de données", "Déployer applications sécurisées"],
            skillsDeveloped: ["HTML/CSS/JS", "Frameworks (Laravel / React)", "SQL & NoSQL", "Git & CI-CD"],
            opportunities: ["Développeur web", "Intégrateur front-end", "Testeur logiciel", "Assistant chef de projet IT"]
          },
        
      /* ──────────────── Licences Professionnelles Européennes ──────────────── */

          {
            name: "Management & Gestion des Entreprises",
            description: "Forme des cadres intermédiaires capables de piloter la performance et le développement d’une PME/ETI : finance, marketing, RH, stratégie.",
            category: "Gestion-Entreprise",
            parcours: "Management des Organisations",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Management & Gestion des Entreprises",
            admissionRequirements: ["Baccalauréat (toutes séries) pour 3 ans", "OU Bac + 2 pour admission directe en 3ᵉ année", "Dossier + entretien"],
            objectives: ["Analyser la performance globale", "Mettre en place des plans d’action", "Mobiliser les équipes", "Assurer la conformité juridique"],
            skillsDeveloped: ["Contrôle de gestion", "Marketing opérationnel", "Gestion des RH", "Outils décisionnels"],
            opportunities: ["Assistant manager", "Adjoint de direction", "Contrôleur de gestion junior", "Chef de projet PME"]
          },

          {
            name: "Marketing & Commerce International",
            description: "Couvre les études de marché, la négociation export-import et la gestion de marques à l’international.",
            category: "Marketing",
            parcours: "Marketing & Commerce International",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Marketing & Commerce International",
            admissionRequirements: ["Baccalauréat ou Bac + 2 pour entrée parallèle", "Dossier + entretien", "Niveau B1 en anglais recommandé"],
            objectives: ["Élaborer stratégies export", "Gérer mix-marketing international", "Négocier contrats commerciaux", "Superviser logistique internationale"],
            skillsDeveloped: ["Analyse de marché", "Incoterms", "Brand management", "Techniques de vente BtoB"],
            opportunities: ["Responsable zone export junior", "Assistant chef de produit international", "Chargé de commerce extérieur"]
          },

          {
            name: "Finance",
            description: "Spécialise en gestion financière, comptabilité internationale et analyse d’investissement pour accompagner la prise de décision.",
            category: "Finances",
            parcours: "Finance d’Entreprise",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Finance",
            admissionRequirements: ["Bac ES/S ou Bac + 2 filière gestion", "Test quantitatif", "Entretien"],
            objectives: ["Établir états financiers", "Analyser rentabilité", "Gérer trésorerie", "Évaluer projets d’investissement"],
            skillsDeveloped: ["IFRS", "Analyse financière", "Tableaux de bord", "Gestion budgétaire"],
            opportunities: ["Analyste financier junior", "Assistant contrôleur de gestion", "Comptable entreprise"]
          },

          {
            name: "Logistique & Supply Chain",
            description: "Prépare des coordinateurs capables d’optimiser les flux, réduire les coûts et intégrer la logistique durable.",
            category: "Logistique",
            parcours: "Supply Chain Management",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Logistique & Supply Chain",
            admissionRequirements: ["Baccalauréat ou Bac + 2 technique", "Dossier + entretien", "Notions de maths/Stats"],
            objectives: ["Planifier flux physiques", "Gérer stocks & entrepôts", "Maîtriser transport multimodal", "Implémenter ERP/WMS"],
            skillsDeveloped: ["Lean logistics", "APS", "Incoterms", "ERP (SAP)", "Data supply chain"],
            opportunities: ["Coordinateur logistique", "Agent d’exploitation", "Acheteur transport", "Gestionnaire entrepôt"]
          },

          {
            name: "Développeur d’Applications Mobiles",
            description: "Forme des développeurs Android/iOS capables de concevoir, coder et publier des applications performantes.",
            category: "Informatique",
            parcours: "Développement Mobile",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Développement d’Applications Mobiles",
            admissionRequirements: ["Bac scientifique/technique ou Bac + 2 IT", "Test de programmation", "Entretien"],
            objectives: ["Programmer en Kotlin/Swift", "Concevoir UI/UX mobile", "Consommer APIs REST", "Déployer sur stores"],
            skillsDeveloped: ["Android Studio", "Xcode", "SQLite/Realm", "Git CI/CD", "Tests unitaires"],
            opportunities: ["Développeur mobile", "Testeur QA mobile", "Intégrateur SDK", "Chef de projet junior"]
          },

          {
            name: "Communication",
            description: "Allie stratégie éditoriale, relations médias et outils digitaux pour construire l’image et la réputation des organisations.",
            category: "Communication",
            parcours: "Communication d’Entreprise",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Communication",
            admissionRequirements: ["Baccalauréat toutes séries ou Bac + 2", "Dossier + entretien", "Portfolio rédactionnel (souhaité)"],
            objectives: ["Élaborer plan de communication", "Gérer relations presse", "Créer contenus multicanaux", "Mesurer impact RP"],
            skillsDeveloped: ["Storytelling", "Rédaction web", "Outils PAO", "Social media management", "Veille e-réputation"],
            opportunities: ["Chargé de communication", "Attaché de presse", "Community manager", "Assistant RP"]
          },

          {
            name: "Informatique, Réseaux & Sécurité",
            description: "Donne les compétences pour administrer, sécuriser et dépanner des infrastructures réseau de PME/ETI.",
            category: "Sécurité-Informatique",
            parcours: "Réseau & Sécurité",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Réseaux & Sécurité",
            admissionRequirements: ["Bac scientifique/technique ou Bac + 2 IT", "Test technique réseau", "Entretien"],
            objectives: ["Installer équipements Cisco/HP", "Mettre en place VLAN/VPN", "Détecter intrusions", "Superviser SI"],
            skillsDeveloped: ["Switching & routing", "Linux server", "Firewalling", "Scripting Bash/Python", "Monitoring"],
            opportunities: ["Admin réseau junior", "Technicien sécurité", "Support NOC", "Opérateur SOC niveau 1"]
          },

          {
            name: "Marketing Digital",
            description: "Couvre les leviers SEO, SEA, Social Ads et data analytics pour développer la visibilité et le ROI des marques en ligne.",
            category: "Marketing-Digital",
            parcours: "Marketing Digital",
            niveau: "Licence",
            cycle: "Licence Professionnelle",
            duration: "3 ans",
            diploma: "Bachelor Européen Marketing Digital",
            admissionRequirements: ["Baccalauréat ou Bac + 2 commerce/marketing", "Dossier + entretien", "Portfolio digital (facultatif)"],
            objectives: ["Élaborer stratégie digitale", "Piloter campagnes SEA/Display", "Optimiser SEO", "Analyser KPIs via analytics"],
            skillsDeveloped: ["Google Ads", "GA4", "SEO on/off page", "Content marketing", "Automatisation email"],
            opportunities: ["Traffic manager", "Chargé e-marketing", "SEO/SEA junior", "Community manager"]
          },
          /* ──────────────── Licences Professionnelles Européennes ──────────────── */
              {
            name: "Communication – Stratégie Publicitaire & Communication Numérique",
            description: "Développe une expertise pointue en branding, storytelling et campagnes 360°. Combine data-driven marketing, création de contenus et media planning pour bâtir des marques fortes à l’ère numérique.",
            category: "Communication",
            parcours: "Communication Digitale",
            niveau: "Master",
            cycle: "Master",
            duration: "5 ans",
            diploma: "Master Européen Communication & Publicité Digitale",
            admissionRequirements: ["Licence/Bachelor en communication ou marketing", "Portfolio créatif", "Entretien de motivation", "Test d’anglais B2"],
            objectives: ["Concevoir plateforme de marque", "Piloter campagnes cross-media", "Mesurer KPI & ROI", "Manager agences créatives"],
            skillsDeveloped: ["Brand content", "Media planning", "Social ads", "Marketing d’influence", "Data analytics"],
            opportunities: ["Directeur communication", "Planneur stratégique", "Chef de publicité digital", "Consultant brand content"]
          },
        {
          name: "Management de Projets Informatiques",
          description: "Allie gouvernance IT, agilité, DevOps et management d’équipe pour conduire des projets logiciels complexes, de la conception au déploiement cloud.",
          category: "Informatique & Gestion de Projet",
          parcours: "Project Management IT",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Manager de Projets Informatiques",
          admissionRequirements: ["Licence/Bachelor informatique ou Bac +2 avec expérience IT", "Test technique", "Entretien"],
          objectives: ["Élaborer cahier des charges", "Maîtriser Agile/Scrum", "Superviser CI/CD & DevOps", "Gérer budget & risques"],
          skillsDeveloped: ["Jira", "AWS/Azure", "Risk management", "Leadership", "Reporting KPI"],
          opportunities: ["Chef de projet IT", "Scrum master", "PMO", "Consultant transformation digitale"]
        },
        {
          name: "Management Digital",
          description: "Prépare des leaders capables de piloter la transformation numérique et l’innovation : stratégie data, e-business, UX et change management.",
          category: "Digital-Innovation",
          parcours: "Digital Business Management",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Management Digital",
          admissionRequirements: ["Licence/Bachelor gestion, marketing ou informatique", "Projet professionnel digital", "Entretien"],
          objectives: ["Concevoir roadmap digitale", "Déployer e-commerce & CRM", "Exploiter data analytics", "Manager changement"],
          skillsDeveloped: ["Design thinking", "Growth hacking", "CRM Salesforce", "Data viz", "Innovation management"],
          opportunities: ["Chef de projet digital", "Consultant numérique", "Digital strategist", "Responsable e-commerce"]
        },
        {
          name: "Management & Stratégie d’Entreprise",
          description: "Fournit une vision 360° pour élaborer et mettre en œuvre la stratégie globale, optimiser la performance et conduire le changement dans un environnement international.",
          category: "Gestion-Entreprise",
          parcours: "Business Strategy",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Management & Stratégie d’Entreprise",
          admissionRequirements: ["Licence en management ou économie", "Dossier", "Entretien"],
          objectives: ["Analyser environnement concurrentiel", "Formuler choix stratégiques", "Piloter performance", "Manager M&A"],
          skillsDeveloped: ["Analyse stratégique", "Balanced scorecard", "Leadership", "Corporate finance", "Négociation"],
          opportunities: ["Directeur stratégie", "Consultant organisation", "Business developer", "Chef d’entreprise"]
        },
        {
          name: "Management & Stratégie Financière",
          description: "Spécialise en ingénierie financière, gestion des risques et pilotage de la rentabilité pour soutenir la croissance et la création de valeur.",
          category: "Finances",
          parcours: "Corporate Finance",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Management & Stratégie Financière",
          admissionRequirements: ["Licence finance/audit", "Test quantitatif", "Entretien"],
          objectives: ["Évaluer entreprises", "Structurer financements", "Gérer risques", "Superviser contrôle de gestion"],
          skillsDeveloped: ["Modélisation Excel", "Trésorerie", "IFRS", "Analyse de risque", "Power BI"],
          opportunities: ["Directeur financier", "Auditeur interne", "Analyste M&A", "Contrôleur de gestion senior"]
        },
        {
          name: "Management des Ressources Humaines",
          description: "Forme des experts capables d’attirer, développer et fidéliser les talents tout en alignant la politique RH sur la stratégie globale.",
          category: "Ressources-Humaines",
          parcours: "Human Resources Management",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Management des Ressources Humaines",
          admissionRequirements: ["Licence gestion ou droit", "Dossier", "Entretien"],
          objectives: ["Déployer recrutement & marque employeur", "Piloter GPEC", "Gérer relations sociales", "Mettre en place SIRH"],
          skillsDeveloped: ["Talent acquisition", "Droit social", "SIRH", "People analytics", "Rémunération"],
          opportunities: ["Responsable RH", "Consultant RH", "Talent manager", "Gestionnaire formation"]
        },
        {
          name: "Logistique",
          description: "Spécialise en conception, optimisation et digitalisation de la chaîne logistique mondiale, avec un focus sur l’industrie 4.0 et la logistique verte.",
          category: "Logistique",
          parcours: "Supply Chain Strategy",
          niveau: "Master",
          cycle: "Master",
          duration: "5 ans",
          diploma: "Master Européen Logistique",
          admissionRequirements: ["Licence logistique ou génie industriel", "Test maths/Stats", "Entretien"],
          objectives: ["Concevoir réseaux logistiques", "Optimiser flux", "Intégrer technologies 4.0", "Mettre en œuvre logistique durable"],
          skillsDeveloped: ["APS", "Lean Six Sigma", "ERP/SAP WM", "Transport multimodal", "IoT & data"],
          opportunities: ["Supply chain manager", "Consultant logistique", "Responsable entrepôt", "Directeur opérations"]
        }
        ]
      },      
      {
        id: "art'com-sup",
        name: "Ecole d'architecture d'intérieur et design graphique et digital",
        description: "Art’Com Sup est la 1ère école supérieure à Casablanca et Rabat de Design au Maroc accréditée par l'État offrant des formations diplômantes et certifiantes pour les étudiants et professionnels du domaine.",
        logo: "Images/artcom.png", 
        address: "Angle rue Moulay Ismail & rue Oujda, Quartier Hassan – Rabat",
        video: "https://youtu.be/dVC874AW15M?si=Rg6WrIGpIzxQe6fU",
        contact: {
          phone: "+(212) 05 37 20 83 31 | 05 37 20 83 30",
          email: "artcomrabat@ecole-artcom.com",
          website: "ecole-artcom.com"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "+212 636-301212",
              email: "ipemipemcom@gmail.com"
            }
          }
        },
        programs:[
          {
        name: "Formation-Continue",
        description: "Offre de modules courts et certifiants pour renforcer les compétences professionnelles en communication, design, logiciels, ou management de projets créatifs.",
        category: "Formation-Continue",
        parcours: "Formation Continue",
        niveau: "Technicien",
        cycle: "Formation-Continue",
        duration: "6 mois",
        diploma: "Certificat de Compétences Professionnelles",
        admissionRequirements: ["Expérience ou formation préalable", "CV", "Lettre de motivation"],
        objectives: ["Acquérir des compétences ciblées", "Mettre à jour ses connaissances", "Booster sa carrière créative", "Se reconvertir dans un métier du design"],
        skillsDeveloped: ["Adobe avancé", "Design UX rapide", "Rédaction com’ efficace", "Gestion agile de projets créatifs"],
        opportunities: ["Freelance", "Évolution interne", "Reconversion", "Création d’entreprise"]
      },
      {
        name: "Design Graphique et Digital",
        description: "Formation axée sur la création visuelle, l'identité de marque et les supports numériques, alliant compétences en graphisme et design interactif.",
        category: "Design & Multimédia",
        parcours: "Design Graphique",
        niveau: "Licence",
        cycle: "Bac+3",
        duration: "3 ans",
        diploma: "Bachelor en Design Graphique et Digital",
        admissionRequirements: ["Baccalauréat toutes séries", "Portfolio artistique", "Entretien de motivation"],
        objectives: ["Concevoir des supports de communication", "Maîtriser les outils de création visuelle", "Développer une identité graphique cohérente", "Créer des contenus numériques interactifs"],
        skillsDeveloped: ["Suite Adobe", "UX/UI design", "Design éditorial", "Motion design", "Branding"],
        opportunities: ["Graphiste", "Webdesigner", "Directeur artistique junior", "Designer digital"]
      },
      {
        name: "Architecture d’Intérieur",
        description: "Formation orientée vers l’aménagement d’espaces, l’ergonomie, la décoration et la modélisation 3D pour concevoir des environnements esthétiques et fonctionnels.",
        category: "Architecture & Design",
        parcours: "Architecture d’Intérieur",
        niveau: "Licence",
        cycle: "Bac+3",
        duration: "3 ans",
        diploma: "Bachelor en Architecture d’Intérieur",
        admissionRequirements: ["Baccalauréat", "Dossier artistique (portfolio ou croquis)", "Entretien"],
        objectives: ["Créer des espaces fonctionnels", "Concevoir des projets d’aménagement", "Utiliser les logiciels de modélisation 3D", "Intégrer la lumière et les matériaux"],
        skillsDeveloped: ["AutoCAD", "SketchUp", "3D Studio Max", "Design d’espace", "Décoration intérieure"],
        opportunities: ["Architecte d’intérieur junior", "Décorateur", "Concepteur 3D", "Scénographe"]
      },
      {
        name: "Communication Visuelle (en 1 an)",
        description: "Programme accéléré destiné aux étudiants souhaitant se spécialiser dans la communication graphique et la création de messages visuels impactants.",
        category: "Communication",
        parcours: "Communication",
        niveau: "Licence Accélérée",
        cycle: "Licence",
        duration: "3 an",
        diploma: "Licence en Communication Visuelle",
        admissionRequirements: ["Bac+2 en design ou communication", "Portfolio", "Entretien"],
        objectives: ["Renforcer les compétences graphiques", "Maîtriser les codes visuels", "Adapter les messages au public cible", "Créer des campagnes visuelles"],
        skillsDeveloped: ["PAO", "Identité visuelle", "Typographie", "Affichage publicitaire", "Création de visuels réseaux sociaux"],
        opportunities: ["Designer graphique", "Chargé de communication visuelle", "Infographiste", "Concepteur publicitaire"]
      },
      {
        name: "Communication des Organisations",
        description: "Prépare à gérer la communication interne et externe des entreprises, les relations presse, et la stratégie de communication globale.",
        category: "Communication",
        parcours: "Communication",
        niveau: "Licence",
        cycle: "Bac+3",
        duration: "3 ans",
        diploma: "Bachelor en Communication des Organisations",
        admissionRequirements: ["Baccalauréat", "Dossier", "Entretien"],
        objectives: ["Élaborer un plan de communication", "Gérer la relation presse", "Coordonner des actions de communication", "Piloter des campagnes institutionnelles"],
        skillsDeveloped: ["Rédaction corporate", "Relations médias", "Planification stratégique", "Communication de crise", "Outils numériques"],
        opportunities: ["Chargé de communication", "Attaché de presse", "Responsable com’ interne", "Community manager"]
      },
      {
        name: "Design Graphique et Digital",
        description: "Formation approfondie axée sur la direction artistique, le branding digital, le motion design et l’expérience utilisateur, orientée vers des postes à responsabilité.",
        category: "Multimédia",
        parcours: "Design Graphique Avancé",
        niveau: "Master",
        cycle: "Bac+5",
        duration: "2 ans",
        diploma: "Master en Design Graphique et Digital",
        admissionRequirements: ["Licence en design graphique ou équivalent", "Portfolio", "Entretien"],
        objectives: ["Développer une stratégie visuelle", "Superviser des projets créatifs", "Maîtriser l’expérience utilisateur (UX)", "Intégrer la dimension digitale"],
        skillsDeveloped: ["Direction artistique", "UX/UI avancé", "Brand strategy", "Design émotionnel", "Prototype interactif"],
        opportunities: ["Directeur artistique", "Lead designer", "Consultant en design digital", "Chef de projet créatif"]
      },
      {
        name: "Architecture d’Intérieur",
        description: "Approfondissement des techniques de conception architecturale intérieure avec un focus sur l’innovation, la durabilité, les normes techniques et les logiciels avancés.",
        category: "Architecture & Design",
        parcours: "Architecture d’Intérieur Avancée",
        niveau: "Master",
        cycle: "Bac+5",
        duration: "2 ans",
        diploma: "Master en Architecture d’Intérieur",
        admissionRequirements: ["Licence en design ou architecture", "Dossier de projet", "Entretien"],
        objectives: ["Diriger des projets d’envergure", "Intégrer les normes environnementales", "Concevoir des espaces hautement fonctionnels", "Superviser des équipes de design"],
        skillsDeveloped: ["BIM", "Eco-design", "Gestion de projet architectural", "SketchUp Pro", "Plans techniques avancés"],
        opportunities: ["Architecte d’intérieur senior", "Chef de projet design", "Designer d’espace haut de gamme", "Consultant en aménagement"]
      }  
    ]
      }, 
      {
        id: "Group-IPCS",
        name: "Group IPCS Institut Professionnel des Carrières de Santé",
        description: "l’Institut IPCS bénéficie d’une forte expérience et de compétences reconnues dans la formation des professionnels de santé.",
        logo: "Images/IPCS.png", 
        address: "131, Bd de la Résistance (En face du Lycée Jaber Ben Hayane) - Casablanca",
        video: "https://youtu.be/hwcRRzL39dQ",
        contact: {
          phone: "+212 522 44 70 72",
          email: "group.ipcs@live.fr",
          website: "ipcsgroupe.com"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "+212 522 44 70 72",
              email: "group.ipcs@live.fr"
            }
          }
        },
        programs: [

            /* ─────────────  SANTÉ & PARAMÉDICAL  ───────────── */

      {
        name: "Infirmier∙e Polyvalent∙e",
        description: "Forme des professionnels capables d’évaluer les besoins en soins, d’exécuter prescriptions médicales et d’assurer l’éducation sanitaire auprès des patients, familles et communautés.",
        category: "Santé",
        parcours: "Soins Infirmiers",
        niveau: "Diplôme d’État",
        cycle: "Cycle Santé",
        duration: "3 ans",
        diploma: "Diplôme d’Infirmier∙e Polyvalent∙e",
        admissionRequirements: ["Baccalauréat sciences expérimentales ou équivalent", "Dossier + test scientifique", "Entretien de motivation"],
        objectives: ["Définir besoins en soins", "Planifier & exécuter soins infirmiers", "Appliquer prescriptions médicales", "Promouvoir l’éducation sanitaire", "Participer à la recherche et aux programmes de santé"],
        skillsDeveloped: ["Évaluation clinique", "Techniques de soins", "Communication thérapeutique", "Gestion dossiers patients", "Éducation santé"],
        opportunities: ["Infirmier polyvalent hôpital/clinique", "Infirmier communautaire", "Éducateur santé", "Coordinateur programmes de santé"]
      },
      {
        name: "Diététique & Nutrition",
        description: "Prépare des spécialistes capables d’évaluer, de planifier et de surveiller les régimes nutritionnels à toutes les étapes de la vie, de la grossesse à la petite enfance.",
        category: "Santé",
        parcours: "Diététique",
        niveau: "Diplôme d’État",
        cycle: "Cycle Santé",
        duration: "3 ans",
        diploma: "Diplôme de Diététicien∙ne Nutritionniste",
        admissionRequirements: ["Baccalauréat sciences (SVT/PC)", "Dossier + test biologie", "Entretien"],
        objectives: ["Diagnostiquer état nutritionnel", "Élaborer régimes personnalisés", "Assurer suivi grossesse & nourrisson", "Mettre en œuvre programmes d’éducation nutritionnelle"],
        skillsDeveloped: ["Analyse nutritionnelle", "Éducation alimentaire", "Suivi materno-infantile", "Conseil diététique", "Planification menu hospitalier"],
        opportunities: ["Diététicien clinique", "Conseiller nutrition", "Éducateur santé publique", "Consultant bien-être"]
      },
      {
        name: "Infirmier∙e Auxiliaire",
        description: "Forme des auxiliaires de soins chargés d’assurer l’hygiène, le confort et l’assistance quotidienne des patients sous la supervision d’un infirmier diplômé.",
        category: "Santé",
        parcours: "Soins de Base",
        niveau: "Certificat",
        cycle: "Cycle Santé",
        duration: "2 ans",
        diploma: "Certificat d’Infirmier∙e Auxiliaire",
        admissionRequirements: ["Niveau terminal ou Bac", "Dossier + test aptitude", "Entretien"],
        objectives: ["Fournir soins d’hygiène & confort", "Appliquer prescriptions simples", "Assister infirmier diplômé", "Informer & éduquer familles"],
        skillsDeveloped: ["Gestes soins de base", "Aide à la mobilité", "Mesures vitales", "Hygiène hospitalière", "Relation d’aide"],
        opportunities: ["Aide-soignant hôpital", "Auxiliaire clinique", "Assistant soins à domicile", "Agent de santé communautaire"]
      },
      {
        name: "Délégué Médical",
        description: "Prépare des commerciaux spécialisés capables de promouvoir médicaments, dispositifs et produits para-pharmaceutiques auprès des médecins et pharmaciens.",
        category: "Santé",
        parcours: "Visite Médicale",
        niveau: "Certificat Professionnel",
        cycle: "Cycle Court",
        duration: "6 mois",
        diploma: "Certificat de Délégué Médical",
        admissionRequirements: ["Bac toutes séries", "Expérience commerciale (atout)", "Dossier + entretien"],
        objectives: ["Présenter produits pharmaceutiques", "Négocier ventes en officine", "Conseiller professionnels de santé", "Assurer veille concurrentielle"],
        skillsDeveloped: ["Communication médicale", "Techniques de vente B2B", "Réglementation pharmaceutique", "CRM & reporting", "Marketing produit"],
        opportunities: ["Représentant pharmaceutique", "Visiteur médical", "Commercial para-pharma", "Key account manager santé"]
      }
        ]
      },
      {
            id: "Mondial-Media",
            name: "Ecole Internationale des Métiers de l'Audiovisuel et de Journalisme",
            description: "MONDIAL MEDIA est une école Internationale des métiers de l'audiovisuel et de journalisme formation.",
            logo: "Images/Mondial.jpg", 
            address: "Bd Mohamed V,97 passage Gallinari,3éme Etage , Casablanca, Morocco",
            video: "https://youtu.be/hwcRRzL39dQ",
            contact: {
              phone: "+212 670-502053",
              email: "mondialmedia@gmail.com",
              website: "rezocampus.fr"
            },
            registrationInfo: {
              "Tous les parcours": {
                description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
                procedure: [
                  "Remplir le formulaire de candidature",
                  "Fournir les copies des diplômes et relevés de notes",
                  "Passer un test d'aptitude",
                  "Participer à un entretien de motivation"
                ],
                fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
                scholarships: true,
                contact: {
                  phone: "+212 670-502053",
                  email: "mondialmedia@gmail.com"
                }
              }
            },
            programs:[
              {
                name: "Audiovisuel",
                description: "Offre une formation polyvalente aux différentes techniques de l’audiovisuel, accessible dès le niveau bac.",
                category: "Audiovisuel",
                parcours: "audiovisuelles",
                niveau: "Technicien",
                cycle: "Technicien",
                duration: "2 ans",
                diploma: "Diplôme de Technicien Audiovisuel",
                admissionRequirements: ["Bac toutes séries", "Dossier de candidature", "Entretien de motivation"],
                objectives: ["Acquérir des compétences techniques en audio, vidéo et image", "Participer à la production de contenus audiovisuels", "Utiliser les équipements de tournage et de montage"],
                skillsDeveloped: ["Prise de vue", "Prise de son", "Montage de base", "Lumière et cadrage", "Maintenance technique"],
                opportunities: ["Assistant de production", "Opérateur caméra", "Technicien son", "Technicien plateau"]
              },
              {
                name: "Audiovisuel - Montage",
                description: "Spécialise les apprenants dans les techniques de montage vidéo et la post-production.",
                category: "Audiovisuel",
                parcours: "Audiovisuel - Montage",
                niveau: "Technicien Spécialisé",
                cycle: "Technicien Spécialisé",
                duration: "2 ans",
                diploma: "Diplôme de Technicien Spécialisé en Audiovisuel - Montage",
                admissionRequirements: ["Bac toutes séries", "Bonnes bases en informatique", "Dossier + test technique + entretien"],
                objectives: ["Maîtriser les logiciels de montage professionnels", "Réaliser des montages narratifs et techniques", "Assurer le traitement audio et vidéo des projets"],
                skillsDeveloped: ["Montage vidéo", "Effets spéciaux de base", "Colorimétrie", "Mixage audio", "Workflow de post-production"],
                opportunities: ["Monteur vidéo", "Assistant monteur", "Technicien post-production", "Opérateur de post-traitement"]
              },
              {
                name: "Licence Professionnelle en Audiovisuel et Cinéma",
                description: "Formation complète combinant théorie et pratique pour former des professionnels du secteur audiovisuel et cinématographique.",
                category: "Audiovisuel et Cinéma",
                parcours: "Réalisation & Production",
                niveau: "Licence",
                cycle: "Bachelor européen",
                duration: "1 an",
                diploma: "Licence Professionnelle en Audiovisuel et Cinéma",
                admissionRequirements: ["Bac +2 (BTS, DUT, ou équivalent)", "Expérience dans le secteur (atout)", "Dossier artistique + entretien"],
                objectives: ["Concevoir et réaliser des projets audiovisuels", "Gérer les aspects techniques et artistiques d’une production", "Acquérir une culture cinématographique"],
                skillsDeveloped: ["Scénarisation", "Réalisation", "Montage avancé", "Direction de production", "Analyse de film"],
                opportunities: ["Assistant réalisateur", "Chargé de production", "Chef monteur", "Cadreur", "Documentariste"]
              },
              {
                name: "Master en Audiovisuel",
                description: "Permet aux étudiants de se spécialiser dans un domaine précis de l’audiovisuel et d’acquérir une expertise de haut niveau.",
                category: "Audiovisuel",
                parcours: "Spécialisation audiovisuelle",
                niveau: "Master",
                cycle: "Master",
                duration: "2 ans",
                diploma: "Master en Audiovisuel",
                admissionRequirements: ["Licence en audiovisuel ou équivalent", "Portfolio de projets", "Entretien de motivation"],
                objectives: ["Approfondir les savoirs techniques et théoriques", "Développer une spécialisation (réalisation, production, écriture…)", "Maîtriser les enjeux contemporains du secteur"],
                skillsDeveloped: ["Analyse critique", "Création de contenus", "Direction artistique", "Gestion de projet audiovisuel", "Recherche en médias"],
                opportunities: ["Réalisateur", "Directeur de production", "Scénariste", "Chercheur en audiovisuel", "Consultant média"]
              }
            ]

      },
      {
        id: "IPM",
        name: "Institut Parcours et Métiers | Une Formation, Un Metier, Un Avenir",
        description: "IPM offre des formations de qualité en gestion d'entreprise et en gestion administrative et comptable. En nous choisissant, vous bénéficiez d'un enseignement rigoureux.",
        logo: "Images/ipemf.jpg", 
        address: "66 Bd Hassan Premier, Casablanca 20250",
        video: "https://youtu.be/hwcRRzL39dQ",
        contact: {
          phone: "+(212) 05 22 27 78 68 | 06 36 30 12 12",
          email: "ipemipemcom@gmail.com",
          website: "ipemfp.net"
        },
        registrationInfo: {
          "Tous les parcours": {
            description: "Les inscriptions sont ouvertes de février à Aout. Les dossiers peuvent être soumis en ligne ou déposés au service des admissions.",
            procedure: [
              "Remplir le formulaire de candidature",
              "Fournir les copies des diplômes et relevés de notes",
              "Passer un test d'aptitude",
              "Participer à un entretien de motivation"
            ],
            fees: "Pour toutes informations des inscription veuillez vous adressez à l'école",
            scholarships: true,
            contact: {
              phone: "+212 636-301212",
              email: "ipemipemcom@gmail.com"
            }
          }
        },
        programs: [

            /* ─────────────  SANTÉ & PARAMÉDICAL  ───────────── */

      {
        name: "Technicien Spécialisé en Gestion d’Entreprise",
        description: "Prépare des gestionnaires polyvalents capables d’assurer l’administration, la planification, le suivi des opérations et la gestion courante d’une PME ou d’un service.",
        category: "Gestion-Entreprise",
        parcours: "Management opérationnel",
        niveau: "Technicien Spécialisé",
        cycle: "Cycle Technique",
        duration: "2 ans",
        diploma: "Diplôme de Technicien Spécialisé en Gestion d’Entreprise",
        admissionRequirements: ["Bac toutes séries ou Bac +2 (gestion/économie souhaité)", "Dossier de candidature", "Entretien de motivation"],
        objectives: ["Maîtriser les outils de gestion d’une entreprise", "Gérer l’administration quotidienne et les ressources", "Participer à la prise de décision managériale", "Assurer la coordination entre services"],
        skillsDeveloped: ["Comptabilité générale", "Gestion administrative", "Organisation & planification", "Communication professionnelle", "Initiation à la stratégie"],
        opportunities: ["Assistant de direction", "Gestionnaire administratif", "Chargé de la logistique interne", "Coordinateur de projet PME"]
      },
      {
        name: "Technicien Spécialisé en Gestion Administrative et Comptable",
        description: "Forme des techniciens aptes à assurer la gestion comptable, le suivi administratif et le respect des obligations fiscales et sociales d’une entreprise.",
        category: "Comptabilité & Finances",
        parcours: "Gestion administrative",
        niveau: "Technicien Spécialisé",
        cycle: "Cycle Technique",
        duration: "2 ans",
        diploma: "Diplôme de Technicien Spécialisé en Gestion Administrative et Comptable",
        admissionRequirements: ["Bac série économique, sciences ou équivalent", "Connaissances de base en comptabilité souhaitées", "Dossier + test écrit + entretien"],
        objectives: ["Tenir la comptabilité générale et analytique", "Élaborer les déclarations fiscales", "Suivre la facturation et les règlements", "Préparer les états financiers"],
        skillsDeveloped: ["Saisie & contrôle comptable", "Déclarations fiscales et sociales", "Utilisation d’ERP comptables", "Reporting financier", "Gestion des documents administratifs"],
        opportunities: ["Assistant comptable", "Gestionnaire administratif", "Technicien paie", "Aide-comptable en entreprise ou cabinet"]
      }
    
        ]
      }
  
];