import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { HeartIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import visitorService from '../services/visitorService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (section) => {
    visitorService.trackVisit(`/#${section}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-primary-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm space-y-1 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Contactez-nous</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">contact@moroccohealthsolutions.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <GlobeAltIcon className="h-4 w-4" />
              <span>Service disponible 24h/7j</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/images/WhatsApp Image 2025-08-07 à 15.46.04_3d5125d7.jpg" 
                  alt="Morocco Health Solutions Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain mr-2 sm:mr-3"
                />
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg lg:text-xl font-bold gradient-text truncate">Morocco Health Solutions</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Services Médicaux d'Excellence</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#accueil" onClick={() => handleLinkClick('accueil')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Accueil
                </a>
                <a href="#services" onClick={() => handleLinkClick('services')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Services
                </a>
                <a href="#about" onClick={() => handleLinkClick('about')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  À Propos
                </a>
                <a href="#temoignages" onClick={() => handleLinkClick('temoignages')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Témoignages
                </a>
                <a href="#galerie" onClick={() => handleLinkClick('galerie')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Galerie
                </a>
                <a href="#blog" onClick={() => handleLinkClick('blog')} className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Blog
                </a>
                <a href="#contact" onClick={() => handleLinkClick('contact')} className="btn-primary">
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-gray-200">
              <a 
                href="#accueil" 
                onClick={() => handleLinkClick('accueil')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Accueil
              </a>
              <a 
                href="#services" 
                onClick={() => handleLinkClick('services')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Services
              </a>
              <a 
                href="#about" 
                onClick={() => handleLinkClick('about')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                À Propos
              </a>
              <a 
                href="#temoignages" 
                onClick={() => handleLinkClick('temoignages')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Témoignages
              </a>
              <a 
                href="#galerie" 
                onClick={() => handleLinkClick('galerie')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Galerie
              </a>
              <a 
                href="#blog" 
                onClick={() => handleLinkClick('blog')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Blog
              </a>
              <a 
                href="#faq" 
                onClick={() => handleLinkClick('faq')} 
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                onClick={() => handleLinkClick('contact')} 
                className="btn-primary block text-center mx-3 mt-4"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;