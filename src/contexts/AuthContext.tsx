import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = { id: number; email: string; fullName: string; role?: string } | null;

type AuthContextType = {
  user: AuthUser;
  token: string | null;
  hydrated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  hydrated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = 'auth_state_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setToken(parsed.token ?? null);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } catch {}
  }, [user, token]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    token,
    hydrated,
    login: (t, u) => {
      setToken(t);
      setUser(u);
    },
    logout: () => {
      setToken(null);
      setUser(null);
    },
  }), [user, token, hydrated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
