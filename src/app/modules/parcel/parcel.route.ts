import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { createParcel } from "./parcel.controller";


export const parcelRoutes = Router()
    .post("/create-parcel", checkAuth("SENDER"), validateRequest(createParcelZodSchema), createParcel)