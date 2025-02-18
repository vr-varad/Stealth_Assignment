import express from 'express';
import config from '../config/config.js';
import { Routes } from '../routes/index.js';
import { ErrorMiddleware } from '../middleware/ErrorMiddleware.js';

class Express {
    static app = express();

    static init() {
        this.app.use(express.json());
        new Routes(this.app);
        this.app.use(ErrorMiddleware);
    }

    static startServer() {
        this.app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        })
    }
}

Express.init();

export const app = Express.app;

export {
    Express,
}