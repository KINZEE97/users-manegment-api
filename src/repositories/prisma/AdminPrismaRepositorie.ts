import { Role, User } from "@prisma/client";
import { AdminRepositorie, CreateAdminUser, UpdateUserAttributes } from "../AdminRepositorie";
import { prisma } from "../../database/prismaClient";
import { HttpError } from "../../error/httpError";


export class AdminPrimsaRepositorie implements AdminRepositorie {
    async findAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }
    findUserByEmail(email: string) : Promise<User | null>{
        return prisma.user.findUnique({where: {email: email} })
    }
    async findUserById(id: number): Promise<User> {
        const user = await prisma.user.findUnique({where: {id} })
        if(!user) throw new HttpError(404, "User not found")
        return user
    }
    updateUser(id: number, data: Partial<UpdateUserAttributes>): Promise<User> {
         return prisma.user.update({
            where: {id},
            data: {
                ...data,
                role: data.role as unknown as Role
            }
         });
    }
    createAdminUser(data: Partial<CreateAdminUser>): Promise<User> {
        const { name, email, password, role } = data;

        if (!name || !email || !password || !role) {
            throw new HttpError(400, "Missing required fields for creating an admin user");
        }

        return prisma.user.create({
            data: {
                name,
                email,
                password,
                role
            }
        });
    }

    deleteUser (id: number): Promise<User>{
        return prisma.user.delete({
            where: {id}
        })
    }
    
}