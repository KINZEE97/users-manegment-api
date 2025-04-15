import { Handler } from "express";
import { prisma } from "../database/prismaClient";
import bcrypt from "bcrypt"
import { HttpError } from "../error/httpError";
import jwt from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UserRepositorie";
import { createUserSchema } from "./schema/usersSchema";

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY


export class UsersController {
    private usersRepositories: UsersRepositories
    constructor(usersRepositories: UsersRepositories) {
        this.usersRepositories = usersRepositories
    }
    register: Handler = async (req , res , next ) => {
        try {
            const body = createUserSchema.parse(req.body)

            if (!body.name || typeof body.name !== "string") throw new HttpError(400, "Name is required and must be a string");
            if (!body.email || typeof body.email !== "string") throw new HttpError(400, "Email is required and must be a string");
            if (!body.password || typeof body.password !== "string") throw new HttpError(400, "Password is required and must be a string")
            const hashedPassword = await bcrypt.hash(body.password , 10)
            const newUser = await this.usersRepositories.create({
                name: body.name,
                email: body.email,
                password: hashedPassword
            })
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    login: Handler = async (req , res , next ) => {
        try {
            const { email , password } = req.body 
            if (!email ) throw new HttpError(401, "Email or password invalid") 
            if (!password) throw new HttpError(401, "Email or password invalid")
            const user = await prisma.user.findUnique({where: {email: email}})
            if (!user) throw new HttpError(401, "Email or password invalid");
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid)  throw new HttpError(401, "Email or password invalid");
            const payload = {
                name: user.name,
                email: user.email
            }

            if (!SECRET_JWT_KEY) {
                throw new Error("SECRET_JWT_KEY is not defined");
            }

            const token = jwt.sign(payload,SECRET_JWT_KEY, {
                expiresIn: "7d"
            } ) 
            res.json(token)

        } catch (error) {
            next (error)
        }
    }
}