import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         minLength: [6, "Password must be atleast 6 character"],
      },
      verifyOtp: {
         type: String,
         default: "",
      },
      verifyOtpExpiredAt: {
         type: Number,
         default: 0,
      },
      isAccountVerified: {
         type: Boolean,
         default: false,
      },
      resetOtp: {
         type: String,
         default: "",
      },
      resetOtpExpireAt: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next;

   this.password = await bcryptjs.hash(this.password, 10);
   next();
});

export const User = mongoose.models.user || mongoose.model("User", userSchema);
