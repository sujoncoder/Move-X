import bcrypt from "bcryptjs";

import { SECRET } from "../../config/env";
import { User } from "../user/user.model";
import { ApiError } from "../../errors/ApiError";
import { type IUser, Role } from "../user/user.interface";
import { HTTP_STATUS } from "../../constants/httpStatus";



// CREATE NEW USER SERVICE - (USER)
export const createUserService = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User already exist !");
    };

    const hashedPassword = await bcrypt.hash(password as string, SECRET.BCRYPT_SALT_ROUND);

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest,
    });

    const { password: pass, ...userWithOutPassword } = user.toObject();

    return userWithOutPassword;
};


// GET MY-PROFILE SERVICE - (USER)
export const getMyProfileService = async (userId: string) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    };

    return user;
};


// UPDATE MY-PROFILE SERVICE - (USER)
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
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No valid fields to update.");
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatePayload, {
        new: true,
    }).select("-password");


    if (!updatedUser) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    };

    return updatedUser;
};


// DELETE MY-PROFILE SERVICE - (USER)
export const deleteMyProfileService = async (userId: string) => {
    const deletedUser = await User.findByIdAndDelete(userId).select("-password");

    if (!deletedUser) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    };

    return deletedUser;
};



// -------------------- ADMIN SERVICE AREA ----------------------------




// GET ALL USERS SERVICE - (ADMIN)
export const getAllUsersService = async () => {
    const users = await User.find({ isBlocked: { $ne: true } }).select("-password");

    const totalUsers = await User.countDocuments({ isBlocked: { $ne: true } });

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
};


// GET SINGLE USER SERVICE - (ADMIN)
export const getUserByIdService = async (id: string) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not exist !")
    };

    return user;
};


// DELETE SIGNLE USER SERVICE - (ADMIN)
export const deleteUserByIdService = async (id: string) => {
    const user = await User.findByIdAndDelete(id).select("-password");

    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not exist !")
    };

    return user;
};


// UPDATE USER ROLE SERVICE - (ADMIN)
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
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found!");
    }

    return user;
};


// UPDATE USER STATUS CHANGE SERVICE - (ADMIN)
export const userStatusService = async (userId: string, isBlocked: boolean) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    };

    user.isBlocked = isBlocked;
    await user.save();

    return { isBlocked: user.isBlocked };
};