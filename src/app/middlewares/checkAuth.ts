import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { SECRET } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../errors/ApiError";



// CHECK AUTH MIDDLEWARE
export const checkAuth = (...roles: string[]) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new ApiError(403, "No token received!");
        };

        const verifiedToken = verifyToken(accessToken, SECRET.JWT_ACCESS_SECRET) as JwtPayload;


        if (!roles.includes(verifiedToken.role)) {
            throw new ApiError(403, "You are not permitted to access this route!");
        };

        req.user = verifiedToken;
        next();
    } catch (error) {
        next(error);
    }
};
