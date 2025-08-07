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








      </div>
    </section>
  );
};

export default About;