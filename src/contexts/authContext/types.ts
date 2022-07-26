type SignInType = {
  token: string | null;
  loading: boolean;
  error: string | null;
};

type AuthType = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

interface AuthContext {
  authState: AuthType;
  signInState: SignInType;
  authValidate: () => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export type { AuthType, SignInType };

export default AuthContext;
