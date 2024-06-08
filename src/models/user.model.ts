import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false, unique: true },
    gender: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    nik: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    profilePicUrl: { type: String }
  });
  
const User = mongoose.model<IUser>('User', userSchema);
export default User;
