const { Pool } = require('pg');
const Config = require('./config');
const { dbDriver, dbHost, dbPort, dbUser, dbPass, dbName } = Config();
const connectionString = `${dbDriver}://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`

const db = new Pool({connectionString});

module.exports = db;