const dotenv = require('dotenv');

const Config = () => {
    dotenv.config();
    return {
        host: process.env.APP_HOST || 'localhost',
        port: process.env.PORT || '8181',
        dbDriver: process.env.DB_DRIVER || 'postgresql',
        dbHost: process.env.DB_HOST || 'localhost',
        dbPort: process.env.DB_PORT || '5432',
        dbUser: process.env.DB_USER || 'postgres',
        dbPass: process.env.DB_PASS || 'Reynaldi5398',
        dbName: process.env.DB_NAME || 'db_social_gathering',
        tokenAlgorithm: process.env.TOKEN_ALGORITHM || 'HS256',
        tokenSecret: process.env.TOKEN_SECRET || 'Secret',
        tokenExp: process.env.TOKEN_EXPIRATION || '30'
    }
}

module.exports = Config;