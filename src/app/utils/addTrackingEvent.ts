import type { IParcel } from '../modules/parcel/parcel.interface';
import { ParcelStatus } from '../modules/parcel/parcel.interface';


// ADD TRACKING EVENT FUNCTION
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