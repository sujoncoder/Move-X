/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import { getNewAccessTokenService, loginUserService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import { ApiError } from "../../errors/ApiError";



// LOGIN CONTROLLER
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await loginUserService(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User logged in successfully",
        data: loginInfo
    });
});


// GET NEW ACCESS TOKEN CONTROLLER
export const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No refresh token received from cookies !")
    };

    const tokenInfo = await getNewAccessTokenService(refreshToken as string);

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "New access token retrieved successfully",
        data: tokenInfo
    });
});


// LOGOUT CONTROLLER
export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });


    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User logout successfully",
        data: null
    });
});