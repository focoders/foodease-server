export type CustomerRegisterSchema = {
    email: string;
    first_name: string;
    last_name: string;
    customer_password: string;
    confirm_password: string;
}


export function convertCustomerResponse(customer: any){
    return {
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        active_address: null,
    }
}