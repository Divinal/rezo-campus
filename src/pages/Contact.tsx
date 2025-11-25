
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecaptchaComponent from '../components/RecaptchaComponent';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    whatsapp: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error("Veuillez valider le reCAPTCHA");
      return;
    }

    const { name, email, subject, message, whatsapp } = formData;

    const { error } = await supabase
      .from('ContactMessages')
      .insert([{ name, email, subject, message, whatsapp }]);

    if (error) {
      console.error('Erreur lors de l\'envoi :', error.message);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } else {
      toast.success('Merci pour votre message ! Nous vous contacterons bientôt.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        whatsapp: ''
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 space-y-10">
          {/* Grid principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche - Contact Info */}
            <div className="bg-primary text-white p-8 rounded-lg shadow-md space-y-6">
              <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>

              <div>
                <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                <p>64, Rue Allal Ben Abdellah Casablanca</p>
                <p>20000 Casablanca, Morocco</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p>contact@rezocampus.fr</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                <p>+212 617-725867</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact WhatsApp</h3>
                <img src="Images/code.jpg" alt="QR Code WhatsApp" className="w-32 h-auto mt-2" />
              </div>
            </div>

            {/* Colonne centrale - Formulaire */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block mb-1">Nom et Prénom*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block mb-1">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp" className="block mb-1">Votre WhatsApp*</Label>
                  <Input 
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Ex : +212 123-123456"
                  />
                </div>              

                <div>
                  <Label htmlFor="subject" className="block mb-1">Sujet*</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="block mb-1">Message*</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                    placeholder="Nombre de Caractère requis 250"
                  />
                </div>

                <RecaptchaComponent 
                  onVerify={handleRecaptchaChange}
                  recaptchaRef={recaptchaRef}
                />

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
                  disabled={!recaptchaToken}
                >
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Colonne droite - Mot du Directeur */}
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-bold text-primary mb-4">Responsable Technique</h2>
                <img src="/Images/Photo1.jpg" alt="Directeur" className="w-32 h-32 rounded-full object-cover mb-4" />
                <p className="text-ms font-bold text-primary mb-4 text-justify">
                  "Bienvenue sur Rézo Campus une plateforme dédiée à la recherche, la gestion et l'orientation vers les établissements 
                  d'enseignement. Explorez une large sélection d'écoles, trouvez la formation qui vous correspond et inscrivez-vous en 
                  quelques clics. Que vous soyez étudiant, parent ou responsable d'établissement, Rézo Campus simplifie l'accès à l'éducation de qualité. 
                  Avec Rézo Campus, trouvez l'école de vos rêves n'a jamais été aussi simple. Comparez, explorez et inscrivez-vous dans des établissements 
                  de qualité, où que vous soyez. Une plateforme intuitive pour construire votre avenir en toute confiance."
                </p>
              </div>
            </div>
          </div>

          {/* Google Map en bas */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-primary mb-4">Notre position</h3>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3331.281618372732!2d-7.7599322!3d33.5833461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xda7d3cf5fde9335%3A0x3e1468f0827ec204!2s444%20Bd%20de%20la%20Grande%20Ceinture%2C%20Casablanca%2020350!3m2!1d33.5833734!2d-7.677531!4m5!1s0xda7d3cf5fde9335%3A0x3e1468f0827ec204!2s444%20Bd%20de%20la%20Grande%20Ceinture%2C%20Casablanca%2020350!3m2!1d33.5833734!2d-7.677531!5e0!3m2!1sfr!2sma!4v1717171717171!5m2!1sfr!2sma"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
