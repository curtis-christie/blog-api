import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().trim().nonempty("Must enter username."),
    email: z.email("Must enter a valid email").toLowerCase(),
    password: z.string().trim().min(8, "Password must be at least 8 characters."),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Must enter a valid email").toLowerCase(),
    password: z.string().trim().min(1, "Must enter password."),
  }),
});
