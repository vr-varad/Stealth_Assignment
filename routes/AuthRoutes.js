import express from 'express';

class AuthRoutes {
    router = express.Router();

    constructor() {
        this.intitialize();
    }

    intitialize() {
        this.router.get('/login', (req, res) => {
            res.send('Login Page');
        });

        this.router.get('/signup', (req, res) => {
            res.send('Register Page');
        });
    }
}

export default new AuthRoutes().router;