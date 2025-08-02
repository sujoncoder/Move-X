import { z } from "zod";
import { ParcelType } from "../modules/parcel/parcel.interface";


// PARCEL ZOD FIELDS
export const receiverField = z
    .string({ error: "Receiver ID must be a string" })
    .min(1, { error: "Receiver ID cannot be empty" });

export const parcelTypeField = z.enum(
    [...Object.values(ParcelType)] as [ParcelType, ...ParcelType[]],
    { error: "Parcel type must be one of the allowed types" }
);

export const weightField = z
    .number({ error: "Weight must be a number" })
    .positive({ error: "Weight must be a positive number" });

export const feeField = z
    .number({ error: "Fee must be a number" })
    .nonnegative({ error: "Fee cannot be negative" });

export const deliveryAddressField = z
    .string({ error: "Delivery address must be a string" })
    .min(5, { error: "Delivery address must be at least 5 characters long" });