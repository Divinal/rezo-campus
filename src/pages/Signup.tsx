import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecaptchaComponent from '../components/RecaptchaComponent';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  BookOpen, 
  Award, 
  Zap, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Upload,
  User,
  Mail,
  Lock,
  Image
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // États de validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nomError, setNomError] = useState('');
  const [photoError, setPhotoError] = useState('');
  
  // Refs pour l'accessibilité
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const nomRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Validation du nom
  const validateNom = useCallback((value: string) => {
    if (!value.trim()) {
      setNomError('Le nom complet est requis');
      return false;
    }
    if (value.trim().length < 2) {
      setNomError('Le nom doit contenir au moins 2 caractères');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) {
      setNomError('Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets');
      return false;
    }
    setNomError('');
    return true;
  }, []);

  // Validation de l'email
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

  // Validation du mot de passe avec critères de sécurité
  const validatePassword = useCallback((value: string) => {
    if (!value) {
      setPasswordError('Le mot de passe est requis');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    if (!/(?=.*[a-z])/.test(value)) {
      setPasswordError('Le mot de passe doit contenir au moins une minuscule');
      return false;
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      setPasswordError('Le mot de passe doit contenir au moins une majuscule');
      return false;
    }
    if (!/(?=.*\d)/.test(value)) {
      setPasswordError('Le mot de passe doit contenir au moins un chiffre');
      return false;
    }
    setPasswordError('');
    return true;
  }, []);

  // Validation de la confirmation du mot de passe
  const validateConfirmPassword = useCallback((value: string) => {
    if (!value) {
      setConfirmPasswordError('Veuillez confirmer votre mot de passe');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  }, [password]);

  // Validation de l'URL de la photo
  const validatePhoto = useCallback((value: string) => {
    if (!value) {
      setPhotoError('');
      return true; // Optionnel
    }
    try {
      new URL(value);
      if (!value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        setPhotoError('L\'URL doit pointer vers une image (jpg, jpeg, png, gif, webp)');
        return false;
      }
      setPhotoError('');
      return true;
    } catch {
      setPhotoError('Veuillez saisir une URL valide');
      return false;
    }
  }, []);

  // Gestionnaires de changement avec validation
  const handleNomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNom(value);
    if (value) validateNom(value);
    if (error) setError('');
  }, [validateNom, error]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
    if (error) setError('');
  }, [validateEmail, error]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validatePassword(value);
    // Re-valider la confirmation si elle existe
    if (confirmPassword) validateConfirmPassword(confirmPassword);
    if (error) setError('');
  }, [validatePassword, confirmPassword, validateConfirmPassword, error]);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value) validateConfirmPassword(value);
    if (error) setError('');
  }, [validateConfirmPassword, error]);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoto(value);
    if (value) validatePhoto(value);
    if (error) setError('');
  }, [validatePhoto, error]);

  // Toggle visibilité mot de passe
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Gestion du reCAPTCHA
  const handleRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
    if (error && token) setError('');
  }, [error]);

  // Focus sur le champ d'erreur
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  // Calcul de la force du mot de passe
  const getPasswordStrength = useCallback((password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, []);

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation complète
    const isNomValid = validateNom(nom);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isPhotoValid = validatePhoto(photo);

    if (!isNomValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isPhotoValid) {
      // Focus sur le premier champ en erreur
      if (!isNomValid && nomRef.current) nomRef.current.focus();
      else if (!isEmailValid && emailRef.current) emailRef.current.focus();
      else if (!isPasswordValid && passwordRef.current) passwordRef.current.focus();
      else if (!isConfirmPasswordValid && confirmPasswordRef.current) confirmPasswordRef.current.focus();
      return;
    }

    if (!recaptchaToken) {
      setError("Veuillez valider le reCAPTCHA");
      return;
    }

    if (!acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Étape 1 : créer le compte
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: nom.trim(),
            avatar_url: photo.trim() || null,
          }
        }
      });

      if (signupError) {
        setError(signupError.message === 'User already registered' 
          ? 'Cette adresse e-mail est déjà utilisée' 
          : 'Erreur lors de la création du compte. Veuillez réessayer.');
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Erreur lors de la création du compte. Veuillez réessayer.");
        return;
      }

      // Étape 2 : insérer dans user_profiles
      const { error: insertError } = await supabase.from("user_profiles").insert({
        id: user.id,
        full_name: nom.trim(),
        email: email.trim().toLowerCase(),
        avatar_url: photo.trim() || null,
      });

      if (insertError) {
        console.error('Erreur d\'insertion du profil:', insertError);
        // Ne pas bloquer l'utilisateur si le profil n'est pas créé
      }

      // Étape 3 : rediriger avec message de succès
      navigate("/dashboard", { 
        state: { 
          message: "Compte créé avec succès ! Bienvenue sur RézoCampus." 
        } 
      });
      
    } catch (error) {
      console.error('Erreur inattendue:', error);
      setError('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50" role="main">
        <div className="min-h-full flex">
          {/* Côté gauche - Formulaire d'inscription amélioré */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
            <div className="max-w-md w-full space-y-6 lg:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Créer votre compte
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Rejoignez RézoCampus aujourd'hui
                </p>
              </div>
              
              <form className="space-y-5" onSubmit={handleSignup} noValidate>
                {/* Champ Nom complet */}
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={nomRef}
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      aria-invalid={!!nomError}
                      aria-describedby={nomError ? "nom-error" : undefined}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        nomError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : nom && !nomError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="Votre nom complet"
                      value={nom}
                      onChange={handleNomChange}
                      disabled={isLoading}
                    />
                    {nom && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {nomError ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {nomError && (
                    <p id="nom-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {nomError}
                    </p>
                  )}
                </div>
                
                {/* Champ Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? "email-error" : undefined}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
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
                
                {/* Champ Mot de passe */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? "password-error" : "password-strength"}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        passwordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : password && !passwordError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="Mot de passe sécurisé"
                      value={password}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                    />
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
                  
                  {/* Indicateur de force du mot de passe */}
                  {password && (
                    <div id="password-strength" className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Force du mot de passe</span>
                        <span>{strengthLabels[passwordStrength - 1] || 'Très faible'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength - 1] || 'bg-red-500'}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {passwordError && (
                    <p id="password-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Champ Confirmation mot de passe */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={confirmPasswordRef}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      aria-invalid={!!confirmPasswordError}
                      aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        confirmPasswordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : confirmPassword && !confirmPasswordError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="Confirmez votre mot de passe"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p id="confirm-password-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                
                {/* Champ Photo de profil */}
                <div>
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                    Photo de profil (optionnel)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="photo"
                      name="photo"
                      type="url"
                      aria-invalid={!!photoError}
                      aria-describedby={photoError ? "photo-error" : undefined}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        photoError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : photo && !photoError 
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400'
                      }`}
                      placeholder="URL de votre photo"
                      value={photo}
                      onChange={handlePhotoChange}
                      disabled={isLoading}
                    />
                    {photo && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {photoError ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {photoError && (
                    <p id="photo-error" className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {photoError}
                    </p>
                  )}
                </div>

                {/* Conditions d'utilisation */}
                <div className="flex items-start">
                  <input
                    id="accept-terms"
                    name="accept-terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1 transition-colors duration-200"
                    disabled={isLoading}
                  />
                  <label htmlFor="accept-terms" className="ml-3 text-sm text-gray-700 leading-5">
                    J'accepte les{' '}
                    <Link 
                      to="/terms" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      target="_blank"
                    >
                      conditions d'utilisation
                    </Link>
                    {' '}et la{' '}
                    <Link 
                      to="/privacy" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      target="_blank"
                    >
                      politique de confidentialité
                    </Link>
                  </label>
                </div>

                {/* reCAPTCHA */}
                <RecaptchaComponent 
                  onVerify={handleRecaptchaChange}
                  recaptchaRef={recaptchaRef}
                />

                {/* Message d'erreur global */}
                {error && (
                  <div 
                    ref={errorRef}
                    role="alert"
                    tabIndex={-1}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start animate-in slide-in-from-top-2 duration-300"
                  >
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Bouton d'inscription */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-[0.98] transform"
                  disabled={isLoading || !recaptchaToken || !acceptTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Création du compte...
                    </>
                  ) : (
                    'S\'inscrire'
                  )}
                </button>

                {/* Lien de connexion */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Déjà un compte ?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Côté droit - Messages percutants améliorés */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-secondary via-secondary to-secondary/90 p-12 flex-col justify-center relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-md mx-auto text-white">
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Transformez votre potentiel en réussite
              </h1>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <BookOpen className="w-8 h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Formations d'excellence</h3>
                    <p className="text-white/90 leading-relaxed">Découvrez des programmes adaptés à vos ambitions professionnelles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Award className="w-8 h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Diplômes reconnus</h3>
                    <p className="text-white/90 leading-relaxed">Obtenez des certifications valorisées sur le marché du travail</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Zap className="w-8 h-8 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Succès garanti</h3>
                    <p className="text-white/90 leading-relaxed">Bénéficiez d'un accompagnement personnalisé vers l'emploi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;