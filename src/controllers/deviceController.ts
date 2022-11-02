import {Response,Request, NextFunction} from "express"
import {PrismaClient} from "@prisma/client"
import ApiError from '../errors/  ApiError'
import * as uuid from "uuid"
import path from "path";


const prisma = new PrismaClient()

class DeviceController {
    async getAll(req:Request,res:Response) {
        let {brandId, categoriesId, skip=0, take=10} = req.query
        let devices;
        if(!brandId && !categoriesId) {
          devices = await prisma.device.findMany({
              skip: Number(skip),
              take: Number(take)
          })
        }
        if(brandId && !categoriesId) {
            devices = await prisma.device.findMany({
                skip: Number(skip),
                take: Number(take),
                where:{
                    brandId:Number(brandId)
                }
            })
        }
        if(!brandId && categoriesId) {
            devices = await prisma.device.findMany({
                skip: Number(skip),
                take: Number(take),
                where:{
                    categoriesId:Number(categoriesId)
                }
            })
        }
        if(brandId && categoriesId) {
            devices = await prisma.device.findMany({
                skip: Number(skip),
                take: Number(take),
                where:{
                    categoriesId:Number(categoriesId),
                    brandId:Number(brandId)
                }
            })
        }
        res.json(devices)
    }
    async getOne(req:Request,res:Response) {
        const {id} = req.params
        const device = await prisma.device.findUnique({
            where: {
                id:Number(id)
            }
        })
        return res.json(device)
    }
    async create(req:Request,res:Response, next:NextFunction) {
        try{
            const {name, price, brandId,description,categoriesId} = req.body
            const {img}:any = req.files
            const images = []
            if(Array.isArray(img)) {
              img.forEach((el:any)=> {
                 let fileName = uuid.v4() + '.jpg'
                 el.mv(path.resolve(__dirname, "..","static",fileName))
                 images.push(fileName)
              } )
            }else {
                let fileName = uuid.v4() + '.jpg'
                img.mv(path.resolve(__dirname, "..","static",fileName))
                images.push(fileName)
            }
            const uniqDevice = await prisma.device.findUnique({where:{name}})
            if(uniqDevice) {
               return  next(ApiError.badRequest("Такой товар уже существет!!!"))
            }
            const device = await prisma.device.create({
                data: {
                    name,
                    price:Number(price),
                    brandId:Number(brandId),
                    description,
                    img: images,
                    categoriesId:Number(categoriesId)
                }
            })
            return res.json(device)
        }catch (e:any) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req:Request,res:Response, next:NextFunction) {
        try {
            const {id} = req.params
            const {name,price,description} = req.body
            const updateDevice = await prisma.device.update({
                where:{
                    id:Number(id)
                },
                data:{name,price,description}
            })
            return res.json(updateDevice)
        }catch (e:any) {
            next(ApiError.badRequest("Введены некорректные данные!"))
        }

    }
    async delete(req:Request,res:Response, next:NextFunction) {
        try {
            const {id} = req.params
            const deleteDevice = await prisma.device.delete({where:{id:Number(id)}})
            return res.json(deleteDevice)
        }catch (e:any) {
            next(ApiError.badRequest("Невозможно удалить устройство"))
        }
    }
}

export default new DeviceController()