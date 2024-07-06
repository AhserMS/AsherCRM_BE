import { Response, NextFunction } from "express";
import { JWT_SECRET } from "../secrets";
import { CustomRequest, JWTPayload } from "../utils/types";
import { Jtoken } from "./Jtoken";
import UserService from "../services/userServices";

export class Authorize extends UserService {
    protected tokenService: Jtoken;
    constructor() {
        super()
        this.tokenService = new Jtoken(JWT_SECRET)
    }

    async authorize(req: CustomRequest, res: Response, next: NextFunction) {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            if (!token) return res.status(401).json({ message: "Not authorized, token failed" })

            try {
                token = req.headers.authorization.split(" ")[1];

                const decoded = await this.tokenService.decodeToken(token)

                if (!decoded) return res.status(401).json({ message: "Not authorized, invalid token" })

                const user = await this.findAUserById(decoded.id)

                if (!user) return res.status(401).json({ message: "Not authorized, user not found" })

                req.user = decoded;

                next()
            } catch (error) {
                return res.status(401).json({ message: "Not authorized, token failed" })
            }
        }
    }

    async authorizeRole(role: string) {
        return (req: CustomRequest, res: Response, next: NextFunction) => {
            if (req.user && req.user.role === role) return next()
            res.status(401).json({ message: `You are not authorized as a ${role}` })
        }
    }

    async logoutUser(req: CustomRequest, res: Response) {
        req.headers.authorization = "";
        return res.status(200).json({ message: "Logged out successfuly" })
    }
}