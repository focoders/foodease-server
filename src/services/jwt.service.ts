import { apiResponse } from "@/utils/response"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function generateAuthToken(data: string){
    const secret = process.env.JWT_AUTH_SECRET_KEY
    if(!secret){
        throw new Error("JWT secret key is required")
    }
    return jwt.sign({data}, secret, { expiresIn: '1d'})
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction){
    const secret_key = process.env.JWT_AUTH_SECRET_KEY
    if(!secret_key){
        throw new Error("Invalid secret key")
    }

    const authorization = req.headers.authorization
    const type = authorization?.split(" ")[0]
    if(authorization == undefined || authorization == null || type != "Bearer"){
        throw new Error("Invalid authorization")
    }
    const token = authorization.split(" ")[1]
    
    try {
        const decodedToken = jwt.verify(token, secret_key)
        req.body.payload = decodedToken
        return next();
    } catch (error) {
        console.error(error)
        return res.status(401).json(
            apiResponse(null, false, "Unauthorized")
        )
    }
}