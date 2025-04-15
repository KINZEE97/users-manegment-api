import { Router } from "express";
import { UsersController } from "../controllers/user-controller";
import { UsersPrismaRepositorie } from "../repositories/prisma/UsersPrismaRepositorie";


const router = Router()
const usersRepositories = new UsersPrismaRepositorie()

const userController = new UsersController(usersRepositories)

router.get("/user", userController.login)
router.post("/user", userController.register)



export { router }