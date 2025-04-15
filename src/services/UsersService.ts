import { HttpError } from "../error/httpError";
import {
    RegisterUser,
    UsersRepositories,
} from "../repositories/UserRepositorie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET_JWT_KEY  }from "../../config"


export class UsersService {
    private usersRepositories: UsersRepositories;

    constructor(usersRepositories: UsersRepositories) {
        this.usersRepositories = usersRepositories;
    }

    async createUser(data: RegisterUser) {
        if (!data.name || typeof data.name !== "string") {
            throw new HttpError(400, "Name is required and must be a string");
        }
        if (!data.email || typeof data.email !== "string") {
            throw new HttpError(400, "Email is required and must be a string");
        }
        if (!data.password || typeof data.password !== "string") {
            throw new HttpError(
                400,
                "Password is required and must be a string"
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await this.usersRepositories.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return newUser;
    }

    async authenticateUser(email: string, password: string) {
        if (!email || !password) {
            throw new HttpError(401, "Email or Password Invalid");
        }

        const user = await this.usersRepositories.findUserByEmail(email);
        if (!user) {
            throw new HttpError(401, "Email or Password Invalid");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpError(401, "Email or Password Invalid");
        }

        const payload = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        if (!SECRET_JWT_KEY) {
            throw new Error("SECRET_JWT_KEY is not defined");
        }

        const token = jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: "1d" });

        return {
            token,
            user: { name: user.name, email: user.email, role: user.role },
        };
    }
}
