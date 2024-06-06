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
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a valid email address',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
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
