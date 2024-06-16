const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    transforms: [
      {
        mode: "sql",
        include: "**/*.sql",
        emitTemplate: "{{dir}}/{{name}}.queries.ts"
      }
    ],
    srcDir: "./src/api/",
    failOnError: false,
    camelCaseColumnNames: false,
    dbUrl: process.env.DATABASE_URL,
    db: {
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./certs/prod-pg-ca-2021.crt").toString()
      }
    },
    typesOverrides: {
        numeric: "number",
    }
  }

  module.exports = config;