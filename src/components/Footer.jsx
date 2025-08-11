import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

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

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscriptionStatus('error');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('');

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pouvez ajouter votre logique d'API réelle
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };



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
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing || !email.trim()}
                  className="bg-accent-500 hover:bg-accent-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 sm:px-6 rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi...
                    </>
                  ) : (
                    'S\'abonner'
                  )}
                </button>
              </div>
              
              {/* Status Messages */}
              {subscriptionStatus === 'success' && (
                <div className="mt-3 flex items-center text-green-400 text-sm">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Inscription réussie ! Vérifiez votre boîte mail.
                </div>
              )}
              
              {subscriptionStatus === 'error' && (
                <div className="mt-3 flex items-center text-red-400 text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  {!email.trim() ? 'Veuillez entrer une adresse email.' : 'Erreur lors de l\'inscription. Réessayez.'}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Morocco Health Solutions. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-accent-400 transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Conditions d'Utilisation</a>
              <a href="#" className="hover:text-accent-400 transition-colors">Mentions Légales</a>
            </div>
            
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;