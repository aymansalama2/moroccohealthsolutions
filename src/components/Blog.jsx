import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  TagIcon,
  ArrowRightIcon,
  EyeIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

// Styles CSS pour améliorer la typographie des articles
const articleStyles = `
  .article-content h3 {
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    color: #1f2937 !important;
    margin-top: 2rem !important;
    margin-bottom: 1rem !important;
    line-height: 1.3 !important;
    border-left: 4px solid #3b82f6 !important;
    padding-left: 1rem !important;
    position: relative !important;
    transition: all 0.3s ease !important;
  }

  .article-content h3:hover {
    border-left-color: #059669 !important;
    transform: translateX(5px) !important;
  }

  .article-content h3:first-child {
    margin-top: 0 !important;
  }

  .article-content p {
    font-size: 1.125rem !important;
    line-height: 1.7 !important;
    color: #374151 !important;
    margin-bottom: 1.5rem !important;
    text-align: justify !important;
    transition: all 0.3s ease !important;
  }

  .article-content p:hover {
    color: #1f2937 !important;
  }

  .article-content ul {
    margin-bottom: 1.5rem !important;
    padding-left: 1.5rem !important;
    list-style: none !important;
  }

  .article-content li {
    font-size: 1.125rem !important;
    line-height: 1.6 !important;
    color: #374151 !important;
    margin-bottom: 0.8rem !important;
    font-weight: 400 !important;
    position: relative !important;
    padding-left: 1.5rem !important;
    transition: all 0.3s ease !important;
  }

  .article-content li:before {
    content: "✓" !important;
    position: absolute !important;
    left: 0 !important;
    color: #059669 !important;
    font-weight: bold !important;
    font-size: 1rem !important;
  }

  .article-content li:hover {
    color: #1f2937 !important;
    transform: translateX(3px) !important;
  }

  .article-content h3:last-child {
    font-size: 2rem !important;
    font-weight: 800 !important;
    color: #059669 !important;
    text-align: center !important;
    margin-top: 3rem !important;
    margin-bottom: 1.5rem !important;
    border-left: none !important;
    padding-left: 0 !important;
    border-bottom: 3px solid #059669 !important;
    padding-bottom: 0.5rem !important;
    position: relative !important;
    overflow: hidden !important;
  }

  .article-content h3:last-child:after {
    content: "" !important;
    position: absolute !important;
    bottom: 0 !important;
    left: 50% !important;
    width: 0 !important;
    height: 3px !important;
    background: linear-gradient(90deg, #059669, #3b82f6) !important;
    transition: width 0.5s ease !important;
    transform: translateX(-50%) !important;
  }

  .article-content h3:last-child:hover:after {
    width: 100% !important;
  }

  /* Styles pour les images explicatives */
  .explanatory-images {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
    border-radius: 1rem !important;
    padding: 2rem !important;
    margin: 2rem 0 !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
  }

  .explanatory-images h3 {
    color: #1f2937 !important;
    font-size: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    text-align: center !important;
    border-left: none !important;
    padding-left: 0 !important;
  }

  .image-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 1.5rem !important;
  }

  .image-item {
    position: relative !important;
    overflow: hidden !important;
    border-radius: 1rem !important;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.4s ease !important;
  }

  .image-item:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
  }

  .image-item img {
    width: 100% !important;
    height: 250px !important;
    object-fit: cover !important;
    transition: transform 0.4s ease !important;
  }

  .image-item:hover img {
    transform: scale(1.05) !important;
  }

  .image-overlay {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7)) !important;
    color: white !important;
    padding: 1rem !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }

  .image-item:hover .image-overlay {
    opacity: 1 !important;
  }

  /* Animation pour le contenu */
  .article-content {
    animation: fadeInUp 0.6s ease-out !important;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0 !important;
      transform: translateY(20px) !important;
    }
    to {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }

  /* Styles pour les statistiques */
  .stats-section {
    background: linear-gradient(135deg, #3b82f6 0%, #059669 100%) !important;
    color: white !important;
    padding: 2rem !important;
    border-radius: 1rem !important;
    margin: 2rem 0 !important;
    text-align: center !important;
  }

  .stats-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
    gap: 1.5rem !important;
    margin-top: 1.5rem !important;
  }

  .stat-item {
    padding: 1rem !important;
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 0.5rem !important;
    backdrop-filter: blur(10px) !important;
  }

  .stat-number {
    font-size: 2rem !important;
    font-weight: bold !important;
    display: block !important;
  }

  .stat-label {
    font-size: 0.9rem !important;
    opacity: 0.9 !important;
  }
`;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentImage, setCommentImage] = useState(null);
  const [comments, setComments] = useState({
    1: [
      {
        id: 1,
        text: "Excellent article ! J'ai eu une chirurgie cardiaque au Maroc l'année dernière. L'équipe était exceptionnelle et j'ai économisé plus de 30,000€ par rapport à la France.",
        author: "Aminata D.",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        date: "Il y a 2 jours",
        likes: 12,
        userImage: null
      },
      {
        id: 2,
        text: "Merci pour ces informations détaillées. Je prévois un séjour médical au Maroc et cet article m'aide beaucoup dans ma préparation.",
        author: "Ibrahim T.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 8,
        userImage: null
      },
      {
        id: 3,
        text: "Très informatif ! Je recommande vivement le Maroc pour les soins médicaux. Qualité exceptionnelle et coûts abordables.",
        author: "Fatima Z.",
        authorImage: null,
        date: "Il y a 3 jours",
        likes: 6,
        userImage: null
      },
      {
        id: 4,
        text: "J'ai été soigné au Maroc l'année dernière. L'accueil était chaleureux et les médecins très compétents. Je recommande !",
        author: "Ahmed B.",
        authorImage: null,
        date: "Il y a 5 jours",
        likes: 9,
        userImage: null
      },
      {
        id: 5,
        text: "Article très complet. Les statistiques sont impressionnantes et donnent confiance pour un séjour médical au Maroc.",
        author: "Sarah M.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 7,
        userImage: null
      },
      {
        id: 6,
        text: "Je prévois un séjour médical au Maroc et cet article m'a convaincu. Les témoignages sont rassurants.",
        author: "Mohammed K.",
        authorImage: null,
        date: "Il y a 4 jours",
        likes: 4,
        userImage: null
      },
      {
        id: 7,
        text: "Excellente présentation des avantages du Maroc. L'accompagnement semble vraiment complet et professionnel.",
        author: "Leila R.",
        authorImage: null,
        date: "Il y a 6 jours",
        likes: 11,
        userImage: null
      }
    ],
    2: [
      {
        id: 8,
        text: "J'ai fait mes implants dentaires au Maroc il y a 6 mois. Résultat parfait et j'ai économisé 70% par rapport aux prix français !",
        author: "Marie L.",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=40&h=40&fit=crop&crop=face",
        date: "Il y a 3 jours",
        likes: 15,
        userImage: null
      },
      {
        id: 9,
        text: "Très satisfait de mon traitement dentaire au Maroc. L'équipe était professionnelle et le résultat est excellent.",
        author: "Pierre D.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 8,
        userImage: null
      },
      {
        id: 10,
        text: "Je recommande vivement les soins dentaires au Maroc. Qualité européenne à prix africain !",
        author: "Sophie M.",
        authorImage: null,
        date: "Il y a 4 jours",
        likes: 12,
        userImage: null
      },
      {
        id: 11,
        text: "Article très informatif sur les implants dentaires. Les explications sont claires et rassurantes.",
        author: "Karim A.",
        authorImage: null,
        date: "Il y a 2 semaines",
        likes: 6,
        userImage: null
      },
      {
        id: 12,
        text: "J'ai économisé plus de 5000€ pour mes implants dentaires au Maroc. Service impeccable !",
        author: "Nadia B.",
        authorImage: null,
        date: "Il y a 5 jours",
        likes: 9,
        userImage: null
      },
      {
        id: 13,
        text: "Très bon article sur les implants dentaires. Le Maroc est vraiment une destination de choix pour les soins dentaires.",
        author: "Thomas L.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 7,
        userImage: null
      },
      {
        id: 14,
        text: "Je prévois mes implants dentaires au Maroc grâce à cet article. Les témoignages sont encourageants.",
        author: "Amina S.",
        authorImage: null,
        date: "Il y a 3 jours",
        likes: 5,
        userImage: null
      }
    ],
    3: [
      {
        id: 15,
        text: "J'ai fait ma chirurgie bariatrique au Maroc il y a 8 mois. J'ai perdu 45kg et ma vie a complètement changé !",
        author: "Claire M.",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=40&h=40&fit=crop&crop=face",
        date: "Il y a 2 jours",
        likes: 18,
        userImage: null
      },
      {
        id: 16,
        text: "Excellent article sur la chirurgie bariatrique. Le Maroc offre vraiment des soins de qualité à prix abordable.",
        author: "Marc D.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 11,
        userImage: null
      },
      {
        id: 17,
        text: "Je recommande la chirurgie bariatrique au Maroc. L'équipe était exceptionnelle et j'ai économisé 60%.",
        author: "Nadia K.",
        authorImage: null,
        date: "Il y a 4 jours",
        likes: 14,
        userImage: null
      },
      {
        id: 18,
        text: "Très informatif ! J'ai perdu 35kg après ma chirurgie bariatrique au Maroc. Ma qualité de vie s'est considérablement améliorée.",
        author: "Sophie L.",
        authorImage: null,
        date: "Il y a 3 semaines",
        likes: 16,
        userImage: null
      },
      {
        id: 19,
        text: "Article très complet sur la chirurgie bariatrique. Les explications sont claires et rassurantes.",
        author: "Ahmed T.",
        authorImage: null,
        date: "Il y a 5 jours",
        likes: 8,
        userImage: null
      },
      {
        id: 20,
        text: "Je prévois ma chirurgie bariatrique au Maroc grâce à cet article. Les témoignages sont très encourageants.",
        author: "Marie P.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 9,
        userImage: null
      },
      {
        id: 21,
        text: "Excellente présentation de la chirurgie bariatrique au Maroc. L'accompagnement semble vraiment professionnel.",
        author: "Karim B.",
        authorImage: null,
        date: "Il y a 6 jours",
        likes: 7,
        userImage: null
      }
    ],
    4: [
      {
        id: 22,
        text: "J'ai fait ma chirurgie de la cataracte au Maroc il y a 3 mois. Vision parfaite maintenant !",
        author: "Jean P.",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        date: "Il y a 2 jours",
        likes: 13,
        userImage: null
      },
      {
        id: 23,
        text: "Très satisfait de mon opération de la cataracte au Maroc. Intervention rapide et résultat excellent.",
        author: "Françoise M.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 10,
        userImage: null
      },
      {
        id: 24,
        text: "Je recommande la chirurgie de la cataracte au Maroc. Équipe compétente et coûts abordables.",
        author: "Mohammed A.",
        authorImage: null,
        date: "Il y a 4 jours",
        likes: 8,
        userImage: null
      },
      {
        id: 25,
        text: "Article très informatif sur la cataracte. Les explications sont claires et rassurantes.",
        author: "Nadia S.",
        authorImage: null,
        date: "Il y a 2 semaines",
        likes: 6,
        userImage: null
      },
      {
        id: 26,
        text: "J'ai économisé 50% pour ma chirurgie de la cataracte au Maroc. Qualité identique à l'Europe !",
        author: "Pierre L.",
        authorImage: null,
        date: "Il y a 5 jours",
        likes: 11,
        userImage: null
      },
      {
        id: 27,
        text: "Très bon article sur la cataracte. Le Maroc est une excellente destination pour cette intervention.",
        author: "Amina K.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 7,
        userImage: null
      },
      {
        id: 28,
        text: "Je prévois ma chirurgie de la cataracte au Maroc grâce à cet article. Les témoignages sont rassurants.",
        author: "Thomas B.",
        authorImage: null,
        date: "Il y a 3 jours",
        likes: 9,
        userImage: null
      }
    ],
    5: [
      {
        id: 29,
        text: "Nous avons fait notre FIV au Maroc et nous attendons un bébé ! L'équipe était exceptionnelle.",
        author: "Sarah et Marc",
        authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=40&h=40&fit=crop&crop=face",
        date: "Il y a 2 jours",
        likes: 25,
        userImage: null
      },
      {
        id: 30,
        text: "Très satisfaite de notre parcours FIV au Maroc. Personnel empathique et résultats excellents.",
        author: "Leila M.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 18,
        userImage: null
      },
      {
        id: 31,
        text: "Je recommande la FIV au Maroc. Équipements modernes et accompagnement personnalisé.",
        author: "Fatima A.",
        authorImage: null,
        date: "Il y a 4 jours",
        likes: 12,
        userImage: null
      },
      {
        id: 32,
        text: "Article très informatif sur la FIV. Le Maroc offre vraiment des soins de qualité pour la fertilité.",
        author: "Karim et Amina",
        authorImage: null,
        date: "Il y a 2 semaines",
        likes: 15,
        userImage: null
      },
      {
        id: 33,
        text: "Nous avons économisé 60% pour notre FIV au Maroc. Résultat positif et bébé en route !",
        author: "Sophie et Pierre",
        authorImage: null,
        date: "Il y a 5 jours",
        likes: 20,
        userImage: null
      },
      {
        id: 34,
        text: "Très bon article sur la FIV au Maroc. L'accompagnement psychologique était excellent.",
        author: "Nadia L.",
        authorImage: null,
        date: "Il y a 1 semaine",
        likes: 9,
        userImage: null
      },
      {
        id: 35,
        text: "Je prévois ma FIV au Maroc grâce à cet article. Les témoignages sont très encourageants.",
        author: "Marie K.",
        authorImage: null,
        date: "Il y a 3 jours",
        likes: 11,
        userImage: null
      }
    ]
  });
  const [likes, setLikes] = useState({});

  const categories = [
    { id: 'tous', name: 'Tous les articles', count: 5 },
    { id: 'chirurgie', name: 'Chirurgie', count: 1 },
    { id: 'traitement', name: 'Traitements', count: 4 },
    { id: 'conseils', name: 'Conseils', count: 1 }
  ];

  const articles = [
    {
      id: 1,
      title: "Pourquoi choisir le Maroc pour vos soins médicaux ?",
      excerpt: "Le Maroc s'impose comme une destination de plus en plus recherchée pour les soins médicaux. Entre la qualité des infrastructures hospitalières, l'expertise des médecins et les coûts attractifs, le pays attire chaque année des milliers de patients étrangers.",
      content: `
        <p>Le Maroc s'impose comme une destination de plus en plus recherchée pour les soins médicaux. Entre la qualité des infrastructures hospitalières, l'expertise des médecins et les coûts attractifs, le pays attire chaque année des milliers de patients étrangers.</p>

        <h3>1. Une médecine de haut niveau</h3>
        <p>Le système de santé marocain s'est considérablement modernisé. Des cliniques privées équipées de technologies de pointe assurent des interventions chirurgicales complexes : chirurgie cardiovasculaire, cancérologie, ophtalmologie, soins dentaires...</p>

        <h3>2. Des professionnels compétents et formés à l'international</h3>
        <p>Les médecins marocains sont nombreux à avoir été formés en France, au Canada ou en Belgique. Ils parlent souvent français et anglais, facilitant la communication avec les patients internationaux.</p>

        <h3>3. Des coûts réduits pour une qualité équivalente</h3>
        <p>Les tarifs pratiqués au Maroc sont en moyenne 50 % à 70 % moins chers que dans les pays européens, pour des soins de qualité équivalente. Cette économie permet aussi d'inclure l'hébergement et le transport.</p>

        <h3>4. Un cadre rassurant et accueillant</h3>
        <p>Climat tempéré, hôtels haut de gamme, personnel chaleureux : le Maroc offre un environnement idéal pour une convalescence sereine.</p>

        <h3>Conclusion</h3>
        <p>Pour des soins médicaux fiables, économiques et humains, le Maroc est une destination à privilégier. Morocco Health Solutions vous accompagne de A à Z dans votre parcours médical.</p>
      `,
      mainImage: "/images/docteur-faisant-leur-travail-dans-le-bureau-de-pediatrie.jpg",
      explanatoryImages: [
        "/images/docteur-faisant-leur-travail-dans-le-bureau-de-pediatrie.jpg",
        "/images/salle-de-clinique-pour-le-diagnostic-neurologique.jpg"
      ],
      category: 'conseils',
      author: "Dr. Ahmed Zghari",
      authorImage: null,
              date: "20 Janvier 2025",
      readTime: "6 min",
      views: 1250,
      tags: ["Soins médicaux", "Maroc", "Qualité"],
      featured: true
    },
    {
      id: 2,
      title: "Tout savoir sur les implants dentaires au Maroc",
      excerpt: "Les implants dentaires sont une solution efficace et durable pour remplacer une ou plusieurs dents manquantes. Le Maroc est aujourd'hui une destination prisée pour ce type d'intervention.",
      content: `
        <p>Les implants dentaires sont une solution efficace et durable pour remplacer une ou plusieurs dents manquantes. Le Maroc est aujourd'hui une destination prisée pour ce type d'intervention.</p>

        <h3>1. Qu'est-ce qu'un implant dentaire ?</h3>
        <p>Un implant est une vis en titane insérée dans l'os de la mâchoire pour remplacer la racine d'une dent absente. Il permet ensuite de fixer une couronne artificielle.</p>

        <h3>2. Pourquoi choisir le Maroc ?</h3>
        <ul>
          <li>Chirurgiens spécialisés</li>
          <li>Matériaux de haute qualité</li>
          <li>Tarifs 2 à 3 fois inférieurs à ceux d'Europe</li>
        </ul>

        <h3>3. Déroulement de l'intervention</h3>
        <ul>
          <li>Consultation préalable</li>
          <li>Pose de l'implant sous anesthésie locale</li>
          <li>Temps de cicatrisation (2 à 4 mois)</li>
          <li>Pose de la couronne</li>
        </ul>

        <h3>4. Résultats et durée de vie</h3>
        <p>Un implant bien posé peut durer 10 à 20 ans. Un bon suivi et une hygiène bucco-dentaire rigoureuse sont essentiels.</p>

        <h3>Conclusion</h3>
        <p>Faire ses implants dentaires au Maroc, c'est allier compétence médicale, économie et confort. Morocco Health Solutions vous met en relation avec les meilleurs experts.</p>
      `,
      mainImage: "/images/image article 2.jpg",
      explanatoryImages: [
        "/images/femme-dans-un-fauteuil-dentaire-le-dentiste-enseigne-les-soins-appropries-la-beaute-soigne-ses-dents.jpg",
        "/images/jeune-beau-medecin-dans-un-peignoir-medical-avec-stethoscope.jpg"
      ],
      category: 'traitement',
      author: "Dr. Fatima Tbarki",
      authorImage: null,
              date: "18 Janvier 2025",
      readTime: "8 min",
      views: 890,
      tags: ["Implants dentaires", "Dentisterie", "Chirurgie"],
      featured: true
    },
    {
      id: 3,
      title: "Chirurgie bariatrique au Maroc : la solution pour perdre du poids durablement",
      excerpt: "La chirurgie bariatrique est indiquée pour les personnes souffrant d'obésité morbide. Le Maroc offre un encadrement médical sérieux et des techniques modernes pour ce type d'intervention.",
      content: `
        <p>La chirurgie bariatrique est indiquée pour les personnes souffrant d'obésité morbide. Le Maroc offre un encadrement médical sérieux et des techniques modernes pour ce type d'intervention.</p>

        <h3>1. Quelles techniques ?</h3>
        <ul>
          <li>Sleeve gastrectomie</li>
          <li>Bypass gastrique</li>
          <li>Anneau gastrique</li>
        </ul>

        <h3>2. Pour qui ?</h3>
        <p>Patients avec un IMC élevé, et des comorbidités (diabète, hypertension...).</p>

        <h3>3. Bénéfices attendus</h3>
        <ul>
          <li>Perte de poids rapide et durable</li>
          <li>Amélioration de la santé générale</li>
          <li>Amélioration de la qualité de vie</li>
        </ul>

        <h3>4. Pourquoi au Maroc ?</h3>
        <ul>
          <li>Chirurgiens expérimentés</li>
          <li>Cliniques spécialisées</li>
          <li>Coûts très compétitifs</li>
        </ul>

        <h3>Conclusion</h3>
        <p>La chirurgie bariatrique peut changer une vie. Morocco Health Solutions vous aide à franchir cette étape avec confiance.</p>
      `,
      mainImage: "/article3.png",
      explanatoryImages: [
        "/images/pexels-photo-7583380.jpeg",
        "/images/docteur-faisant-leur-travail-dans-le-bureau-de-pediatrie.jpg"
      ],
      category: 'chirurgie',
      author: "Dr. Karim Nfissi",
      authorImage: null,
              date: "15 Janvier 2025",
      readTime: "8 min",
      views: 1680,
      tags: ["Chirurgie bariatrique", "Obésité", "Perte de poids"],
      featured: true
    },
    {
      id: 4,
      title: "Chirurgie de la cataracte au Maroc : ce qu'il faut savoir",
      excerpt: "La cataracte touche de nombreuses personnes à partir de 60 ans. Au Maroc, cette opération est courante, rapide et réalisée par des experts ophtalmologues.",
      content: `
        <p>La cataracte touche de nombreuses personnes à partir de 60 ans. Au Maroc, cette opération est courante, rapide et réalisée par des experts ophtalmologues.</p>

        <h3>1. Symptômes et diagnostic</h3>
        <ul>
          <li>Vision floue</li>
          <li>Sensibilité à la lumière</li>
          <li>Difficulté à lire ou à conduire</li>
        </ul>

        <h3>2. Déroulement de l'intervention</h3>
        <ul>
          <li>15 minutes en ambulatoire</li>
          <li>Extraction du cristallin opacifié</li>
          <li>Implantation d'une lentille intraoculaire</li>
        </ul>

        <h3>3. Récupération</h3>
        <ul>
          <li>Amélioration de la vision en 24h</li>
          <li>Repos de quelques jours</li>
          <li>Contrôles post-opératoires</li>
        </ul>

        <h3>4. Pourquoi faire l'opération au Maroc ?</h3>
        <ul>
          <li>Réactivité et disponibilité des ophtalmologues</li>
          <li>Prise en charge rapide</li>
          <li>Coûts réduits</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Une vision claire, c'est une vie meilleure. Morocco Health Solutions facilite votre accès aux meilleurs soins ophtalmologiques.</p>
      `,
      mainImage: "/images/image article 4 .png",
      explanatoryImages: [
        "/images/article 4 1.png",
        "/images/article 4 2 .png"
      ],
      category: 'traitement',
      author: "Dr. Leila Mghari",
      authorImage: null,
              date: "12 Janvier 2025",
      readTime: "7 min",
      views: 945,
      tags: ["Cataracte", "Ophtalmologie", "Chirurgie oculaire"],
      featured: true
    },
    {
      id: 5,
      title: "FIV au Maroc : un espoir pour les couples internationaux",
      excerpt: "La Fécondation In Vitro (FIV) est une technique répandue pour lutter contre l'infertilité. Le Maroc offre des centres de fertilité modernes et un accompagnement humain pour les couples locaux et étrangers.",
      content: `
        <p>La Fécondation In Vitro (FIV) est une technique répandue pour lutter contre l'infertilité. Le Maroc offre des centres de fertilité modernes et un accompagnement humain pour les couples locaux et étrangers.</p>

        <h3>1. En quoi consiste la FIV ?</h3>
        <ul>
          <li>Stimulation hormonale</li>
          <li>Prélèvement des ovocytes et sperme</li>
          <li>Fécondation en laboratoire</li>
          <li>Transfert d'embryon</li>
        </ul>

        <h3>2. Pour quels couples ?</h3>
        <ul>
          <li>Infertilité inexpliquée</li>
          <li>Problèmes d'ovulation, trompes bouchées</li>
          <li>Pathologies masculines (faible nombre de spermatozoïdes)</li>
        </ul>

        <h3>3. Pourquoi choisir le Maroc ?</h3>
        <ul>
          <li>Centres FIV équipés</li>
          <li>Personnel empathique</li>
          <li>Législation favorable aux étrangers mariés</li>
        </ul>

        <h3>Conclusion</h3>
        <p>La FIV au Maroc est une réalité accessible et bien encadrée. Morocco Health Solutions est à vos côtés dans ce parcours de vie important.</p>
      `,
      mainImage: "/images/image article 5 .png",
      explanatoryImages: [
        "/images/article 5 1.png",
        "/images/heureux-couple-souriant-apres-avoir-decouvert-un-test-de-grossesse-positif-dans-la-chambre.jpg"
      ],
      category: 'traitement',
            author: "Dr. Omar Sghiri",
      authorImage: null,
      date: "10 Janvier 2025",
      readTime: "8 min",
      views: 1320,
      tags: ["FIV", "Fertilité", "Infertilité"],
      featured: true
    }
  ];

  const filteredArticles = selectedCategory === 'tous' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  // Fonction pour partager un article
  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href + '#article-' + article.id,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      const url = window.location.href + '#article-' + article.id;
      navigator.clipboard.writeText(url).then(() => {
        alert('Lien copié dans le presse-papiers !');
      });
    }
  };

  // Fonction pour ajouter un commentaire
  const handleAddComment = (articleId) => {
    if (commentText.trim() && commentName.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        author: commentName,
        authorImage: commentImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        date: new Date().toLocaleDateString('fr-FR'),
        likes: 0,
        userImage: commentImage
      };

      setComments(prev => ({
        ...prev,
        [articleId]: [...(prev[articleId] || []), newComment]
      }));
      setCommentText('');
      setCommentName('');
      setCommentImage(null);
    }
  };

  // Fonction pour gérer l'upload d'image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommentImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour liker un commentaire
  const handleLikeComment = (articleId, commentId) => {
    setComments(prev => ({
      ...prev,
      [articleId]: prev[articleId].map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    }));
  };

  // Fonction pour liker un article
  const handleLikeArticle = (articleId) => {
    setLikes(prev => ({
      ...prev,
      [articleId]: (prev[articleId] || 0) + 1
    }));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: articleStyles }} />
    <section id="blog" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Articles & <span className="gradient-text">Actualités Santé</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Restez informé avec nos derniers articles sur les soins médicaux au Maroc, 
            guides pratiques et témoignages de patients.
          </p>
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <BookmarkIcon className="h-6 w-6 text-primary-600 mr-2" />
            Articles à la Une
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={article.mainImage} 
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      À la Une
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {article.readTime} de lecture
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {article.authorImage ? (
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{article.author}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center text-gray-500 text-sm">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setSelectedArticle(article)}
                      className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
                    >
                      Lire la suite
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.filter(article => !article.featured).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img 
                  src={article.mainImage} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-semibold capitalize">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-gray-500">
                  {article.authorImage ? (
                  <img 
                    src={article.authorImage} 
                    alt={article.author}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h4>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {article.views}
                       <button 
                         onClick={() => handleShare(article)}
                         className="flex items-center ml-4 hover:text-primary-600 transition-colors"
                       >
                         <ShareIcon className="h-4 w-4 mr-1" />
                    <span>Partager</span>
                       </button>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                  >
                    Lire →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Restez Informé de nos Derniers Articles</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Recevez chaque semaine nos nouveaux articles, conseils santé et témoignages patients 
            directement dans votre boîte mail.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              S'abonner
            </button>
          </div>
          
          <p className="text-primary-200 text-sm mt-4">
            Pas de spam. Désabonnement facile à tout moment.
          </p>
        </motion.div>
      </div>

             {/* Article Modal */}
       {selectedArticle && (
         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">
             <div className="relative">
               {/* Header avec image de fond */}
               <div className="relative h-80 bg-gradient-to-r from-primary-600 to-primary-700 rounded-t-3xl overflow-hidden">
                 <img 
                   src={selectedArticle.mainImage} 
                   alt={selectedArticle.title}
                   className="w-full h-full object-cover opacity-20"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                   <div className="flex justify-between items-start">
                     <div className="flex-1">
                       <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                         {selectedArticle.title}
                       </h2>
                       <div className="flex items-center space-x-4 text-white/90">
                         <div className="flex items-center">
                           {selectedArticle.authorImage ? (
                             <img 
                               src={selectedArticle.authorImage} 
                               alt={selectedArticle.author}
                               className="w-8 h-8 rounded-full object-cover mr-2"
                             />
                           ) : (
                             <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mr-2">
                               <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                               </svg>
                             </div>
                           )}
                           <span className="font-semibold">{selectedArticle.author}</span>
                         </div>
                         <span>•</span>
                         <span>{selectedArticle.date}</span>
                         <span>•</span>
                         <span>{selectedArticle.readTime}</span>
                       </div>
                     </div>
                     <button 
                       onClick={() => setSelectedArticle(null)}
                       className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                     >
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>

                               {/* Contenu de l'article */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: selectedArticle.content }} 
                    />
                  </div>

                                   {/* Photos explicatives avec design amélioré */}
                  {selectedArticle.explanatoryImages && selectedArticle.explanatoryImages.length > 0 && (
                    <div className="explanatory-images">
                      <h3 className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Galerie d'images
                      </h3>
                      <div className="image-grid">
                        {selectedArticle.explanatoryImages.map((image, index) => (
                          <div key={index} className="image-item">
                            <img 
                              src={image} 
                              alt={`Photo explicative ${index + 1}`}
                            />
                            <div className="image-overlay">
                              <span className="text-sm font-semibold">
                                {selectedArticle.id === 1 
                                  ? (index === 0 ? "Infrastructure médicale moderne" : "Équipement de diagnostic avancé")
                                  : selectedArticle.id === 2
                                  ? (index === 0 ? "Consultation dentaire spécialisée" : "Expertise médicale reconnue")
                                  : selectedArticle.id === 3
                                  ? (index === 0 ? "Chirurgie bariatrique moderne" : "Consultation médicale spécialisée")
                                  : selectedArticle.id === 4
                                  ? (index === 0 ? "Chirurgie ophtalmologique moderne" : "Équipement médical spécialisé")
                                  : (index === 0 ? "Laboratoire de fertilité moderne" : "Accompagnement personnalisé")
                                }
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                                    )}

                  {/* Section statistiques pour l'article 1 */}
                  {selectedArticle.id === 1 && (
                    <div className="stats-section">
                      <h3 className="text-xl font-bold mb-4">Chiffres clés du tourisme médical au Maroc</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">50-70%</span>
                          <span className="stat-label">Économies réalisées</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">15,000+</span>
                          <span className="stat-label">Patients étrangers/an</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">95%</span>
                          <span className="stat-label">Taux de satisfaction</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">24/7</span>
                          <span className="stat-label">Accompagnement</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section statistiques pour l'article 2 */}
                  {selectedArticle.id === 2 && (
                    <div className="stats-section">
                      <h3 className="text-xl font-bold mb-4">Chiffres clés des implants dentaires au Maroc</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">60-70%</span>
                          <span className="stat-label">Économies réalisées</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">10-20 ans</span>
                          <span className="stat-label">Durée de vie moyenne</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">98%</span>
                          <span className="stat-label">Taux de réussite</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">2-4 mois</span>
                          <span className="stat-label">Temps de cicatrisation</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section statistiques pour l'article 3 */}
                  {selectedArticle.id === 3 && (
                    <div className="stats-section">
                      <h3 className="text-xl font-bold mb-4">Chiffres clés de la chirurgie bariatrique au Maroc</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">50-80%</span>
                          <span className="stat-label">Perte de poids moyenne</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">95%</span>
                          <span className="stat-label">Taux de réussite</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">60-70%</span>
                          <span className="stat-label">Économies réalisées</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">2-3 jours</span>
                          <span className="stat-label">Durée d'hospitalisation</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section statistiques pour l'article 4 */}
                  {selectedArticle.id === 4 && (
                    <div className="stats-section">
                      <h3 className="text-xl font-bold mb-4">Chiffres clés de la chirurgie de la cataracte au Maroc</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">15 min</span>
                          <span className="stat-label">Durée de l'intervention</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">98%</span>
                          <span className="stat-label">Taux de réussite</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">24h</span>
                          <span className="stat-label">Amélioration de la vision</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">50-60%</span>
                          <span className="stat-label">Économies réalisées</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section statistiques pour l'article 5 */}
                  {selectedArticle.id === 5 && (
                    <div className="stats-section">
                      <h3 className="text-xl font-bold mb-4">Chiffres clés de la FIV au Maroc</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">35-40%</span>
                          <span className="stat-label">Taux de réussite par cycle</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">60-70%</span>
                          <span className="stat-label">Économies réalisées</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">15 jours</span>
                          <span className="stat-label">Durée du traitement</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">24/7</span>
                          <span className="stat-label">Accompagnement</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Statistiques et tags */}
                 <div className="mt-8 pt-6 border-t border-gray-200">
                   <div className="flex items-center justify-between">
                                           <div className="flex items-center space-x-6">
                        <div className="flex items-center text-gray-500">
                          <EyeIcon className="h-5 w-5 mr-2" />
                          <span>{selectedArticle.views} vues</span>
                        </div>
                        <button 
                          onClick={() => handleShare(selectedArticle)}
                          className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          <ShareIcon className="h-5 w-5 mr-2" />
                          <span>Partager</span>
                        </button>
                        <button 
                          onClick={() => handleLikeArticle(selectedArticle.id)}
                          className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{likes[selectedArticle.id] || 0} j'aime</span>
                        </button>
                      </div>
                     <div className="flex flex-wrap gap-2">
                       {selectedArticle.tags.map((tag, index) => (
                         <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* Section Commentaires */}
                 <div className="mt-12 pt-8 border-t border-gray-200">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                     <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                     </svg>
                     Commentaires ({selectedArticle.views > 100 ? Math.floor(selectedArticle.views / 10) : 0})
                   </h3>
                   
                                       {/* Formulaire de commentaire amélioré */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          {/* Champ nom */}
                          <div className="mb-4">
                            <input
                              type="text"
                              value={commentName}
                              onChange={(e) => setCommentName(e.target.value)}
                              placeholder="Votre nom *"
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          
                          {/* Zone de texte */}
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Partagez votre expérience ou posez une question..."
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            rows="4"
                          ></textarea>
                          
                          {/* Image uploadée */}
                          {commentImage && (
                            <div className="mt-4 relative">
                              <img 
                                src={commentImage} 
                                alt="Image du commentaire"
                                className="w-32 h-32 object-cover rounded-lg"
                              />
                              <button 
                                onClick={() => setCommentImage(null)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center text-gray-500 hover:text-primary-600 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Ajouter une photo
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <button 
                              onClick={() => handleAddComment(selectedArticle.id)}
                              disabled={!commentText.trim() || !commentName.trim()}
                              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                              Publier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                                       {/* Liste des commentaires dynamique */}
                    <div className="space-y-6">
                      {/* Commentaires existants */}
                      {(comments[selectedArticle.id] || []).map((comment) => (
                        <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            {comment.authorImage ? (
                              <img 
                                src={comment.authorImage}
                                alt={comment.author}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold text-gray-900">{comment.author}</span>
                                <span className="text-gray-500 text-sm">•</span>
                                <span className="text-gray-500 text-sm">{comment.date}</span>
                              </div>
                              <p className="text-gray-700 mb-3">{comment.text}</p>
                              
                              {/* Image du commentaire si présente */}
                              {comment.userImage && (
                                <div className="mb-3">
                                  <img 
                                    src={comment.userImage} 
                                    alt="Image du commentaire"
                                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                                  />
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center hover:text-primary-600 transition-colors">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                  Répondre
                                </button>
                                <button 
                                  onClick={() => handleLikeComment(selectedArticle.id, comment.id)}
                                  className="flex items-center hover:text-red-500 transition-colors"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  J'aime ({comment.likes})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
               )}
    </section>
     </>
  );
};

export default Blog;