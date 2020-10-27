import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface UpdateProfileCredentials {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SigninCredentials): Promise<void>;
  signOut(): void;
  updateProfile(credentials: UpdateProfileCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Agrotech:token',
        '@Agrotech:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Agrotech:token', token],
      ['@Agrotech:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateProfile = useCallback(
    async ({ name, email, old_password, password }) => {
      const response = await api.put<User>('profile', {
        name,
        email,
        old_password,
        password,
      });

      const user = response.data;

      await AsyncStorage.setItem('@Agrotech:user', JSON.stringify(user));

      const token = await AsyncStorage.getItem('@Agrotech:token');

      if (!token) {
        return;
      }

      setData({ token, user });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Agrotech:token', '@Agrotech:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
