
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from "../../lib/supabaseClient";

interface Inscription {
  id: number;
  Nom: string;
  Prenom: string;
  Der_Dip: string;
  Formation: string;
  WhatsApp: string;
  AdresseMail: string;
  Pays: string;
  EcoleInteresse: string;
  date_ajout: string;
}

const InscriptionsTable: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInscriptions();
  }, []);

      const loadInscriptions = async () => {
      try {
        console.log('🔄 Chargement des inscriptions...');
        const { data, error } = await supabase
          .from('Inscription') // Majuscule ici car ta table s'appelle "Inscription"
          .select('*')
          .order('date_ajout', { ascending: false });

        if (error) {
          console.error('❌ Erreur Supabase :', error.message);
        } else {
          console.log('✅ Données reçues :', data);
          setInscriptions(data || []);
        }
      } catch (err) {
        console.error('🔥 Exception loadInscriptions :', err);
      }
      setLoading(false);
    };
  const filteredInscriptions = inscriptions.filter(inscription =>
    inscription.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscription.Prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inscription.AdresseMail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des Inscriptions...</p>
          </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher une inscription..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-gray-600">
          {filteredInscriptions.length} inscription(s) trouvée(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Dernier Diplôme</TableHead>
              <TableHead>Formation</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>École Intéressée</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInscriptions.map((inscription) => (
              <TableRow key={inscription.id}>
                <TableCell>{inscription.Nom}</TableCell>
                <TableCell>{inscription.Prenom}</TableCell>
                <TableCell>{inscription.Der_Dip}</TableCell>
                <TableCell>{inscription.Formation}</TableCell>
                <TableCell>{inscription.WhatsApp}</TableCell>
                <TableCell>{inscription.AdresseMail}</TableCell>
                <TableCell>{inscription.Pays}</TableCell>
                <TableCell>{inscription.EcoleInteresse}</TableCell>
                <TableCell>
                  {new Date(inscription.date_ajout).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                    Reçu
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredInscriptions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucune inscription trouvée
        </div>
      )}
    </div>
  );
};

export default InscriptionsTable;
