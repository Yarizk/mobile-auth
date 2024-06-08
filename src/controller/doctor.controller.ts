
import { validationResult } from "express-validator";
import Doctor from "../models/doctor.model"
import geohash, { neighbor_int, neighbors } from 'ngeohash';
import { Request, Response } from 'express';
import { IDoctor } from "../interfaces/IDoctor";


enum Jarak  {
    TERDEKAT = "TERDEKAT",
    KURANGDARI10KM = "KURANGDARI10KM",
    LEBIHDARI10KM = "LEBIHDARI10KM"
}

enum Harga {
    KURANGDARI50K = "KURANGDARI50K",
    LEBIHDARI50K = "LEBIHDARI50K",
    LEBIHDARI50KKURANGDARI100K = "LEBIHDARI50KKURANGDARI100K"
}


export const nearestDoctor = async(req: Request, res: Response) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    

    try {
        const{ latitude, longitude, speciality, harga, jarak} = req.body;
     
        
        let doctors: any;
        if (harga == Harga.KURANGDARI50K) {
         doctors = await Doctor.find().where('speciality').equals(speciality)
            .where('pricePerHour').lt(50000);
        }else if (harga == Harga.LEBIHDARI50K) {
             doctors = await Doctor.find().where('speciality').equals(speciality)
            .where('pricePerHour').gt(50000);
        }else {
             doctors = await Doctor.find().where('speciality').equals(speciality)
            .where('pricePerHour').gt(50000).lt(100000);
        }
       

       
        let nearestDoctors: IDoctor[] = []
        // yang satu box geohassh length 6 (radius 1km)
        if (jarak == Jarak.TERDEKAT) {
            const geohashLocUser = geohash.encode(latitude, longitude, 6)
            const neighborsBox = geohash.neighbors(geohashLocUser); // neighbor geohash box dari user
             nearestDoctors = nearestDoctorFinder(neighborsBox, doctors,   geohashLocUser, 6 )
        }else if (jarak == Jarak.KURANGDARI10KM) {
             const geohashLocUser = geohash.encode(latitude, longitude, 5) // length 5: widthx height = 4.89km x 4.89km
            const neighborsBox = geohash.neighbors(geohashLocUser); // neighbor geohash box dari user
             nearestDoctors = nearestDoctorFinderKurangDariTenKM(neighborsBox, doctors,   geohashLocUser, 5 )
        }else {
             const geohashLocUser = geohash.encode(latitude, longitude, 5) // length 5: widthx height = 4.89km x 4.89km
            const neighborsBox = geohash.neighbors(geohashLocUser); // neighbor geohash box dari user
             nearestDoctors = nearestDoctorFinder(neighborsBox, doctors,   geohashLocUser , 5)
        }

        return res.status(200).json({doctors: nearestDoctors});
    }   catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}



function nearestDoctorFinderKurangDariTenKM( neighborsBox: string[], doctors: any, geohashLocUser: string, precision: number): IDoctor[] {
     const upperBox = neighborsBox[0]; // box utarranya user
    var nearestDoctor : IDoctor[] = [];

         // northeast box
        const eastBox = neighborsBox[2]; // box timurntya user
        const southBox = neighborsBox[4];
        const westBox = neighborsBox[6];

    for (let i =0; i < doctors.length; i++) {
            const currentDoctor = doctors[i];

            const currentDoctorLoc = precision == 6 ?  doctors[i].geohashLoc.substr(0,6): doctors[i].geohashLoc.substr(0,5);

            let sameLength = 0;
            if (currentDoctorLoc== geohashLocUser){
                nearestDoctor.push(currentDoctor)
            }
            
            // buat box uatara user
            if (upperBox== geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }

            // bat east  box
            if (eastBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }
       
             // buat south  box
            if (southBox == geohashLocUser) {
               nearestDoctor.push(currentDoctor)
            }

              // buat  west box
            if (westBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }

        }

        return nearestDoctor;
}

function nearestDoctorFinder( neighborsBox: string[], doctors: any, geohashLocUser: string, precision: number): IDoctor[] {
     const upperBox = neighborsBox[0]; // box utarranya user
    var nearestDoctor : IDoctor[] = [];

         // northeast box
        const neBox = neighborsBox[1]; // box northeasnya user
        const eastBox = neighborsBox[2]; // box timurntya user
        const southEastBox = neighborsBox[3];
        const southBox = neighborsBox[4];
        const southWestBox = neighborsBox[5];
        const westBox = neighborsBox[6];
        const norhWestBox = neighborsBox[7];

    for (let i =0; i < doctors.length; i++) {
            const currentDoctor = doctors[i];
            const currentDoctorLoc =  doctors[i].geohashLoc.substr(0, precision);

            let sameLength = 0;
            if (currentDoctorLoc== geohashLocUser){
                nearestDoctor.push(currentDoctor)
            }
            
            // buat box uatara user
            if (upperBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }

            // buat north east box
            if (neBox == geohashLocUser) {
               nearestDoctor.push(currentDoctor)
            }

            // bat east  box
            if (eastBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }
            // buat south east  box
            if (southEastBox == geohashLocUser) {

                nearestDoctor.push(currentDoctor)
            }

             // buat south  box
            if (southBox == geohashLocUser) {
               nearestDoctor.push(currentDoctor)
            }
             // buat south  west box
            if (southWestBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }
              // buat  west box
            if (westBox == geohashLocUser) {
                nearestDoctor.push(currentDoctor)
            }

            // buat  northWest box
            if (norhWestBox == geohashLocUser) {
               nearestDoctor.push(currentDoctor)
            }
        }

        return nearestDoctor;
}



