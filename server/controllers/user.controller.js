import { User } from "../models/user.model.js";

export const getUserData = async (req, res) => {
   try {
      const { userId } = req.body;

      const userExist = await User.findById(userId);

      if (!userExist) {
         return res.status(401).json({
            success: false,
            message: "User not found",
         });
      }

      return res.status(200).json({
         success: true,
         userData: {
            username: userExist.name,
            isAccountVerified: userExist.isAccountVerified,
         },
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};
