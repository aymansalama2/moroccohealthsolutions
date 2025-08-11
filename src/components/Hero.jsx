import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/images/asistant-medical.jpg",
    "/images/Prefab-hospital-patient-room-.jpg",
    "/images/article 4 2 .png",
    "/images/salle-de-clinique-pour-le-diagnostic-neurologique.jpg",
    "/images/un-medecin-qui-s-occupe-d-un-enfant-afro-americain.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "Consultations avec des médecins spécialisés",
    "Équipements médicaux de dernière génération",
    "Accompagnement personnalisé en français",
    "Tarifs 50-70% moins chers qu'en Europe"
  ];

  return (
    <section id="accueil" className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[10%] opacity-[0.15] rotate-12 mix-blend-soft-light hidden sm:block">
          <svg className="w-32 h-32 sm:w-48 sm:h-48 animate-float" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        
        <div className="absolute bottom-40 right-[15%] opacity-[0.15] -rotate-12 mix-blend-soft-light hidden sm:block">
          <svg className="w-24 h-24 sm:w-40 sm:h-40 animate-pulse-slow" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        
        <div className="absolute top-1/3 right-[25%] opacity-[0.15] rotate-45 mix-blend-soft-light hidden md:block">
          <svg className="w-20 h-20 md:w-32 md:h-32 animate-float" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2"/>
            <polygon points="50,30 70,80 30,80" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-accent-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
                Excellence Médicale au Maroc
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400"
            >
              Votre Santé, <br />
              Notre Priorité
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed"
            >
              Morocco Health Solutions vous offre un accès privilégié aux meilleurs soins médicaux au Maroc.
              Notre expertise au service de votre santé, avec des standards internationaux.
            </motion.p>

            {/* Benefits List */}
            <div className="mb-6 sm:mb-8">
              <ul className="space-y-2 sm:space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start text-blue-100 text-sm sm:text-base"
                  >
                    <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center group text-sm sm:text-base"
              >
                Commencer Maintenant
                <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200 flex items-center justify-center backdrop-blur-sm text-sm sm:text-base"
              >
                Découvrir nos Services
              </motion.a>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent-400">500+</div>
                <div className="text-blue-200 text-xs sm:text-sm">Patients Satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent-400">15+</div>
                <div className="text-blue-200 text-xs sm:text-sm">Spécialités Médicales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent-400">24/7</div>
                <div className="text-blue-200 text-xs sm:text-sm">Assistance Médicale</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Carousel d'images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
                              <div className="flex items-center justify-center mt-8 lg:mt-[-40px] sm:mt-[-60px] md:mt-[-80px] lg:mt-[-100px]">
                  <div className="relative w-full h-[400px] max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                  {/* Images du carrousel */}
                  {heroImages.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1} Morocco Health Solutions`}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
                      }}
                      initial={{ opacity: 0 }}
                                              animate={{ 
                          opacity: currentImageIndex === index ? 1 : 0,
                          scale: currentImageIndex === index ? 1 : 0.85
                        }}
                        transition={{ 
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                    />
                  ))}
                  
                  {/* Overlay avec gradient pour améliorer la lisibilité */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Indicateurs de navigation améliorés */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-5 h-5 rounded-full transition-all duration-300 transform hover:scale-125 ${
                          currentImageIndex === index 
                            ? 'bg-accent-400 scale-125 shadow-lg shadow-accent-400/50' 
                            : 'bg-white/70 hover:bg-white/90 hover:scale-110'
                        }`}
                        style={{
                          boxShadow: currentImageIndex === index 
                            ? '0 0 20px rgba(34, 197, 94, 0.5)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.2)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements améliorés */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-10 sm:h-10 bg-accent-400 rounded-full animate-pulse shadow-lg shadow-accent-400/50"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg shadow-yellow-400/50"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;