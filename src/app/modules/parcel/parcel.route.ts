import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

import { createParcelZodSchema } from "./parcel.validation";
import { createParcel, getMyParcel, cancelParcel, confirmDelivered, parcelStatusChange, getParcelStatusLog, getAllParcels, getReceiverParcel, getSingleParcel } from "./parcel.controller";
import { Role } from "../user/user.interface";


// PARCEL ROUTES
export const parcelRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllParcels)
    .get("/me", checkAuth("SENDER", "RECEIVER"), getMyParcel)
    .get("/incoming", checkAuth("RECEIVER"), getReceiverParcel)
    .post("/create-parcel", checkAuth("SENDER"), validateRequest(createParcelZodSchema), createParcel)

    .patch("/confirm/:id", checkAuth("RECEIVER"), confirmDelivered)

    .get("/:id", checkAuth(...Object.values(Role)), getSingleParcel)
    .patch("/:id/cancel", checkAuth("SENDER"), cancelParcel)
    .patch("/:id/status", checkAuth("ADMIN"), parcelStatusChange)
    .get("/:id/status-log", checkAuth("ADMIN", "SENDER", "RECEIVER"), getParcelStatusLog)