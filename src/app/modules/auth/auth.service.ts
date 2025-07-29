import { STATUS_CODE } from "../../constants/httpStatus";
import { ApiError } from "../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";


// CREATE USER SERVICE
export const createUserService = async (payload: Partial<IUser>) => {
    const { name, email, phone, password } = payload;

    const user = await User.create({ name, email, phone, password });

    return user;
};


// LOGIN USER SERVICE
export const loginUserService = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    if (!(email && password)) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email and passwod field are required")
    };

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not exist !")
    };

    const matchPassword = password === isUserExist.password;

    if (!matchPassword) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User password is incorrect !")
    };

    return {
        email,
        password
    };
};