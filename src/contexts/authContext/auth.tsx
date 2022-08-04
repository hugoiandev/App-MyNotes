import React, { createContext, useCallback, useMemo, useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextTypes, { AuthType, SignInType, SignUpType } from './types';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

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
  const [signUpState, setSignUpState] = useState<SignUpType>({
    loading: false,
    error: null,
    email: null,
  });
  const [authState, setAuthState] = useState<AuthType>({
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  const navigation = useNavigation();

  const authValidate = useCallback(async () => {
    const token = await AsyncStorage.getItem('@access_token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthState({ ...authState, loading: true });
      try {
        const { data } = await api.post<{
          auth: boolean;
          info: { name: string; email: string };
        }>('/session/validate');

        if (data.auth) {
          setAuthState({ ...authState, isAuthenticated: true, loading: false });
          await AsyncStorage.setItem('@name', data.info.name);
          await AsyncStorage.setItem('@email', data.info.email);
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
          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
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
        Alert.alert('Erro', message, [{ text: 'Ok' }]);
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

  const signUp = useCallback(
    async (user: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      setSignUpState({ ...signUpState, loading: true });
      try {
        const { status, data } = await api.post<{ email: string }>(
          '/register',
          user,
        );
        if (status === 201) {
          setSignUpState({
            ...signUpState,
            loading: false,
            email: data.email,
          });
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
            {
              text: 'Voltar',
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } catch (err) {
        const { response } = err as AxiosError;
        const { message } = response?.data as { message: string };
        setSignUpState({
          ...signUpState,
          loading: false,
          error: message,
        });
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar usuário!', [
          {
            text: 'Ok',
          },
        ]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const value = useMemo(() => {
    return {
      authState,
      signIn,
      signInState,
      authValidate,
      signOut,
      signUp,
      signUpState,
      setSignUpState,
      setSignInState,
    };
  }, [
    authState,
    signIn,
    signInState,
    authValidate,
    signOut,
    signUp,
    signUpState,
    setSignUpState,
    setSignInState,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
