import { Request, Response } from "express";

import { STATUS_CODE } from "../constants/httpStatus";


// NOT-ROUTE MATCH MIDDLEWARE
const notFound = (req: Request, res: Response) => {
    res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: `🔍 Route ${req.originalUrl} not found on Move-X server.`,
    });
};

export default notFound;