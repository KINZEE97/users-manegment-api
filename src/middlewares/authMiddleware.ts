import jwt from "jsonwebtoken";
import { HttpError } from "../error/httpError";
import { Handler } from "express";

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
if(!SECRET_JWT_KEY) throw new Error("Secret Key Invalid")

export const authMiddleware: Handler = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) throw new HttpError(403,"Forbbiden")
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_JWT_KEY ) as {role: string};
        if(decoded.role !== "ADMIN") throw new HttpError(403, "Access denied")
        console.log(decoded)
        next()
    } catch (error) {
        res.json({error:error , message: "access denied"});
    }
};
