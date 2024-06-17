import { Request, Response } from "express";
import { findUserByEmail, registerNewCustomer } from "./user.queries";
import pool from "@/database/pool";
import { ParamsDictionary } from "express-serve-static-core";
import { apiResponse } from "@/utils/response";
import { CustomerRegisterSchema } from "./user.schema";

export default class UserController {
  static async findUser(req: Request, res: Response) {
    try {
      const user = await findUserByEmail.run(
        {
          email: "juanfarrel0404@gmail.com",
        },
        pool
      );
      if (!user || user.length === 0) {
        return res.status(404).json(apiResponse(null, false, "User not found"));
      }

      return res.status(200).json(apiResponse(user, true, "User found"));
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(apiResponse(null, false, "Internal Server Error"));
    }
  }

  static async registerCustomer(
    req: Request<ParamsDictionary, any, CustomerRegisterSchema>,
    res: Response
  ) {
    try {
      const existedCustomer = await findUserByEmail.run(
        { email: req.body.email },
        pool
      );
      if (existedCustomer.length > 0) {
        return res
          .status(400)
          .json(apiResponse(null, false, "User already registered"));
      }

      const newCustomer = await registerNewCustomer.run(
        {
          customer: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            customer_password: req.body.customer_password,
          },
        },
        pool
      );

      return res.json(newCustomer);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(apiResponse(null, false, "Internal Server Error"));
    }
  }
}
