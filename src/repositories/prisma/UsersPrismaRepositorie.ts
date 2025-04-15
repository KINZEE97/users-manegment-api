import { User } from "@prisma/client";
import {  RegisterUser, UsersRepositories } from "../UserRepositorie";
import { prisma } from "../../database/prismaClient";

export class UsersPrismaRepositorie implements UsersRepositories {
    async create(attributes: RegisterUser): Promise<User> {
        
        return prisma.user.create({ data: attributes });
    }

    findUserByEmail(email: string):Promise<User | null>{
        return prisma.user.findUnique({where: {email: email} })
    }
}
