interface AuthContext {
  user: { name: string; idade: number };
  setUser: (user: { name: string; idade: number }) => void;
}

export default AuthContext;
