
import React, { useState, ReactNode, useEffect } from 'react';
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AuthGuardProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
  showLogoutBar?: boolean;
}

type Status = 'loading' | 'signedOut' | 'notStaff' | 'staff';

// Access is decided by the database: the account must be listed in the staff table (see supabase/securite.sql).
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  title = 'Accès Administration',
  onBack,
  showLogoutBar = true,
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const check = async (signedIn: boolean) => {
      if (!signedIn) return setStatus('signedOut');
      const { data, error } = await supabase.rpc('is_staff');
      setStatus(!error && data === true ? 'staff' : 'notStaff');
    };

    supabase.auth.getSession().then(({ data }) => check(!!data.session));
    // Supabase calls inside this callback can deadlock the auth client, so the check runs on the next tick.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => check(!!session), 0);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setSubmitting(false);
    if (error) {
      toast.error('Identifiants incorrects');
    } else {
      setPassword('');
      toast.success('Connexion réussie!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.info('Vous êtes déconnecté');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (status !== 'staff') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-4"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          )}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              {title}
            </h2>

            {status === 'notStaff' ? (
              <div className="space-y-4 text-center">
                <p className="text-gray-700">
                  Ce compte n'a pas accès à cet espace. Connectez-vous avec un compte du personnel.
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Changer de compte
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="staff-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse e-mail
                  </label>
                  <input
                    id="staff-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="staff-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    id="staff-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Connexion…' : 'Connexion'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showLogoutBar && (
        <div className="bg-gray-100 p-2 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm"
          >
            Déconnexion
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default AuthGuard;
