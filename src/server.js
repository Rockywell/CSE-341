require("dotenv").config();

//express server.js
const express = require('express');
const app = express();

const mongodb = require("./data/database");
const bodyParser = require('body-parser');
// const routes = require('./api/routes');

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });

mongodb.connectDatabase().then(() => {
    const routes = require("./api/routes");
    app.use('/', routes);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}\nlisten at \x1b[32mhttp://localhost:${port}\x1b[0m`);
    });
})