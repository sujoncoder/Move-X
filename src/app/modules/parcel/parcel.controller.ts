import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import { cancelParcelService, confirmDeliveredService, createParcelService, getAllParcelsService, getMyParcelService, getParcelStatusLogService, getReceiverParcelService, getSingleParcelService, parcelStatusUpdateService } from "./parcel.service";
import { ApiError } from "../../errors/ApiError";



// ------------------------- SENDER CONTROLLER ---------------------------- //


// CREATE NEW PARCEL CONTROLLER - (SENDER)
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


// GET MY PARCEL CONTROLLER - (SENDER, RECEIVER)
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


// CANCEL PARCEL CONTROLLER - (SENDER)
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


// ------------------------- RECEIVER CONTROLLER ---------------------------- //


// RECEIVER CONFIRM DELIVERY CONTROLLER - (RECEIVER)
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


// PARCEL HISTORY CONTROLLER - (RECEIVER)
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


// ------------------------- ADMIN CONTROLLER ---------------------------- //


// GET ALL PARCELS CONTROLLER - (ADMIN)
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


// UPDATE PARCEL STATUS CONTROLLER - (ADMIN)
export const parcelStatusChange = catchAsync(async (req: Request, res: Response) => {

    const parcelId = req.params.id;
    const { status, location } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    };

    if (!location) {
        throw new ApiError(400, "Location is required");
    };

    const updatedParcel = await parcelStatusUpdateService(
        parcelId,
        req.user.role,
        status,
        location
    );

    res.status(200).json({
        success: true,
        message: 'Parcel status updated successfully',
        data: updatedParcel,
    });
});


// GET SINGLE PARCEL CONTROLLER - (ADMIN, SENDER, RECEIVER)
export const getSingleParcel = catchAsync(
    async (req: Request, res: Response) => {
        const { id: parcelId } = req.params;

        const userId = req.user?.userId;
        const userRole = req.user?.role;

        const result = await getSingleParcelService(parcelId, userId, userRole);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Parcel fetched successfully!',
            data: result,
        });
    }
);


// GET PARCEL STATUS-LOG HISTORY CONTROLLER - (ADMIN, SENDER, RECEIVER)
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