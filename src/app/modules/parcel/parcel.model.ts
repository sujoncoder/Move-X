import { Schema, model } from "mongoose";

import { generateTrackingId } from "../../utils/generateTrackingId";

import { type IParcel, ParcelStatus, ParcelType } from "./parcel.interface";



// EMBEDED SCHEMA
const trackingEventSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
            enum: Object.values(ParcelStatus),
            default: ParcelStatus.REQUESTED
        },
        location: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);


// PARCEL SCHEMA
const parcelSchema = new Schema<IParcel>(
    {
        trackingId: {
            type: String,
            unique: true,
            required: true,
            default: generateTrackingId()
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parcelType: {
            type: String,
            enum: Object.values(ParcelType),
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        fee: {
            type: Number,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        currentStatus: {
            type: String,
            enum: Object.values(ParcelStatus),
            default: ParcelStatus.REQUESTED,
            uppercase: true
        },
        trackingEvents: {
            type: [trackingEventSchema],
            default: [],
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Parcel = model<IParcel>("Parcel", parcelSchema);