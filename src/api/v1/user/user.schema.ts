import { IGetCustomerWithAddressResult } from "./user.queries";

export type CustomerRegisterSchema = {
    email: string;
    first_name: string;
    last_name: string;
    customer_password: string;
    confirm_password: string;
}

export type CustomerLoginSchema = {
    email: string;
    customer_password: string;
}

export function convertCustomerResponse(customer: IGetCustomerWithAddressResult){
    return {
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        active_address: customer.address_id ? {
            id: customer.address_id,
            street: customer.address_street,
            coordinates: customer.address_coordinates,
            created_at: customer.address_created_at,
            updated_at: customer.address_updated_at
        } : null,
        created_at: customer.created_at,
        updated_at: customer.updated_at
    }
}