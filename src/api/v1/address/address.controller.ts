import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"
import { detailsAddressSchema, manageAddressUsingCustomerIdSchema, setCustomerActiveAddressSchema } from "./address.schema";
import { apiResponse } from "@/utils/response";
import { createCustomerAddress, deleteCustomerAddressById, getAddressByCustomerId, getAllAddressByCustomerId, getCustomerActiveAddress, getCustomerByActiveAddressId, setActiveAddressCustomer, updateCustomerAddressById } from "./address.queries";
import pool from "@/database/pool";
import { getCustomerWithAddress } from "../user/user.queries";
 
export default class AddressController {
    static async customerAddNewAddress(req: Request<ParamsDictionary, any, detailsAddressSchema>, res: Response){
        try {

        pool.query("BEGIN");
          const { street, village, sub_district, city, province } = req.body;
          const fullCustomerAddress = street + ", " +  village + ", " + sub_district +  ", " + city + ", " + province;
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

    static async updateCustomerAddressById(req: Request<ParamsDictionary, any, detailsAddressSchema>, res: Response){
        try {
            
            // provide agar integritas data alamat tetap terjaga
            const { street, village, sub_district, city, province } = req.body
            const fullUpdatedCustomerAddress = street + ", " +  village + ", " + sub_district +  ", " + city + ", " + province;

            pool.query("BEGIN");
              const geocodeApiResponse = await fetch(
                `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(fullUpdatedCustomerAddress)}&apiKey=${process.env.GEOCODE_SECRET_API_KEY}`
              );
              const geocodeData = await geocodeApiResponse.json();
              const customerAdrressCompleteGeocodeData = geocodeData.items[0];
    
              const customerUpdatedAddress = await updateCustomerAddressById.run({
                id: req.params.address_id,
                customer_id: req.body.payload.data,
                street: fullUpdatedCustomerAddress,
                latitude: customerAdrressCompleteGeocodeData.position.lat,
                longtitude: customerAdrressCompleteGeocodeData.position.lng,
              }, pool)
    
              pool.query("COMMIT");
    
              return res.status(200).json(
                apiResponse(customerUpdatedAddress, true, "Update customer address successfully")
              )
    
            } catch (error) {
                console.error(error);
                return res.status(500).json(
                    apiResponse(null, false, "Internal Server Error")
                )
            }
    }

    static async getAddressByCustomerId(req: Request<ParamsDictionary, any, manageAddressUsingCustomerIdSchema>, res: Response){
        try {
            const addressResult = await getAddressByCustomerId.run({
                id: req.params.address_id,
                customer_id: req.body.payload.data
            }, pool)
            return res.status(200).json(
                apiResponse(addressResult[0], true, "Get address by customer id Successfully Fetched")
            )
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    static async getAllAddressByCustomerId(req: Request<ParamsDictionary, any, manageAddressUsingCustomerIdSchema>, res: Response){
        try {
            const addressResult = await getAllAddressByCustomerId.run({
                customer_id: req.body.payload.data
            }, pool)
            return res.status(200).json(
                apiResponse(addressResult, true, "Get all address by Customer Successfully Fetched")
            )
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    static async setCustomerActiveAddress(req: Request<ParamsDictionary, any, setCustomerActiveAddressSchema>, res: Response){
        try {

            const setCustomerActiveAddress = await setActiveAddressCustomer.run({
                customer_id: req.body.payload.data,
                active_address_id: req.body.active_address_id
            }, pool)

            if(setCustomerActiveAddress.length === 0 || !setCustomerActiveAddress){
                return res.status(404).json(
                    apiResponse(null, false, "Address not found")
                )
            }

           const customerUpdatedActiveAddress = await getCustomerWithAddress.run({
            id: req.body.payload.data
           }, pool)
           
           console.log(customerUpdatedActiveAddress[0])

           return res.status(200).json(
            apiResponse(customerUpdatedActiveAddress[0], true, "Set customer active address success")
           )
            

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }

    }

    static async getCustomerActiveAddress(req: Request<ParamsDictionary, any, manageAddressUsingCustomerIdSchema>, res: Response){

        try {

            const customerActiveAddress = await getCustomerActiveAddress.run({
                customer_id: req.body.payload.data
            }, pool)
            
            if (!customerActiveAddress || customerActiveAddress.length === 0) {
                return res.status(404).json(
                    apiResponse(null, false, "Customer active address not found")
                )
            }

            return res.status(200).json(
                apiResponse(customerActiveAddress[0], true, "Customer active address fetched successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }

    }

}