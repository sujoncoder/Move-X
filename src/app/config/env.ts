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
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
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
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRES",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD"
    ];

    requiredKeys.forEach((key) => {
        if (!process.env[key]) {
            console.error(`❌ Missing environment variable: ${key}`);
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
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
    };
};

export const SECRET = getValidatedEnv();