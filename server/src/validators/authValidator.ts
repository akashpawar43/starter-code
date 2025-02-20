import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
        // .max(20, { message: 'max 20 characters supported' })
        // .refine((password) => /[A-Z]/.test(password), {
        //     message: 'use atleast 1 uppercase letter',
        // })
        // .refine((password) => /[a-z]/.test(password), {
        //     message: 'use atleast 1 uppercase letter',
        // })
        // .refine((password) => /[0-9]/.test(password), { message: 'use atleast 1 number' })
        // .refine((password) => /[!@#$%^&*]/.test(password), {
        //     message: 'use atleast 1 special character',
        // })
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, "Password must be at least 6 characters"),
})