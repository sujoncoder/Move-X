import z from "zod";

import { emailField, nameField, passwordField, phoneField } from "../../zod/userZod.ts.js";


// CREATE USER ZOD SCHEMA
export const createUserZodSchema = z.object({
    name: nameField,
    email: emailField,
    password: passwordField,
    phone: phoneField,
    role: z.enum(["SENDER", "RECEIVER"]).optional(),
    isBlocked: z.boolean({ error: "isBlocked must be true or false" }).optional(),
});