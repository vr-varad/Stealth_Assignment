import express from 'express';
import { UserLogin, UserSignUp } from '../controllers/AuthController.js';

class AuthRoutes {
    router = express.Router();

    constructor() {
        this.intitialize();
    }

    intitialize() {
        this.router.post('/login', UserLogin);

        this.router.post('/signup', UserSignUp);
    }
}

export default new AuthRoutes().router;