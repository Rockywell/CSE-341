require("module-alias/register");
require("dotenv").config();

// Server configuration
const { server } = require("@config");

//express server.js
const express = require('express');
const app = express();

const mongodb = require("./data/database");
const bodyParser = require("body-parser");
// const routes = require('./api/routes');

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });

mongodb.connectDatabase().then(() => {
    const routes = require("./api/routes");
    app
        .use('/', routes)
        .use((req, res, next) => {
            res.status(404).json({
                message: `Route not found: ${req.originalUrl}`
            });
        })
        .use((err, req, res, next) => {
            console.error(`Error at: "${req.originalUrl}": ${err.message}`);

            res.status(err.status || 500).json({
                message: err.message || 'Internal server error'
            });
        });

    app.listen(server.port, server.host, () => {
        console.log(`Server is running on \x1b[32m${server.protocol}://${server.host}:${server.port}\x1b[0m`);
    });
}).catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit();
});