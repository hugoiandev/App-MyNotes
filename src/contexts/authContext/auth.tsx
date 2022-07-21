import React, { createContext, useMemo, useState } from 'react';
import AuthContextTypes from './types';

export const AuthContext = createContext({} as AuthContextTypes);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState({ name: 'Hugo', idade: 24 });

  const value = useMemo(() => {
    return { user, setUser };
  }, [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
