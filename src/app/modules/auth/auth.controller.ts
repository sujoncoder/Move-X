/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import { loginUserService } from "./auth.service";



// CREATE USER CONTROLLER
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await loginUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User logged in successfully",
        data: loginInfo
    });
});