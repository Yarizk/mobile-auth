import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';

export const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.currentUser!.id;
    const { fullName, email, phoneNumber, gender, dateOfBirth } = req.body;

    const user = await User.findByIdAndUpdate(userId, { fullName, email, phoneNumber, gender, dateOfBirth }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile." });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  try {
    const userId = req.currentUser!.id;
    const user = await User.findByIdAndUpdate(userId, { profilePic: req.file.path }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "Profile picture updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile picture." });
  }
};