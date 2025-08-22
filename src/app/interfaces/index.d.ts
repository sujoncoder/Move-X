import { JwtPayload } from "jsonwebtoken";


// INJECT USER INTO REQUEST ===> EXPRESS
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        };
    };
};