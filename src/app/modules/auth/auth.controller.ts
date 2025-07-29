/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { loginUserService } from "./auth.service";
import { STATUS_CODE } from "../../constants/httpStatus";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



// CREATE USER CONTROLLER
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await loginUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "User logged in successfully",
        data: loginInfo
    });
});