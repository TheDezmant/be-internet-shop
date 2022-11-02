import { Response, NextFunction} from "express"
import * as jwt from "jsonwebtoken"



export function authMiddleware (req:any, res:Response,next:NextFunction) {

    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
           return  res.status(401).json({message:"Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        req.user = decoded
        next()
    }catch (e) {
        res.status(401).json({message:"Пользователь не авторизован"})
    }
}