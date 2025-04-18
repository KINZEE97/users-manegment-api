import dotenv from "dotenv"

dotenv.config()

if(!process.env.SECRET_JWT_KEY) {
    throw new Error("Key not defined in the environment variables")
}

export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;