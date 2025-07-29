import { Router } from "express";

import { loginUser } from "./auth.controller";
import { createUser } from "../user/uer.controller";
import { createUserZodSchema } from "../user/user.validation";
import { validateRequest } from "../../middlewares/validateRequest";


// AUTH ROUTES
export const authRoutes = Router()
    .post("/register", validateRequest(createUserZodSchema), createUser)
    .post("/login", loginUser)