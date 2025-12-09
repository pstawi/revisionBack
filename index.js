import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connexion } from './config/bdd.js';

import userRoutes from './route/userRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});