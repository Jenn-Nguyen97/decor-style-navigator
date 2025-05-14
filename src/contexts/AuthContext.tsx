
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

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

// Mock users for demo purposes
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('decor_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('decor_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function (mocked for demo)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('decor_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  // Register function (mocked for demo)
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    
    if (existingUser) {
      toast.error('Email already in use');
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user (in a real app, this would be added to the database)
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'customer',
    };
    
    setUser(newUser);
    localStorage.setItem('decor_user', JSON.stringify(newUser));
    toast.success('Registration successful!');
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
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
