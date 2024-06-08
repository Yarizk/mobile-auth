import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import doctorRoutes from './routes/doctor.routes';
import dbConfig from './config/db.config';
import Celebrate from 'celebrate';
import { faker } from '@faker-js/faker';
import { seedRandomDoctor } from './util/seedDoctor';






dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConfig();





// (async () => {
//   try {
//     await seedRandomDoctor();
//     console.log("doctor data seeded!! :)")
//   } catch (e) {
//     console.log(e);
//   }
// })()

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
