import React from 'react';
import { ArrowRightIcon, CheckCircleIcon, GlobeAltIcon, HeartIcon, ClockIcon, UserGroupIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';



const Hero = () => {
  const benefits = [
    "Expertise médicale marocaine de renommée internationale",
    "Accompagnement personnalisé et suivi continu",
    "Équipements de pointe et technologies avancées",
    "Standards internationaux et certifications"
  ];

  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800">
      {/* Effet de particules brillantes */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.2),transparent_50%)]"></div>
      </div>

      {/* Motifs géométriques modernes */}
      <div className="absolute inset-0">
        {/* Hexagones élégants */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 5l30 17.5v35L40 75 10 57.5v-35z' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1' stroke-dasharray='4,4'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Cercles interconnectés */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Symboles médicaux modernes */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 35v30M35 50h30' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Effets de lumière dynamiques */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-indigo-900/30"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.15)_180deg,transparent_360deg)]"></div>
      </div>

      {/* Éléments flottants élégants */}
      <div className="absolute top-20 left-[10%] opacity-[0.15] rotate-12 mix-blend-soft-light hidden sm:block">
        <svg className="w-32 h-32 sm:w-48 sm:h-48 animate-float" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(129,140,248)', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(56,189,248)', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="2"/>
          <path d="M50 20v60M20 50h60" stroke="white" strokeWidth="2" opacity="0.2"/>
        </svg>
      </div>

      <div className="absolute bottom-40 right-[15%] opacity-[0.15] -rotate-12 mix-blend-soft-light hidden sm:block">
        <svg className="w-24 h-24 sm:w-40 sm:h-40 animate-pulse-slow" viewBox="0 0 100 100">
          <path d="M20,50 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0" fill="none" stroke="rgba(147,197,253,0.3)" strokeWidth="2"/>
          <path d="M50 30v40M30 50h40" stroke="rgba(147,197,253,0.3)" strokeWidth="2"/>
        </svg>
      </div>

      <div className="absolute top-1/3 right-[25%] opacity-[0.15] rotate-45 mix-blend-soft-light hidden md:block">
        <svg className="w-20 h-20 md:w-32 md:h-32 animate-float" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="rgba(199,210,254,0.3)" strokeWidth="2"/>
          <path d="M50 35v30M35 50h30" stroke="rgba(199,210,254,0.3)" strokeWidth="2"/>
        </svg>
      </div>

      {/* Effet de profondeur avancé */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-indigo-900/20 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(17,24,39,0.4))]"></div>

      {/* Effet de brillance */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="mb-6">

              <span className="inline-block bg-accent-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
                ✨ Service Premium d'Excellence
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                Morocco Health
                <span className="block text-white"> Solutions</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                Morocco Health Solutions vous offre un accès privilégié aux meilleurs soins médicaux au Maroc.
                Notre expertise au service de votre santé, avec des standards internationaux.
              </p>
            </div>

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

          {/* Right Content - Medical Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="flex items-center justify-center mt-[-160px] sm:mt-[-220px] md:mt-[-280px]">
                <img 
                  src="/images/Digital_Healthcare_Professional-removebg-preview.png" 
                  alt="Docteur Morocco Health Solutions" 
                  className="w-full h-auto max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-accent-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce"></div>
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