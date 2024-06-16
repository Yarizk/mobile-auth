import { Joi } from 'celebrate';

export const loginSchema = {
  body: Joi.object().keys({
    login: Joi.string().required().messages({
      'string.base': 'Login must be a string',
      'string.empty': 'Login cannot be empty',
      'any.required': 'Login is required',
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
    }),
  }),
};


export const registerSchema = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Full name must be a string',
      'string.empty': 'Full name cannot be empty',
      'string.min': 'Full name must be at least 3 characters long',
      'string.max': 'Full name must be less than or equal to 50 characters long',
      'any.required': 'Full name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'email must be a valid email address',
      'string.email': 'email must be a valid email address',
      'string.empty': 'email cannot be empty',
      'any.required': 'email is required',
    }),
    phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required().messages({
      'string.base': 'Phone number must be a string of digits',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be between 10 to 15 digits',
      'any.required': 'Phone number is required',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'string.base': 'Gender must be a string',
      'any.only': 'Gender must be either male or female',
      'string.empty': 'Gender cannot be empty',
      'any.required': 'Gender is required',
    }),
    dateOfBirth: Joi.date().iso().less('now').required().messages({
      'date.base': 'Date of birth must be a valid ISO date',
      'date.less': 'Date of birth must be a date in the past',
      'string.empty': 'Date of birth cannot be empty',
      'any.required': 'Date of birth is required',
    }),
    nik: Joi.string().length(16).required().messages({
      'string.base': 'NIK must be a string',
      'string.length': 'NIK must be exactly 16 characters long',
      'string.empty': 'NIK cannot be empty',
      'any.required': 'NIK is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  }),
};

export const updateProfileSchema = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Full name must be a string',
      'string.empty': 'Full name cannot be empty',
      'string.min': 'Full name must be at least 3 characters long',
      'string.max': 'Full name must be less than or equal to 50 characters long',
      'any.required': 'Full name is required',
    }),
    phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required().messages({
      'string.base': 'Phone number must be a string of digits',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be between 10 to 15 digits',
      'any.required': 'Phone number is required',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'string.base': 'Gender must be a string',
      'any.only': 'Gender must be either male or female',
      'string.empty': 'Gender cannot be empty',
      'any.required': 'Gender is required',
    }),
    dateOfBirth: Joi.date().iso().less('now').required().messages({
      'date.base': 'Date of birth must be a valid ISO date',
      'date.less': 'Date of birth must be a date in the past',
      'string.empty': 'Date of birth cannot be empty',
      'any.required': 'Date of birth is required',
    }),
    nik: Joi.string().length(16).required().messages({
      'string.base': 'NIK must be a string',
      'string.length': 'NIK must be exactly 16 characters long',
      'string.empty': 'NIK cannot be empty',
      'any.required': 'NIK is required',
    }),
  }),
};

export const profilePictureSchema = {
  file: Joi.object().keys({
    profilePic: Joi.any().required().messages({
      'any.required': 'Profile picture file is required',
    }),
  }).unknown(true),
};


export const otpSchema = {
    body: Joi.object().keys({
      otp: Joi.string().length(4).required().messages({
        'otp.base': 'otp must be a string',
        'string.length': 'otp must be exactly 4 characters long',
        'any.required': 'otp is required',
      })
    }),
}


export const nearestDoctorSchema = {
    body: Joi.object().keys({
      latitude: Joi.number().required().messages({
        'latitude.base': 'Latitude must be a floating point',
        'any.required': 'latitude is required',
      }),
      longitude: Joi.number().required().messages({
        'longitude.base': 'longitude must be a floating point',
        'any.required': 'longitude is required'
      }),
      speciality: Joi.string().valid('ALL','Umum',  'Spesialis Penyakit dalam',
       'Spesialis Anak', 'Spesialis Saraf', 'Spesialis Kandungan dan Ginekologi', 'Spesialis Bedah', 
       'Spesialis Kulit dan Kelamin',
       'Spesialis THT', 'Spesialis Mata', 'Psikiater',
        'Dokter Gigi', 'Spesialis Kedokteran Forensik dan Rehabilitasi')
        .required().messages({
          'speciality.base': `speciality must be a string `,
          'speciality.valid': `speciality must be one of 'ALL','Umum',  'Spesialis Penyakit dalam',
              'Spesialis Anak', 'Spesialis Saraf', 'Spesialis Kandungan dan Ginekologi', 'Spesialis Bedah', 
              'Spesialis Kulit dan Kelamin',
              'Spesialis THT', 'Spesialis Mata', 'Psikiater',
                'Dokter Gigi', 'Spesialis Kedokteran Forensik dan Rehabilitasi'`,
          'speciality.required': `speciality is required`
        }),
      harga: Joi.string().valid('KURANGDARI50K', 'LEBIHDARI50K', 'LEBIHDARI50KKURANGDARI100K').required().messages({
        'harga.base': 'harga must be an string',
        'harga.less': 'harga must be less than Rp 200000',
        'harga.valid': `harga must be one of 'KURANGDARI50K', 'LEBIHDARI50K', 'LEBIHDARI50KKURANGDARI100K'`,
        'any.required': 'harga is required'
      }),
      jarak: Joi.string().valid('TERDEKAT', 'KURANGDARI10KM', 'LEBIHDARI10KM').required().messages({
        'jarak.base': 'jarak must be a string',
        'jarak.valid': `jarak must be one of 'TERDEKAT', 'KURANGDARI10KM', 'LEBIHDARI10KM'`,
        'any.required': 'jarak is required'
      }),
      
    })
}