/* eslint-disable @typescript-eslint/no-unused-vars */
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../user/user.model";
import { SECRET } from "../../config/env";
import { IUser } from "../user/user.interface";
import { generateToken } from "../../utils/jwt";
import { ApiError } from "../../errors/ApiError";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";



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

    const userToken = createUserTokens(isUserExist);

    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    };
};


// GET NEW ACCESS TOKEN SERVICE
export const getNewAccessTokenService = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken
    };
};