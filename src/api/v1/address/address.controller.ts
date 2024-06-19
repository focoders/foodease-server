import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"
import { detailsAddressSchema, manageAddressUsingCustomerIdSchema } from "./address.schema";
import { apiResponse } from "@/utils/response";
import { createCustomerAddress, deleteCustomerAddressById } from "./address.queries";
import pool from "@/database/pool";
 
export default class AddressController {
    static async customerAddNewAddress(req: Request<ParamsDictionary, any, detailsAddressSchema>, res: Response){
        try {

        pool.query("BEGIN");
          const { street, village, sub_district, city, province } = req.body;
          const fullCustomerAddress = street + " " +  village + " " + sub_district +  " " + city + " " + province;
          const geocodeApiResponse = await fetch(
            `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(fullCustomerAddress)}&apiKey=${process.env.GEOCODE_SECRET_API_KEY}`
          );
          const geocodeData = await geocodeApiResponse.json();
          const customerAdrressCompleteGeocodeData = geocodeData.items[0];

          const customerNewAddress = await createCustomerAddress.run({
            street: fullCustomerAddress,
            latitude: customerAdrressCompleteGeocodeData.position.lat,
            longtitude: customerAdrressCompleteGeocodeData.position.lng,
            customer_id: req.body.payload.data
          }, pool)

          pool.query("COMMIT");

          return res.status(200).json(
            apiResponse(customerNewAddress, true, "Added new customer address successfully")
          )

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    static async deleteCustomerAddressById(req: Request<ParamsDictionary, any, manageAddressUsingCustomerIdSchema>, res: Response){
        try {
            const deletedCustomerAddress = await deleteCustomerAddressById.run({
                id: req.params.address_id,
                customer_id: req.body.payload.data
            }, pool)

            return res.status(200).json(
                apiResponse(deletedCustomerAddress, true, "Customer Address Deleted successfully")
            )

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

}