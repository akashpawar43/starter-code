import express from 'express';
import cors from 'cors';
import config from './config/config'; 
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "health check!",
    })
});

app.use('/api/auth', authRoutes)

// centralize error handling middleware
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    console.log(`server listing on port http://localhost:${config.PORT}`)
})