import { Types } from "mongoose";


// PARCEL TYPE ENUM
export enum ParcelType {
    DOCUMENT = "DOCUMENT",
    ELECTRONICS = "ELECTRONICS",
    CLOTHING = "CLOTHING",
    FOOD = "FOOD",
    FRAGILE = "FRAGILE",
    HEAVY = "HEAVY",
    MEDICINE = "MEDICINE",
    GENERAL = "GENERAL",
};

// PARCEL STATUS ENUM
export enum ParcelStatus {
    REQUESTED = "REQUESTED",
    APPROVED = "APPROVED",
    DISPATCHED = "DISPATCHED",
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
    deliveryDate: Date,
    currentStatus?: ParcelStatus;
    trackingEvents?: ITrackingEvent[];
    isBlocked?: boolean;
};