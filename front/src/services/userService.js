/*
    userService.js
    - Fonctions CRUD pour la gestion des utilisateurs (utilisées côté admin).
    - Utilise l'instance `api` qui ajoute automatiquement le token dans les headers.
*/
import api from "./api";

export const getAllUsers = async () => {
    try {

        const response = await api.get('/users');
        return response;
        
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await api.put(`/user/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};