/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/parcel/parcel.service.ts
import { Parcel } from "./parcel.model";
import { IParcel, ParcelStatus } from "./parcel.interface";

import { generateTrackingId } from "../../utils/generateTrackingId";
import { ApiError } from "../../errors/ApiError";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { addTrackingEvent } from "../../utils/addTrackingEvent";


// CREATE PARCEL SERVICE
export const createParcelService = async (payload: IParcel) => {
    let trackingId = "";

    while (true) {
        trackingId = generateTrackingId();
        const exists = await Parcel.findOne({ trackingId });
        if (!exists) break;
    }

    payload.trackingId = trackingId;

    const result = await Parcel.create(payload);
    return result;
};


// GET PARCEL SERVICE
export const getMyParcelService = async (userId: string) => {
    const parcels = await Parcel.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    });

    return parcels;
};


// GET RECEIVER PARCEL SERVICE
export const getReceiverParcelService = async (userId: string) => {
    const parcels = await Parcel.find({
        receiver: userId
    });

    return parcels;
};


// CANCEL PARCEL SERVICE
export const cancelParcelService = async (parcelId: string, userId: string) => {
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Parcel not found.');
    }

    if (parcel.sender.toString() !== userId) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You can only cancel your own parcels.');
    }

    if (parcel.currentStatus === ParcelStatus.CANCELLED) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Parcel is already cancelled.');
    }

    if (parcel.currentStatus !== ParcelStatus.REQUESTED) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Only requested parcels can be cancelled.');
    }

    parcel.currentStatus = ParcelStatus.CANCELLED;
    await parcel.save();

    return parcel;
};


// PARCEL STATUS CHANGE SERVICE
export const parcelStatusUpdateService = async (
    parcelId: string,
    newStatus: ParcelStatus,
    location: string
) => {
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Parcel not found');
    };

    if (
        parcel.currentStatus === ParcelStatus.DELIVERED ||
        parcel.currentStatus === ParcelStatus.CANCELLED
    ) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            'Admin cannot change status of a delivered or cancelled parcel.'
        );
    };

    parcel.currentStatus = newStatus;

    addTrackingEvent(parcel, newStatus, location);

    await parcel.save();

    return parcel;
};


// GET PARCEL STATUS LOG SERVICE
export const getParcelStatusLogService = async (parcelId: string, userId: string, userRole: string) => {
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Parcel not found.');
    };

    const userRoleLower = userRole.toLowerCase();
    const isAdmin = userRoleLower === 'admin';
    const isSender = parcel.sender.toString() === userId;
    const isReceiver = parcel.receiver.toString() === userId;

    if (!isSender && !isReceiver && !isAdmin) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You are not authorized to view this parcel’s status log.');
    };

    return parcel.trackingEvents;
};


// CONFIRM DELIVERED SERVICE
export const confirmDeliveredService = async (
    parcelId: string,
    receiverId: string
) => {
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Parcel not found.");
    }

    if (parcel.receiver.toString() !== receiverId) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Only the receiver can confirm delivery."
        );
    };


    if (
        parcel.currentStatus === ParcelStatus.DELIVERED ||
        parcel.currentStatus === ParcelStatus.CANCELLED
    ) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Cannot confirm a parcel that is already delivered or cancelled."
        );
    };

    parcel.currentStatus = ParcelStatus.DELIVERED;

    // Add tracking event
    addTrackingEvent(parcel, ParcelStatus.DELIVERED, "Delivered to receiver");

    await parcel.save();
    return parcel;
};



// GET ALL PARCEL SERVICE
interface IParcelQuery {
    status?: string;
    sender?: string;
    receiver?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
};

export const getAllParcelsService = async (query: IParcelQuery) => {
    const { status, sender, receiver, sortBy, limit = 10, page = 1 } = query;

    const filters: any = {};

    if (status) filters.currentStatus = status;
    if (sender) filters.sender = sender;
    if (receiver) filters.receiver = receiver;

    const skip = (page - 1) * limit;

    const parcels = await Parcel.find(filters)
        .sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Parcel.countDocuments(filters);

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: parcels,
    };
};