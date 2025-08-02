import z from "zod";

import { deliveryAddressField, feeField, parcelTypeField, receiverField, weightField } from "../../zod/parcelZod";

// CREATE PARCEL ZOD SCHEMA
export const createParcelZodSchema = z.object({
    receiver: receiverField,
    parcelType: parcelTypeField,
    weight: weightField,
    fee: feeField,
    deliveryAddress: deliveryAddressField,
});