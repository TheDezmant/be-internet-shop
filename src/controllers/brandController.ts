import {Response,Request, NextFunction} from "express"
import {PrismaClient} from "@prisma/client"
import ApiError from '../errors/  ApiError'

const prisma = new PrismaClient()

class BrandController {
    async getAll(req:Request,res:Response) {
        const brands = await prisma.brand.findMany()
        return res.json(brands)
    }
    async create(req:Request,res:Response,next:NextFunction) {
        const {name} = req.body
        if(name) {
            const newBrand = await prisma.brand.create({
                data:{name}
            })
            return res.json(newBrand)
        } else  {
            return next(ApiError.badRequest("Не задано поле name"))
        }
    }
}

export default new BrandController()