import { ParcelStatus } from '../modules/parcel/parcel.interface';
import { IParcel } from '../modules/parcel/parcel.interface';

export const addTrackingEvent = (
    parcel: IParcel,
    status: ParcelStatus,
    location: string
) => {
    parcel.trackingEvents?.push({
        status,
        location,
        timestamp: new Date(),
    });
};