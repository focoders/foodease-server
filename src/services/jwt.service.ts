import jwt from "jsonwebtoken"

export function generateAuthToken(data: string){
    const secret = process.env.JWT_AUTH_SECRET_KEY
    if(!secret){
        throw new Error("JWT secret key is required")
    }
    return jwt.sign({data}, secret, { expiresIn: '1d'})
}