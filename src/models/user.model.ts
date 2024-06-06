import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nik: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: Buffer, contentType: String } 
  });
  
const User = mongoose.model<IUser>('User', userSchema);
export default User;
