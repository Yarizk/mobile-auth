import mongoose, { Schema, Types } from 'mongoose';
import { IAppointment, AppointmentStatus } from '../interfaces/IDoctor';


const appointmentSchema = new mongoose.Schema<IAppointment>({
    userID: {type: Schema.Types.ObjectId, required: false },
    officeID: {type: Schema.Types.ObjectId, required: false},
    doctorID: {type: Schema.Types.ObjectId, required: false},
    startTime: {type: Date, required: false},
    endTime: {type: Date, requried: false},
    status: {type: Number, enum: ['SCHEDULED', 'COMPLETED'], required: false},
})




const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;




