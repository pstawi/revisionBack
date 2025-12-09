import { connexion } from "../config/bdd.js";


export const addUser = async (prenom, nom, login, password) =>{
    const insertUser = "INSERT INTO user (prenom, nom, login, password) VALUES (?, ?, ?, ?)";
    const [result] = await connexion.query(insertUser, [prenom, nom, login, password]);
    return result;
}