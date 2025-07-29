/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import bcrypt from "bcryptjs";
import chalk from "chalk";

import { SECRET } from "../config/env";
import { User } from "../modules/user/user.model";
import { IUser, Role } from "../modules/user/user.interface";


// SEED ADMIN
export const seedAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ email: SECRET.ADMIN_EMAIL });

        if (isAdminExist) {
            console.log(chalk.red("⚠️  Admin Already Exist!"));
            return;
        };

        console.log("🔁 Trying to create Admin...");

        const hashedPassword = await bcrypt.hash(SECRET.ADMIN_PASSWORD, SECRET.BCRYPT_SALT_ROUND);

        const payload: IUser = {
            name: "Admin",
            email: SECRET.ADMIN_EMAIL,
            password: hashedPassword,
            phone: "01999-986919",
            role: Role.ADMIN,
            isBlocked: false
        };

        await User.create(payload);
        console.log("🦸  Admin Created Successfuly! \n");

    } catch (error: any) {
        console.log(error);
    }
};