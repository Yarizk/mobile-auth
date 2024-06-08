import mongoose, { Schema, Types } from 'mongoose';

import { IAvailability } from '../interfaces/IDoctor';
import { date } from 'joi';


export const availabilitySchema = new mongoose.Schema<IAvailability>({
    office: {type: String, required: false},
    dayOfWeekStart: {type: Number, required: false},
    dayOfWeekEnd: {type: Number, required: false},
    startDayTime: {type: Number, required: false},
    endDayTime: {type: Number, required: false},
})


const Availability = mongoose.model<IAvailability>("Availability", availabilitySchema);
export default Availability;



