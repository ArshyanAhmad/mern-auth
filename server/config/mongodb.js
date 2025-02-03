import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(
         `${process.env.MONGO_URI}`
      );
      console.log(
         "Database connected successfully ",
         connectionInstance.connection.host
      );
   } catch (error) {
      console.log(error);
      console.log("Database connectection failed");
      process.exit(1);
   }
};
