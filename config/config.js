import dotenv from 'dotenv';
dotenv.config();

export default {
    POSTGRES_DB_URL: process.env.POSTGRES_DB_URL || 'postgres://postgres:mysecretpassword@localhost:5432/postgres',
    PORT: process.env.PORT || 8080,
    JWT_SECRET: process.env.JWT_SECRET || "mysecretkey"
}