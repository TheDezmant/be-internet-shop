import { Response,Request, NextFunction} from "express"


export function corsMiddleware (req:Request, res:Response,next:NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    next()
}