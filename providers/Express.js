import express from 'express';
import config from '../config/config.js';
import { Routes } from '../routes/index.js';

class Express {
    static app = express();

    static init() {
        this.app.use(express.json());
        new Routes(this.app);
        this.app.listen(config.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        })
    }
}

// Express.init();

export const app = Express.app;

export {
    Express,
}