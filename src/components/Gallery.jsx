import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PlayIcon,
  MapPinIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('tous');

  const categories = [
    { id: 'tous', name: 'Toutes les photos' },
    { id: 'cliniques', name: 'Nos Cliniques' },
    { id: 'equipements', name: 'Équipements Médicaux' },
    { id: 'equipe', name: 'Notre Équipe' },
    { id: 'services', name: 'Services Médicaux' }
  ];

  const galleryImages = [
    {
      id: 1,
      title: "Bloc Opératoire Cardiaque - Clinique Al Madina",
      description: "Salle d'opération équipée des dernières technologies pour chirurgie cardiaque",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      category: 'cliniques',
      location: "Casablanca",
      type: "photo"
    },
    {
      id: 2,
      title: "IRM 3 Tesla Dernière Génération",
      description: "Équipement d'imagerie médicale de pointe pour diagnostics précis",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=600&fit=crop",
      category: 'equipements',
      location: "Rabat",
      type: "photo"
    },
    {
      id: 3,
      title: "Dr. Rachid Benali en Consultation",
      description: "Notre cardiologue principal lors d'une consultation avec un patient du Sénégal",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
      category: 'equipe',
      location: "Casablanca",
      type: "photo"
    },
    {
      id: 4,
      title: "Laboratoire d'Analyses Médicales",
      description: "Laboratoire moderne pour tous types d'analyses sanguines et biologiques",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
      category: 'equipements',
      location: "Marrakech",
      type: "photo"
    },
    {
      id: 5,
      title: "Chambre Patient VIP",
      description: "Hébergement confortable pour les patients internationaux",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
      category: 'cliniques',
      location: "Casablanca",
      type: "photo"
    },
    {
      id: 6,
      title: "Équipe Médicale Multiculturelle",
      description: "Notre équipe avec des patients venus d'Afrique de l'Ouest",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop",
      category: 'equipe',
      location: "Rabat",
      type: "photo"
    },
    {
      id: 7,
      title: "Scanner Multi-Barrettes 128 Coupes",
      description: "Technologie avancée pour imagerie corporelle complète",
      image: "https://images.unsplash.com/photo-1551601651-bc60e02d7f16?w=800&h=600&fit=crop",
      category: 'equipements',
      location: "Casablanca",
      type: "photo"
    },
    {
      id: 8,
      title: "Consultation Cardiologique",
      description: "Examen ECG avec équipement de dernière génération",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      category: 'services',
      location: "Marrakech",
      type: "photo"
    },
    {
      id: 9,
      title: "Visite Virtuelle de nos Installations",
      description: "Découvrez nos cliniques en vidéo 360°",
      image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&h=600&fit=crop",
      category: 'cliniques',
      location: "Casablanca",
      type: "video"
    },
    {
      id: 10,
      title: "Accueil des Patients Internationaux",
      description: "Notre équipe d'accueil multilingue à l'aéroport Mohammed V",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      category: 'services',
      location: "Aéroport Casablanca",
      type: "photo"
    },
    {
      id: 11,
      title: "Échographie 4D Dernière Génération",
      description: "Équipement d'échographie haute définition pour diagnostic précis",
      image: "https://images.unsplash.com/photo-1559757175-5965c3b3c3e7?w=800&h=600&fit=crop",
      category: 'equipements',
      location: "Rabat",
      type: "photo"
    },
    {
      id: 12,
      title: "Témoignage Patient - Aminata du Sénégal",
      description: "Retour d'expérience après chirurgie cardiaque réussie",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=800&h=600&fit=crop",
      category: 'equipe',
      location: "Casablanca",
      type: "video"
    }
  ];

  const filteredImages = selectedCategory === 'tous' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section id="galerie" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Galerie <span className="gradient-text">Photos & Vidéos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos installations modernes, notre équipe dévouée et la qualité 
            de nos équipements médicaux à travers cette galerie interactive.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openModal(image)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                    <div className="flex items-center mt-2 text-xs">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {image.location}
                    </div>
                  </div>
                </div>

                {/* Video Indicator */}
                {image.type === 'video' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">
                    <PlayIcon className="h-4 w-4" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                  {categories.find(cat => cat.id === image.category)?.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">8</div>
            <div className="text-gray-600">Cliniques Partenaires</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Équipements Modernes</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-gray-600">Villes Principales</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Certifiées ISO</div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Image */}
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="bg-white rounded-b-lg p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  {selectedImage.location}
                </div>
                <div className="flex items-center text-gray-500">
                  <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                  {categories.find(cat => cat.id === selectedImage.category)?.name}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;