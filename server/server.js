import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
   return res.send("API is Working");
});

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
