import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.resolve(process.cwd(), "./certs/prod-pg-ca-2021.crt")).toString()
    }
})

export default pool;