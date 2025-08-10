import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

class VisitorService {
  constructor() {
    this.storageKey = 'mhs_visitors';
    this.blockedIpsKey = 'mhs_blocked_ips';
    this.currentVisitorKey = 'mhs_current_visitor';
  }

  // Obtenir l'IP réelle du visiteur
  async getVisitorIP() {
    try {
      // Essayer plusieurs APIs pour plus de fiabilité
      const apis = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://api64.ipify.org?format=json',
        'https://api.ip.sb/jsonip'
      ];
      
      for (const api of apis) {
        try {
          const response = await fetch(api, { timeout: 5000 });
          const data = await response.json();
          return data.ip || data.query;
        } catch (e) {
          continue;
        }
      }
      
      // Si toutes les APIs échouent, utiliser WebRTC pour obtenir l'IP locale
      return await this.getLocalIP();
    } catch (error) {
      return 'IP non disponible';
    }
  }

  // Obtenir l'IP locale via WebRTC (fallback)
  async getLocalIP() {
    return new Promise((resolve) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      
      pc.createDataChannel('');
      pc.createOffer().then(offer => pc.setLocalDescription(offer));
      
      pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        pc.onicecandidate = () => {};
        resolve(myIP);
      };
      
      // Timeout après 3 secondes
      setTimeout(() => {
        resolve('IP locale non disponible');
      }, 3000);
    });
  }

  // Obtenir des informations sur le navigateur
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';

    // Détecter le navigateur
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Détecter l'OS
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'MacOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return { browser, os, userAgent };
  }

  // Obtenir la géolocalisation réelle par IP
  async getLocation(ip) {
    try {
      // Essayer plusieurs APIs de géolocalisation
      const geoAPIs = [
        {
          url: `https://ipapi.co/${ip}/json/`,
          parse: (data) => ({
            city: data.city || 'Inconnu',
            country: data.country_name || 'Inconnu',
            region: data.region || 'Inconnu',
            timezone: data.timezone || 'Inconnu',
            isp: data.org || 'Inconnu',
            countryCode: data.country_code || 'XX'
          })
        },
        {
          url: `http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,city,timezone,isp,org`,
          parse: (data) => ({
            city: data.city || 'Inconnu',
            country: data.country || 'Inconnu',
            region: data.regionName || 'Inconnu',
            timezone: data.timezone || 'Inconnu',
            isp: data.isp || 'Inconnu',
            countryCode: data.countryCode || 'XX'
          })
        },
        {
          url: `https://api.ipgeolocation.io/ipgeo?apiKey=free&ip=${ip}`,
          parse: (data) => ({
            city: data.city || 'Inconnu',
            country: data.country_name || 'Inconnu',
            region: data.state_prov || 'Inconnu',
            timezone: data.time_zone?.name || 'Inconnu',
            isp: data.isp || 'Inconnu',
            countryCode: data.country_code2 || 'XX'
          })
        }
      ];

      for (const api of geoAPIs) {
        try {
          const response = await fetch(api.url, { 
            timeout: 5000,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            const location = api.parse(data);
            
            // Vérifier que nous avons au moins le pays
            if (location.country !== 'Inconnu') {
              return location;
            }
          }
        } catch (e) {
          continue;
        }
      }

      // Fallback si toutes les APIs échouent - utiliser la géolocalisation du navigateur
      return await this.getBrowserLocation();
    } catch (error) {
      return { 
        city: 'Inconnu', 
        country: 'Inconnu', 
        region: 'Inconnu',
        timezone: 'Inconnu',
        isp: 'Inconnu',
        countryCode: 'XX'
      };
    }
  }

  // Géolocalisation via le navigateur (demande permission)
  async getBrowserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ city: 'Géolocalisation non supportée', country: 'Inconnu', region: 'Inconnu' });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Géocodage inverse pour obtenir l'adresse
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=free&limit=1`
            );
            
            if (response.ok) {
              const data = await response.json();
              const result = data.results[0];
              
              if (result) {
                resolve({
                  city: result.components.city || result.components.town || 'Inconnu',
                  country: result.components.country || 'Inconnu',
                  region: result.components.state || result.components.region || 'Inconnu',
                  timezone: result.annotations.timezone.name || 'Inconnu',
                  countryCode: result.components.country_code?.toUpperCase() || 'XX'
                });
                return;
              }
            }
          } catch (e) {
            // Erreur géocodage inverse ignorée
          }
          
          resolve({ city: 'Position obtenue', country: 'Géolocalisation', region: 'GPS' });
        },
        (error) => {
          resolve({ city: 'Permission refusée', country: 'Géolocalisation', region: 'Bloquée' });
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  }

  // Obtenir l'ID du visiteur actuel ou en créer un nouveau
  getVisitorId() {
    let visitorId = Cookies.get(this.currentVisitorKey);
    if (!visitorId) {
      visitorId = uuidv4();
      Cookies.set(this.currentVisitorKey, visitorId, { expires: 30 }); // 30 jours
    }
    return visitorId;
  }

  // Enregistrer une visite avec vraies données
  async trackVisit(page = '/') {
    try {
      const ip = await this.getVisitorIP();
      
      // Vérifier si l'IP est bloquée
      if (this.isIPBlocked(ip)) {
        this.redirectToBlocked();
        return null;
      }

      const visitorId = this.getVisitorId();
      const browserInfo = this.getBrowserInfo();
      const location = await this.getLocation(ip);

      // Obtenir des informations détaillées sur l'appareil
      const deviceInfo = this.getDeviceInfo();
      const connectionInfo = this.getConnectionInfo();

      const visit = {
        id: uuidv4(),
        visitorId,
        ip,
        page,
        timestamp: new Date().toISOString(),
        ...browserInfo,
        ...location,
        ...deviceInfo,
        ...connectionInfo,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
        referrer: document.referrer || 'Direct',
        language: navigator.language,
        languages: navigator.languages?.join(', ') || navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine,
        isNewVisitor: !this.hasVisitedBefore(visitorId),
        sessionDuration: this.getSessionDuration(),
        pageLoadTime: this.getPageLoadTime(),
        url: window.location.href,
        title: document.title
      };

      this.saveVisit(visit);
      return visit;
    } catch (error) {
      return null;
    }
  }

  // Obtenir des informations détaillées sur l'appareil
  getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceType = 'Desktop';
    let deviceModel = 'Inconnu';

    // Détecter le type d'appareil
    if (/Mobi|Android/i.test(ua)) {
      deviceType = 'Mobile';
    } else if (/Tablet|iPad/i.test(ua)) {
      deviceType = 'Tablet';
    }

    // Détecter le modèle
    if (/iPhone/i.test(ua)) {
      const match = ua.match(/iPhone OS (\d+)/);
      deviceModel = `iPhone (iOS ${match ? match[1] : 'Unknown'})`;
    } else if (/iPad/i.test(ua)) {
      deviceModel = 'iPad';
    } else if (/Android/i.test(ua)) {
      const match = ua.match(/Android (\d+\.\d+)/);
      deviceModel = `Android ${match ? match[1] : 'Unknown'}`;
    }

    return {
      deviceType,
      deviceModel,
      platform: navigator.platform || 'Inconnu',
      vendor: navigator.vendor || 'Inconnu',
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      hardwareConcurrency: navigator.hardwareConcurrency || 'Inconnu'
    };
  }

  // Obtenir des informations sur la connexion
  getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      return {
        connectionType: connection.effectiveType || 'Inconnu',
        downlink: connection.downlink || 'Inconnu',
        rtt: connection.rtt || 'Inconnu',
        saveData: connection.saveData || false
      };
    }

    return {
      connectionType: 'Inconnu',
      downlink: 'Inconnu',
      rtt: 'Inconnu',
      saveData: false
    };
  }

  // Obtenir la durée de session
  getSessionDuration() {
    const sessionStart = sessionStorage.getItem('mhs_session_start');
    if (!sessionStart) {
      const now = Date.now();
      sessionStorage.setItem('mhs_session_start', now.toString());
      return 0;
    }
    return Date.now() - parseInt(sessionStart);
  }

  // Obtenir le temps de chargement de la page
  getPageLoadTime() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      return timing.loadEventEnd - timing.navigationStart;
    }
    return 'Inconnu';
  }

  // Vérifier si le visiteur a déjà visité
  hasVisitedBefore(visitorId) {
    const visitors = this.getAllVisitors();
    return visitors.some(v => v.visitorId === visitorId);
  }

  // Sauvegarder la visite
  saveVisit(visit) {
    const visitors = this.getAllVisitors();
    visitors.unshift(visit); // Ajouter au début
    
    // Garder seulement les 1000 dernières visites
    if (visitors.length > 1000) {
      visitors.splice(1000);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(visitors));
  }

  // Obtenir tous les visiteurs
  getAllVisitors() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  }

  // Obtenir les statistiques
  getStats() {
    const visitors = this.getAllVisitors();
    const uniqueVisitors = new Set(visitors.map(v => v.visitorId)).size;
    const uniqueIPs = new Set(visitors.map(v => v.ip)).size;
    
    // Calculs pour aujourd'hui
    const today = new Date().toDateString();
    const todayVisits = visitors.filter(v => 
      new Date(v.timestamp).toDateString() === today
    );

    // Top pages
    const pageCount = {};
    visitors.forEach(v => {
      pageCount[v.page] = (pageCount[v.page] || 0) + 1;
    });

    // Top pays
    const countryCount = {};
    visitors.forEach(v => {
      countryCount[v.country] = (countryCount[v.country] || 0) + 1;
    });

    // Top navigateurs
    const browserCount = {};
    visitors.forEach(v => {
      browserCount[v.browser] = (browserCount[v.browser] || 0) + 1;
    });

    return {
      totalVisits: visitors.length,
      uniqueVisitors,
      uniqueIPs,
      todayVisits: todayVisits.length,
      topPages: Object.entries(pageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      topCountries: Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      topBrowsers: Object.entries(browserCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    };
  }

  // Gestion des IP bloquées
  getBlockedIPs() {
    try {
      const data = localStorage.getItem(this.blockedIpsKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  }

  blockIP(ip, reason = 'Bloqué par admin') {
    const blockedIPs = this.getBlockedIPs();
    const blockInfo = {
      ip,
      reason,
      blockedAt: new Date().toISOString(),
      blockedBy: 'SuperAdmin'
    };
    
    if (!blockedIPs.find(blocked => blocked.ip === ip)) {
      blockedIPs.push(blockInfo);
      localStorage.setItem(this.blockedIpsKey, JSON.stringify(blockedIPs));
    }
  }

  unblockIP(ip) {
    const blockedIPs = this.getBlockedIPs();
    const filtered = blockedIPs.filter(blocked => blocked.ip !== ip);
    localStorage.setItem(this.blockedIpsKey, JSON.stringify(filtered));
  }

  isIPBlocked(ip) {
    const blockedIPs = this.getBlockedIPs();
    return blockedIPs.some(blocked => blocked.ip === ip);
  }

  redirectToBlocked() {
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #dc2626, #991b1b);
        color: white;
        font-family: Inter, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="font-size: 3em; margin-bottom: 20px;">🚫</h1>
          <h2 style="font-size: 2em; margin-bottom: 20px;">Accès Refusé</h2>
          <p style="font-size: 1.2em; opacity: 0.9;">
            Votre adresse IP a été bloquée par l'administrateur.
          </p>
          <p style="font-size: 1em; opacity: 0.7; margin-top: 20px;">
            Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.
          </p>
        </div>
      </div>
    `;
  }

  // Nettoyer les anciennes données (garder seulement 30 jours)
  cleanOldData() {
    const visitors = this.getAllVisitors();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const filtered = visitors.filter(v => 
      new Date(v.timestamp) > thirtyDaysAgo
    );
    
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}

export default new VisitorService();