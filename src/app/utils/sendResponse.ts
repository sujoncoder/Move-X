import type { Response } from "express";



interface TMeta {
    total: number
};

interface TResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: TMeta
    data: T;
};


// SEND RESPONSE UTILES FILE ALTERNATIVE TO ===> RES.SEND
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {

    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data
    });
};