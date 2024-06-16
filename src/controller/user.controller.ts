import { base } from './../../node_modules/acorn-walk/dist/walk.d';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import User from '../models/user.model';

export const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.currentUser!.id;
    const { fullName, phoneNumber, gender, dateOfBirth, nik } = req.body;

    if (!fullName || !phoneNumber || !gender || !dateOfBirth || !nik) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const check = await User.findOne({ phoneNumber, nik });
    if (check) {
      return res.status(400).json({ message: "Phone number, or nik already taken." });
    }

    const user = await User.findByIdAndUpdate(userId, { fullName, phoneNumber, gender, dateOfBirth, nik }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let profile = {
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      nik: user.nik,
      profilePicUrl: user.profilePicUrl
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Phone number, or nik already taken." });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser!.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    let profile = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      nik: user.nik,
      profilePicUrl: user.profilePicUrl
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error getting profile." });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser!.id;
    const base64 = req.body.image;
    let  filename = req.body.filename;
    const file = Buffer.from(base64, 'base64');
    
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    filename = filename.replace(/\s/g, '');
    const fileName = `${userId}-${new Date().getTime()}${filename}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file);

    const profilePicUrl = `${process.env.HOST}/uploads/${fileName}`;

    const user = await User.findByIdAndUpdate(userId, 
      { profilePicUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ profilePicUrl });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile picture." });
  }
};

