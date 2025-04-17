import { Router } from "express";
import { UsersController } from "../controllers/user-controller";
import { UsersPrismaRepositorie } from "../repositories/prisma/UsersPrismaRepositorie";
import { AdminController } from "../controllers/admin-controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const usersRepositories = new UsersPrismaRepositorie();

const userController = new UsersController(usersRepositories);
const adminController = new AdminController();

router.get("/user", userController.login);
router.post("/user", userController.register);

//Admin routes
router.get("/admin", authMiddleware, adminController.listUsers);
router.get("/admin/user", authMiddleware, adminController.findUser);
router.post("/admin", authMiddleware, adminController.createAdminUser);
router.put("/admin/:userId", authMiddleware, adminController.updateUser);
router.delete("/admin/:userId", authMiddleware, adminController.deleteUser);

export { router };
