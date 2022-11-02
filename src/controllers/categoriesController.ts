import {Response,Request, NextFunction} from "express"
import {PrismaClient} from "@prisma/client"
import ApiError from '../errors/  ApiError'
import * as url from "url";


const prisma = new PrismaClient()

class CategoriesController{
  async getAllById(req:Request,res:Response, next:NextFunction) {
    try {
      const urlParams = url.parse(req.url, true).query.parentId
      const categories = await prisma.categories.findMany({
        where:{parentId: Number(urlParams)}
      })
      return res.json(categories)
    } catch (e:any) {
      next(ApiError.badRequest(e.message))
    }

  }
  async create(req:Request,res:Response,next:NextFunction) {
    const {name, parentId} = req.body
    if(name) {
      const newCategories = await prisma.categories.create({
        data:{parentId,name}
      })
      return res.json(newCategories)
    } else  {
      return next(ApiError.badRequest("Не задано поле name"))
    }
  }
}

export default new CategoriesController()