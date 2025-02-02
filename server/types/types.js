import { z } from "zod";

export const registerSchema = z.object({
   name: z.string().min(3),
   email: z.string().email(),
   password: z.string().min(6, "Password must be atleast 6 character"),
});

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6, "Password must be atleast 6 character"),
});
