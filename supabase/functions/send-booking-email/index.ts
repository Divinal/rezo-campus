import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  packageName: string;
  packagePrice: number;
  travelers: number;
  totalPrice: number;
  paymentMethod: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();

    console.log("Processing booking email for:", bookingData.email);

    // RIB (Bank details) - à remplacer par vos vraies coordonnées bancaires
    const ribInfo = `
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2563eb; margin-bottom: 15px;">🏦 Coordonnées Bancaires pour Virement</h3>
        <div style="background-color: white; padding: 15px; border-radius: 5px;">
          <p><strong>Bénéficiaire :</strong> CAN Morocco Services</p>
          <p><strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123</p>
          <p><strong>BIC/SWIFT :</strong> EXAMPLEFR2P</p>
          <p><strong>Banque :</strong> Banque Exemple France</p>
          <p><strong>Montant :</strong> ${bookingData.totalPrice}€</p>
          <p><strong>Référence à indiquer :</strong> CAN2025-${bookingData.lastName.toUpperCase()}-${Date.now().toString().slice(-6)}</p>
        </div>
        <p style="color: #dc2626; font-weight: bold; margin-top: 15px;">
          ⚠️ Important : Indiquez impérativement la référence dans le libellé de votre virement
        </p>
      </div>
    `;

    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #22c55e, #dc2626); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">🇲🇦 Confirmation de Réservation CAN 2025</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre aventure marocaine commence ici !</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #22c55e;">Bonjour ${bookingData.firstName} ${bookingData.lastName} ! 👋</h2>
            
            <p>Nous avons bien reçu votre demande de réservation pour la <strong>CAN 2025 au Maroc</strong>. Voici le récapitulatif de votre commande :</p>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;">
              <h3 style="color: #15803d; margin-top: 0;">📋 Détails de la Réservation</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>Pack choisi :</strong> ${bookingData.packageName}</li>
                <li style="margin: 8px 0;"><strong>Prix unitaire :</strong> ${bookingData.packagePrice}€</li>
                <li style="margin: 8px 0;"><strong>Nombre de voyageurs :</strong> ${bookingData.travelers} personne(s)</li>
                <li style="margin: 8px 0;"><strong>Dates de séjour :</strong> Du ${new Date(bookingData.arrivalDate).toLocaleDateString('fr-FR')} au ${new Date(bookingData.departureDate).toLocaleDateString('fr-FR')}</li>
                <li style="margin: 8px 0;"><strong>Nationalité :</strong> ${bookingData.nationality}</li>
                <li style="margin: 8px 0;"><strong>Téléphone :</strong> ${bookingData.phone}</li>
                ${bookingData.specialRequests ? `<li style="margin: 8px 0;"><strong>Demandes spéciales :</strong> ${bookingData.specialRequests}</li>` : ''}
              </ul>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 15px; text-align: center;">
                <h3 style="color: #dc2626; margin: 0; font-size: 24px;">Total à payer : ${bookingData.totalPrice}€</h3>
              </div>
            </div>
            
            ${bookingData.paymentMethod === 'bank' ? ribInfo : `
              <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">💳 Paiement PayPal</h3>
                <p>Vous avez choisi le paiement par PayPal. Vous recevrez prochainement un lien de paiement sécurisé.</p>
                <p style="color: #1d4ed8; font-weight: bold;">Un email avec les instructions de paiement PayPal vous sera envoyé dans les prochaines minutes.</p>
              </div>
            `}
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-bottom: 15px;">📞 Prochaines Étapes</h3>
              <ol style="color: #92400e;">
                <li style="margin: 8px 0;">Effectuez le paiement selon la méthode choisie</li>
                <li style="margin: 8px 0;">Envoyez-nous vos documents pour le visa (liste détaillée à suivre)</li>
                <li style="margin: 8px 0;">Notre équipe vous contactera sous 48h pour finaliser les détails</li>
                <li style="margin: 8px 0;">Recevez votre confirmation définitive et vos documents de voyage</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280;">Questions ? Contactez-nous :</p>
              <p style="margin: 5px 0;"><strong>📧 Email :</strong> contact@canmoroccoeServices.com</p>
              <p style="margin: 5px 0;"><strong>📱 WhatsApp :</strong> +212 6XX XX XX XX</p>
              <p style="margin: 5px 0;"><strong>⏰ Support :</strong> 24h/7j pendant votre séjour</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #22c55e, #dc2626); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 30px 0;">
              <h3 style="margin: 0 0 10px 0;">🎉 Ahlan wa sahlan ! Bienvenue au Maroc !</h3>
              <p style="margin: 0; opacity: 0.9;">Préparez-vous à vivre une expérience inoubliable pendant la CAN 2025 !</p>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© 2025 CAN Morocco Services - Votre partenaire pour la CAN 2025 au Maroc</p>
            <p>Cet email a été envoyé à ${bookingData.email} suite à votre demande de réservation.</p>
          </div>
        </body>
      </html>
    `;

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "CAN Morocco Services <onboarding@resend.dev>",
        to: [bookingData.email],
        subject: `🇲🇦 Confirmation de réservation CAN 2025 - ${bookingData.packageName}`,
        html: emailContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error details:', errorText);
      throw new Error(`Resend API error: ${emailResponse.status} - ${errorText}`);
    }

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailData.id,
      message: "Email de confirmation envoyé avec succès"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        message: "Erreur lors de l'envoi de l'email"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);