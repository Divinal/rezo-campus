import React from 'react';
import { Link } from 'react-router-dom';

const Merci = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md mx-4">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Merci pour votre inscription !
        </h1>
        
        <p className="text-gray-600 mb-4">
          Nous avons bien reçu votre demande et un e-mail de confirmation vous a été envoyé. 
        </p>

        <p className="text-gray-600 mb-6">
          📬 Pensez à vérifier votre boîte de réception (ou les spams) pour retrouver notre message. Si vous avez été redirigé depuis le site d'une école, 
          la page s'est ouverte dans un nouvel onglet.
        </p>
        
        <Link 
          to="/Shopify-Training"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Retour à la page de formation pour plus de détails 
        </Link>
      </div>
    </div>
  );
};

export default Merci;
