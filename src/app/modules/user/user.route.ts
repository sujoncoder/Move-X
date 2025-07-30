import { Router } from "express";

import { deleteMyProfile, deleteUserById, getAllUsers, getMyProfile, getUserById, updateMyProfile, updateUserRole, userStatus } from "./uer.controller";
import { checkAuth } from "../../middlewares/checkAuth";


export const userRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllUsers)

    .patch("/status/:id", checkAuth("ADMIN"), userStatus)

    .get("/my-profile", checkAuth("SENDER", "RECEIVER"), getMyProfile)
    .patch("/my-profile", checkAuth("SENDER", "RECEIVER"), updateMyProfile)
    .delete("/my-profile", checkAuth("SENDER", "RECEIVER"), deleteMyProfile)

    .get("/:id", checkAuth("ADMIN"), getUserById)
    .delete("/:id", checkAuth("ADMIN"), deleteUserById)
    .patch("/:id", checkAuth("ADMIN"), updateUserRole)