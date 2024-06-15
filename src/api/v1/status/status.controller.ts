import { Request, Response } from "express";
import pool from "@/database/pool";

export default class StatusController {
    static nodeServerStatusCheck (_:Request, res:Response){
        return res.status(200).json("Server is up and running")
    }
    
    static async databaseStatusCheck (_:Request, res:Response){
        try {
            const tes = await pool.query("SELECT NOW()");
            return res.status(200).json(tes)
        } catch (error) {
            console.error(error);
            return res.status(500).json("Database is down");
        }
    }

}
