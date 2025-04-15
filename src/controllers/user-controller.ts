import { Handler } from "express";
import { UsersRepositories } from "../repositories/UserRepositorie";
import { createUserSchema, loginSchema } from "./schema/usersSchema";
import { UsersService } from "../services/UsersService";



export class UsersController {
    private usersService: UsersService
    constructor(usersRepositories: UsersRepositories) {
        this.usersService = new UsersService(usersRepositories)
    }
    register: Handler = async (req , res , next ) => {
        try {
           const body = createUserSchema.parse(req.body)

           const newUser = await this.usersService.createUser(body)
           res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    login: Handler = async (req , res , next ) => {
        try {
            const body = loginSchema.parse(req.body)
            const { token, user } = await this.usersService.authenticateUser(body.email, body.password) 
            res.json(token)

        } catch (error) {
            next (error)
        }
    }
}