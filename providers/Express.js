import express from 'express';

class Express {
    static app = express();
    static PORT = process.env.PORT || 8080;

    static init() {
        this.app.use(express.json());
        this.app.use('/', (req, res) => {
            res.send('Hello World');
        })
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        })
    }
}

// Express.init();

export const app = Express.app;

export {
    Express,
}