import { User } from "@prisma/client"

export interface RegisterUser {
    name: string,
    email: string,
    password: string
}

export interface UsersRepositories {
    create: (attributes: RegisterUser) => Promise<User>
}