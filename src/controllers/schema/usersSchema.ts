import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(["USER", "ADMIN"]).optional()
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})