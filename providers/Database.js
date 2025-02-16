import { Sequelize } from 'sequelize'


class Database {
    static POSTGRES_DB_URL = process.env.POSTGRES_DB_URL || 'postgres://postgres:mysecretpassword@localhost:5433/postgres'

    static async init() {
        const sequelize = new Sequelize(this.POSTGRES_DB_URL,{
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