import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import dbConfig from './config/db.config';
import Celebrate from 'celebrate';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConfig();


app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
