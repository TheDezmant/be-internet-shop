import ApiError from "../errors/  ApiError"
import {Response, Request, NextFunction} from "express"

export function ErrorHandler (err:any,req:Request,res:Response,next:NextFunction) {
    if(err instanceof ApiError){
      return   res.status(err.status).json({message:err.message})
    }
    return res.status(500).json({message:"Непредвиденная ошибка!"})
}