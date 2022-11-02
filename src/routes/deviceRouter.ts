import Router from "express"
import deviceController from "../controllers/deviceController"

const router = Router()

router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', deviceController.create)
router.put('/:id', deviceController.update)
router.delete('/:id', deviceController.delete)


export default router