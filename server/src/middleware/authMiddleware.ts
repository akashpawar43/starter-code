import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface AuthRequest extends Request {
    user?: { userId: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decode = jwt.verify(token, config.JWT_SECRET) as { userId: string }
        req.user = { userId: decode.userId }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}