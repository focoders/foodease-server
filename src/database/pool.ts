import { Pool } from 'pg'
import fs from 'fs'
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: true,
        ca: fs.readFileSync('./certs/prod-pg-ca-2021.crt').toString()
    }
})

export default pool;