
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';

interface AuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, isMock?: boolean, mockUser?: any) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Response type for login endpoint
interface LoginResponse {
  access_token: string;
  token_type?: string;
}

// Replace with your actual FastAPI backend URL
const API_BASE_URL = 'http://localhost:8000'; // Update this with your actual FastAPI URL

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          // If we have a token from mock login, check if it's a mock token
          if (storedToken === "mock_jwt_token_for_testing_purposes_only") {
            // Set a mock user for testing
            setUser({
              id: "mock-user-id",
              name: "Mock User",
              email: "mockuser@example.com",
              role: "user"
            });
          } else {
            // Real token, fetch the user data
            const userData = await fetchUserData(storedToken);
            setUser(userData);
          }
          setToken(storedToken);
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('auth_token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const fetchUserData = async (authToken: string) => {
    try {
      return await apiRequest('/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string, isMock = false, mockUser = null) => {
    setIsLoading(true);
    try {
      if (isMock) {
        // For mock login, skip API call
        const mockToken = "mock_jwt_token_for_testing_purposes_only";
        localStorage.setItem('auth_token', mockToken);
        setToken(mockToken);
        setUser(mockUser);
      } else {
        // Real login with API
        const data = await apiRequest<LoginResponse>('/auth/login', {
          method: 'POST',
          body: { email, password }
        });
        
        const { access_token } = data;
        
        localStorage.setItem('auth_token', access_token);
        setToken(access_token);
        
        const userData = await fetchUserData(access_token);
        setUser(userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      window.location.href = `${API_BASE_URL}/auth/google/login`;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    try {
      window.location.href = `${API_BASE_URL}/auth/apple/login`;
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: userData
      });
      
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        loginWithApple,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
