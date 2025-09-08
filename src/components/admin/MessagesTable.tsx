
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";

interface Message {
  id: string;
  user_id: string;
  sender_id: string;
  texte: string;
  created_at: string;
}

const MessagesTable: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      console.log('Loading messages...');
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading messages:', error);
      } else {
        console.log('Messages loaded:', data);
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error in loadMessages:', error);
    }
    setLoading(false);
  };

  const filteredMessages = messages.filter(message =>
    message.texte.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      toast.error("Veuillez saisir une réponse");
      return;
    }

    const { error } = await supabase
      .from('messages')
      .insert([{
        user_id: selectedMessage.user_id,
        sender_id: 'admin',
        texte: replyContent,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error sending reply:', error);
      toast.error("Erreur lors de l'envoi de la réponse");
    } else {
      toast.success("Réponse envoyée");
      setReplyContent('');
      setSelectedMessage(null);
      loadMessages();
    }
  };

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
          placeholder="Rechercher un message..."
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
              <TableHead>Utilisateur</TableHead>
              <TableHead>Expéditeur</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.user_id}</TableCell>
                <TableCell>{message.sender_id}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{message.texte}</div>
                </TableCell>
                <TableCell>
                  {new Date(message.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        Répondre
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Répondre au message</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Message original :</p>
                          <div className="bg-gray-100 p-3 rounded">{message.texte}</div>
                        </div>
                        <div>
                          <Textarea
                            placeholder="Tapez votre réponse..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleReply} className="w-full">
                          Envoyer la réponse
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun message trouvé
        </div>
      )}
    </div>
  );
};

export default MessagesTable;
