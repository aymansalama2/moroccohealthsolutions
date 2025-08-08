import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Aminata Diallo",
      age: 45,
      country: "Sénégal",
      flag: "🇸🇳",
      city: "Dakar",
      service: "Chirurgie Cardiaque",
      procedure: "Pontage coronarien",
      date: "Mars 2025",
      rating: 5,
      image: null,
      quote: "Je pensais que je ne pourrais jamais me faire opérer du cœur à cause des coûts en Europe. Grâce à Morocco Health Solutions, j'ai eu accès aux meilleurs cardiologues à Casablanca. L'équipe m'a accompagnée depuis Dakar jusqu'à ma complète guérison.",
      details: {
        savings: "75% moins cher qu'en France",
        duration: "10 jours au Maroc",
        hospital: "Clinique Al Madina, Casablanca",
        doctor: "Dr. Rachid Benali, Cardiologue"
      }
    },
    {
      id: 2,
      name: "Ibrahim Traoré",
      age: 38,
      country: "Mali",
      flag: "🇲🇱",
      city: "Bamako",
      service: "Bilan de Santé Complet",
      procedure: "Check-up cardiologique et analyses",
      date: "Février 2025",
      rating: 5,
      image: null,
      quote: "En tant qu'entrepreneur, ma santé est cruciale. Le bilan complet au Maroc m'a permis de détecter un problème cardiaque précoce. Le professionnalisme de l'équipe et la qualité des équipements m'ont impressionné.",
      details: {
        savings: "60% moins cher qu'en Europe",
        duration: "3 jours au Maroc",
        hospital: "Hôpital Privé de Marrakech",
        doctor: "Dr. Fatima Zahra, Médecine Interne"
      }
    },
    {
      id: 3,
      name: "Mariam Ouattara",
      age: 52,
      country: "Côte d'Ivoire",
      flag: "🇨🇮",
      city: "Abidjan",
      service: "Imagerie Médicale",
      procedure: "IRM et Scanner complets",
      date: "Janvier 2025",
      rating: 5,
      image: null,
      quote: "Les douleurs dorsales me handicapaient depuis des mois. Les examens au Maroc ont révélé le problème exact. La technologie utilisée est la même qu'en Europe, mais à prix abordable. Je recommande vivement !",
      details: {
        savings: "70% moins cher qu'en France",
        duration: "2 jours au Maroc",
        hospital: "Centre de Radiologie Moderne, Rabat",
        doctor: "Dr. Hassan El Amri, Radiologue"
      }
    },
    {
      id: 4,
      name: "Boubacar Diop",
      age: 35,
      country: "Guinée",
      flag: "🇬🇳",
      city: "Conakry",
      service: "Consultation Spécialisée",
      procedure: "Traitement neurologique",
      date: "Avril 2025",
      rating: 5,
      image: null,
      quote: "Souffrant de migraines chroniques, j'ai consulté plusieurs médecins sans succès. Le neurologue au Maroc a immédiatement identifié la cause et proposé un traitement efficace. Résultat : 90% d'amélioration !",
      details: {
        savings: "65% moins cher qu'en Europe",
        duration: "5 jours au Maroc",
        hospital: "Clinique Neurologique, Casablanca",
        doctor: "Dr. Youssef Bennani, Neurologue"
      }
    }
  ];

  const statistics = [
    { number: "2,847", label: "Patients Satisfaits", icon: "👥" },
    { number: "98.5%", label: "Taux de Satisfaction", icon: "⭐" },
    { number: "15", label: "Pays Africains", icon: "🌍" },
    { number: "50+", label: "Médecins Partenaires", icon: "👨‍⚕️" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section id="temoignages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Témoignages de nos <span className="gradient-text">Patients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les expériences authentiques de nos patients venus d'Afrique pour leurs soins médicaux au Maroc.
            Chaque histoire compte et nous inspire à toujours mieux faire.
          </p>
        </motion.div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {statistics.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Patient Info */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="flex items-center mb-6">
                {currentData.image ? (
                  <img 
                    src={currentData.image} 
                    alt={currentData.name}
                    className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-300 flex items-center justify-center mr-6 shadow-lg">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentData.name}, {currentData.age} ans
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="text-2xl mr-2">{currentData.flag}</span>
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{currentData.city}, {currentData.country}</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(currentData.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <HeartIcon className="h-5 w-5 text-red-500 mr-2" />
                  Détails du Traitement
                </h4>
                <div className="space-y-3 text-sm">
                  <div><span className="font-medium">Service :</span> {currentData.service}</div>
                  <div><span className="font-medium">Procédure :</span> {currentData.procedure}</div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="font-medium">Date :</span> {currentData.date}
                  </div>
                  <div><span className="font-medium">Hôpital :</span> {currentData.details.hospital}</div>
                  <div><span className="font-medium">Médecin :</span> {currentData.details.doctor}</div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{currentData.details.savings}</div>
                  <div className="text-green-100 text-sm">d'économies réalisées</div>
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <ChatBubbleLeftIcon className="h-12 w-12 text-primary-200 mb-6" />
              
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-8">
                "{currentData.quote}"
              </blockquote>

              {/* Key Results */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {currentData.details.duration}
                  </div>
                  <div className="text-blue-800 text-sm">Durée totale</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-purple-600">100%</div>
                  <div className="text-purple-800 text-sm">Satisfaction</div>
                </div>
              </div>


            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
            <button
              onClick={prevTestimonial}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Précédent
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              Suivant
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </button>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 ${
                index === currentTestimonial 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-white hover:border-primary-300'
              }`}
            >
              <div className="flex items-center mb-4">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.country}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">{testimonial.service}</div>
              <div className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Rejoignez nos Patients Satisfaits</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Votre santé mérite les meilleurs soins. Découvrez pourquoi des milliers de patients 
              africains nous font confiance pour leurs traitements médicaux au Maroc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Demander un Devis Gratuit
              </a>
              <a href="tel:+212XXXXXXXX" className="bg-primary-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-900 transition-colors">
                Appeler Maintenant
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;