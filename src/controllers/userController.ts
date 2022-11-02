import {Response,Request,NextFunction} from "express"
import bcrypt from "bcrypt"
import {PrismaClient} from "@prisma/client"
import ApiError from '../errors/  ApiError'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const prisma = new PrismaClient()

const generateJwt = (id:number, email:string, role:string) => {
   return  jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY as string,
        {expiresIn:"24h"}
    )
}

class userController {
    async registration(req:Request,res:Response, next:NextFunction) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или password"))
        }
        const candidate = await prisma.user.findUnique({where:{email}})
        if(candidate) {
            next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({
            data:{email, password:hashPassword, role}
        })
        await prisma.basket.create({data:{userId: user.id}})
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async login(req:Request,res:Response,next:NextFunction) {
        const {email,password} = req.body
        const user = await prisma.user.findUnique({where:{email}})
        if(!user){
           return  next(ApiError.internal("Пользователь с таким email не существет"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
           return  next(ApiError.internal("Неправильный email или password"))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return  res.json({token})
    }
    async check(req:any,res:Response,next: NextFunction) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return  res.json({token})
    }
}

export default new userController()