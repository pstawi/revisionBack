/*
  api.js
  - Instance Axios partagée configurée avec l'URL du backend.
  - Ajoute automatiquement le header `Authorization: Bearer <token>` si présent.
  - Intercepteur de réponse : en cas de 401/403, efface le token et redirige vers la page de login.
*/
import axios from 'axios';
// Le backend tourne sur le port 3000
const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token invalide ou expiré, déconnexion
      // Supprimer le token et forcer la navigation vers la page de connexion
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

