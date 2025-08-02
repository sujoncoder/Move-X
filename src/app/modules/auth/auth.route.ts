import { Router } from "express";

import { createUser } from "../user/uer.controller";
import { createUserZodSchema } from "../user/user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

import { loginUser, getNewAccessToken, logout } from "./auth.controller";


// AUTH ROUTES
export const authRoutes = Router()
    .post("/register", validateRequest(createUserZodSchema), createUser)
    .post("/login", loginUser)
    .post("/refresh-token", getNewAccessToken)
    .post("/logout", logout)