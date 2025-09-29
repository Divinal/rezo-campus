import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecaptchaComponent from "./RecaptchaComponent";
import { useNavigate } from "react-router-dom";

interface FoireData {
  Nom: string;
  Prenom: string;
  AdresseMail: string;
  WhatsApp: string;
  Der_Dip: string;
  Formation: string;
  FormationAutre?: string;
  Pays: string;
}

const FoireOrientationForm: React.FC = () => {
  const [formData, setFormData] = useState<FoireData>({
    Nom: "",
    Prenom: "",
    AdresseMail: "",
    WhatsApp: "",
    Der_Dip: "",
    Formation: "",
    FormationAutre: "",
    Pays: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FoireData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FoireData, boolean>>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  // Calculer la progression du formulaire
  useEffect(() => {
    const fields = ['Nom', 'Prenom', 'AdresseMail', 'WhatsApp', 'Der_Dip', 'Formation', 'Pays'];
    const completed = fields.filter(field => formData[field as keyof FoireData]?.trim()).length;
    const newProgress = Math.round((completed / fields.length) * 100);
    setProgress(newProgress);
  }, [formData]);

  // Validation en temps réel
  const validateField = (name: keyof FoireData, value: string): string => {
    switch (name) {
      case "AdresseMail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "L'email est requis";
        if (!emailRegex.test(value)) return "Format d'email invalide";
        break;
      case "WhatsApp":
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!value.trim()) return "Le numéro WhatsApp est requis";
        if (!phoneRegex.test(value.replace(/\s/g, ""))) 
          return "Format invalide (Ex: +212612345678)";
        break;
      case "Nom":
      case "Prenom":
        if (!value.trim()) return "Ce champ est requis";
        if (value.trim().length < 2) return "Minimum 2 caractères";
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return "Caractères invalides détectés";
        break;
      case "Pays":
        if (!value.trim()) return "Le pays est requis";
        if (value.trim().length < 2) return "Nom de pays trop court";
        break;
      case "Der_Dip":
      case "Formation":
        if (!value) return "Veuillez faire une sélection";
        break;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validation immédiate si le champ a été touché
    if (touched[name as keyof FoireData]) {
      const error = validateField(name as keyof FoireData, value);
      setErrors({ ...errors, [name]: error });
    }
    
    if (submitError) setSubmitError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name as keyof FoireData, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (submitError) setSubmitError("");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FoireData> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FoireData>).forEach((key) => {
      if (key !== "FormationAutre" || (key === "FormationAutre" && formData.Formation === "Autre")) {
        const error = validateField(key, formData[key] || "");
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) {
      setSubmitError("Veuillez corriger les erreurs dans le formulaire");
      setTimeout(() => {
        const firstError = formRef.current?.querySelector('[aria-invalid="true"]');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    if (!recaptchaToken) {
      setSubmitError("Veuillez valider le reCAPTCHA");
      return;
    }

    setIsSubmitting(true);

    try {
      const formationFinale =
        formData.Formation === "Autre" ? formData.FormationAutre : formData.Formation;

      const insertData = {
        nom: formData.Nom.trim(),
        prenom: formData.Prenom.trim(),
        adressemail: formData.AdresseMail.trim(),
        whatsapp: formData.WhatsApp.trim(),
        der_dip: formData.Der_Dip,
        formation: formationFinale || formData.Formation,
        pays: formData.Pays.trim(),
      };

      console.log("Données à insérer:", insertData);

      const { data, error } = await supabase
        .from("foire_inscriptions")
        .insert([insertData])
        .select();

      if (error) {
        console.error("Erreur Supabase:", error);
        setSubmitError(`Erreur lors de l'enregistrement : ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      console.log("Données insérées avec succès:", data);

      try {
        await emailjs.send(
          "service_7l7iiir",
          "template_rdi66jm",
          {
            Nom: formData.Nom,
            Prenom: formData.Prenom,
            AdresseMail: formData.AdresseMail,
            formation: formationFinale,
          },
          "xgYkC3rP4oY01KUy-"
        );
        console.log("Email envoyé avec succès");
      } catch (emailError) {
        console.error("Erreur emailJS :", emailError);
      }

      setSubmitSuccess(true);
      
      setFormData({
        Nom: "",
        Prenom: "",
        AdresseMail: "",
        WhatsApp: "",
        Der_Dip: "",
        Formation: "",
        FormationAutre: "",
        Pays: "",
      });
      
      setRecaptchaToken(null);
      setTouched({});
      setErrors({});
      recaptchaRef.current?.reset();
      
      setTimeout(() => {
        navigate("/merci");
      }, 2000);

    } catch (error) {
      console.error("Erreur générale:", error);
      setSubmitError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (fieldName: string) => {
    const icons: Record<string, JSX.Element> = {
      Nom: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      Prenom: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      AdresseMail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      WhatsApp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
      Pays: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    };
    return icons[fieldName] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* En-tête avec progression */}
          <div className="bg-white rounded-t-3xl shadow-xl border-b-4 border-blue-600 overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 sm:p-8">
              <div className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                  Formation Pratique en E-commerce & Shopify
                </h1>
                <p className="text-base sm:text-lg text-blue-100 mb-4">
                  Formation Prête à l'Emploi
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Inscriptions ouvertes
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Places limitées
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            </div>

            {/* Barre de progression */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression du formulaire</span>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-b-3xl shadow-xl p-6 sm:p-8 lg:p-10">
            {/* Messages d'alerte */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl animate-slideIn">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl animate-slideIn">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">✨ Inscription réussie ! Redirection en cours...</p>
                  </div>
                </div>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {['Nom', 'Prenom'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-2">
                      {field} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className={`h-5 w-5 ${errors[field as keyof FoireData] && touched[field as keyof FoireData] ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getFieldIcon(field)}
                        </svg>
                      </div>
                      <input
                        id={field}
                        name={field}
                        type="text"
                        placeholder={`Votre ${field.toLowerCase()}`}
                        value={formData[field as keyof FoireData] as string}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        disabled={isSubmitting}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                          errors[field as keyof FoireData] && touched[field as keyof FoireData]
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                        aria-invalid={errors[field as keyof FoireData] && touched[field as keyof FoireData] ? "true" : "false"}
                        aria-describedby={errors[field as keyof FoireData] && touched[field as keyof FoireData] ? `${field}-error` : undefined}
                      />
                      {errors[field as keyof FoireData] && touched[field as keyof FoireData] && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors[field as keyof FoireData] && touched[field as keyof FoireData] && (
                      <p id={`${field}-error`} className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {errors[field as keyof FoireData]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="AdresseMail" className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${errors.AdresseMail && touched.AdresseMail ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {getFieldIcon('AdresseMail')}
                    </svg>
                  </div>
                  <input
                    id="AdresseMail"
                    name="AdresseMail"
                    type="email"
                    placeholder="exemple@email.com"
                    value={formData.AdresseMail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                      errors.AdresseMail && touched.AdresseMail
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    aria-invalid={errors.AdresseMail && touched.AdresseMail ? "true" : "false"}
                    aria-describedby={errors.AdresseMail && touched.AdresseMail ? "AdresseMail-error" : undefined}
                  />
                  {errors.AdresseMail && touched.AdresseMail && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.AdresseMail && touched.AdresseMail && (
                  <p id="AdresseMail-error" className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.AdresseMail}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="WhatsApp" className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${errors.WhatsApp && touched.WhatsApp ? 'text-red-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      {getFieldIcon('WhatsApp')}
                    </svg>
                  </div>
                  <input
                    id="WhatsApp"
                    name="WhatsApp"
                    type="tel"
                    placeholder="+212 6XX XXX XXX"
                    value={formData.WhatsApp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                      errors.WhatsApp && touched.WhatsApp
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    aria-invalid={errors.WhatsApp && touched.WhatsApp ? "true" : "false"}
                    aria-describedby={errors.WhatsApp && touched.WhatsApp ? "WhatsApp-error" : "WhatsApp-help"}
                  />
                  {errors.WhatsApp && touched.WhatsApp && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.WhatsApp && touched.WhatsApp ? (
                  <p id="WhatsApp-error" className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.WhatsApp}
                  </p>
                ) : (
                  <p id="WhatsApp-help" className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Incluez l'indicatif de votre pays (Ex: +212 pour le Maroc)
                  </p>
                )}
              </div>

              {/* Niveau d'étude et Formation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Niveau d'étude */}
                <div>
                  <label htmlFor="Der_Dip" className="block text-sm font-semibold text-gray-700 mb-2">
                    Niveau d'étude <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="Der_Dip"
                      name="Der_Dip"
                      value={formData.Der_Dip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3.5 border-2 rounded-xl appearance-none focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-gray-900 ${
                        errors.Der_Dip && touched.Der_Dip
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                      aria-invalid={errors.Der_Dip && touched.Der_Dip ? "true" : "false"}
                    >
                      <option value="">-- Sélectionnez --</option>
                      <option value="Terminale">Terminale</option>
                      <option value="Baccalauréat">Baccalauréat</option>
                      <option value="DTS/BTS">BTS/DTS</option>
                      <option value="Licence">Licence</option>
                      <option value="Master">Master</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="Autre">Autre</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className={`h-5 w-5 ${errors.Der_Dip && touched.Der_Dip ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.Der_Dip && touched.Der_Dip && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.Der_Dip}
                    </p>
                  )}
                </div>

                {/* Pays */}
                <div>
                  <label htmlFor="Pays" className="block text-sm font-semibold text-gray-700 mb-2">
                    Pays d'origine <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className={`h-5 w-5 ${errors.Pays && touched.Pays ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getFieldIcon('Pays')}
                      </svg>
                    </div>
                    <input
                      id="Pays"
                      name="Pays"
                      type="text"
                      placeholder="Ex: Maroc, France, Sénégal..."
                      value={formData.Pays}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                        errors.Pays && touched.Pays
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                      aria-invalid={errors.Pays && touched.Pays ? "true" : "false"}
                      aria-describedby={errors.Pays && touched.Pays ? "Pays-error" : undefined}
                    />
                    {errors.Pays && touched.Pays && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.Pays && touched.Pays && (
                    <p id="Pays-error" className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.Pays}
                    </p>
                  )}
                </div>
              </div>

              {/* Compétence ou expérience */}
              <div>
                <label htmlFor="Formation" className="block text-sm font-semibold text-gray-700 mb-2">
                  Compétence ou expérience préalable <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="Formation"
                    name="Formation"
                    value={formData.Formation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 border-2 rounded-xl appearance-none focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-gray-900 ${
                      errors.Formation && touched.Formation
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    aria-invalid={errors.Formation && touched.Formation ? "true" : "false"}
                  >
                    <option value="">-- Sélectionnez une compétence --</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Publicité en ligne">Publicité en ligne</option>
                    <option value="Design Graphique">Design Graphique</option>
                    <option value="Création de contenu">Création de contenu</option>
                    <option value="Communication Digitale">Communication Digitale</option>
                    <option value="Community Management">Community Management</option>
                    <option value="Rédaction web / Copywriting">Rédaction web / Copywriting</option>
                    <option value="Développement Web">Développement Web</option>
                    <option value="UX/UI Design">UX/UI Design</option>
                    <option value="Branding / Identité visuelle">Branding / Identité visuelle</option>
                    <option value="Aucune (Je suis motivé(e) et prêt(e) à apprendre)">Aucune (Je suis motivé(e) et prêt(e) à apprendre)</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className={`h-5 w-5 ${errors.Formation && touched.Formation ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.Formation && touched.Formation && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.Formation}
                  </p>
                )}
              </div>

              {/* Champ conditionnel pour Autre */}
              {formData.Formation === "Autre" && (
                <div className="animate-slideIn">
                  <label htmlFor="FormationAutre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Précisez votre formation <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="FormationAutre"
                    name="FormationAutre"
                    type="text"
                    placeholder="Décrivez votre formation ou compétence"
                    value={formData.FormationAutre}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>
              )}

              {/* reCAPTCHA */}
              <div className="flex justify-center py-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <RecaptchaComponent onVerify={handleRecaptchaChange} recaptchaRef={recaptchaRef} />
              </div>

              {/* Bouton de soumission */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!recaptchaToken || isSubmitting}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:shadow-none flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-lg">Inscription en cours...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 transition-transform group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-lg">Je m'inscris à la formation et paye 500 DH</span>
                      <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                {/* Informations de sécurité et support */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-green-50 p-4 rounded-xl border border-green-200">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900">Paiement sécurisé</p>
                      <p className="text-xs text-green-700 mt-0.5">Vos données sont protégées et cryptées</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900">Support disponible</p>
                      <p className="text-xs text-blue-700 mt-0.5">Une question ? Notre équipe est là pour vous aider</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cartes informatives */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-inner">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Durée</p>
                  <p className="text-base font-bold text-gray-900">Formation complète</p>
                  <p className="text-xs text-gray-600 mt-1">2 - 3 mois</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-green-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl shadow-inner">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Certification</p>
                  <p className="text-base font-bold text-gray-900">Attestation de Reconnaissance</p>
                  <p className="text-xs text-gray-600 mt-1">Reconnu</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-purple-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl shadow-inner">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Support</p>
                  <p className="text-base font-bold text-gray-900">Accompagnement</p>
                  <p className="text-xs text-gray-600 mt-1">Après Formation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Témoignage ou garantie */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200 shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Pourquoi choisir cette formation ?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Accès immédiat après inscription et paiement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Certificat de formation à l'issue du programme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-slideIn {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FoireOrientationForm;