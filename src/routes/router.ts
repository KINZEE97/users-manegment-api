import { Router } from "express";
import { UsersController } from "../controllers/user-controller";


const router = Router()
const userController = new UsersController()

router.get("/user", userController.login)
router.post("/user", userController.register)



export { router }