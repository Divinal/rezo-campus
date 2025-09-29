import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { schools } from '../data/schools';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MessageCircle, Settings, LogOut, Globe, Phone, Mail, ChevronRight, Search, Bell, User, Camera, Eye, EyeOff, Check, X as XIcon, Send,Loader2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messageThread, setMessageThread] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [updateInfo, setUpdateInfo] = useState({ nom: '', photo: '', password: '' });
  const [showMessaging, setShowMessaging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) navigate('/login');
      else {
        setUser(data.user);
        setUpdateInfo({
          nom: data.user.user_metadata?.nom || '',
          photo: data.user.user_metadata?.photo || '',
          password: '',
        });
      }
      setLoading(false);
    };
    getSession();
  }, [navigate]);

  useEffect(() => {
    const fetchThread = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`user_id.eq.${user?.id},sender_id.eq.${user?.id}`)
        .order('created_at', { ascending: true });
      
      if (data) {
        setMessageThread(data);
        // Compter les messages non lus (messages reçus où sender_id !== user.id)
        const unread = data.filter(msg => msg.sender_id !== user.id && !msg.read).length;
        setUnreadMessagesCount(unread);
      }
    };
    if (user) fetchThread();
    
    // Écouter les nouveaux messages en temps réel
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `user_id=eq.${user?.id}`
      }, (payload) => {
        const newMsg = payload.new;
        if (newMsg.sender_id !== user?.id) {
          setUnreadMessagesCount(prev => prev + 1);
          setMessageThread(prev => [...prev, newMsg]);
          
          // Notification sonore (optionnel)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nouveau message', {
              body: 'Vous avez reçu un nouveau message',
              icon: '/logo.png'
            });
          }
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSendingMessage(true);
    const { error } = await supabase.from('messages').insert({
      user_id: user.id,
      sender_id: user.id,
      texte: newMessage,
      read: false
    });
    
    if (!error) {
      setMessageThread([...messageThread, { 
        texte: newMessage, 
        sender_id: user.id, 
        created_at: new Date(),
        read: true
      }]);
      setNewMessage('');
    }
    setIsSendingMessage(false);
  };

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    const updates: any = {
      data: {
        nom: updateInfo.nom,
        photo: updateInfo.photo,
      },
    };
    if (updateInfo.password) updates.password = updateInfo.password;

    const { error } = await supabase.auth.updateUser(updates);
    if (!error) {
      alert('Profil mis à jour avec succès !');
      setUser({ ...user, user_metadata: { ...user.user_metadata, nom: updateInfo.nom, photo: updateInfo.photo }});
      setUpdateInfo({ ...updateInfo, password: '' });
    } else {
      alert('Erreur lors de la mise à jour');
    }
    setIsUpdatingProfile(false);
  };

  // Marquer les messages comme lus quand on ouvre la messagerie
  const markMessagesAsRead = useCallback(async () => {
    if (showMessaging && unreadMessagesCount > 0) {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('user_id', user?.id)
        .neq('sender_id', user?.id);
      setUnreadMessagesCount(0);
    }
  }, [showMessaging, unreadMessagesCount, user?.id]);

  useEffect(() => {
    markMessagesAsRead();
  }, [markMessagesAsRead]);

  // Filtrage des écoles avec recherche optimisée
  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return schools;
    const query = searchQuery.toLowerCase();
    return schools.filter(school => 
      school.name.toLowerCase().includes(query) || 
      school.address.toLowerCase().includes(query) ||
      school.description?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Demander la permission pour les notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-gray-600">Chargement de votre espace...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
           
      <main className="flex-grow">
        {/* En-tête du dashboard amélioré avec dégradé */}
        <div className="bg-gradient-to-r from-primary to-primary/80 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Info utilisateur avec animation */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                    {user?.user_metadata?.photo && !imageError ? (
                      <img
                        src={user.user_metadata.photo}
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {user?.user_metadata?.nom ? user.user_metadata.nom.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold">
                    Bienvenue, {user?.user_metadata?.nom || 'Étudiant'} 👋
                  </h1>
                  <p className="text-sm text-white/80 flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Actions avec badges de notification */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowMessaging(!showMessaging);
                    setShowSettings(false);
                  }}
                  className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                    showMessaging 
                      ? 'bg-white text-primary shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  aria-label="Messagerie"
                >
                  <MessageCircle className="w-5 h-5" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowMessaging(false);
                  }}
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                    showSettings 
                      ? 'bg-white text-primary shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  aria-label="Paramètres"
                >
                  <Settings className="w-5 h-5" />
                </button>

                <button
                  onClick={handleLogout}
                  className="p-3 rounded-xl bg-red-500/20 text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Layout principal avec sidebar d'établissements */}
          {!showMessaging && !showSettings && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contenu central - Détails de l'établissement */}
              <div className="flex-1 order-2 lg:order-1">
                {selectedSchool ? (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                    <div className="relative h-80 overflow-hidden group">
                      <img
                        src={selectedSchool.logo}
                        alt={selectedSchool.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-4xl font-bold mb-2">{selectedSchool.name}</h1>
                        <div className="flex items-center gap-2 text-sm">
                          {/* <MapPin className="w-4 h-4" /> */}
                          <span>{selectedSchool.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {selectedSchool.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary" />
                            Contact
                          </h3>
                          <div className="space-y-3">
                            <a 
                              href={`tel:${selectedSchool.contact.phone}`}
                              className="flex items-center text-gray-700 hover:text-primary transition-colors group"
                            >
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                                <Phone className="w-5 h-5 text-primary" />
                              </div>
                              {selectedSchool.contact.phone}
                            </a>
                            <a 
                              href={`mailto:${selectedSchool.contact.email}`}
                              className="flex items-center text-gray-700 hover:text-primary transition-colors group"
                            >
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                                <Mail className="w-5 h-5 text-primary" />
                              </div>
                              {selectedSchool.contact.email}
                            </a>
                            {selectedSchool.contact.website && (
                              <a
                                href={selectedSchool.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-700 hover:text-primary transition-colors group"
                              >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                                  <Globe className="w-5 h-5 text-primary" />
                                </div>
                                Site web officiel
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            {/* <MapPin className="w-5 h-5 text-secondary" /> */}
                            Localisation
                          </h3>
                          <p className="text-gray-700 leading-relaxed">{selectedSchool.address}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={`/school/${selectedSchool.id}`}
                          className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
                        >
                          Voir tous les détails
                        </Link>
                        <Link
                          to="/Contact"
                          className="flex-1 bg-gradient-to-r from-secondary to-secondary/90 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
                        >
                          Demander une information
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Bienvenue sur votre tableau de bord
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Sélectionnez un établissement dans la liste pour découvrir ses détails et programmes.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Messagerie</h3>
                        <p className="text-sm text-gray-600">
                          Communiquez directement avec l'équipe Rézo Campus pour une orientation personnalisée
                        </p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Settings className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Paramètres</h3>
                        <p className="text-sm text-gray-600">
                          Gérez votre profil et modifiez vos informations personnelles
                        </p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Globe className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Établissements</h3>
                        <p className="text-sm text-gray-600">
                          Explorez notre réseau d'écoles partenaires accrédités choisis spécialement pour vous
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar droite - Liste des établissements avec recherche */}
              <div className="w-full lg:w-96 order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-4">
                  <div className="p-6 bg-gradient-to-r from-primary to-primary/90 text-white">
                    <h2 className="text-xl font-bold mb-4">Établissements partenaires</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-0 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map((school) => (
                        <button
                          key={school.id}
                          onClick={() => setSelectedSchool(school)}
                          className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-all duration-200 ${
                            selectedSchool?.id === school.id 
                              ? 'bg-primary/5 border-l-4 border-l-primary' 
                              : 'hover:border-l-4 hover:border-l-primary/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <img
                                src={school.logo}
                                alt={school.name}
                                className="w-14 h-14 object-cover rounded-xl shadow-md"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                  {school.name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                                  {/* <MapPin className="w-3 h-3" /> */}
                                  {school.address}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                              selectedSchool?.id === school.id ? 'transform rotate-90' : ''
                            }`} />
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Aucun établissement trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Messagerie améliorée */}
          {showMessaging && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="p-6 bg-gradient-to-r from-primary to-primary/90 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    Messagerie
                  </h2>
                  <p className="text-sm text-white/80">Communication avec l'équipe Rézo Campus</p>
                </div>
                {unreadMessagesCount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold rounded-full px-4 py-2">
                    {unreadMessagesCount} nouveau{unreadMessagesCount > 1 ? 'x' : ''}
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="h-[500px] overflow-y-auto mb-6 space-y-4 custom-scrollbar bg-gray-50 rounded-xl p-4">
                  {messageThread.length > 0 ? (
                    messageThread.map((msg, index) => {
                      const isOwn = msg.sender_id === user.id;
                      return (
                        <div
                          key={index}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                              isOwn
                                ? 'bg-gradient-to-r from-primary to-primary/90 text-white rounded-br-none'
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                            }`}
                          >
                            <p className="break-words">{msg.texte}</p>
                            <p className={`text-xs mt-2 ${isOwn ? 'text-white/70' : 'text-gray-400'}`}>
                              {new Date(msg.created_at).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <MessageCircle className="w-16 h-16 mb-4" />
                      <p>Aucun message pour le moment</p>
                      <p className="text-sm">Commencez la conversation !</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && !isSendingMessage && handleSendMessage()}
                    disabled={isSendingMessage}
                  />
                  <button
                    className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={handleSendMessage}
                    disabled={isSendingMessage || !newMessage.trim()}
                  >
                    {isSendingMessage ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline">Envoyer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section Paramètres améliorée */}
          {showSettings && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
              <div className="p-6 bg-gradient-to-r from-primary to-primary/90 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Paramètres du profil
                </h2>
                <p className="text-sm text-white/80">Gérez vos informations personnelles</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Photo de profil preview */}
                <div className="flex items-center space-x-6 bg-gray-50 p-6 rounded-xl">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20">
                      {updateInfo.photo && !imageError ? (
                        <img
                          src={updateInfo.photo}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-white font-bold text-3xl">
                            {updateInfo.nom ? updateInfo.nom.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Photo de profil</h3>
                    <p className="text-sm text-gray-500">Ajoutez une URL d'image pour votre profil</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet *
                  </label>
                  <input
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Votre nom complet"
                    value={updateInfo.nom}
                    onChange={(e) => setUpdateInfo({ ...updateInfo, nom: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Photo de profil (URL)
                  </label>
                  <input
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="https://exemple.com/photo.jpg"
                    value={updateInfo.photo}
                    onChange={(e) => {
                      setUpdateInfo({ ...updateInfo, photo: e.target.value });
                      setImageError(false);
                    }}
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    L'image s'affichera automatiquement dans l'aperçu ci-dessus
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    🔒 Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Laisser vide pour ne pas changer"
                      value={updateInfo.password}
                      onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {updateInfo.password && (
                    <div className="space-y-1">
                      <p className={`text-xs flex items-center gap-1 ${updateInfo.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                        {updateInfo.password.length >= 8 ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
                        Minimum 8 caractères
                      </p>
                      <p className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(updateInfo.password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[A-Z]/.test(updateInfo.password) ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
                        Une lettre majuscule
                      </p>
                      <p className={`text-xs flex items-center gap-1 ${/[0-9]/.test(updateInfo.password) ? 'text-green-600' : 'text-gray-400'}`}>
                        {/[0-9]/.test(updateInfo.password) ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
                        Un chiffre
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile || !updateInfo.nom.trim()}
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                </div>

                {/* Informations supplémentaires */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Notifications activées</h4>
                      <p className="text-sm text-blue-700">
                        Vous recevrez des notifications pour les nouveaux messages et mises à jour importantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Styles personnalisés pour le scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;