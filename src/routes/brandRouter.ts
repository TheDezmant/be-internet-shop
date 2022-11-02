import Router from "express"
import brandController from "../controllers/brandController"

const router = Router()

router.get('/',brandController.getAll)
router.post('/',brandController.create)


export default router