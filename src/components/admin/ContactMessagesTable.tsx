
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from "../../lib/supabaseClient";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  subjet: string;
  message: string;
  created_ad: string;
}

const ContactMessagesTable: React.FC = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContactMessages();
  }, []);

  const loadContactMessages = async () => {
    try {
      console.log('Loading contact messages...');
      const { data, error } = await supabase
        .from('ContactMessages')
        .select('*')
        .order('created_ad', { ascending: false });
      
      if (error) {
        console.error('Error loading contact messages:', error);
      } else {
        console.log('Contact messages loaded:', data);
        setContactMessages(data || []);
      }
    } catch (error) {
      console.error('Error in loadContactMessages:', error);
    }
    setLoading(false);
  };

  const filteredMessages = contactMessages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des Messages...</p>
          </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher un message de contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-gray-600">
          {filteredMessages.length} message(s) trouvé(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.whatsapp}</TableCell>
                <TableCell>{message.subjet}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{message.message}</div>
                </TableCell>
                <TableCell>
                  {new Date(message.created_ad).toLocaleDateString()}
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

      {filteredMessages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun message de contact trouvé
        </div>
      )}
    </div>
  );
};

export default ContactMessagesTable;
