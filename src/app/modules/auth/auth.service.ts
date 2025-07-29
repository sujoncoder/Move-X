// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { STATUS_CODE } from "../../constants/httpStatus";
import { ApiError } from "../../errors/ApiError";
import { IUser } from "../user/user.interface";
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithOutPassword } = user.toObject();

    return userWithOutPassword;
};



// LOGIN USER SERVICE
export const loginUserService = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not exist !")
    };

    const matchPassword = await bcrypt.compare(password as string, isUserExist.password);

    if (!matchPassword) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User password is incorrect !")
    };

    return {
        email,
        password
    };
};