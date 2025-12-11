/*
  AuthContext.jsx
  - Gère l'état d'authentification centralisé (user, token, loading).
  - Expose des helpers: `login`, `register`, `logout`, `isAuthenticated`, `isAdmin`.
  - Stocke le token dans `localStorage` et décode le token pour obtenir les infos utilisateur.
  - Les composants utilisent `useAuth()` pour accéder au contexte.
*/
import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Vérifier si le token est valide et récupérer les infos utilisateur
      try {
        const userInfo = authService.getUserFromToken(token);
        if (userInfo) {
          setUser(userInfo);
        } else {
          logout();
        }
      } catch (err) {
        // En cas d'erreur (token corrompu/illégal), forcer la déconnexion
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (login, password) => {
    try {
      const response = await authService.login(login, password);
      // on récupère le token renvoyé par le backend et on le stocke
      const { token: newToken } = response;

      setToken(newToken);
      localStorage.setItem('token', newToken);

      // essayer de décoder le token pour obtenir les informations utilisateur
      try {
        const userInfo = authService.getUserFromToken(newToken);
        setUser(userInfo);
      } catch (err) {
        // si le token n'est pas décodable, ne pas définir d'utilisateur
        setUser(null);
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  const register = async (data) => {
    try {
      const response = await authService.register(data);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de l\'inscription' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const isAdmin = () => {
    return user?.role === 1;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};