import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { CustomError } from "../utils/customError";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, varifyToken } from "../utils/jwt";
import config from "../config/config";
import { prisma } from "../config/prisma";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new CustomError("Email already in use", 409);

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        prisma.user.create({
            data: {
                email,
                password: secPass
            }
        })

        res.json({ message: 'user created successfully' })
    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(user.password, password))) {
            throw new CustomError('Invalid credentials', 401);
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        res.json({ accessToken, message: 'user login successfully' })
    } catch (err) {
        next(err);
    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) throw new CustomError("No refresh token found", 401);

        const decode = varifyToken(token, config.JWT_REFRESH_SECRET) as { userId: string }
        const user = await prisma.user.findUnique({ where: { id: decode.userId } });

        if (!user || user.refreshToken !== token) throw new CustomError('Invalid refresh token', 403);

        const newAccessToken = generateAccessToken(user.id);

        res.json({ accessToken: newAccessToken })

    } catch (err) {
        next(err);
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await prisma.user.updateMany({
            where: { refreshToken },
            data: { refreshToken: null },
        });
        
        res.clearCookie('refreshToken')
        res.json({ message: "Logged out successfully" });

    } catch (err) {
        next(err)
    }
}