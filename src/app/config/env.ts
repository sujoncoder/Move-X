/* eslint-disable no-console */
import chalk from "chalk";
import dotenv from "dotenv";


// CONFIG DOT-ENV
dotenv.config();

interface IEnvType {
    PORT: string;
    DB_URI: string;
    NODE_ENV: "development" | "production";
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
};

// GET VALIDATED ENV FUNCTION
const getValidatedEnv = (): IEnvType => {

    const requiredKeys: string[] = [
        "PORT",
        "DB_URI",
        "NODE_ENV",
        "BCRYPT_SALT_ROUND",
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRES",
    ];

    requiredKeys.forEach((key) => {
        if (!process.env[key]) {
            console.error(chalk.redBright(`❌ Missing environment variable: ${key}`));
            process.exit(1);
        };
    });

    return {
        PORT: process.env.PORT as string,
        DB_URI: process.env.DB_URI as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    };
};

export const SECRET = getValidatedEnv();