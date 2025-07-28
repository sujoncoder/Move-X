import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";


const app: Application = express();

// APPLICATION LEVEL MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// APPLICATION ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Welcome To Move-X API Server 🚀"
    });
});


// NOT-FOUND ROUTE
app.use(notFound);


export default app;