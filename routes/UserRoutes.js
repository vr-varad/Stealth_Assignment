import express from 'express';
import { db } from '../providers/Database.js';

const User = db.users;

class UserRoutes {
    router = express.Router();

    constructor(){
        this.initialize();
    }

    initialize() {
        this.router.get('/', (req, res) => {
            res.send('get all users');
        });

        this.router.post('/', async(req, res) => {
            res.send('create user');
        });
        
        this.router.get('/:id', (req, res) => {
            res.send('get user by id');
        })

        this.router.put('/:id', (req, res) => {
            res.send('update user by id');
        });

        this.router.delete('/:id', (req, res) => {
            res.send('delete user by id');
        });
    }
}

export default new UserRoutes().router;