import { Router } from "express";

import { deleteMyProfile, deleteUserById, getAllUsers, getMyProfile, getUserById, updateMyProfile, updateUserRole, userStatusChange } from "./uer.controller";
import { checkAuth } from "../../middlewares/checkAuth";


export const userRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllUsers)

    .patch("/status/:id", checkAuth("ADMIN"), userStatusChange)

    .get("/my-profile", checkAuth("SENDER", "RECEIVER"), getMyProfile)
    .patch("/my-profile", checkAuth("SENDER", "RECEIVER"), updateMyProfile)
    .delete("/my-profile", checkAuth("SENDER", "RECEIVER"), deleteMyProfile)

    .get("/:id", checkAuth("ADMIN"), getUserById)
    .patch("/:id", checkAuth("ADMIN"), updateUserRole)
    .delete("/:id", checkAuth("ADMIN"), deleteUserById)