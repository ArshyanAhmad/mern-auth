import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

// schema type
import { registerSchema, loginSchema } from "../types/types.js";

export const register = async (req, res, next) => {
   const success = registerSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "User credential validation failed";

      return res.status(400).json({
         success: false,
         message: errorMessage,
      });
   }
   const { name, email, password } = req.body;

   if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({
         success: false,
         message: "All fields are required",
      });
   }

   try {
      const userExist = await User.findOne({ email });

      if (userExist) {
         return res.status(409).json({
            success: false,
            message: "User already exist",
         });
      }

      const user = await User.create({
         name,
         email,
         password,
      });

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User registeration failed",
         });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: "7d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "prodcuction" ? "none" : "strict",
         maxAge: 7 * 24 * 60 * 60 + 1000,
      });

      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: email,
         subject: "Welcome in my world",
         text: `Welcome to my world ${name}. Your account has been created with email id: ${email}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(201).json({
         success: true,
         message: "User registered successfully",
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: `User registration failed, ${error}`,
      });
   }
};

export const login = async (req, res, next) => {
   const success = loginSchema.safeParse(req.body);

   if (!success.success) {
      const errorMessage =
         success.error.errors.map((err) => err.message).join(", ") ||
         "User credential validation failed";

      return res.status(400).json({
         success: false,
         message: errorMessage,
      });
   }

   const { email, password } = req.body;

   if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({
         success: false,
         message: "Email and password are required",
      });
   }

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Email is not registered",
         });
      }

      const isMatch = await user.isPasswordCorrect(password);
      if (!isMatch) {
         return res.status(400).json({
            success: false,
            message: "Password didn't matched",
         });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: "7d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
         maxAge: 7 * 24 * 60 * 60 + 1000,
      }).status(201);

      return res.status(200).json({
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: `Login failed ${error.message}`,
      });
   }
};

export const logout = async (req, res, next) => {
   try {
      res.clearCookie("token", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });

      return res.status(200).json({
         success: true,
         message: "Logged out successfully",
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: `Logged out failed ${error.message}`,
      });
   }
};

// Send verification OTP to the User's Email

export const sendVerificationOtp = async (req, res, next) => {
   try {
      const { userId } = req.body;

      const user = await User.findById(userId);

      if (user.isAccountVerified) {
         return res.status(400).json({
            success: false,
            message: "Account already verified",
         });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      user.verifyOtp = otp;
      user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day

      await user.save();

      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: user.email,
         subject: "Verify your email",
         text: `Your verification OTP is ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
         success: true,
         message: "Verification OTP sent to the email",
      });
   } catch (error) {
      res.json({
         success: false,
         message: `Verification failed ${error.message}`,
      });
   }
};

export const verifyEmail = async (req, res, next) => {
   const { userId, otp } = req.body;

   if (!userId || !otp) {
      return res.status(400).json({
         success: false,
         message: "User ID and OTP are required",
      });
   }

   try {
      const user = await User.findById(userId);

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User not found",
         });
      }

      if (user.verifyOtp !== otp || user.verifyOtp === "") {
         return res.status(400).json({
            success: false,
            message: "Invalid OTP",
         });
      }

      if (user.verifyOtpExpiredAt < Date.now()) {
         return res.status(400).json({
            success: false,
            message: "OTP expired",
         });
      }

      user.isAccountVerified = true;
      user.verifyOtp = "";
      user.verifyOtpExpiredAt = 0;

      await user.save();

      return res.status(200).json({
         success: true,
         message: "Email verified successfully",
      });
   } catch (error) {
      res.json({
         success: false,
         message: `Verification failed ${error.message}`,
      });
   }
};

// Send OTP to user email

export const sendResetPasswordOtp = async (req, res, next) => {
   const { email } = req.body;

   const user = await User.findOne({ email });
};
