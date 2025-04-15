import { User } from "@prisma/client"

export interface RegisterUser {
    name: string,
    email: string,
    password: string
}

export interface LoginUser {
    email: string,
    password: string
}

export interface UserWhereParams {
    email?: {
        like?: string
    }
}

export interface FindUserParams{
   where?: UserWhereParams
}

export interface UsersRepositories {
    create: (attributes: RegisterUser) => Promise<User>
    findUserByEmail: (email: string) => Promise<User | null>
}