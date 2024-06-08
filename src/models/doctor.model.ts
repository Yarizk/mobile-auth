import mongoose, { Schema } from 'mongoose';
import { IDoctor, IAppointment } from '../interfaces/IDoctor';
import { availabilitySchema } from './availability.model';

const doctorSchema = new mongoose.Schema<IDoctor>({
    name: {type: String, required: true},
    speciality: {type: String, required: true},
    pricePerHour: {type: Number, required: true},
    locLatitude: {type: Number, required: false},
    locLongitude: {type: Number, required: false},
    practicingFrom: {type: Number, required: true},
    profilePic: {type: String, required: false},
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        required: false,
    }],
    availability: availabilitySchema,
    geohashLoc: {type: String, required: false},
});   

  
const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
