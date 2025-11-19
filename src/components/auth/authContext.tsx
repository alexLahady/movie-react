import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CookieUser } from '../../types/auth';
import { getCookie } from '../../services';

interface AuthContextType {
  user: CookieUser | null;
  setUser: React.Dispatch<React.SetStateAction<CookieUser | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<CookieUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await getCookie();
        //console.log("getCookie data:", data);
        setUser(data); // ici on prend directement le payload
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
