import * as userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

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