import { User } from "@prisma/client";
import { RegisterUser, UsersRepositories } from "../UserRepositorie";
import { prisma } from "../../database/prismaClient";

export class UsersPrismaRepositorie implements UsersRepositories {
    create(attributes: RegisterUser): Promise<User> {
        return prisma.user.create({ data: attributes });
    }
}
