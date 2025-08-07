import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  BeakerIcon,
  CameraIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const services = [
    {
      icon: BeakerIcon,
      title: "Tests Sanguins Complets",
      description: "Analyses complètes incluant hémogramme, biochimie, sérologie et tests spécialisés",
      features: ["Hémogramme complet", "Profil lipidique", "Glycémie", "Fonctions hépatique et rénale"],
      color: "bg-red-500",
      lightColor: "bg-red-50"
    },
    {
      icon: CameraIcon,
      title: "Imagerie Médicale",
      description: "Radiographies, échographies, IRM et scanners avec équipements de pointe",
      features: ["Radiographies numériques", "Échographies 4D", "IRM haute résolution", "Scanner multi-barrettes"],
      color: "bg-blue-500",
      lightColor: "bg-blue-50"
    },
    {
      icon: HeartIcon,
      title: "Examens Cardiologiques",
      description: "Électrocardiogrammes, échocardiographies et tests d'effort cardiovasculaires",
      features: ["ECG au repos", "Échocardiographie", "Test d'effort", "Holter cardiaque"],
      color: "bg-red-600",
      lightColor: "bg-red-50"
    },
    {
      icon: UserGroupIcon,
      title: "Consultations Spécialisées",
      description: "Rendez-vous avec des médecins spécialistes reconnus",
      features: ["Cardiologie", "Neurologie", "Endocrinologie", "Gastro-entérologie"],
      color: "bg-green-500",
      lightColor: "bg-green-50"
    },
    {
      icon: DocumentCheckIcon,
      title: "Bilans de Santé Complets",
      description: "Check-up médical complet avec rapport détaillé",
      features: ["Examen clinique", "Tests de laboratoire", "Imagerie", "Rapport médical certifié"],
      color: "bg-purple-500",
      lightColor: "bg-purple-50"
    },
    {
      icon: GlobeAltIcon,
      title: "Services Internationaux",
      description: "Rapports médicaux traduits et certifiés pour usage international",
      features: ["Traduction certifiée", "Apostille", "Rapport international", "Suivi post-visite"],
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50"
    }
  ];

  const advantages = [
    {
      icon: ShieldCheckIcon,
      title: "Qualité Garantie",
      description: "Laboratoires et cliniques certifiés ISO"
    },
    {
      icon: ClockIcon,
      title: "Résultats Rapides",
      description: "Résultats disponibles en 24-48h"
    },
    {
      icon: UserGroupIcon,
      title: "Accompagnement",
      description: "Support personnalisé en français et arabe"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="gradient-text">Services Médicaux</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une gamme complète de services médicaux pour répondre à tous vos besoins de santé, 
            avec des équipements de pointe et une équipe médicale expérimentée.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="medical-card group cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className={`${service.color} p-3 rounded-xl mr-4 text-white group-hover:scale-110 transition-transform duration-200`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className={`${service.lightColor} rounded-lg p-4 mb-4`}>
                <h4 className="font-semibold text-gray-800 mb-2">Inclus :</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-semibold text-sm">En savoir plus</span>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Pourquoi Choisir Nos Services ?</h3>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Nous nous engageons à fournir des services médicaux de la plus haute qualité avec un accompagnement personnalisé.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                  <advantage.icon className="h-8 w-8 text-accent-300" />
                </div>
                <h4 className="text-xl font-bold mb-2">{advantage.title}</h4>
                <p className="text-primary-100">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à Commencer Votre Parcours Médical ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour organiser les services médicaux pour vos clients. 
              Notre équipe vous accompagnera à chaque étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                Demander un Devis Gratuit
              </a>
              <a href="tel:+212XXXXXXXX" className="btn-secondary">
                Appeler Maintenant
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;