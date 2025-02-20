import jwt from "jsonwebtoken";
import config from "../config/config";

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '60m' });
}

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '7d' });
}

export const varifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
}