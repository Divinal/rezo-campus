import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "../lib/supabaseClient";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GraduationCap, Users, Star, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Refs pour l'accessibilité
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Validation en temps réel de l'email
  const validateEmail = useCallback((value: string) => {
    if (!value) {
      setEmailError('L\'adresse e-mail est requise');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Veuillez saisir une adresse e-mail valide');
      return false;
    }
    setEmailError('');
    return true;
  }, []);

  // Validation du mot de passe
  const validatePassword = useCallback((value: string) => {
    if (!value) {
      setPasswordError('Le mot de passe est requis');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    setPasswordError('');
    return true;
  }, []);

  // Gestion de la saisie email avec validation
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
    if (errorMsg) setErrorMsg(''); // Clear global error when typing
  }, [validateEmail, errorMsg]);

  // Gestion de la saisie password avec validation
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validatePassword(value);
    if (errorMsg) setErrorMsg(''); // Clear global error when typing
  }, [validatePassword, errorMsg]);

  // Toggle visibility du mot de passe
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Focus sur le champ d'erreur pour l'accessibilité
  useEffect(() => {
    if (errorMsg && errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorMsg]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation complète avant soumission
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      // Focus sur le premier champ en erreur
      if (!isEmailValid && emailRef.current) {
        emailRef.current.focus();
      } else if (!isPasswordValid && passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMsg('Email ou mot de passe incorrect. Veuillez réessayer.');
        // Focus sur le champ email en cas d'erreur
        if (emailRef.current) {
          emailRef.current.focus();
        }
      } else {
        // Gestion du "Se souvenir de moi"
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMsg('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Récupération de l'email mémorisé au chargement
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50" role="main">
        <div className="min-h-full flex">
          {/* Côté gauche - Messages percutants - Améliorations responsive */}
          <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/90 p-6 md:p-8 lg:p-12 flex-col justify-center relative overflow-hidden">
            {/* Éléments décoratifs pour plus d'impact visuel */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-md mx-auto text-white">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight">
                Votre avenir commence ici
              </h1>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 lg:w-8 lg:h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Éducation de qualité</h3>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed">Accédez aux meilleures formations et établissements partenaires</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Communauté engagée</h3>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed">Rejoignez des milliers d'étudiants dans leur parcours académique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Excellence garantie</h3>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed">Des établissements reconnus pour leur qualité pédagogique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Côté droit - Formulaire de connexion amélioré */}
          <div className="w-full md:w-3/5 lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
            <div className="max-w-md w-full space-y-6 lg:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Connexion
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Accédez à votre espace étudiant
                </p>
              </div>
              
              <form className="space-y-5 lg:space-y-6" onSubmit={handleLogin} noValidate>
                {/* Champ Email amélioré */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? "email-error" : undefined}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        emailError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : email && !emailError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="votre@email.com"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={isLoading}
                    />
                    {/* Icône de validation */}
                    {email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {emailError ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {emailError && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {emailError}
                    </p>
                  )}
                </div>
                
                {/* Champ Password amélioré */}
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? "password-error" : undefined}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        passwordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : password && !passwordError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                    />
                    {/* Bouton toggle password visibility */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p id="password-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Checkbox "Se souvenir de moi" */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Message d'erreur global amélioré */}
                {errorMsg && (
                  <div 
                    ref={errorRef}
                    role="alert"
                    tabIndex={-1}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start animate-in slide-in-from-top-2 duration-300"
                  >
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Bouton de connexion amélioré */}
                <button
                  type="submit"
                  disabled={isLoading || !!emailError || !!passwordError}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-[0.98] transform"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </button>

                {/* Lien d'inscription amélioré */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link 
                      to="/signup" 
                      className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;