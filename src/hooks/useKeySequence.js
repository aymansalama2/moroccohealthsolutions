import { useState, useEffect } from 'react';

const useKeySequence = (targetSequence) => {
  const [keys, setKeys] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignorer si l'utilisateur tape dans un input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      const key = event.key;
      
      setKeys(prevKeys => {
        const newKeys = [...prevKeys, key];
        
        // Garder seulement les dernières touches nécessaires
        if (newKeys.length > targetSequence.length) {
          newKeys.shift();
        }
        
        // Vérifier si la séquence correspond
        if (newKeys.join('') === targetSequence) {
          setIsTriggered(true);
          // Reset après déclenchement
          setTimeout(() => {
            setKeys([]);
            setIsTriggered(false);
          }, 100);
          return [];
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetSequence]);

  return isTriggered;
};

export default useKeySequence;