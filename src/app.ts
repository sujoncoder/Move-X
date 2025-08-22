import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./app/routes";
import { SECRET } from "./app/config/env";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


const app: Application = express();

// APPLICATION LEVEL MIDDLEWARES
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: SECRET.FRONTEND_URL,
    credentials: true
}));


// APPLICATION ROUTE MIDDLEWARE
app.use("/api/v1", router);


// APPLICATION ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Welcome To Move-X API Server 🚀"
    });
});


// NOT-FOUND ROUTE
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;