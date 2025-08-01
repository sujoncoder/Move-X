// src/modules/parcel/parcel.service.ts

import { Parcel } from "./parcel.model";
import { IParcel } from "./parcel.interface";


// CREATE PARCEL SERVICE
export const createParcelService = async (payload: IParcel) => {
    const result = await Parcel.create(payload);

    return result;
};