import { connexion } from "../config/bdd.js";


export const addUser = async (prenom, nom, login, password) =>{
    const insertUser = "INSERT INTO user (prenom, nom, login, password, roleId) VALUES (?, ?, ?, ?, 2)";
    const [result] = await connexion.query(insertUser, [prenom, nom, login, password]);
    return result;
}

export const getAllUsers = async () => {
    const selectUsers = "SELECT prenom, nom, login, password, roleId FROM user";
    const [result] = await connexion.query(selectUsers);
    return result;
}

export const getUserById = async (id) => {
    const selectUser = "SELECT prenom, nom, login, password, roleId FROM user WHERE id = ?";
    const [result] = await connexion.query(selectUser, [id]);
    return result;
}

export const deleteUser = async (id) => {
    const deleteUserQuery = "DELETE FROM user WHERE id = ?";
    const [result] = await connexion.query(deleteUserQuery, [id]);
    return result;
}

export const getUserByLogin = async (login) => {
    const selectUser = "SELECT * FROM user WHERE login = ?";
    const [result] = await connexion.query(selectUser, [login]);
    return result;
}

export const updateUser = async (id, prenom, nom, login, password, roleId) => {
    let updateUserQuery;
    let params;
    
    if (password) {
        // Si un mot de passe est fourni, on le met à jour aussi
        updateUserQuery = "UPDATE user SET prenom = ?, nom = ?, login = ?, password = ?, roleId = ? WHERE id = ?";
        params = [prenom, nom, login, password, roleId, id];
    } else {
        // Si pas de mot de passe, on ne met pas à jour ce champ
        updateUserQuery = "UPDATE user SET prenom = ?, nom = ?, login = ?, roleId = ? WHERE id = ?";
        params = [prenom, nom, login, roleId, id];
    }
    
    const [result] = await connexion.query(updateUserQuery, params);
    return result;
}