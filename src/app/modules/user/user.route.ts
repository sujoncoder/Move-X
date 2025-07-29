import { Router } from "express";

import { deleteUserById, getAllUsers, getUserById, updateUserRole } from "./uer.controller";
import { checkAuth } from "../../middlewares/checkAuth";


export const userRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllUsers)
    .get("/:id", checkAuth("ADMIN"), getUserById)
    .delete("/:id", checkAuth("ADMIN"), deleteUserById)
    .patch("/:id", checkAuth("ADMIN"), updateUserRole)