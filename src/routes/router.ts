import { Router } from "express";
import { UsersController } from "../controllers/user-controller";
import { UsersPrismaRepositorie } from "../repositories/prisma/UsersPrismaRepositorie";
import { AdminController } from "../controllers/admin-controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminPrimsaRepositorie } from "../repositories/prisma/AdminPrismaRepositorie";
import { AdminService } from "../services/AdminService";

const router = Router();
const usersRepositories = new UsersPrismaRepositorie();
const adminRepositories = new AdminPrimsaRepositorie();

const adminService = new AdminService(adminRepositories);
const userController = new UsersController(usersRepositories);
const adminController = new AdminController(adminService);

router.get("/user", userController.login);
router.post("/user", userController.register);

//Admin routes
router.get("/admin", authMiddleware, adminController.listAllUsers);
router.get("/admin/user/:id", authMiddleware, adminController.findUser);
router.post("/admin", authMiddleware, adminController.createAdminUser);
router.put("/admin/:userId", authMiddleware, adminController.updateUser);
router.delete("/admin/:userId", authMiddleware, adminController.deleteUser);

export { router };
