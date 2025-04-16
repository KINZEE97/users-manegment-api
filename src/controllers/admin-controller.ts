import { Handler } from "express";
import { prisma } from "../database/prismaClient";
import { HttpError } from "../error/httpError";


// the admin controller will have the normal CRUD
export class adminController {
    listUsers: Handler = async (req , res , next ) => {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    }
}