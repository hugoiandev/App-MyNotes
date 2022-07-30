type SignInType = {
  token: string | null;
  loading: boolean;
  error: string | null;
};

type SignUpType = {
  loading: boolean;
  error: string | null;
  email: string | null;
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
  signUp: (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signUpState: SignUpType;
  setSignInState: (state: SignInType) => void;
  setSignUpState: (state: SignUpType) => void;
}

export type { AuthType, SignInType, SignUpType };

export default AuthContext;
