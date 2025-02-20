import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_refresh_secret",
    DATABASE_URL: process.env.DATABASE_URL || "",
}