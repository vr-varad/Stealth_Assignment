import express from 'express';
import { CreateUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser } from '../controllers/UserController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { AdminMiddleware } from '../middleware/AdminMiddleware.js';


class UserRoutes {
    router = express.Router();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.use(AuthMiddleware)

        this.router.get('/', GetAllUsers);

        this.router.post('/', CreateUser);

        this.router.get('/:id', GetUserById)

        this.router.put('/:id', AdminMiddleware, UpdateUser);

        this.router.delete('/:id', DeleteUser);
    }
}

export default new UserRoutes().router;