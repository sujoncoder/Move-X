/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { STATUS_CODE } from "../../constants/httpStatus";

import { createUserService, deleteUserByIdService, getAllUsersService, getUserByIdService, updateUserRoleService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { ApiError } from "../../errors/ApiError";


// CREATE USER CONTROLLER
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.CREATED,
        message: "User created successfully",
        data: user
    });
});


// GET ALL USERS CONTROLLER
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllUsersService();

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "All users retrieved successfully",
        meta: result.meta,
        data: result.data
    });
});


// GET SINGLE USER CONTROLLER
export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await getUserByIdService(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "User retrieved successfully",
        data: user
    });
});


// DELETE SINGLE USER CONTROLLER
export const deleteUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await deleteUserByIdService(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "User deleted successfully",
        data: user
    });
});


// UPDATE USER ROLE CONTROLLER
export const updateUserRole = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const { role, ...rest } = req.body;

    if (Object.keys(rest).length > 0) {
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Only 'role' field is allowed to update"
        );
    };

    if (!role || Object.keys(rest).length > 0) {
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Only 'role' field is allowed to update"
        );
    };

    const user = await updateUserRoleService({ id, role });

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "User role updated successfully",
        data: user
    });
});