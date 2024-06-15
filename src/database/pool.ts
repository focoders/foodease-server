import { Pool } from 'pg'
import fs from 'fs';
import path from "path";
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: true,
        ca: process.env.PG_SSL_CERTS
    }
})

export default pool;