import { Router } from "express";
import { getUserData } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const router = Router();

router.get("/data", userAuth, getUserData);

export default router;
