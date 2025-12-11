/*
    authService.js
    - Contient les appels relatifs à l'authentification : `login`, `register`.
    - Fournit `getUserFromToken` pour décoder le JWT côté client (utilisé par AuthContext).
    - Attention : le décodage côté client n'est pas une validation de sécurité, seulement
        pour afficher des infos utilisateur (le backend doit valider le token).
*/
import api from "./api";
import { jwtDecode } from "jwt-decode";

export const login = async (login, password) => {
    try {
        const response = await api.post('/login', { login, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await api.post('/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserFromToken = (token) => {

    try {

        // jwt-decode retourne le payload décodé du token (sans vérifier la signature)
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded;

    } catch (error) {
        throw error;    
    }
};