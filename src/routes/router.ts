import { Router } from "express";
import { UsersController } from "../controllers/user-controller";
import { UsersPrismaRepositorie } from "../repositories/prisma/UsersPrismaRepositorie";
import { AdminController } from "../controllers/admin-controller";


const router = Router()
const usersRepositories = new UsersPrismaRepositorie()

const userController = new UsersController(usersRepositories)
const adminController = new AdminController()


router.get("/user", userController.login)
router.post("/user", userController.register)

//Admin routes
router.get("/admin", adminController.listUsers)
router.get("/admin/user", adminController.findUser)
router.post("/admin", adminController.createAdminUser)


export { router }