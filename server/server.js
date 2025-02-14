import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";

import authRouer from "./routes/user.routes.js";
import userRouer from "./routes/get.user.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      credentials: true,
      origin: allowedOrigins,
   })
);

// API Endpoints

app.get("/", (req, res) => {
   return res.send("API is Working");
});

app.use("/api/auth", authRouer);
app.use("/api/user", userRouer);

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is listening on PORT: ${PORT}`);
      });
   })
   .catch((err) => {
      console.error("DB Connection Failed", err);
      process.exit(1); // Stop app if DB connection fails
   });
