import React, { createContext, useCallback, useMemo, useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextTypes, { AuthType, SignInType } from './types';
import { AxiosError } from 'axios';

export const AuthContext = createContext({} as AuthContextTypes);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [signInState, setSignInState] = useState<SignInType>({
    token: null,
    loading: false,
    error: null,
  });
  const [authState, setAuthState] = useState<AuthType>({
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  const authValidate = useCallback(async () => {
    const token = await AsyncStorage.getItem('@access_token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthState({ ...authState, loading: true });
      try {
        const { data } = await api.post<{ auth: boolean }>('/session/validate');

        if (data.auth) {
          setAuthState({ ...authState, isAuthenticated: true, loading: false });
        }
      } catch (err) {
        const { response } = err as AxiosError;
        const { message } = response?.data as { message: string };
        setAuthState({
          ...authState,
          loading: false,
          error: message,
          isAuthenticated: false,
        });
        await AsyncStorage.removeItem('@access_token');
      }
    } else {
      setAuthState({ ...authState, loading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback(
    async (credentials: { email: string; password: string }) => {
      setSignInState({ ...signInState, loading: true });
      try {
        const { data, status } = await api.post<{ token: string }>(
          '/session',
          credentials,
        );

        if (status === 200) {
          await AsyncStorage.setItem(
            '@access_token',
            JSON.stringify(data.token),
          );
          setSignInState({ ...signInState, token: data.token, loading: false });
          setAuthState({ ...authState, isAuthenticated: true, loading: false });
        }
      } catch (err) {
        const { response } = err as AxiosError;
        const { message } = response?.data as { message: string };
        setSignInState({
          ...signInState,
          error: message,
          loading: false,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@access_token');
    setAuthState({ ...authState, isAuthenticated: false, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return { authState, signIn, signInState, authValidate, signOut };
  }, [authState, signIn, signInState, authValidate, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
