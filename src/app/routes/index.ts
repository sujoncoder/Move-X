import { Router } from "express";

import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { parcelRoutes } from "../modules/parcel/parcel.route";


// DEFAULT ROUTE
export const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/parcels",
        route: parcelRoutes
    },
];

// LOOP ALL ROUTE
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
});