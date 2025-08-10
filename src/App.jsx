import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SuperAdmin from './components/SuperAdmin';
import useKeySequence from './hooks/useKeySequence';
import visitorService from './services/visitorService';

function App() {
  const [showSuperAdmin, setShowSuperAdmin] = useState(false);
  const adminTriggered = useKeySequence('1234');

  // Ouvrir Super Admin quand "1234" est tapé
  useEffect(() => {
    if (adminTriggered) {
      setShowSuperAdmin(true);
    }
  }, [adminTriggered]);

  // Tracker la visite de la page
  useEffect(() => {
    visitorService.trackVisit(window.location.pathname);
    
    // Tracker les changements de hash pour les sections
    const handleHashChange = () => {
      visitorService.trackVisit(window.location.pathname + window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Tracker le temps passé sur la page
  useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      // Sauvegarder le temps passé (peut être étendu)
      localStorage.setItem('mhs_last_session_time', timeSpent.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Gallery />
        <Blog />
        <ContactForm />
      </main>
      <Footer />
      
      {/* Super Admin Panel */}
      <SuperAdmin 
        isOpen={showSuperAdmin} 
        onClose={() => setShowSuperAdmin(false)} 
      />
      
      {/* Indicateur discret pour les admins */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded text-center">
          Tapez "1234" pour<br />Super Admin
        </div>
      )}
    </div>
  );
}

export default App;