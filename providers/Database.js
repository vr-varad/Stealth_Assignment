import { Sequelize } from 'sequelize'
import config from '../config/config.js';


class Database {
   static async init() {
        const sequelize = new Sequelize(config.POSTGRES_DB_URL,{
            dialect: 'postgres',
        })
        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}


export {
    Database
}