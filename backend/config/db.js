const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: 1433,

    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
    },

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },

    connectionTimeout: 30000,
    requestTimeout: 30000
};

let pool = null;

async function connectDB() {
    try {

        if (pool) {
            return pool;
        }

        pool = await sql.connect(config);

        console.log("✅ Connected to Azure SQL Database");

        return pool;

    } catch (err) {

        console.error("❌ Database Connection Error:");
        console.error(err);

        throw err;
    }
}

module.exports = {
    sql,
    connectDB
};