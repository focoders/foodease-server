import { Request, Response } from "express";
import { findUserByEmail } from "./user.queries";
import pool from "@/database/pool";
import { apiResponse } from "@/api/utils/response";

export default class UserController {
    static async findUser(req: Request, res: Response){

        try {

            const user = await findUserByEmail.run({
                email: 'juanfarrel0404@gmail.com'
            }, pool)
            if(!user || user.length === 0){
                return res.status(404).json(
                    apiResponse(null, false, "User not found")
                )
            }
    
            return res.status(200).json(
                apiResponse(user, true, "User found")
            )
            
        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }

    }
}