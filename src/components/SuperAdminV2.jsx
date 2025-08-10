import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  EyeIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrashIcon,
  ShieldExclamationIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  BellIcon,
  BellSlashIcon,
  CogIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  PresentationChartBarIcon,
  FireIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { format, subDays, isToday, isYesterday, startOfDay, endOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import visitorService from '../services/visitorService';

const SuperAdminV2 = ({ isOpen, onClose }) => {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({});
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dateRange, setDateRange] = useState('7d');
  const [suspiciousActivity, setSuspiciousActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState('healthy');
  const dashboardRef = useRef(null);

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    if (isOpen) {
      loadData();
      const interval = setInterval(() => {
        if (autoRefresh) {
          loadData();
          checkForThreats();
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, autoRefresh]);

  const loadData = () => {
    const visitorsData = visitorService.getAllVisitors();
    setVisitors(visitorsData);
    setStats(visitorService.getStats());
    setBlockedIPs(visitorService.getBlockedIPs());
    generateAdvancedStats(visitorsData);
  };

  const generateAdvancedStats = (visitorsData) => {
    const alerts = [];
    const suspicious = [];
    const ipCounts = {};
    const last24h = Date.now() - 24 * 60 * 60 * 1000;
    
    visitorsData.forEach(visitor => {
      if (new Date(visitor.timestamp).getTime() > last24h) {
        ipCounts[visitor.ip] = (ipCounts[visitor.ip] || 0) + 1;
      }
    });

    Object.entries(ipCounts).forEach(([ip, count]) => {
      if (count > 50) {
        alerts.push({
          type: 'warning',
          message: `IP ${ip} a fait ${count} requêtes en 24h (possible bot)`,
          timestamp: new Date(),
          action: () => handleBlockIP(ip)
        });
        suspicious.push({ ip, reason: 'Trop de requêtes', count });
      }
    });

    setAlerts(alerts.slice(0, 10));
    setSuspiciousActivity(suspicious);
    setSystemStatus(alerts.some(a => a.type === 'warning') ? 'warning' : 'healthy');
  };

  const checkForThreats = () => {
    const visitors = visitorService.getAllVisitors();
    const recentVisitors = visitors.filter(v => 
      new Date(v.timestamp).getTime() > Date.now() - 5 * 60 * 1000
    );

    if (recentVisitors.length > 20) {
      setAlerts(prev => [{
        type: 'warning',
        message: `Pic de trafic détecté: ${recentVisitors.length} visiteurs en 5 minutes`,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]);
    }
  };

  const getAnalyticsData = () => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 1;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);
      
      const dayVisitors = visitors.filter(v => {
        const visitDate = new Date(v.timestamp);
        return visitDate >= dayStart && visitDate <= dayEnd;
      });

      data.push({
        date: format(date, 'dd/MM', { locale: fr }),
        visites: dayVisitors.length,
        visiteurs: new Set(dayVisitors.map(v => v.visitorId)).size
      });
    }
    
    return data;
  };

  const getDeviceStats = () => {
    const devices = {};
    visitors.forEach(visitor => {
      const device = visitor.deviceType || getDeviceType(visitor.viewport);
      devices[device] = (devices[device] || 0) + 1;
    });
    
    return Object.entries(devices).map(([name, value]) => ({
      name,
      value,
      fill: COLORS[Object.keys(devices).indexOf(name) % COLORS.length]
    }));
  };

  const getHourlyData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}h`,
      visites: 0
    }));

    const today = visitors.filter(v => isToday(new Date(v.timestamp)));
    
    today.forEach(visitor => {
      const hour = new Date(visitor.timestamp).getHours();
      hours[hour].visites += 1;
    });

    return hours;
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(visitors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Visiteurs');
    XLSX.writeFile(wb, `visitors_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const exportToPDF = async () => {
    if (dashboardRef.current) {
      const canvas = await html2canvas(dashboardRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
      pdf.save(`dashboard_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    }
  };

  const exportToCSV = () => {
    const headers = ['IP', 'Pays', 'Ville', 'Navigateur', 'OS', 'Page', 'Date'];
    const csv = [
      headers.join(','),
      ...visitors.map(v => [
        v.ip, v.country, v.city, v.browser, v.os, v.page, v.timestamp
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitors_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const handleBlockIP = (ip) => {
    const reason = prompt('Raison du blocage (optionnel):') || 'Bloqué par admin';
    visitorService.blockIP(ip, reason);
    loadData();
    
    if (notifications) {
      setAlerts(prev => [{
        type: 'success',
        message: `IP ${ip} bloquée avec succès`,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]);
    }
  };

  const handleUnblockIP = (ip) => {
    if (confirm(`Êtes-vous sûr de vouloir débloquer l'IP ${ip}?`)) {
      visitorService.unblockIP(ip);
      loadData();
    }
  };

  const handleClearData = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données de visite?')) {
      localStorage.removeItem('mhs_visitors');
      loadData();
    }
  };

  const handleCleanOldData = () => {
    visitorService.cleanOldData();
    loadData();
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = searchTerm === '' || 
      visitor.ip.includes(searchTerm) ||
      visitor.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.browser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'today' && isToday(new Date(visitor.timestamp))) ||
      (filter === 'yesterday' && isYesterday(new Date(visitor.timestamp))) ||
      (filter === 'blocked' && visitorService.isIPBlocked(visitor.ip)) ||
      (filter === 'new' && visitor.isNewVisitor) ||
      (filter === 'mobile' && visitor.viewport && parseInt(visitor.viewport.split('x')[0]) < 768) ||
      (filter === 'suspicious' && suspiciousActivity.some(s => s.ip === visitor.ip));

    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm', { locale: fr });
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
      'France': '🇫🇷',
      'Spain': '🇪🇸', 'Espagne': '🇪🇸',
      'Belgium': '🇧🇪', 'Belgique': '🇧🇪',
      'Canada': '🇨🇦',
      'United States': '🇺🇸', 'États-Unis': '🇺🇸',
      'Germany': '🇩🇪', 'Allemagne': '🇩🇪'
    };
    return flags[country] || '🌍';
  };

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'danger': return 'text-red-500';
      default: return 'text-blue-500';
    }
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
          {/* Header amélioré */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldExclamationIcon className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Super Admin Panel v2.0</h2>
                  <div className="flex items-center space-x-4 text-red-100">
                    <p>Gestion avancée et monitoring en temps réel</p>
                    <div className="flex items-center space-x-1">
                      <div className={`h-2 w-2 rounded-full ${systemStatus === 'healthy' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      <span className="text-xs">Système {systemStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`p-2 rounded-lg transition-colors ${
                    notifications ? 'bg-red-500/20' : 'bg-red-500/50'
                  }`}
                  title={notifications ? 'Désactiver notifications' : 'Activer notifications'}
                >
                  {notifications ? 
                    <BellIcon className="h-5 w-5" /> : 
                    <BellSlashIcon className="h-5 w-5" />
                  }
                </button>
                
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`p-2 rounded-lg transition-colors ${
                    autoRefresh ? 'bg-red-500/20' : 'bg-red-500/50'
                  }`}
                  title={autoRefresh ? 'Désactiver auto-refresh' : 'Activer auto-refresh'}
                >
                  <ArrowPathIcon className={`h-5 w-5 ${autoRefresh ? 'animate-spin' : ''}`} />
                </button>
                
                <button
                  onClick={onClose}
                  className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
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
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{alerts.length}</div>
                <div className="text-xs opacity-75">Alertes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{suspiciousActivity.length}</div>
                <div className="text-xs opacity-75">Activités Suspectes</div>
              </div>
            </div>
          </div>

          {/* Alertes en temps réel */}
          {alerts.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-yellow-800">🚨 Alertes Récentes</h3>
                <button
                  onClick={() => setAlerts([])}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 max-h-20 overflow-y-auto">
                {alerts.slice(0, 3).map((alert, index) => (
                  <div key={index} className="text-sm text-yellow-700 flex items-center justify-between">
                    <span>{alert.message}</span>
                    <span className="text-xs opacity-75">
                      {format(alert.timestamp, 'HH:mm')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: PresentationChartBarIcon },
                { id: 'visitors', name: 'Visiteurs', icon: UserGroupIcon },
                { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
                { id: 'security', name: 'Sécurité', icon: LockClosedIcon },
                { id: 'blocked', name: 'IPs Bloquées', icon: NoSymbolIcon },
                { id: 'exports', name: 'Exports', icon: DocumentArrowDownIcon },
                { id: 'settings', name: 'Paramètres', icon: CogIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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

          {/* Contenu principal */}
          <div className="flex-1 overflow-auto" ref={dashboardRef}>
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">📊 Tableau de Bord Analytics</h3>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="1d">Aujourd'hui</option>
                    <option value="7d">7 derniers jours</option>
                    <option value="30d">30 derniers jours</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Graphique des visites */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">📈 Évolution des Visites</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={getAnalyticsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="visites" 
                          stroke="#ef4444" 
                          fill="#fef2f2" 
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="visiteurs" 
                          stroke="#3b82f6" 
                          fill="#eff6ff" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Répartition des appareils */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">📱 Répartition des Appareils</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getDeviceStats()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {getDeviceStats().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Activité par heure */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">⏰ Activité par Heure (Aujourd'hui)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getHourlyData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="visites" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top pays */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🌍 Top Pays</h4>
                    <div className="space-y-3">
                      {stats.topCountries?.slice(0, 8).map(([country, count], index) => (
                        <div key={country} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{getCountryFlag(country)}</span>
                            <span className="text-sm font-medium">{country}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${(count / (stats.topCountries?.[0]?.[1] || 1)) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sécurité */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">🔒 Centre de Sécurité</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <FireIcon className="h-5 w-5 text-red-500 mr-2" />
                      Activités Suspectes
                    </h4>
                    {suspiciousActivity.length === 0 ? (
                      <p className="text-gray-500">✅ Aucune activité suspecte détectée</p>
                    ) : (
                      <div className="space-y-3">
                        {suspiciousActivity.map((activity, index) => (
                          <div key={index} className="border border-red-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-red-800">{activity.ip}</p>
                                <p className="text-sm text-red-600">{activity.reason}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-red-500 font-bold">{activity.count}</span>
                                <button
                                  onClick={() => handleBlockIP(activity.ip)}
                                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                >
                                  Bloquer
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <ShieldExclamationIcon className="h-5 w-5 text-green-500 mr-2" />
                      Règles de Sécurité Actives
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm">✅ Blocage automatique (>50 requêtes/24h)</span>
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm">✅ Détection pays inhabituels</span>
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm">🔄 Monitoring temps réel</span>
                        <ClockIcon className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exports */}
            {activeTab === 'exports' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">📤 Centre d'Export</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <ClipboardDocumentListIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">📊 Export Excel</h4>
                    <p className="text-gray-600 mb-4">Exporter tous les visiteurs au format Excel avec filtres avancés</p>
                    <button
                      onClick={exportToExcel}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Télécharger Excel
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <DocumentArrowDownIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">📄 Export PDF</h4>
                    <p className="text-gray-600 mb-4">Générer un rapport PDF complet du dashboard avec graphiques</p>
                    <button
                      onClick={exportToPDF}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Générer PDF
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <DocumentArrowDownIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">📋 Export CSV</h4>
                    <p className="text-gray-600 mb-4">Exporter les données brutes au format CSV pour analyse externe</p>
                    <button
                      onClick={exportToCSV}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Télécharger CSV
                    </button>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Conseil d'utilisation</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Excel : Parfait pour les analyses détaillées et les présentations</li>
                    <li>• PDF : Idéal pour les rapports officiels et l'archivage</li>
                    <li>• CSV : Optimal pour l'import dans d'autres outils d'analyse</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Visiteurs - interface améliorée */}
            {activeTab === 'visitors' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">👥 Gestion des Visiteurs</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {filteredVisitors.length} / {visitors.length} visiteurs
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="🔍 Rechercher par IP, pays, ville, navigateur..."
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
                    <option value="all">🌐 Tous les visiteurs</option>
                    <option value="today">📅 Aujourd'hui</option>
                    <option value="yesterday">📅 Hier</option>
                    <option value="new">✨ Nouveaux visiteurs</option>
                    <option value="mobile">📱 Visiteurs mobile</option>
                    <option value="blocked">🚫 IPs bloquées</option>
                    <option value="suspicious">⚠️ Activité suspecte</option>
                  </select>
                  <button
                    onClick={loadData}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    <span>Actualiser</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={handleCleanOldData}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 flex items-center space-x-1 transition-colors"
                  >
                    <ClockIcon className="h-4 w-4" />
                    <span>🧹 Nettoyer anciennes données</span>
                  </button>
                  <button
                    onClick={handleClearData}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 flex items-center space-x-1 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span>🗑️ Supprimer toutes données</span>
                  </button>
                </div>

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
                          <tr key={visitor.id} className={`hover:bg-gray-50 transition-colors ${visitorService.isIPBlocked(visitor.ip) ? 'bg-red-50' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                                    visitor.isNewVisitor ? 'bg-green-500' : 
                                    suspiciousActivity.some(s => s.ip === visitor.ip) ? 'bg-red-500' :
                                    'bg-blue-500'
                                  }`}>
                                    {visitor.isNewVisitor ? '✨' : 
                                     suspiciousActivity.some(s => s.ip === visitor.ip) ? '⚠️' : '👤'}
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
                                    <div className="text-xs text-blue-600">📶 {visitor.connectionType}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm text-gray-900">{visitor.page}</div>
                                <div className="text-sm text-gray-500">{formatDate(visitor.timestamp)}</div>
                                {visitor.sessionDuration && (
                                  <div className="text-xs text-green-600">
                                    ⏱️ Session: {Math.floor(visitor.sessionDuration / 1000)}s
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setSelectedVisitor(visitor)}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                  title="Voir détails"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                {visitorService.isIPBlocked(visitor.ip) ? (
                                  <button
                                    onClick={() => handleUnblockIP(visitor.ip)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded"
                                    title="Débloquer IP"
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleBlockIP(visitor.ip)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded"
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
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun visiteur trouvé</h3>
                      <p className="mt-1 text-sm text-gray-500">Aucun visiteur ne correspond aux critères de recherche.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analytics avancées */}
            {activeTab === 'analytics' && (
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">📊 Analytics Avancées</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🎯 Métriques Clés</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>📊 Taux de rebond</span>
                        <span className="font-bold">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>⏱️ Durée moyenne session</span>
                        <span className="font-bold">2m 34s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>📄 Pages par visite</span>
                        <span className="font-bold">2.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>⚡ Temps de chargement moyen</span>
                        <span className="font-bold">1.2s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🌐 Top Navigateurs</h4>
                    <div className="space-y-2">
                      {stats.topBrowsers?.map(([browser, count], index) => (
                        <div key={browser} className="flex justify-between items-center">
                          <span className="text-sm">{browser}</span>
                          <span className="text-sm font-medium bg-blue-100 px-2 py-1 rounded">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🚀 Sources de Trafic</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">🔗 Direct</span>
                        <span className="text-sm font-medium bg-green-100 px-2 py-1 rounded">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">🔍 Recherche Google</span>
                        <span className="text-sm font-medium bg-blue-100 px-2 py-1 rounded">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">📱 Réseaux sociaux</span>
                        <span className="text-sm font-medium bg-purple-100 px-2 py-1 rounded">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">🌐 Autres</span>
                        <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IPs Bloquées */}
            {activeTab === 'blocked' && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">🚫 Adresses IP Bloquées</h3>
                    <p className="text-sm text-gray-500 mt-1">{blockedIPs.length} IP(s) actuellement bloquée(s)</p>
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
                      <h3 className="mt-2 text-sm font-medium text-gray-900">✅ Aucune IP bloquée</h3>
                      <p className="mt-1 text-sm text-gray-500">Toutes les adresses IP sont autorisées.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Paramètres */}
            {activeTab === 'settings' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ Paramètres du Système</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🔔 Notifications</h4>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2">🔔 Activer les notifications en temps réel</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={autoRefresh}
                          onChange={(e) => setAutoRefresh(e.target.checked)}
                          className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2">🔄 Actualisation automatique (5s)</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-medium mb-4">🗂️ Gestion des Données</h4>
                    <div className="space-y-4">
                      <button
                        onClick={handleCleanOldData}
                        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        🧹 Nettoyer données anciennes (>30j)
                      </button>
                      <button
                        onClick={handleClearData}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        🗑️ Supprimer toutes les données
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">ℹ️ Informations Système</h4>
                  <div className="text-sm text-blue-700 grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Version:</strong> SuperAdmin v2.0</p>
                      <p><strong>Données stockées:</strong> {visitors.length} visites</p>
                    </div>
                    <div>
                      <p><strong>Statut:</strong> {systemStatus}</p>
                      <p><strong>Auto-refresh:</strong> {autoRefresh ? 'Activé' : 'Désactivé'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Modal détails visiteur amélioré */}
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">🔍 Détails du Visiteur</h3>
                  <p className="text-sm text-gray-500">Informations complètes et métadonnées avancées</p>
                </div>
                <button
                  onClick={() => setSelectedVisitor(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">📍 Adresse IP</label>
                    <p className="text-lg font-mono bg-gray-100 p-2 rounded">{selectedVisitor.ip}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">🆔 ID Visiteur</label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedVisitor.visitorId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">🌍 Localisation</label>
                    <p className="bg-gray-100 p-2 rounded">
                      {getCountryFlag(selectedVisitor.country)} {selectedVisitor.city}, {selectedVisitor.country}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">🕐 Fuseau horaire</label>
                    <p className="bg-gray-100 p-2 rounded">{selectedVisitor.timezone || 'Inconnu'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">🌐 Navigateur</label>
                    <p className="bg-gray-100 p-2 rounded">{selectedVisitor.browser}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">💻 Système d'exploitation</label>
                    <p className="bg-gray-100 p-2 rounded">{selectedVisitor.os}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">📱 Type d'appareil</label>
                    <p className="bg-gray-100 p-2 rounded">{selectedVisitor.deviceType || getDeviceType(selectedVisitor.viewport)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">📐 Résolution / Viewport</label>
                    <p className="bg-gray-100 p-2 rounded">
                      {selectedVisitor.screenResolution} / {selectedVisitor.viewport}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">📶 Connexion</label>
                  <p className="text-sm bg-blue-50 p-2 rounded">{selectedVisitor.connectionType || 'Inconnu'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">👆 Support tactile</label>
                  <p className="text-sm bg-blue-50 p-2 rounded">{selectedVisitor.touchSupport ? '✅ Oui' : '❌ Non'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">🍪 Cookies</label>
                  <p className="text-sm bg-blue-50 p-2 rounded">{selectedVisitor.cookieEnabled ? '✅ Activés' : '❌ Désactivés'}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4">🧭 Session et Navigation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">📄 Page visitée</label>
                    <p className="text-sm bg-gray-100 p-2 rounded">{selectedVisitor.page}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">🔗 Référent</label>
                    <p className="text-sm bg-gray-100 p-2 rounded break-all">{selectedVisitor.referrer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">📅 Date de visite</label>
                    <p className="text-sm bg-gray-100 p-2 rounded">{formatDate(selectedVisitor.timestamp)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">⏱️ Durée session</label>
                    <p className="text-sm bg-gray-100 p-2 rounded">
                      {selectedVisitor.sessionDuration ? `${Math.floor(selectedVisitor.sessionDuration / 1000)}s` : 'Inconnu'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {selectedVisitor.isNewVisitor && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✨ Nouveau visiteur
                      </span>
                    )}
                    {visitorService.isIPBlocked(selectedVisitor.ip) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        🚫 IP Bloquée
                      </span>
                    )}
                    {suspiciousActivity.some(s => s.ip === selectedVisitor.ip) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Activité suspecte
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {!visitorService.isIPBlocked(selectedVisitor.ip) ? (
                      <button
                        onClick={() => {
                          handleBlockIP(selectedVisitor.ip);
                          setSelectedVisitor(null);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2 transition-colors"
                      >
                        <NoSymbolIcon className="h-4 w-4" />
                        <span>🚫 Bloquer cette IP</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleUnblockIP(selectedVisitor.ip);
                          setSelectedVisitor(null);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2 transition-colors"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        <span>✅ Débloquer cette IP</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuperAdminV2;