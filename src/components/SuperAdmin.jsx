import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  EyeIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  ClockIcon,
  ChartBarIcon,
  TrashIcon,
  ShieldExclamationIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import visitorService from '../services/visitorService';

const SuperAdmin = ({ isOpen, onClose }) => {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({});
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [activeTab, setActiveTab] = useState('visitors');

  useEffect(() => {
    if (isOpen) {
      loadData();
      const interval = setInterval(loadData, 5000); // Refresh toutes les 5 secondes
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const loadData = () => {
    setVisitors(visitorService.getAllVisitors());
    setStats(visitorService.getStats());
    setBlockedIPs(visitorService.getBlockedIPs());
  };

  const handleBlockIP = (ip) => {
    const reason = prompt('Raison du blocage (optionnel):') || 'Bloqué par admin';
    visitorService.blockIP(ip, reason);
    loadData();
    alert(`IP ${ip} bloquée avec succès!`);
  };

  const handleUnblockIP = (ip) => {
    if (confirm(`Êtes-vous sûr de vouloir débloquer l'IP ${ip}?`)) {
      visitorService.unblockIP(ip);
      loadData();
      alert(`IP ${ip} débloquée avec succès!`);
    }
  };

  const handleClearData = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données de visite?')) {
      localStorage.removeItem('mhs_visitors');
      loadData();
      alert('Données supprimées avec succès!');
    }
  };

  const handleCleanOldData = () => {
    visitorService.cleanOldData();
    loadData();
    alert('Anciennes données nettoyées (> 30 jours)!');
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = searchTerm === '' || 
      visitor.ip.includes(searchTerm) ||
      visitor.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.browser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'today' && new Date(visitor.timestamp).toDateString() === new Date().toDateString()) ||
      (filter === 'blocked' && visitorService.isIPBlocked(visitor.ip)) ||
      (filter === 'new' && visitor.isNewVisitor) ||
      (filter === 'mobile' && visitor.viewport && parseInt(visitor.viewport.split('x')[0]) < 768);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('fr-FR');
  };

  const getDeviceType = (viewport) => {
    if (!viewport) return 'Unknown';
    const width = parseInt(viewport.split('x')[0]);
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Morocco': '🇲🇦', 'Maroc': '🇲🇦',
      'Senegal': '🇸🇳', 'Sénégal': '🇸🇳',
      'Mali': '🇲🇱',
      'Ivory Coast': '🇨🇮', 'Côte d\'Ivoire': '🇨🇮',
      'Cameroon': '🇨🇲', 'Cameroun': '🇨🇲',
      'Burkina Faso': '🇧🇫',
      'Niger': '🇳🇪',
      'Chad': '🇹🇩', 'Tchad': '🇹🇩',
      'Gabon': '🇬🇦',
      'Guinea': '🇬🇳', 'Guinée': '🇬🇳',
      'Algeria': '🇩🇿', 'Algérie': '🇩🇿',
      'Tunisia': '🇹🇳', 'Tunisie': '🇹🇳',
      'Egypt': '🇪🇬', 'Égypte': '🇪🇬',
      'Nigeria': '🇳🇬',
      'Ghana': '🇬🇭',
      'Kenya': '🇰🇪',
      'Ethiopia': '🇪🇹', 'Éthiopie': '🇪🇹',
      'South Africa': '🇿🇦', 'Afrique du Sud': '🇿🇦',
      'France': '🇫🇷',
      'Spain': '🇪🇸', 'Espagne': '🇪🇸',
      'Belgium': '🇧🇪', 'Belgique': '🇧🇪',
      'Canada': '🇨🇦',
      'United States': '🇺🇸', 'États-Unis': '🇺🇸',
      'Germany': '🇩🇪', 'Allemagne': '🇩🇪',
      'United Kingdom': '🇬🇧', 'Royaume-Uni': '🇬🇧'
    };
    return flags[country] || '🌍';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldExclamationIcon className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Super Admin Panel</h2>
                  <p className="text-red-100">Gestion des visiteurs et sécurité</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.totalVisits || 0}</div>
                <div className="text-xs opacity-75">Total Visites</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.uniqueVisitors || 0}</div>
                <div className="text-xs opacity-75">Visiteurs Uniques</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.todayVisits || 0}</div>
                <div className="text-xs opacity-75">Aujourd'hui</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{blockedIPs.length}</div>
                <div className="text-xs opacity-75">IPs Bloquées</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'visitors', name: 'Visiteurs', icon: UserGroupIcon },
                { id: 'blocked', name: 'IPs Bloquées', icon: NoSymbolIcon },
                { id: 'stats', name: 'Statistiques', icon: ChartBarIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'visitors' && (
              <div className="p-6">
                {/* Contrôles */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher par IP, pays, ville..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">Tous les visiteurs</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="new">Nouveaux visiteurs</option>
                    <option value="mobile">Visiteurs mobile</option>
                    <option value="blocked">IPs bloquées</option>
                  </select>
                  <button
                    onClick={loadData}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    <span>Actualiser</span>
                  </button>
                </div>

                {/* Actions rapides */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={handleCleanOldData}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600"
                  >
                    Nettoyer anciennes données
                  </button>
                  <button
                    onClick={handleClearData}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                  >
                    Supprimer toutes données
                  </button>
                </div>

                {/* Liste des visiteurs */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Visiteur
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Localisation
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Appareil
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Visite
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVisitors.map((visitor) => (
                          <tr key={visitor.id} className={`hover:bg-gray-50 ${visitorService.isIPBlocked(visitor.ip) ? 'bg-red-50' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                                    visitor.isNewVisitor ? 'bg-green-500' : 'bg-blue-500'
                                  }`}>
                                    {visitor.isNewVisitor ? 'N' : 'R'}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{visitor.ip}</div>
                                  <div className="text-sm text-gray-500">{visitor.visitorId.slice(0, 8)}...</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="mr-2">{getCountryFlag(visitor.country)}</span>
                                <div>
                                  <div className="text-sm text-gray-900">{visitor.city}, {visitor.country}</div>
                                  <div className="text-sm text-gray-500">{visitor.language}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getDeviceType(visitor.viewport) === 'Mobile' ? 
                                  <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" /> :
                                  <ComputerDesktopIcon className="h-5 w-5 text-gray-400 mr-2" />
                                }
                                <div>
                                  <div className="text-sm text-gray-900">{visitor.browser} / {visitor.os}</div>
                                  <div className="text-sm text-gray-500">{visitor.viewport}</div>
                                  {visitor.connectionType && (
                                    <div className="text-xs text-blue-600">{visitor.connectionType}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm text-gray-900">{visitor.page}</div>
                                <div className="text-sm text-gray-500">{formatDate(visitor.timestamp)}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setSelectedVisitor(visitor)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Voir détails"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                {visitorService.isIPBlocked(visitor.ip) ? (
                                  <button
                                    onClick={() => handleUnblockIP(visitor.ip)}
                                    className="text-green-600 hover:text-green-900"
                                    title="Débloquer IP"
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleBlockIP(visitor.ip)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Bloquer IP"
                                  >
                                    <NoSymbolIcon className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredVisitors.length === 0 && (
                    <div className="text-center py-12">
                      <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun visiteur</h3>
                      <p className="mt-1 text-sm text-gray-500">Aucun visiteur ne correspond aux critères de recherche.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'blocked' && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Adresses IP Bloquées</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Adresse IP
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Raison
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bloquée le
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {blockedIPs.map((blocked, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <NoSymbolIcon className="h-5 w-5 text-red-500 mr-3" />
                                <span className="text-sm font-medium text-gray-900">{blocked.ip}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{blocked.reason}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500">{formatDate(blocked.blockedAt)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleUnblockIP(blocked.ip)}
                                className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                                <span>Débloquer</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {blockedIPs.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune IP bloquée</h3>
                      <p className="mt-1 text-sm text-gray-500">Toutes les adresses IP sont autorisées.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="p-6 space-y-6">
                {/* Top Pages */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pages les plus visitées</h3>
                  <div className="space-y-2">
                    {stats.topPages?.map(([page, count], index) => (
                      <div key={page} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{page}</span>
                        <span className="text-sm font-medium text-gray-900">{count} visites</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Pays */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pays les plus représentés</h3>
                  <div className="space-y-2">
                    {stats.topCountries?.map(([country, count], index) => (
                      <div key={country} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="mr-2">{getCountryFlag(country)}</span>
                          <span className="text-sm text-gray-600">{country}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{count} visiteurs</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Navigateurs */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Navigateurs les plus utilisés</h3>
                  <div className="space-y-2">
                    {stats.topBrowsers?.map(([browser, count], index) => (
                      <div key={browser} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{browser}</span>
                        <span className="text-sm font-medium text-gray-900">{count} utilisateurs</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Modal détails visiteur */}
      {selectedVisitor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
          onClick={() => setSelectedVisitor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Détails du Visiteur</h3>
                <button
                  onClick={() => setSelectedVisitor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Adresse IP</label>
                    <p className="text-lg font-mono">{selectedVisitor.ip}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">ID Visiteur</label>
                    <p className="text-sm font-mono">{selectedVisitor.visitorId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Localisation</label>
                    <p>{getCountryFlag(selectedVisitor.country)} {selectedVisitor.city}, {selectedVisitor.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Langue</label>
                    <p>{selectedVisitor.language}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Navigateur</label>
                    <p>{selectedVisitor.browser}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Système</label>
                    <p>{selectedVisitor.os}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Résolution écran</label>
                    <p>{selectedVisitor.screenResolution}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Viewport</label>
                    <p>{selectedVisitor.viewport}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Page visitée</label>
                  <p>{selectedVisitor.page}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Référent</label>
                  <p>{selectedVisitor.referrer}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Date de visite</label>
                  <p>{formatDate(selectedVisitor.timestamp)}</p>
                </div>

                                  <div>
                    <label className="text-sm font-medium text-gray-500">Modèle d'appareil</label>
                    <p>{selectedVisitor.deviceModel || 'Inconnu'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Connexion</label>
                      <p>{selectedVisitor.connectionType || 'Inconnu'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">ISP</label>
                      <p>{selectedVisitor.isp || 'Inconnu'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fuseau horaire</label>
                      <p>{selectedVisitor.timezone || 'Inconnu'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Support tactile</label>
                      <p>{selectedVisitor.touchSupport ? 'Oui' : 'Non'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Durée session</label>
                      <p>{selectedVisitor.sessionDuration ? `${Math.floor(selectedVisitor.sessionDuration / 1000)}s` : 'Inconnu'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Temps chargement</label>
                      <p>{selectedVisitor.pageLoadTime && selectedVisitor.pageLoadTime !== 'Inconnu' ? `${selectedVisitor.pageLoadTime}ms` : 'Inconnu'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ratio pixel</label>
                      <p>{selectedVisitor.pixelRatio || 'Inconnu'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Profondeur couleur</label>
                      <p>{selectedVisitor.colorDepth || 'Inconnu'} bits</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Cookies activés</label>
                      <p>{selectedVisitor.cookieEnabled ? 'Oui' : 'Non'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Statut en ligne</label>
                      <p>{selectedVisitor.onlineStatus ? 'En ligne' : 'Hors ligne'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Langues acceptées</label>
                    <p>{selectedVisitor.languages || selectedVisitor.language}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">URL complète</label>
                    <p className="text-xs text-gray-600 break-all">{selectedVisitor.url}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Titre de la page</label>
                    <p>{selectedVisitor.title}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">User Agent</label>
                    <p className="text-xs text-gray-600 break-all">{selectedVisitor.userAgent}</p>
                  </div>

                <div className="flex items-center space-x-4 pt-4 border-t">
                  {selectedVisitor.isNewVisitor && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Nouveau visiteur
                    </span>
                  )}
                  {visitorService.isIPBlocked(selectedVisitor.ip) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      IP Bloquée
                    </span>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  {!visitorService.isIPBlocked(selectedVisitor.ip) ? (
                    <button
                      onClick={() => {
                        handleBlockIP(selectedVisitor.ip);
                        setSelectedVisitor(null);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Bloquer cette IP
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleUnblockIP(selectedVisitor.ip);
                        setSelectedVisitor(null);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Débloquer cette IP
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuperAdmin;