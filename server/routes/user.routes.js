import { Router } from "express";
import {
   login,
   logout,
   register,
   sendVerificationOtp,
   verifyEmail,
   isUserAuthenticated,
   sendResetOtp,
   resetPassword,
} from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-verify-otp", userAuth, sendVerificationOtp);
router.post("/verify-account", userAuth, verifyEmail);
router.post("/is-auth", userAuth, isUserAuthenticated);

router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
