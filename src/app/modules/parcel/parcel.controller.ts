import { Request, Response } from "express";


import { createParcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { catchAsync } from "../../utils/catchAsync";



// CREATE PARCEL CONTROLLER
export const createParcel = catchAsync(async (req: Request, res: Response) => {

    const parcelData = req.body;
    parcelData.sender = req.user.userId;

    const result = await createParcelService(parcelData);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.CREATED,
        message: "Parcel created successfully.",
        data: result,
    });
});
