import { Request, Response } from "express";
import { findCustomerByEmail, getCustomerWithAddress, registerNewCustomer } from "./user.queries";
import pool from "@/database/pool";
import { ParamsDictionary } from "express-serve-static-core";
import { apiResponse } from "@/utils/response";
import { convertCustomerResponse, CustomerLoginSchema, CustomerRegisterSchema } from "./user.schema";
import { comparePassword, hashPassword } from "@/services/crypto.service";
import { generateAuthToken } from "@/services/jwt.service";

export default class UserController {
  static async registerCustomer(req: Request<ParamsDictionary, any, CustomerRegisterSchema>, res: Response) {
    try {
      const existedCustomer = await findCustomerByEmail.run(
        { email: req.body.email },
        pool
      );
      if (existedCustomer.length > 0) {
        return res.status(400).json(apiResponse(null, false, "User already registered"));
      }
      
      const hashedPassword = await hashPassword(req.body.customer_password);
      
      const newCustomer = await registerNewCustomer.run({
          customer: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            customer_password: hashedPassword,
          },
        }, pool);

      const customerCompleteData = await getCustomerWithAddress.run({ id: newCustomer[0].id }, pool)
      return res.status(200).json(
        apiResponse(convertCustomerResponse(customerCompleteData[0]), true, "Customer registration completed")
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(apiResponse(null, false, "Internal Server Error"));
    }
  }

  static async loginCustomer( req: Request<ParamsDictionary, any, CustomerLoginSchema>,res: Response){
    try {
      const customerReqLogin = await findCustomerByEmail.run({
        email: req.body.email
      }, pool)

      if(customerReqLogin.length === 0 || !customerReqLogin){
        return res.status(401).json(
          apiResponse(null, false, "Email or password is wrong")
        )
      }

      const hashedPassword = customerReqLogin[0].customer_password
      const passwordCheckFlags = await comparePassword(req.body.customer_password, hashedPassword)

      if(passwordCheckFlags === false){
        return res.status(401).json(
          apiResponse(null, false, "Email or password is wrong")
        )
      }

      const customerCompleteData = await getCustomerWithAddress.run({id: customerReqLogin[0].id}, pool)
      const authToken = generateAuthToken(customerReqLogin[0].id)

      return res.status(200).json(
        apiResponse({
          customer: customerCompleteData[0],
          authorization: authToken
        }, true, "Customer successfully logged in")
      );

    } catch (error) {
      console.error(error);
      return res.status(500).json(
        apiResponse(null, false, "Internal Server Error")
      )
    }
  }

  static async getCurentCustomer(req: Request, res: Response){
    try {
      const currentCustomer = await getCustomerWithAddress.run({ id: req.body.payload.data }, pool)

      if(!currentCustomer || currentCustomer.length === 0){
        return res.status(404).json(
          apiResponse(null, false, "Customer not found")
        )
      }
      return res.status(200).json(
        apiResponse(convertCustomerResponse(currentCustomer[0]), true, "Get Current User Success")
      )
    } catch (error) {
      console.error(error)
      return res.status(500).json(
        apiResponse(null, false, "Internal Server Error")
      )
    }
  }
}
