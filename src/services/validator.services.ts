import { apiResponse } from "@/utils/response"
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export function validate (req: Request, res: Response, next: NextFunction){
    const validateRes = validationResult(req)
    if(validateRes.isEmpty()){
        return next()
    }
    return res.status(422).json(
        apiResponse(null, false, validateRes)
    )
}