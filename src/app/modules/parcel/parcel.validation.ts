import z from "zod";

import { deliveryAddressField, feeField, parcelTypeField, receiverField, weightField } from "../../zod/parcel.zod";

// CREATE PARCEL ZOD SCHEMA
export const createParcelZodSchema = z.object({
    body: z.object({
        receiver: receiverField,
        parcelType: parcelTypeField,
        weight: weightField,
        fee: feeField,
        deliveryAddress: deliveryAddressField,
    }),
});