import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Token manquant' });


    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("ici",decoded);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ message: 'Token invalide' });
    }
};