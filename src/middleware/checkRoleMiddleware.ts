import {NextFunction, Response} from "express";
import * as jwt from "jsonwebtoken";

export function checkRole(role:string) {
    return function (req:any, res:Response,next:NextFunction) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return  res.status(401).json({message:"Пользователь не авторизован"})
            }
            const decoded:any = jwt.verify(token, process.env.SECRET_KEY as string)
            if(decoded.role !== role) {
                return  res.status(403).json({message:"Нет доступа"})
            }
            req.user = decoded
            next()
        }catch (e) {
            res.status(401).json({message:"Пользователь не авторизован!!!"})
        }
    }

}


