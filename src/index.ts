import express, { json } from "express";
import { globalErrorHandler } from "./middlewares/handlers/GlobalErrorHandler";
import AdminRouter from "./api/AdminRouter";
import UserRouter from "./api/UserRouter";
import RegionRouter from "./api/RegionRouter";
import ObstacleRouter from "./api/ObstacleRouter";
import cors from 'cors'

console.log('ENV:' + process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 3000;

// JSON Parser Middleware
app.use(json());
app.use(cors());

// Routers Middleware
app.use('/admin', AdminRouter);
app.use('/user', UserRouter);
app.use('/region', RegionRouter);
app.use('/obstacle', ObstacleRouter);

// Error Hadler Middleware
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
})