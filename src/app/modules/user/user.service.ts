/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs";

import { STATUS_CODE } from "../../constants/httpStatus";
import { ApiError } from "../../errors/ApiError";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { SECRET } from "../../config/env";



// CREATE USER SERVICE
export const createUserService = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User already exist !");
    };

    const hashedPassword = await bcrypt.hash(password as string, SECRET.BCRYPT_SALT_ROUND);

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest,
    });

    const { password: noPass, ...userWithOutPassword } = user.toObject();

    return userWithOutPassword;
};


// GET ALL USERS SERVICE
export const getAllUsersService = async () => {
    const users = await User.find({}).select("-password");

    const totalUsers = await User.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
};


// GET SINGLE USER SERVICE
export const getUserByIdService = async (id: string) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not exist !")
    };

    return user;
};


// DELETE SIGNLE USER SERVICE
export const deleteUserByIdService = async (id: string) => {
    const user = await User.findByIdAndDelete(id).select("-password");

    if (!user) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not exist !")
    };

    return user;
};


// UPDATE USER ROLE SERVICE
interface payloadType {
    id: string;
    role: Role
};

export const updateUserRoleService = async ({ id, role }: payloadType) => {
    const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true },
    ).select("-password");

    if (!user) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found!");
    }

    return user;
};


// GET MY-PROFILE SERVICE
export const getMyProfileService = async (userId: string) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found.");
    };

    return user;
};


// UPDATE MY-PROFILE SERVICE
export const updateMyProfileService = async (
    id: string,
    payload: Partial<IUser>
): Promise<Partial<IUser> | null> => {
    // Destructure only allowed fields
    const { name, email, phone } = payload;

    // Build update object
    const updatePayload: Partial<IUser> = {};

    if (name && name.trim()) updatePayload.name = name.trim();
    if (email && email.trim()) updatePayload.email = email.trim();
    if (phone && phone.trim()) updatePayload.phone = phone.trim();

    if (Object.keys(updatePayload).length === 0) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "No valid fields to update.");
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatePayload, {
        new: true,
    }).select("-password");


    if (!updatedUser) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found.");
    };

    return updatedUser;
};


// DELETE MY-PROFILE SERVICE
export const deleteMyProfileService = async (userId: string) => {
    const deletedUser = await User.findByIdAndDelete(userId).select("-password");

    if (!deletedUser) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found.");
    };

    return deletedUser;
};


// USER STATUS CHANGE SERVICE
export const userStatusService = async (userId: string, isBlocked: boolean) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found.");
    };

    user.isBlocked = isBlocked;
    await user.save();

    return { isBlocked: user.isBlocked };
};