import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/ApiError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import { createUserService, deleteMyProfileService, deleteUserByIdService, getAllUsersService, getMyProfileService, getUserByIdService, updateMyProfileService, updateUserRoleService, userStatusService } from "./user.service";



// ---------------------- USER CONTROLLER ---------------------------- //

// CREATE NEW USER CONTROLLER - (USER)
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.CREATED,
        message: "User created successfully",
        data: user
    });
});


// GET MY-PROFILE CONTROLLER - (USER)
export const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const prifile = await getMyProfileService(userId);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Profile retrieved successfully",
        data: prifile,
    });
});


// UPDATE MY-PROFILE CONTROLLER - (USER)
export const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const payload = req.body;

    const updatedUser = await updateMyProfileService(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Profile updated successfully",
        data: updatedUser,
    });
});


// DELETE MY-PROFILE CONTROLLER - USER
export const deleteMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const deletedUser = await deleteMyProfileService(userId);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Profile deleted successfully",
        data: deletedUser,
    });
});


// ---------------------- ADMIN CONTROLLER ---------------------------- //


// GET ALL USERS CONTROLLER - (ADMIN)
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllUsersService();

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "All users retrieved successfully",
        meta: result.meta,
        data: result.data
    });
});


// GET SINGLE USER CONTROLLER - (ADMIN)
export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await getUserByIdService(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User retrieved successfully",
        data: user
    });
});


// UPDATE USER STATUS CHANGE CONTROLLER - (ADMIN)
export const userStatusChange = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;
    const { isBlocked } = req.body;

    const result = await userStatusService(userId as string, isBlocked);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: result?.isBlocked
            ? "User has been blocked successfully."
            : "User has been unblocked successfully.",
        data: result,
    });
}
);


// UPDATE USER ROLE CONTROLLER - (ADMIN)
export const updateUserRole = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id as string;
    const { role, ...rest } = req.body;

    if (Object.keys(rest).length > 0) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Only 'role' field is allowed to update"
        );
    };

    if (!role || Object.keys(rest).length > 0) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Only 'role' field is allowed to update"
        );
    };

    const user = await updateUserRoleService({ id, role });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User role updated successfully",
        data: user
    });
});


// DELETE SINGLE USER CONTROLLER - (ADMIN)
export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await deleteUserByIdService(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User deleted successfully",
        data: user
    });
});