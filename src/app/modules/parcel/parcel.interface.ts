import { Types } from "mongoose";


// PARCEL TYPE ENUM
export enum ParcelType {
    DOCUMENT = "DOCUMENT",
    BOX = "BOX",
    FRAGILE = "FRAGILE",
    OTHER = "OTHER",
};

// PARCEL STATUS ENUM
export enum ParcelStatus {
    REQUESTED = "REQUESTED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
};

// TYPE TRACKING EVENT
export interface ITrackingEvent {
    status: ParcelStatus;
    location: string;
    timestamp?: Date;
};

// PARCEL TYPE
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