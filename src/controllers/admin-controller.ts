import { Handler } from "express";
import { prisma } from "../database/prismaClient";
import { HttpError } from "../error/httpError";
import { createUserSchema } from "./schema/usersSchema";
import bcrypt from "bcrypt";

// the admin controller will have the normal CRUD
export class AdminController {
    listUsers: Handler = async (req, res, next) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    createAdminUser: Handler = async (req, res, next) => {
        try {
            const body = createUserSchema.parse(req.body);
            if (!body.email) throw new HttpError(400, "Email Required");
            if (!body.name) throw new HttpError(400, "Name Required");
            if (!body.password) throw new HttpError(400, "Password Required");
            if (!body.role) throw new HttpError(400, "Role Required");

            const hashedPassword = await bcrypt.hash(body.password, 10);

            const newAdminUser = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                    role: body.role,
                },
            });
            res.status(201).json(newAdminUser);
        } catch (error) {
            next(error);
        }
    };

    findUser: Handler = async (req, res, next) => {
        try {
            const { name, email } = req.body;
            if (!name || !email) throw new HttpError(404, "User not found");

            const user = await prisma.user.findUnique({
                where: { email: email, name: {contains: name, mode: "insensitive"} },
            });

            if(!user) throw new HttpError(404, "User not found")

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
}
