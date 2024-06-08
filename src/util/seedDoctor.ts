import { IAvailability, IDoctor } from "../interfaces/IDoctor";
import { Faker, id_ID } from "@faker-js/faker";
import geohash, { neighbor_int, neighbors } from 'ngeohash';
import Doctor from "../models/doctor.model";


export const faker = new Faker({
    locale: [id_ID]
})

function getRandomNum({min, max}: {min: number, max: number}) {
  return   Math.random() * (max - min) + min;
}

// -7.771832263016966, 110.37358810503908
export async  function seedRandomDoctor() {
    const doctorPics: string[] = ['https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', 
            'https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png',
            'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*',
            'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg',
            'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww',
            'https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg',
            
    ]
    let speciality: string[] = ['Umum',  'Spesialis Penyakit dalam', 'Spesialis Anak', 'Spesialis Saraf', 'Spesialis Kandungan dan Ginekologi', 'Spesialis Bedah', 'Spesialis Kulit dan Kelamin',
    'Spesialis THT', 'Spesialis Mata', 'Psikiater', 'Dokter Gigi', 'Spesialis Kedokteran Forensik dan Rehabilitasi']
    let doctor: IDoctor[]= [];
    // kebumen  -7.674637745074407  109.65838381007573
    //  taman pancasila=-7.59732682561945, 110.95034623566734
    const hospitals = ["Siloam", "RSUD", "Sardjito", "Yarsis", "Kasih Ibu", "RS UNS"," RS UGM", "RS UMS"]
    for (let i=0; i < 5000; i++) {
        const randomInteger = Math.round(getRandomNum({min: 0, max: 10}))
        // -7.821800411929682, 110.32432872552427
        // -7.762315251638179, 110.41359170743628

        // -7.76757495604769, 110.37864098110552 ugm
        // -7.770233585317687, 110.37336182212557 rs ugm

        //  -7.821560601177296, 110.32623392358305
        //  -7.761413051417575, 110.41285444468492
        const docLatitude = getRandomNum({min:  -7.821560601177296, max:   -7.761413051417575})
        const docLongitude = getRandomNum({min: 110.32623392358305, max:   110.41285444468492})
        const geoHash = geohash.encode(docLatitude, docLongitude);
        const docAvailability: IAvailability = {
                office: hospitals[  Math.round( getRandomNum({min:0 , max: 7}))],
                dayOfWeekStart: 2, 
                dayOfWeekEnd: 5,
                startDayTime: 7,
                endDayTime: 15,
            }

        console.log("randomInteger: " + randomInteger)
        
        const currDoctor: IDoctor = {
            name: faker.person.fullName(),
            speciality: speciality[randomInteger],
            pricePerHour:   Math.round( getRandomNum({min: 25000, max: 100000})),
            locLatitude: docLatitude,
            locLongitude: docLongitude,
            geohashLoc: geoHash,
            practicingFrom:   Math.round( getRandomNum({min: 2015, max: 2024})),
            profilePic: doctorPics[Math.round(getRandomNum({min: 0, max: 6}))],
            availability: docAvailability
            }
        doctor.push(currDoctor)
        console.log(currDoctor)
    
        // insert doctor to mongodb
        const doctorMongoose = new Doctor(
            currDoctor
        )
        await doctorMongoose.save();
    }
    


}