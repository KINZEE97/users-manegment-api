import { Handler } from "express";
import { createUserSchema, updateUser } from "./schema/usersSchema";
import { AdminService } from "../services/AdminService";

// the admin controller will have the normal CRUD
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    listAllUsers: Handler = async (req, res, next) => {
        try {
            const users = await this.adminService.findAllUser();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    createAdminUser: Handler = async (req, res, next) => {
        try {
            const body = createUserSchema.parse(req.body);
            const newAdminUser = await this.adminService.createAdminUser({
                ...body,
                role: body.role ?? "USER", // Default to "USER" if role is undefined
            });
            res.status(201).json(newAdminUser);
        } catch (error) {
            next(error);
        }
    };

    findUser: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id;
            const user = await this.adminService.findUserById(id);
            const { password, ...userWithoutPassword } = user as { password?: string; [key: string]: any };
            res.json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    };

    updateUser: Handler = async (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const body = updateUser.parse(req.body);
            const updatedUser = await this.adminService.updateUser(userId, {
                ...body,
                role: body.role ? ["ADMIN", "USER"] : undefined,
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    };

    deleteUser: Handler = async (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const user = await this.adminService.findUserById(userId);
            await this.adminService.deleteUser(userId);
            res.json({
                message: `User: ${user.name} was deleted successfully!`,
            });
        } catch (error) {
            next(error);
        }
    };
}
