import { Types } from "mongoose";

// ROLE ENUM TYPE
export enum Role {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
    ADMIN = "ADMIN"
};

// USER TYPE
export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    password: string
    role: Role;
    isBlocked?: boolean
};