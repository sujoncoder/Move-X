/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { STATUS_CODE } from "../../constants/httpStatus";

import { createUserService, deleteMyProfileService, deleteUserByIdService, getAllUsersService, getMyProfileService, getUserByIdService, updateMyProfileService, updateUserRoleService, userStatusService } from "./user.service";
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


// DELETE MY-PROFILE CONTROLLER
export const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const prifile = await getMyProfileService(userId);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "Profile retrieved successfully",
        data: prifile,
    });
});


// UPDATE MY-PROFILE CONTROLLER
export const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const payload = req.body;

    const updatedUser = await updateMyProfileService(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "Profile updated successfully",
        data: updatedUser,
    });
});


// DELETE MY-PROFILE CONTROLLER
export const deleteMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const deletedUser = await deleteMyProfileService(userId);

    sendResponse(res, {
        success: true,
        statusCode: STATUS_CODE.OK,
        message: "Profile deleted successfully",
        data: deletedUser,
    });
});


// USER STATUS CHANGE CONTROLLER
export const userStatus = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const userId = req.params.id;
        const { isBlocked } = req.body;


        const result = await userStatusService(userId, isBlocked);



        sendResponse(res, {
            success: true,
            statusCode: STATUS_CODE.OK,
            message: result?.isBlocked
                ? "User has been blocked successfully."
                : "User has been unblocked successfully.",
            data: result,
        });
    }
);

