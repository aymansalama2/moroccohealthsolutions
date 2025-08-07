import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const About = () => {

  const partnerHospitals = [
    {
      name: "Clinique Al Madina",
      city: "Casablanca",
      specialties: ["Cardiologie", "Chirurgie", "Oncologie"],
      image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=400&h=300&fit=crop",
      rating: 4.9,
      beds: 200
    },
    {
      name: "Hôpital Privé de Marrakech",
      city: "Marrakech",
      specialties: ["Neurologie", "Orthopédie", "Dermatologie"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
      rating: 4.8,
      beds: 150
    },
    {
      name: "Centre Médical Rabat",
      city: "Rabat",
      specialties: ["Imagerie", "Analyses", "Consultations"],
      image: "https://images.unsplash.com/photo-1551601651-bc60e02d7f16?w=400&h=300&fit=crop",
      rating: 4.7,
      beds: 100
    }
  ];



  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À Propos de <span className="gradient-text">Morocco Health Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Depuis 2018, nous facilitons l'accès aux soins médicaux de qualité au Maroc 
            pour nos frères et sœurs d'Afrique, avec professionnalisme et humanité.
          </p>
        </motion.div>

        {/* Company Video & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Morocco Health Solutions</strong> est né d'une conviction simple : tous les Africains méritent 
                un accès aux meilleurs soins médicaux, sans compromettre leur situation financière.
              </p>
              <p>
                Nous combinons l'excellence médicale marocaine avec un accompagnement personnalisé, 
                créant un pont sanitaire entre le Maroc et l'Afrique subsaharienne.
              </p>
              <p>
                Notre équipe multilingue et multiculturelle comprend les défis spécifiques de nos 
                patients africains et s'engage à transformer leur parcours médical en une expérience 
                positive et rassurante.
              </p>
            </div>

            {/* Key Values */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <HeartIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Humanité</div>
                <div className="text-sm text-gray-600">Soins avec empathie</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <ShieldCheckIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Qualité</div>
                <div className="text-sm text-gray-600">Standards internationaux</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <GlobeAltIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Accessibilité</div>
                <div className="text-sm text-gray-600">Soins pour tous</div>
              </div>
            </div>
          </div>

          {/* Company Video */}
          <div className="relative">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                alt="Présentation Morocco Health Solutions"
                className="w-full h-80 object-cover opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-sm border-2 border-white text-white p-6 rounded-full hover:bg-white/30 transition-all">
                  <PlayIcon className="h-12 w-12" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Découvrez Morocco Health Solutions</div>
                <div className="text-sm opacity-75">Présentation de notre équipe et mission (3 min)</div>
              </div>
            </div>
          </div>
        </motion.div>







        {/* Partner Hospitals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos Hôpitaux Partenaires</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {partnerHospitals.map((hospital, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{hospital.name}</h4>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-sm font-semibold mr-1">{hospital.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{hospital.city}</p>
                  
                  <div className="mb-4">
                    <span className="font-semibold text-gray-900 text-sm">Spécialités :</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hospital.specialties.map((specialty, specIndex) => (
                        <span key={specIndex} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{hospital.beds} lits</span>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold">
                      Voir plus →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;