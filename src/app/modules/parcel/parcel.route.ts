import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { createParcel, getMyParcel, cancelParcel, confirmDelivered, parcelStatusChange, getParcelStatusLog, getAllParcels, getReceiverParcel, } from "./parcel.controller";


// PARCEL ROUTES
export const parcelRoutes = Router()
    .get("/", checkAuth("ADMIN"), getAllParcels)
    .get("/me", checkAuth("SENDER", "RECEIVER"), getMyParcel)
    .get("/incoming", checkAuth("RECEIVER"), getReceiverParcel)
    .post("/create-parcel", checkAuth("SENDER"), validateRequest(createParcelZodSchema), createParcel)

    .patch("/:id/cancel", checkAuth("SENDER"), cancelParcel)
    .patch("/:id/status", checkAuth("ADMIN"), parcelStatusChange)
    .get("/:id/status-log", checkAuth("ADMIN", "SENDER", "RECEIVER"), getParcelStatusLog)

    .patch("/confirm/:id", checkAuth("RECEIVER"), confirmDelivered)
