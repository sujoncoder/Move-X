import { Router } from "express";
import { createUser, loginUser } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";


// AUTH ROUTES
export const authRoutes = Router()
    .post("/register", validateRequest(createUserZodSchema), createUser)
    .post("/login", loginUser)