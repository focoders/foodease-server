import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { apiResponse } from "@/utils/response";
import { comparePassword, hashPassword } from "@/services/crypto.service";
import pool from "@/database/pool";
import { convertCompleteDataStoreResponse, StoreLoginSchema, StoreRegisterSchema } from "./store.schema";
import { findStoreByEmail, findStoreById, registerNewStore } from "./store.queries";
import { createStoreAddress } from "../address/address.queries";
import { generateAuthToken } from "@/services/jwt.service";

export default class StoreController {
  static async registerStore(
    req: Request<ParamsDictionary, any, StoreRegisterSchema>,
    res: Response
  ) {
    try {
      const existedStore = await findStoreByEmail.run(
        {
          email: req.body.email,
        },
        pool
      );
      if (existedStore.length > 0) {
        return res
          .status(400)
          .json(apiResponse(null, false, "Store already registered"));
      }
      
      pool.query("BEGIN");

      const { street, village, sub_district, city, province } =
        req.body.address;
      const fullStoreAddress = street + ", " +  village + ", " + sub_district +  ", " + city + ", " + province;
      const geocodeApiResponse = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
          fullStoreAddress
        )}&apiKey=${process.env.GEOCODE_SECRET_API_KEY}`
      );
      const geocodeData = await geocodeApiResponse.json();
      const storeAdrressCompleteGeocodeData = geocodeData.items[0];

      const newAddress = await createStoreAddress.run(
        {
          street: fullStoreAddress,
          latitude: storeAdrressCompleteGeocodeData.position.lat,
          longtitude: storeAdrressCompleteGeocodeData.position.lng,
        },
        pool
      );

      const hashedPassword = await hashPassword(req.body.store_password);

      const newStore = await registerNewStore.run({
          store: {
            email: req.body.email,
            store_name: req.body.store_name,
            description: req.body.description,
            store_password: hashedPassword,
            address_id: newAddress[0].id,
            free_time: req.body.free_time,
          }
        },
        pool
      );

      pool.query("COMMIT");

      const completeDataStoreRegistered  = await findStoreById.run({ id: newStore[0].id }, pool)

      return res.status(200).json(
        apiResponse(convertCompleteDataStoreResponse(completeDataStoreRegistered[0]), true, "Store registered successfully")
      )

    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(apiResponse(null, false, "Internal Server Error"));
    }
  }

  static async loginStore(req: Request<ParamsDictionary, any, StoreLoginSchema>,res: Response) {
    try {
        const storeReqLogin = await findStoreByEmail.run({
          email: req.body.email
        }, pool)
  
        if(storeReqLogin.length === 0 || !storeReqLogin){
          return res.status(401).json(
            apiResponse(null, false, "Email or password is wrong")
          )
        }
  
        const hashedPassword = storeReqLogin[0].store_password
        const passwordCheckFlags = await comparePassword(req.body.store_password, hashedPassword)
  
        if(passwordCheckFlags === false){
          return res.status(401).json(
            apiResponse(null, false, "Email or password is wrong")
          )
        }
  
        const storeCompleteData = await findStoreById.run({id: storeReqLogin[0].id}, pool)
        const authToken = generateAuthToken(storeReqLogin[0].id)
  
        return res.status(200).json(
          apiResponse({
            store: storeCompleteData[0],
            authorization: authToken
          }, true, "Store successfully logged in")
        );
  
      } catch (error) {
        console.error(error);
        return res.status(500).json(
          apiResponse(null, false, "Internal Server Error")
        )
      }
  }

  static async getCurrentStore(req: Request, res: Response) {
    try {
        const currentStore = await findStoreById.run({ id: req.body.payload.data }, pool)
  
        if(!currentStore || currentStore.length === 0){
          return res.status(404).json(
            apiResponse(null, false, "Store not found")
          )
        }
        return res.status(200).json(
          apiResponse(convertCompleteDataStoreResponse(currentStore[0]), true, "Get Current Store Success")
        )
      } catch (error) {
        console.error(error)
        return res.status(500).json(
          apiResponse(null, false, "Internal Server Error")
        )
      }
    }
}

