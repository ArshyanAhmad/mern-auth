import { Router } from "express";
import {
   login,
   logout,
   register,
   sendVerificationOtp,
   verifyEmail,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-verify-otp", isAuthenticated, sendVerificationOtp);
router.post("/verify-account", isAuthenticated, verifyEmail);

export default router;
