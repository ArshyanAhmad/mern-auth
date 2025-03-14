import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const userAuth = async (req, res, next) => {
   const { token } = req.cookies;

   if (!token) {
      return res.status(401).json({
         success: false,
         message: "User not authenticated",
      });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
         return res.status(401).json({
            success: false,
            message: "Invalid Id!",
         });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
         return res.status(401).json({
            success: false,
            message: "User not found!",
         });
      }

      if (decoded.id) {
         req.body.userId = user._id;
         next();
      } else {
         return res.status(401).json({
            success: false,
            message: "User not authorized login again!",
         });
      }
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: "Invalid token",
      });
   }
};
