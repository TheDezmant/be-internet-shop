import Router from "express"
import categoriesController from "../controllers/categoriesController";

const router = Router()

router.get(`/`,categoriesController.getAllById)
router.post('/',categoriesController.create)


export default router