import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import OTP from '../models/otp.model';
import { sendOTPMail } from '../util/nodemailer';
import { Error } from 'mongoose';


function addHours(date: Date, hours: number) {
  const hoursToAdd = hours * 60 * 60 * 1000;
  const newDate = new Date();
  newDate.setTime(date.getTime() + hoursToAdd);
  return newDate;
}

function diff_hours(dt2: Date, dt1: Date) 
 {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
 }

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


    // create otp and send otp email
    const dateNow = new Date();
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const newOTPDB = new OTP({
      otp: otp,
      userID: newUser.id,
      email: email,
       expiresAt:  addHours(dateNow, 1)
    })
    await newOTPDB.save();

    await sendOTPMail(email, otp); // send otp mail....

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

    // create otp and send otp email
    const dateNow = new Date();
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const newOTPDB = new OTP({
      otp: otp,
      userID: user.id,
      email: user.email,
       expiresAt:  addHours(dateNow, 1),
      
    })
    await newOTPDB.save();

    await sendOTPMail(user.email, otp); // send otp mail....

    res.status(200).json({ message: "Logged in successfully!", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};


const generateToken = (userId: string, fullName: string) => {
    return jwt.sign({ id: userId, fullName }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
  

export const validateOTP = async( req: Request, res: Response) => {
  try {
    const {otp} = req.body;
    const currentUserId = req.currentUser!.id;

    const otpDB = await OTP.findOne({
      otp: otp,

    }).sort({expiresAt: "desc" });

    if (!otpDB ) {
        return res.status(404).json({ error: "your OTP code is invalid." }); 
    }

    if (otpDB.used ) {
        return res.status(403).json({ error: "Otp already used" });
    }

    const nowDate = new Date();
    if (nowDate >   otpDB!.expiresAt) {
        return res.status(400).json({ error: "Your OTP code is expired" });
    }

    const user = await User.findOne({
      $or: [{ email: otpDB.email }, ]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.id != currentUserId ) {
      return res.status(403).json({ error: "You are not the owner of the otp" });

    }

    // buat otp sudah dipakai
    otpDB.used = true
    await otpDB.save()

    const token = generateToken(user._id.toString(), user.fullName!);

    res.status(200).json({ message: "OTP Verified successfully!", token });
  } catch (error ) {
    res.status(500).json({ error: "Error validateOTP" });
  }
}


export const loginGoogle = async (req: Request, res: Response) => {
  try {
      let user : any;
       user = await User.findOne({
        $or: [{ email: req.user?.email }, ]
      });
     if (!user) {
       user = new User({
        fullName:  req.user?.firstName! + req.user?.lastName,
        email: req.user?.email,
      });
      await user.save();
     }
     const token = generateToken(user!._id.toString(), user!.fullName!);
     console.log(`login google successfull ${token}`)

      res.redirect(
            `memcaps://app/login?token=${token}`
      )
  }catch (error ) {
    res.status(500).json({ error: "Error registering new user." });
  }
    
}

export const sendNewOTP = async (req: Request, res: Response) => {
  try {
      const currentUserId = req.currentUser!.id;
    // get user from db
    const user = await User.findOne({
      $or: [{ _id: currentUserId },]
    });


  // create otp and send otp email
    const dateNow = new Date();
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const newOTPDB = new OTP({
      otp: otp,
      userID: user?.id,
      email: user?.email,
       expiresAt:  addHours(dateNow, 1)
    })
    await newOTPDB.save();

    await sendOTPMail(user!.email, otp); // send otp mail....
    res.status(200).json({ message: "OTP Send successfully!" });

  }catch (error ) {
    res.status(500).json({ error: "Error registering new user." });
  }
  
}

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email} = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { phoneNumber: email }]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = addHours(new Date(), 1);
    const emailUser = user.email;

    const otpEntry = new OTP({
      otp,
      userID: user._id,
      emailUser,
      expiresAt,
    });

    await otpEntry.save();
    await sendOTPMail(emailUser, otp, { subject: 'Password Reset OTP' });

    res.status(200).json({ message: 'Password reset OTP sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending password reset OTP.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpEntry = await OTP.findOne({ email, otp }).sort({ expiresAt: 'desc' });
    if (!otpEntry) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    if (otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP has expired.' });
    }

    const user = await User.findById(otpEntry.userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    otpEntry.used = true;
    await otpEntry.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password.' });
  }
};

