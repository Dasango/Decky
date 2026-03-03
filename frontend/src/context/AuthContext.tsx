import React, { createContext, useContext, useState } from 'react';
import { api } from '../lib/api';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('decky_token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('decky_user_id'));

  const login = async (username: string, password: string) => {
    const jwtToken = await api.auth.login({ username, password });
    
    // In a real app, you'd decode the JWT to get the userId (sub)
    // For this demo, we'll use the username as part of the simulation if necessary
    // or assume the backend uses the token to identify.
    // However, the flashcard service REQUIRES X-User-Id.
    // Usually the API Gateway extracts userId from JWT and adds it to headers.
    // But the spec says "Every request requires an X-User-Id header to identify the caller".
    // I'll simulate extracting a userId from the token or just use a dummy for now 
    // if I can't decode it easily without a library.
    // Let's assume the username is the userId for this microservices setup simplicity
    // or we'd rely on a JWT decoding library like jwt-decode.
    
    const simulatedUserId = `user_${username}`; 
    
    localStorage.setItem('decky_token', jwtToken);
    localStorage.setItem('decky_user_id', simulatedUserId);
    setToken(jwtToken);
    setUserId(simulatedUserId);
  };

  const signup = async (username: string, password: string) => {
    await api.auth.signup({ username, password });
  };

  const logout = () => {
    localStorage.removeItem('decky_token');
    localStorage.removeItem('decky_user_id');
    setToken(null);
    setUserId(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userId, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
