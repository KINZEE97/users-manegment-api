import { HttpError } from "../error/httpError";
import {
    AdminRepositorie,
    CreateAdminUser,
    UpdateUserAttributes,
} from "../repositories/AdminRepositorie";
import bcrypt from "bcrypt";

export class AdminService {
    constructor(private readonly adminRepository: AdminRepositorie) {}

     findAllUser() {
        return  this.adminRepository.findAllUsers();
    }

    async createAdminUser(data: CreateAdminUser) {
        if (!data.email || !data.name || !data.password)
            throw new Error("All fields are required");
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await this.adminRepository.createAdminUser({
            ...data,
            password: hashedPassword,
        });
    }

    async findUserById(id: number) {
        const user = await this.adminRepository.findUserById(id);
        if (!user) throw new HttpError(404, "User not found");

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUser(id: number, data: UpdateUserAttributes) {
        const user = await this.adminRepository.findUserById(id);
        if(!user) throw new HttpError(404, "User not found");
        
        if (!data.email && !data.name && !data.password)
            throw new HttpError(400, "At least one field is required");

        let hashedPassword: string | undefined = undefined;
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }

        return await this.adminRepository.updateUser(id, {
            ...data,
            password: hashedPassword,
            updatedAt: new Date(),
            role: data.role as ["ADMIN", "USER"] | undefined,
        });
    }

    async deleteUser ( userId : number ) {
        const user = await this.adminRepository.findUserById(userId)
        if(!user) throw new HttpError(404, "User not found")

        return await this.adminRepository.deleteUser(userId)
    }
}
