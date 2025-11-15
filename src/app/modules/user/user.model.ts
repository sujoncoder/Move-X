import { model, Schema } from "mongoose";

import { type IUser, Role } from "./user.interface";


// USER SCHEMA
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.SENDER, uppercase: true },
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

export const User = model<IUser>("User", userSchema);