// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../user/user.model";
import { SECRET } from "../../config/env";
import { IUser } from "../user/user.interface";
import { generateToken } from "../../utils/jwt";
import { ApiError } from "../../errors/ApiError";
import { HTTP_STATUS } from "../../constants/httpStatus";



// LOGIN USER SERVICE
export const loginUserService = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User not exist !")
    };

    if (isUserExist.isBlocked) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Your account is blocked !");
    };

    const matchPassword = await bcrypt.compare(password as string, isUserExist.password);

    if (!matchPassword) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, " incorrect password !")
    };

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };

    const accessToken = await generateToken(jwtPayload, SECRET.JWT_ACCESS_SECRET, SECRET.JWT_ACCESS_EXPIRES);

    return { accessToken };
};