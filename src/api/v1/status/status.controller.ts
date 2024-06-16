import { Request, Response } from "express";
import pool from "@/database/pool";
import { apiResponse } from "@/api/utils/response";

export default class StatusController {
    static nodeServerStatusCheck (_:Request, res:Response){
        return res.status(200).json(
            apiResponse(null, true, 'Server status is normal and server is running')
        )
    }
    
    static async databaseStatusCheck (_:Request, res:Response){
        try {   
            await pool.query("SELECT NOW()");
            return res.status(200).json(
                apiResponse(null, true, 'Database is up and running')
            )
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(null, false, "Database is down")
            );
        }
    }

}
