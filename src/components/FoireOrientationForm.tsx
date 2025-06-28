
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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Veuillez valider le reCAPTCHA");
      return;
    }

    setIsSubmitting(true);

    try {
      const formationFinale =
        formData.Formation === "Autre" ? formData.FormationAutre : formData.Formation;

      // Préparer les données pour l'insertion
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

      // Insertion dans Supabase
      const { data, error } = await supabase
        .from("foire_inscriptions")
        .insert([insertData])
        .select();

      if (error) {
        console.error("Erreur Supabase:", error);
        alert(`Erreur lors de l'enregistrement : ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      console.log("Données insérées avec succès:", data);

      // Envoi de l'email
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
        // Continue même si l'email échoue
      }

      alert("Inscription réussie !");
      
      // Reset du formulaire
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
      recaptchaRef.current?.reset();
      navigate("/merci");

    } catch (error) {
      console.error("Erreur générale:", error);
      alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Inscription à la Foire d'Orientation
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="Nom" 
              placeholder="Nom" 
              value={formData.Nom} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />
            
            <input 
              name="Prenom" 
              placeholder="Prénom" 
              value={formData.Prenom} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />
            
            <input 
              type="email" 
              name="AdresseMail" 
              placeholder="Email" 
              value={formData.AdresseMail} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />
            
            <input 
              name="WhatsApp" 
              placeholder="Numéro WhatsApp" 
              value={formData.WhatsApp} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />

            <select 
              name="Der_Dip" 
              value={formData.Der_Dip} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            >
              <option value="">-- Dernier diplôme --</option>
              <option value="Baccalauréat">Baccalauréat</option>
              <option value="Licence">Licence</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
              <option value="Autre">Autre</option>
            </select>

            <select 
              name="Formation" 
              value={formData.Formation} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            >
              <option value="">-- Formation souhaitée --</option>
              <option value="Informatique">Informatique</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Droit">Droit</option>
              <option value="Médecine">Médecine</option>
              <option value="Autre">Autre</option>
            </select>

            {formData.Formation === "Autre" && (
              <input 
                name="FormationAutre" 
                placeholder="Précisez la formation" 
                value={formData.FormationAutre} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-md" 
                required
                disabled={isSubmitting}
              />
            )}

            <input 
              name="Pays" 
              placeholder="Pays d'origine" 
              value={formData.Pays} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border rounded-md"
              disabled={isSubmitting}
            />

            <RecaptchaComponent onVerify={handleRecaptchaChange} recaptchaRef={recaptchaRef} />

            <button 
              type="submit" 
              disabled={!recaptchaToken || isSubmitting} 
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-md transition-colors"
            >
              {isSubmitting ? "Inscription en cours..." : "M'inscrire à la Foire"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoireOrientationForm;
