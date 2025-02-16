import express from 'express';

class UserRoutes {
    router = express.Router();

    constructor(){
        this.initialize();
    }

    initialize() {
        this.router.get('/', (req, res) => {
            res.send('get all users');
        });

        this.router.post('/', (req, res) => {
            res.send('create users');
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