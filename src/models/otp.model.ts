import mongoose, { Schema } from 'mongoose';
import {IOTP} from "../interfaces/IOTP"

const otpSchema = new mongoose.Schema<IOTP>({
    otp: {type: String, required: true},
    userID: {type: String, required: true},
    email: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    used: {type: Boolean, required: true, default: false},
})



const OTP = mongoose.model<IOTP>("IOTP", otpSchema);
export default OTP;

