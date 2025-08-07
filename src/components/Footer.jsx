import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const services = [
    "Tests Sanguins Complets",
    "Imagerie Médicale",
    "Examens Cardiologiques",
    "Consultations Spécialisées",
    "Bilans de Santé",
    "Rapports Internationaux"
  ];

  const quickLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "Services", href: "#services" },
    { name: "Processus", href: "#processus" },
    { name: "Contact", href: "#contact" },
    { name: "Témoignages", href: "#temoignages" }
  ];

  const certifications = [
    "ISO 9001:2015",
    "Ministère de la Santé",
    "Certification Internationale",
    "Normes Européennes"
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <HeartIcon className="h-8 w-8 text-accent-400 mr-3" />
              <div>
                <h3 className="text-xl font-bold">Morocco Health Solutions</h3>
                <p className="text-gray-400 text-sm">Excellence Médicale</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance pour l'organisation de services médicaux de qualité au Maroc. 
              Nous facilitons l'accès aux soins pour vos clients d'Afrique.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-gray-300">Certifié ISO 9001:2015</span>
              </div>
              <div className="flex items-center space-x-3">
                <DocumentCheckIcon className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-gray-300">Agréé Ministère de la Santé</span>
              </div>
              <div className="flex items-center space-x-3">
                <GlobeAltIcon className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-gray-300">Rapports internationaux</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 text-accent-400">Nos Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 hover:text-accent-400 transition-colors cursor-pointer">
                  <a href="#services" className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div>
                    <span className="text-sm">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 text-accent-400">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h5 className="text-md font-semibold mb-4 text-white">Certifications</h5>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="text-gray-400 text-sm flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 text-accent-400">Contact</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-accent-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Contactez-nous</p>
                  <p className="text-gray-400 text-sm">Nous vous répondrons rapidement</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-accent-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">contact@moroccohealthsolutions.com</p>
                  <p className="text-gray-400 text-sm">Réponse sous 2h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-accent-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Casablanca, Maroc</p>
                  <p className="text-gray-400 text-sm">Cliniques dans tout le pays</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-accent-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Heures d'ouverture</p>
                  <p className="text-gray-400 text-sm">Lun-Dim: 8h-20h</p>
                  <p className="text-gray-400 text-sm">Urgences: 24h/7j</p>
                </div>
              </div>
            </div>


          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="text-center">
            <h4 className="text-lg font-bold mb-4 text-white">Restez Informé</h4>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Recevez nos dernières actualités et offres spéciales directement dans votre boîte mail.
            </p>
            
            <div className="max-w-md mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Morocco Health Solutions. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-accent-400 transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Conditions d'Utilisation</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Mentions Légales</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Suivez-nous:</span>
              <div className="flex space-x-3">
                {/* Social Media Icons */}
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-accent-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-xs">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-accent-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-xs">in</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-accent-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-xs">tw</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;