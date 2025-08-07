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

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');

  const categories = [
    { id: 'tous', name: 'Tous les articles', count: 12 },
    { id: 'cardiologie', name: 'Cardiologie', count: 3 },
    { id: 'pratique', name: 'Guide Pratique', count: 4 },
    { id: 'temoignages', name: 'Témoignages', count: 2 },
    { id: 'innovations', name: 'Innovations', count: 3 }
  ];

  const articles = [
    {
      id: 1,
      title: "Pourquoi choisir le Maroc pour vos soins cardiovasculaires ?",
      excerpt: "Découvrez comment le Maroc est devenu une destination de choix pour les soins cardiologiques, avec des équipements de pointe et des tarifs 70% moins chers qu'en Europe.",
      content: "Le Maroc s'impose aujourd'hui comme une destination médicale de premier plan pour les soins cardiovasculaires...",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      category: 'cardiologie',
      author: "Dr. Rachid Benali",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face",
      date: "15 Avril 2024",
      readTime: "8 min",
      views: 1250,
      tags: ["Cardiologie", "Économies", "Qualité"],
      featured: true
    },
    {
      id: 2,
      title: "Guide complet : Obtenir un visa médical pour le Maroc",
      excerpt: "Toutes les étapes détaillées pour obtenir rapidement votre visa médical, les documents requis et nos conseils d'experts pour éviter les erreurs.",
      content: "L'obtention d'un visa médical pour le Maroc est un processus simplifié...",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
      category: 'pratique',
      author: "Fatima Zahra",
      authorImage: "https://images.unsplash.com/photo-1594824949020-89579dc51b33?w=50&h=50&fit=crop&crop=face",
      date: "12 Avril 2024",
      readTime: "6 min",
      views: 890,
      tags: ["Visa", "Démarches", "Conseils"],
      featured: false
    },
    {
      id: 3,
      title: "Témoignage : Ma chirurgie au Maroc m'a sauvé la vie",
      excerpt: "L'histoire émouvante d'Aminata, 45 ans, du Sénégal, qui a pu bénéficier d'une chirurgie cardiaque complexe à Casablanca pour une fraction du prix européen.",
      content: "Je m'appelle Aminata Diallo et je viens du Sénégal...",
      image: "https://images.unsplash.com/photo-1551601651-bc60e02d7f16?w=600&h=400&fit=crop",
      category: 'temoignages',
      author: "Aminata Diallo",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=50&h=50&fit=crop&crop=face",
      date: "10 Avril 2024",
      readTime: "5 min",
      views: 2100,
      tags: ["Témoignage", "Chirurgie", "Succès"],
      featured: true
    },
    {
      id: 4,
      title: "Comparatif des coûts : Maroc vs Europe pour 10 interventions",
      excerpt: "Analyse détaillée des tarifs pour les interventions les plus demandées. Découvrez vos économies potentielles avec des exemples concrets et chiffrés.",
      content: "Dans cette analyse comparative, nous examinons les coûts...",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      category: 'pratique',
      author: "Service Économique MHS",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      date: "8 Avril 2024",
      readTime: "12 min",
      views: 1680,
      tags: ["Coûts", "Comparaison", "Économies"],
      featured: false
    },
    {
      id: 5,
      title: "Révolution technologique : L'IA au service du diagnostic",
      excerpt: "Comment l'intelligence artificielle transforme les diagnostics médicaux au Maroc. Tour d'horizon des innovations disponibles dans nos cliniques partenaires.",
      content: "L'intelligence artificielle révolutionne la médecine...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      category: 'innovations',
      author: "Dr. Hassan El Amri",
      authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face",
      date: "5 Avril 2024",
      readTime: "10 min",
      views: 945,
      tags: ["IA", "Innovation", "Diagnostic"],
      featured: false
    },
    {
      id: 6,
      title: "Préparer son séjour médical : Check-list complète",
      excerpt: "La liste exhaustive de tout ce qu'il faut préparer avant votre départ : documents, bagages, hébergement, transport et recommandations post-opératoires.",
      content: "Un séjour médical réussi commence par une bonne préparation...",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
      category: 'pratique',
      author: "Équipe Coordination",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face",
      date: "3 Avril 2024",
      readTime: "7 min",
      views: 1320,
      tags: ["Préparation", "Voyage", "Conseils"],
      featured: false
    }
  ];

  const filteredArticles = selectedCategory === 'tous' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  return (
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
                    src={article.image} 
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
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
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
                    
                    <button className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
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
                  src={article.image} 
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
                  <img 
                    src={article.authorImage} 
                    alt={article.author}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
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
                    <ShareIcon className="h-4 w-4 ml-4 mr-1" />
                    <span>Partager</span>
                  </div>
                  
                  <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
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
    </section>
  );
};

export default Blog;