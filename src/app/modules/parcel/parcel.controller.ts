import { Request, Response } from "express";

import { cancelParcelService, confirmDeliveredService, createParcelService, getAllParcelsService, getMyParcelService, getParcelStatusLogService, getReceiverParcelService, parcelStatusUpdateService } from "./parcel.service";
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


// GET MY PARCEL CONTROLLER
export const getMyParcel = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;

    const myParcel = await getMyParcelService(userId);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: !myParcel || myParcel.length === 0 ? "You have no parcel." : "Retrived parcels successfully.",
        meta: {
            total: myParcel.length
        },
        data: myParcel
    });
});


// CANCEL PARCEL CONTROLLER
export const cancelParcel = catchAsync(async (req: Request, res: Response) => {
    const parcelId = req.params.id;
    const userId = req.user.userId;

    const result = await cancelParcelService(parcelId, userId);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: 'Parcel cancelled successfully.',
        data: result,
    });
});


// PARCEL STATUS CHANGE CONTROLLER
export const parcelStatusChange = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, location } = req.body;

    const result = await parcelStatusUpdateService(id, status, location);

    res.status(200).json({
        success: true,
        message: 'Parcel status updated successfully',
        data: result,
    });
});


// GET PARCEL STATUS-LOG CONTROLLER
export const getParcelStatusLog = async (req: Request, res: Response) => {
    const parcelId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const statusLog = await getParcelStatusLogService(parcelId, userId, userRole);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel status log retrieved successfully.',
        data: statusLog,
    });
};


// RECEIVER CONFIRM DELIVERY CONTROLLER
export const confirmDelivered = async (req: Request, res: Response) => {
    const parcelId = req.params.id;
    const receiverId = req.user.userId;

    const result = await confirmDeliveredService(parcelId, receiverId);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Parcel delivery confirmed successfully.",
        data: result,
    });
};


// GET ALL PARCELS CONTROLLER
export const getAllParcels = catchAsync(
    async (req: Request, res: Response) => {
        const parcels = await getAllParcelsService(req.query);

        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Parcels retrieved successfully!',
            data: parcels,
        });
    }
);


// SENDER PARCEL HISTORY CONTROLLER
export const getReceiverParcel = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;

    const myParcel = await getReceiverParcelService(userId);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: !myParcel || myParcel.length === 0 ? "You have no parcel." : "Retrived parcels successfully.",
        meta: {
            total: myParcel.length
        },
        data: myParcel
    });
});