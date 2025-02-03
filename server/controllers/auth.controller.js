import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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

      return res
         .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
               process.env.NODE_ENV === "prodcuction" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 + 1000,
         })
         .status(201)
         .json({
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
