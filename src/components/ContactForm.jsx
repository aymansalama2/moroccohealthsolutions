import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const faqData = [
    {
      question: "Quels documents sont nécessaires pour un visa médical ?",
      answer: "Pour obtenir un visa médical pour le Maroc, vous aurez besoin : d'un passeport valide (6 mois minimum), d'une lettre d'invitation de notre clinique partenaire, d'un rapport médical de votre médecin traitant, d'une attestation de prise en charge financière, et d'une réservation d'hôtel confirmée. Notre équipe vous accompagne dans toutes ces démarches."
    },
    {
      question: "Combien coûte en moyenne un traitement au Maroc ?",
      answer: "Les coûts varient selon le traitement, mais en moyenne, nos patients économisent 60-75% par rapport à l'Europe. Par exemple : consultation spécialisée (50-100€), IRM complète (200-300€), chirurgie cardiaque (8000-15000€ vs 30000-50000€ en Europe). Nous fournissons un devis détaillé gratuit."
    },
    {
      question: "Quelle est la durée d'un séjour médical typique ?",
      answer: "Cela dépend du traitement : consultations et examens (2-3 jours), chirurgie mineure (5-7 jours), chirurgie majeure (10-15 jours). Nous planifions tout selon vos besoins et incluons le temps de récupération nécessaire."
    },
    {
      question: "L'accompagnement est-il inclus dans vos services ?",
      answer: "Oui, totalement ! Nous offrons : accueil à l'aéroport, transport vers l'hôtel/clinique, traduction lors des consultations, assistance 24h/7j, aide pour l'hébergement, et suivi post-traitement. Un coordinateur dédié vous accompagne durant tout votre séjour."
    },
    {
      question: "Comment puis-je être sûr de la qualité des soins ?",
      answer: "Tous nos partenaires sont certifiés ISO 9001 et agréés par le Ministère de la Santé marocain. Nos médecins sont formés en Europe/Amérique du Nord. Nous avons un taux de satisfaction de 98.5% et plus de 3000 patients traités avec succès."
    },
    {
      question: "Que se passe-t-il en cas d'urgence ?",
      answer: "Un médecin de garde et notre équipe de coordination sont toujours disponibles. Tous nos hôpitaux partenaires ont des services d'urgence équipés aux standards internationaux."
    }
  ];

  const emergencyContacts = [];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Préparer le contenu de l'email
      const emailContent = `
Nouvelle demande de contact - Morocco Health Solutions

INFORMATIONS PERSONNELLES:
- Nom complet: ${data.fullName}
- Email: ${data.email}
- Téléphone: ${data.phone}
- Pays d'origine: ${data.country}

DÉTAILS DU PROJET:
- Nombre de clients: ${data.clientCount}
- Date souhaitée: ${data.preferredDate || 'Non spécifiée'}
- Services requis: ${Array.isArray(data.services) ? data.services.join(', ') : data.services}

MESSAGE:
${data.message || 'Aucun message supplémentaire'}

---
Envoyé depuis le formulaire de contact de Morocco Health Solutions
Date: ${new Date().toLocaleString('fr-FR')}
      `;

      // Créer le lien mailto
      const mailtoLink = `mailto:contact@moroccohealthsolutions.com?subject=Nouvelle demande de contact - ${data.fullName}&body=${encodeURIComponent(emailContent)}`;
      
      // Ouvrir le client email par défaut
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    "Bilan de santé complet",
    "Tests sanguins spécialisés",
    "Imagerie médicale",
    "Consultations cardiologiques",
    "Examens neurologiques",
    "Endoscopies",
    "Autres (préciser dans le message)"
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions <span className="gradient-text">Fréquentes</span>
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Quick Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className={`${contact.color} hover:opacity-90 text-white rounded-xl p-6 text-center transition-all duration-200 hover:scale-105 shadow-lg`}
              >
                <PhoneIcon className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">{contact.title}</h3>
                <p className="text-sm opacity-90 mb-2">{contact.description}</p>
                <p className="font-mono text-lg">{contact.number}</p>
              </a>
            ))}
          </motion.div>

          {/* WhatsApp Float Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <a
              href="https://wa.me/212657104984?text=Bonjour, je souhaiterais obtenir des informations sur vos services médicaux"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 flex items-center"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <span className="ml-2 hidden md:inline font-semibold">Chat WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Demandez Votre <span className="gradient-text">Devis Gratuit</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Remplissez ce formulaire pour recevoir une proposition personnalisée pour les services médicaux 
            de vos clients. Notre équipe vous recontactera dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white h-fit">
              <h3 className="text-2xl font-bold mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p className="text-primary-100">Contactez-nous</p>
                    <p className="text-primary-100 text-sm">Nous vous répondrons rapidement</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-primary-100">contact@moroccohealthsolutions.com</p>
                    <p className="text-primary-100 text-sm">Réponse sous 2h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Adresse</h4>
                    <p className="text-primary-100">Casablanca, Maroc</p>
                    <p className="text-primary-100 text-sm">Cliniques partenaires dans tout le pays</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-semibold mb-4">Temps de Réponse</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-primary-100">2 heures</div>
                  </div>
                  <div>
                    <div className="font-semibold">Téléphone</div>
                    <div className="text-primary-100">Immédiat</div>
                  </div>
                  <div>
                    <div className="font-semibold">Devis</div>
                    <div className="text-primary-100">24 heures</div>
                  </div>
                  <div>
                    <div className="font-semibold">RDV</div>
                    <div className="text-primary-100">48 heures</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Formulaire rempli avec succès !</h4>
                    <p className="text-green-600 text-sm">Votre client email s'ouvre automatiquement. Envoyez l'email pour finaliser votre demande.</p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="font-semibold text-red-800">Erreur lors de l'envoi</h4>
                    <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter directement.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Le nom est requis' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Votre nom complet"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email invalide'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Le téléphone est requis' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="+XXX XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      Pays d'origine
                    </label>
                    <select
                      {...register('country', { required: 'Le pays est requis' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner un pays</option>
                      <option value="senegal">Sénégal</option>
                      <option value="mali">Mali</option>
                      <option value="burkina_faso">Burkina Faso</option>
                      <option value="cote_ivoire">Côte d'Ivoire</option>
                      <option value="guinee">Guinée</option>
                      <option value="guinee_bissau">Guinée-Bissau</option>
                      <option value="niger">Niger</option>
                      <option value="mauritanie">Mauritanie</option>
                      <option value="tchad">Tchad</option>
                      <option value="cameroun">Cameroun</option>
                      <option value="gabon">Gabon</option>
                      <option value="congo">Congo</option>
                      <option value="rdc">République Démocratique du Congo</option>
                      <option value="togo">Togo</option>
                      <option value="benin">Bénin</option>
                      <option value="ghana">Ghana</option>
                      <option value="liberia">Libéria</option>
                      <option value="sierra_leone">Sierra Leone</option>
                      <option value="gambie">Gambie</option>
                      <option value="cap_vert">Cap-Vert</option>
                      <option value="comores">Comores</option>
                      <option value="madagascar">Madagascar</option>
                      <option value="maurice">Maurice</option>
                      <option value="seychelles">Seychelles</option>
                      <option value="djibouti">Djibouti</option>
                      <option value="somalie">Somalie</option>
                      <option value="ethiopie">Éthiopie</option>
                      <option value="erythree">Érythrée</option>
                      <option value="soudan">Soudan</option>
                      <option value="soudan_sud">Soudan du Sud</option>
                      <option value="kenya">Kenya</option>
                      <option value="tanzanie">Tanzanie</option>
                      <option value="ouganda">Ouganda</option>
                      <option value="rwanda">Rwanda</option>
                      <option value="burundi">Burundi</option>
                      <option value="angola">Angola</option>
                      <option value="namibie">Namibie</option>
                      <option value="botswana">Botswana</option>
                      <option value="zimbabwe">Zimbabwe</option>
                      <option value="zambie">Zambie</option>
                      <option value="malawi">Malawi</option>
                      <option value="mozambique">Mozambique</option>
                      <option value="afrique_sud">Afrique du Sud</option>
                      <option value="eswatini">Eswatini</option>
                      <option value="lesotho">Lesotho</option>
                      <option value="autre">Autre pays</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Nombre de clients
                    </label>
                    <select
                      {...register('clientCount', { required: 'Le nombre de clients est requis' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner</option>
                      <option value="1">1 client</option>
                      <option value="2-5">2-5 clients</option>
                      <option value="6-10">6-10 clients</option>
                      <option value="11-20">11-20 clients</option>
                      <option value="20+">Plus de 20 clients</option>
                    </select>
                    {errors.clientCount && <p className="text-red-500 text-sm mt-1">{errors.clientCount.message}</p>}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Date souhaitée
                    </label>
                    <input
                      type="date"
                      {...register('preferredDate')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Services requis *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {serviceTypes.map((service, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          value={service}
                          {...register('services', { required: 'Veuillez sélectionner au moins un service' })}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services.message}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Message et informations complémentaires
                  </label>
                  <textarea
                    {...register('message')}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Décrivez vos besoins spécifiques, contraintes particulières, ou toute information utile pour établir votre devis..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer ma demande</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                  <br />Vos données sont sécurisées et ne seront jamais partagées.
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactForm;