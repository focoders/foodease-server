import { IFindStoreByIdResult } from "./store.queries";

export type StoreRegisterSchema = {
    email: string;
    store_name: string;
    description: string;
    store_password: string;
    free_time: string;
    address: {
        street: string;
        village: string;
        sub_district: string;
        city: string;
        province: string
    }
}

export type StoreLoginSchema = {
    email: string;
    store_password: string;
}

export function convertCompleteDataStoreResponse(store: IFindStoreByIdResult){
    return {
        email: store.email,
        store_name: store.store_name,
        description: store.description,
        address: {
            street: store.address_street,
            latitude: store.address_latitude,
            longtitude: store.address_longitude,
            created_at: store.address_created_at,
            updated_at: store.adress_updated_at
        },
        free_time: store.free_time,
        created_at: store.created_at,
        updated_at: store.updated_at
    }
}