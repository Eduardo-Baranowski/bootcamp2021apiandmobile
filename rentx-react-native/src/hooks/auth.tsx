import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar?: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
  avatar?: string;
  id?: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationProps {
  authorization: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function loadStoragedData(): Promise<void> {
          const [token, user] = await AsyncStorage.multiGet([
              '@Women:token',
              '@Women:user',
          ]);

          if (token[1] && user[1]) {
              setData({ token: token[1], user: JSON.parse(user[1]) });
          }

          setLoading(false);
      }

      loadStoragedData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
      const response = await api.post('/sessions', {
          email,
          password,
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
          ['@Women:token', token],
          ['@Women:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
  }

  async function signOut() {
      try {
          await AsyncStorage.multiRemove(['@Women:token', '@Women:user']);

          setData({} as AuthState);
      } catch (error) {
          throw new Error(Error.name);
      }
  }

  return (
      <AuthContext.Provider
          value={{
              user: data.user,
              signIn,
              signOut,
              loading,
          }}
      >
          {children}
      </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };