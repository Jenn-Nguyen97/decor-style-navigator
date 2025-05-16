
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as authService from '@/services/authService';

// Define user roles
export type UserRole = 'visitor' | 'customer' | 'admin';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes when API is not available
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
  },
  {
    id: '2',
    name: 'Customer User',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  }
];

// Parse JWT token to get user data
const parseJwt = (token: string): any => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = authService.getAuthToken();
      const storedUser = localStorage.getItem('decor_user');
      
      if (token) {
        try {
          // Parse the JWT token to get user information
          const tokenData = parseJwt(token);
          if (tokenData && tokenData.exp * 1000 > Date.now()) {
            // Token is valid
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else {
            // Token expired
            authService.removeAuthToken();
            localStorage.removeItem('decor_user');
          }
        } catch (error) {
          console.error('Failed to parse stored token', error);
          authService.removeAuthToken();
          localStorage.removeItem('decor_user');
        }
      } else if (storedUser) {
        // Fallback to stored user for demo purposes
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user', error);
          localStorage.removeItem('decor_user');
        }
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Login function using API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try to use the API
      const response = await authService.login({ email, password });
      
      // Save the token
      authService.saveAuthToken(response.token);
      
      // Parse token to get user info
      const tokenData = parseJwt(response.token);
      if (tokenData) {
        const userData: User = {
          id: tokenData.id || tokenData.sub,
          name: tokenData.name,
          email: tokenData.email,
          role: tokenData.role || 'customer',
          avatar: tokenData.avatar
        };
        
        setUser(userData);
        localStorage.setItem('decor_user', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`);
      }
    } catch (error) {
      console.error('API login error:', error);
      
      // Fallback to mock login for demo if API fails
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('decor_user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${foundUser.name}! (Mock login)`);
      } else {
        toast.error('Invalid email or password');
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Register function using API
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Register using API
      await authService.register({ name, email, password });
      
      // After registration, login the user
      await login(email, password);
      
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Fallback for demo
      // Check if user already exists in mock data
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        toast.error('Email already in use');
        throw new Error('Email already in use');
      }
      
      // Create new mock user
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        email,
        role: 'customer',
      };
      
      setUser(newUser);
      localStorage.setItem('decor_user', JSON.stringify(newUser));
      toast.success('Mock registration successful!');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.removeAuthToken();
    localStorage.removeItem('decor_user');
    setUser(null);
    toast.info('You have been logged out');
  };

  // Helper to check user roles
  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
