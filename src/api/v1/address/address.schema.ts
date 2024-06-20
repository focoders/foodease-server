export type detailsAddressSchema = {
    street: string;
    village: string;
    sub_district: string;
    city: string;
    province: string,
    payload: {
        data: string;
    }
}

export type manageAddressUsingCustomerIdSchema= {
    payload: {
        data: string;
    }
}

export type updateCustomerAddressByIdSchema = { 
    street: string;
    payload: {
        data: string;
    }
}

export type setCustomerActiveAddressSchema = { 
    active_address_id: string;
    payload: {
        data: string;
    }
}