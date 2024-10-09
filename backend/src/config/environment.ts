import dotenv from 'dotenv'
dotenv.config()

export const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
export const PORT = process.env.PORT
export const API_VERSION = process.env.API_VERSION
export const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : '*'

export const DBASE_URL = process.env.DBASE_URL ? process.env.DBASE_URL : 'postgresql://postgres:postgres@localhost:5432/postgres'

export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''
export const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS)

export const EMAIL = process.env.EMAIL ? process.env.EMAIL : ''
export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD ? process.env.EMAIL_APP_PASSWORD : ''