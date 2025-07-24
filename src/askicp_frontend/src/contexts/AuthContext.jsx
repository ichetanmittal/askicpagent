import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toString());
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (onSuccessCallback) => {
    if (!authClient) return;

    try {
      const internetIdentityUrl = process.env.NODE_ENV === 'production'
        ? 'https://identity.ic0.app'
        : `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;

      await authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal().toString());
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        },
        onError: (error) => {
          console.error('Login failed:', error);
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    if (!authClient) return;

    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    authClient,
    isAuthenticated,
    principal,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};