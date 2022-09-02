const express = require('express');
const Config = require('./config/config')
const AppRoute = require('./route/app.route')

const Server = () => {
    const { host, port } = Config();
    const app = express();
    app.use(express.json())
    app.use(AppRoute);

    app.listen(port, host, () => {
        console.log(`Server listening on ${host}:${port}`);
    });
}

module.exports = Server;