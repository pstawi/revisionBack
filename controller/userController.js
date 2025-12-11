import * as userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (req, res) => {

    const { prenom, nom, login, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const addedUser = await userModel.addUser(prenom, nom, login, hashPassword);
        res.status(201).json({ message: "User added successfully", userId: addedUser.insertId });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserById = async (req, res) => {

    const id = req.params.id;

    try {
        const user = await userModel.getUserById(id);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        const result = await userModel.deleteUser(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {

    const id = req.params.id;
    const { prenom, nom, login, password, roleId } = req.body;

    try {
        // Vérifier que l'utilisateur existe
        const existingUser = await userModel.getUserById(id);
        if (existingUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        let hashPassword = null;
        if (password) {
            hashPassword = await bcrypt.hash(password, 10);
        }

        const result = await userModel.updateUser(id, prenom, nom, login, hashPassword, roleId);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {

    const { login, password } = req.body;

    try {
        
        const user = await userModel.getUserByLogin(login);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAllowed = await bcrypt.compare(password, user[0].password)

        if(!isAllowed){
            return  res.status(401).json({ message: "Invalid credentials" });
        } else {

            const token = jwt.sign({ id: user[0].id, role: user[0].roleId }, process.env.SECRET, { expiresIn: "2h" });

            res.status(200).json({ message: "Login successful", token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
};