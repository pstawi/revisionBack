import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connexion = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PWD,
    database:process.env.DB_NAME,
    port:3306
});

connexion.getConnection()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection failed:', err));