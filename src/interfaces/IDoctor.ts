import { ObjectId, Types } from "mongoose";


export enum Day{
    SENIN,
    SELASA,
    RABU,
    KAMIS,
    JUMAT,
    SABTU,
    MINGGU
}

export interface IDoctor{
    name: string;
    speciality: string;
    pricePerHour: number;
    locLatitude: number;
    locLongitude: number;
    geohashLoc: string;
    practicingFrom: number;
    profilePic: string;
    appointments?: Types.ObjectId[];
    // availability: Types.ObjectId[];
    availability: IAvailability;
}


export interface IAvailability {
        office: string;
        dayOfWeekStart: Day;
        dayOfWeekEnd: Day;
        startDayTime: number;
        endDayTime: number;
}


// export interface IAvailability {
//     doctorID: Types.ObjectId;
//     office: string;
    
// }   


export enum AppointmentStatus {
    SCHEDULED,
    COMPLETED
}


export interface IAppointment {
    userID: Types.ObjectId;
    officeID: Types.ObjectId;
    doctorID: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    status: AppointmentStatus;
}