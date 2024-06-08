import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { errors, isCelebrateError, CelebrateError } from 'celebrate';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import doctorRoutes from './routes/doctor.routes';
import dbConfig from './config/db.config';
import Celebrate from 'celebrate';
import { faker } from '@faker-js/faker';
import { seedRandomDoctor } from './util/seedDoctor';
import Doctor from './models/doctor.model';






dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConfig();





// (async () => {
//   try {
//     // await Doctor.deleteMany()
//     await seedRandomDoctor();
//     console.log("doctor data seeded!! :)")
//   } catch (e) {
//     console.log(e);
//   }
// })()


app.use(express.json());
app.use(cors());
app.use(errors());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes)

app.use('/uploads', express.static('uploads'));

app.use((err: CelebrateError | Error, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    const validationError = err.details.get('body') || err.details.get('query') || err.details.get('params');
    if (validationError) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: validationError.details.map(detail => ({
          message: detail.message,
          path: detail.path.join('.'),
        })),
      });
    }
  }
  return next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
