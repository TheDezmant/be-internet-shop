import Router from "express"
import brandRouter from './brandRouter'
import categoriesRouter from "./categoriesRouter"
import deviceRouter from './deviceRouter'
import userRouter from './userRouster'


const router = Router()

router.use('/brand',brandRouter)
router.use('/device',deviceRouter)
router.use('/user',userRouter)
router.use('/categories',categoriesRouter)

export default router
