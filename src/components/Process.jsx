import React from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  HeartIcon,
  DocumentArrowDownIcon,
  CheckBadgeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: ChatBubbleLeftRightIcon,
      title: "Consultation Initiale",
      description: "Discutez de vos besoins avec notre équipe. Nous évaluons le profil de vos clients et recommandons les services adaptés.",
      duration: "30 min",
      color: "bg-blue-500"
    },
    {
      number: "02",
      icon: DocumentCheckIcon,
      title: "Devis Personnalisé",
      description: "Réception d'un devis détaillé incluant tous les services, tarifs et conditions. Transparence totale garantie.",
      duration: "24h",
      color: "bg-green-500"
    },
    {
      number: "03",
      icon: CalendarDaysIcon,
      title: "Planification",
      description: "Organisation des rendez-vous dans nos cliniques partenaires selon vos préférences de dates et lieux.",
      duration: "48h",
      color: "bg-purple-500"
    },
    {
      number: "04",
      icon: UserGroupIcon,
      title: "Accompagnement",
      description: "Prise en charge complète de vos clients dès leur arrivée. Transport, traduction, assistance personnalisée.",
      duration: "Variable",
      color: "bg-orange-500"
    },
    {
      number: "05",
      icon: HeartIcon,
      title: "Services Médicaux",
      description: "Réalisation de tous les examens médicaux par des professionnels qualifiés dans des établissements certifiés.",
      duration: "1-3 jours",
      color: "bg-red-500"
    },
    {
      number: "06",
      icon: DocumentArrowDownIcon,
      title: "Résultats",
      description: "Compilation et remise des résultats complets avec traductions certifiées si nécessaire.",
      duration: "24-48h",
      color: "bg-indigo-500"
    },
    {
      number: "07",
      icon: CheckBadgeIcon,
      title: "Certification",
      description: "Validation et certification des documents médicaux pour usage international avec apostille si requis.",
      duration: "2-5 jours",
      color: "bg-teal-500"
    },
    {
      number: "08",
      icon: GlobeAltIcon,
      title: "Suivi",
      description: "Support post-visite et assistance pour toute question relative aux résultats ou documentation.",
      duration: "30 jours",
      color: "bg-pink-500"
    }
  ];



  return (
    <section id="processus" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre <span className="gradient-text">Processus</span> Éprouvé
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un processus en 8 étapes soigneusement orchestré pour garantir une expérience médicale 
            exceptionnelle à vos clients, de la consultation initiale au suivi post-visite.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Background Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Number - Center on large screens */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      {/* Mobile step number and icon */}
                      <div className="lg:hidden">
                        <div className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold`}>
                          {step.number}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`hidden lg:block ${step.color} p-3 rounded-xl text-white`}>
                            <step.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mt-1">
                              Durée: {step.duration}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty space for opposite side on large screens */}
                <div className="hidden lg:block lg:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>



        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Durée Totale du Processus
            </h3>
            <p className="text-gray-600">
              De votre première demande à la réception des documents finaux
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">7-10</div>
              <div className="text-blue-800 font-semibold">Jours au total</div>
              <div className="text-blue-600 text-sm mt-1">Processus complet</div>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
              <div className="text-green-800 font-semibold">Premier contact</div>
              <div className="text-green-600 text-sm mt-1">Réponse garantie</div>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">48h</div>
              <div className="text-purple-800 font-semibold">Résultats urgents</div>
              <div className="text-purple-600 text-sm mt-1">Option express</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à Démarrer le Processus ?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour débuter l'organisation des services médicaux pour vos clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary">
              Demander un Devis
            </a>
            <a href="tel:+212XXXXXXXX" className="btn-secondary">
              Consultation Gratuite
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;