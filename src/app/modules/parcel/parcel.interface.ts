import { Types } from "mongoose";


export enum ParcelType {
    DOCUMENT = "DOCUMENT",
    BOX = "BOX",
    FRAGILE = "FRAGILE",
    OTHER = "OTHER",
};

export enum ParcelStatus {
    REQUESTED = "REQUESTED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
};

export interface ITrackingEvent {
    status: ParcelStatus;
    location: string;
    timestamp?: Date;
};

export interface IParcel {
    trackingId?: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    parcelType: ParcelType;
    weight: number;
    fee: number;
    deliveryAddress: string;
    currentStatus?: ParcelStatus;
    trackingEvents?: ITrackingEvent[];
    isBlocked?: boolean;
};