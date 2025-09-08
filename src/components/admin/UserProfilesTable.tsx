
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from "../../lib/supabaseClient";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  message: string;
}

const UserProfilesTable: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfiles();
  }, []);

  const loadUserProfiles = async () => {
    try {
      console.log('Loading user profiles...');
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('full_name', { ascending: true });
      
      if (error) {
        console.error('Error loading user profiles:', error);
      } else {
        console.log('User profiles loaded:', data);
        setUserProfiles(data || []);
      }
    } catch (error) {
      console.error('Error in loadUserProfiles:', error);
    }
    setLoading(false);
  };

  const filteredProfiles = userProfiles.filter(profile =>
    (profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  if (loading) {
    return <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des utilisateurs...</p>
          </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="text-sm text-gray-600">
          {filteredProfiles.length} utilisateur(s) trouvé(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Nom complet</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs">{profile.full_name?.charAt(0) || 'U'}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{profile.full_name || 'N/A'}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{profile.message || 'Aucun message'}</div>
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

      {filteredProfiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun utilisateur trouvé
        </div>
      )}
    </div>
  );
};

export default UserProfilesTable;
