import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phoneNumber, gender, dateOfBirth, nik, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      nik,
      password: hashedPassword
    });
    
    const emailCheck = await User.findOne({ email }) ;
    const phoneNumberCheck = await User.findOne({ phoneNumber }) ;
    const nikCheck = await User.findOne({ nik }) ;

    if (emailCheck) return res.status(400).json({ error: "User with this email already exists." });
    if (phoneNumberCheck) return res.status(400).json({ error: "User with this phone number already exists." });
    if (nikCheck) return res.status(400).json({ error: "User with this nik already exists." });

    await newUser.save();
    const token = generateToken(newUser._id.toString(), newUser.fullName!);
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Error registering new user." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    if (!login) {
      return res.status(400).json({ error: "Please provide either email or phone number." });
    }
    const user = await User.findOne({
      $or: [{ email: login }, { phoneNumber: login }]
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = generateToken(user._id.toString(), user.fullName!);
    res.status(200).json({ message: "Logged in successfully!", token });

  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};
const generateToken = (userId: string, fullName: string) => {
    return jwt.sign({ id: userId, fullName }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
  