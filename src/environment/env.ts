import { IEnv } from "../interfaces/IEnv";
import dotenv from "dotenv"

dotenv.config()

export const ENV:IEnv = {
    stage: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    SECRET:process.env.SESSION_SECRET,
    KEY: process.env.SESSION_KEY
}