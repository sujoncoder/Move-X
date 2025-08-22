import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";

import { deleteMyProfile, deleteUser, getAllUsers, getMyProfile, getUser, updateMyProfile, updateUserRole, userStatusChange } from "./uer.controller";
import { Role } from "./user.interface";


// USER ROUTES
export const userRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllUsers)

    .get("/my-profile", checkAuth(...Object.values(Role)), getMyProfile)
    .patch("/my-profile", checkAuth("SENDER", "RECEIVER"), updateMyProfile)
    .delete("/my-profile", checkAuth("SENDER", "RECEIVER"), deleteMyProfile)

    .patch("/status/:id", checkAuth("ADMIN"), userStatusChange)

    .get("/:id", checkAuth("ADMIN"), getUser)
    .patch("/:id", checkAuth("ADMIN"), updateUserRole)
    .delete("/:id", checkAuth("ADMIN"), deleteUser)


