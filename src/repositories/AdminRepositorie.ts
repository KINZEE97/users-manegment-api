import { User } from "@prisma/client";

export interface UpdateUserAttributes {
    name?: string;
    email?: string;
    password?: string;
    updatedAt?: Date;
    role?: ["ADMIN", "USER"];
}

export interface CreateAdminUser {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
}

export interface AdminRepositorie {
    findAllUsers: () => Promise<User[]>;
    findUserByEmail: (email: string) => Promise<User | null>;
    findUserById: (id: number) => Promise<User>;
    updateUser: (
        id: number,
        data: Partial<UpdateUserAttributes>
    ) => Promise<User>;
    createAdminUser: (data: Partial<CreateAdminUser>) => Promise<User>;
    deleteUser: (id: number) => Promise<User>;
}
