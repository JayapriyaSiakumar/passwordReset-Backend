import mongoose from "mongoose";
import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../Utils/mailer.js";

dotenv.config();

// Register User

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot register user Error in Register ${error}` });
  }
};

// Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ message: "Invalid email" });
    }
    const matchPassword = await bcrypt.compare(password, userDetail.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    //JWT
    const token = await jwt.sign(
      { _id: userDetail._id },
      process.env.JWT_SECRET
    );
    userDetail.token = token;
    await userDetail.save();

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", data: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot Login user Error in Login ${error}` });
  }
};

// Get User for -- Authorization
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Logged In User Detail:", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Cannot get user, Error in get User ${error}` });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const token = jwt.sign({ _id: userDetail._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //send email
    await sendMail(
      userDetail.email,
      "Password Reset link",
      `You are receiving this email because you have requested to reset your password.
       Please click the following link to reset your password: https://playful-naiad-52c608.netlify.app/reset-password/${userDetail._id}/${token}
       If you did not request this, please ignore this email.`
    );
    //console.log("Email Sent Successfully");
    res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Cannot give forgot password, Error in forgot password - ${error}`,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { id, token } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Password updated Successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: `Cannot reset password, Error in reset password - ${error}`,
    });
  }
};
