import { Request, Response } from "express";
import { findCustomerByEmail, findCustomerById, registerNewCustomer } from "./user.queries";
import pool from "@/database/pool";
import { ParamsDictionary } from "express-serve-static-core";
import { apiResponse } from "@/utils/response";
import { convertCustomerResponse, CustomerRegisterSchema } from "./user.schema";
import { hashPassword } from "@/services/crypto.service";

export default class UserController {
  static async registerCustomer(
    req: Request<ParamsDictionary, any, CustomerRegisterSchema>,
    res: Response
  ) {
    try {
      const existedCustomer = await findCustomerByEmail.run(
        { email: req.body.email },
        pool
      );
      if (existedCustomer.length > 0) {
        return res
          .status(400)
          .json(apiResponse(null, false, "User already registered"));
      }
      
      const hashedPassword = await hashPassword(req.body.customer_password);
      
      const newCustomer = await registerNewCustomer.run(
        {
          customer: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            customer_password: hashedPassword,
          },
        },
        pool
      );
      
      const customerFullData = await findCustomerById.run({
        id: newCustomer[0].id
      }, pool)

      return res
        .status(200)
        .json(
          apiResponse(
            customerFullData,
            true,
            "Customer registration completed"
          )
        );

    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(apiResponse(null, false, "Internal Server Error"));
    }
  }
}
