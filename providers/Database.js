import { Sequelize } from 'sequelize'
import config from '../config/config.js';
import User from '../models/User.js'


class Database {
    static db = {}
    static async init() {
        const sequelize = new Sequelize(config.POSTGRES_DB_URL, {
            dialect: 'postgres',
            logging: false  
        })
        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        this.db.Sequelize = Sequelize
        this.db.sequelize = sequelize

        this.db.users = User(sequelize, Sequelize)

        await sequelize.sync({ alter: true })
        console.log('All models were synchronized successfully.')
    }
}

// await Database.init()

export const db = Database.db
export {
    Database
}