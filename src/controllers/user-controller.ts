import { Handler } from "express";
import { prisma } from "../database/prismaClient";
import bcrypt from "bcrypt"
import { HttpError } from "../error/httpError";
import jwt from "jsonwebtoken"

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY


export class UsersController {
    register: Handler = async (req , res , next ) => {
        try {

            const { email, password, name } = req.body

            if(!email) throw new HttpError(400, "Email Required or data type wrong")
            if(!password) throw new HttpError(400, "Password Required or data type wrong")
            if(!name) throw new HttpError(400, "Name Required or data type wrong")

            
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(typeof(hashedPassword))
            const newUser = await prisma.user.create({
                data: {name: name, email: email, password: hashedPassword}
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