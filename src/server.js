require("module-alias/register");
require("dotenv").config();

// Server configuration
const { server } = require("@config");

//express server.js
const express = require('express');
const app = express();

const mongodb = require("./data/database");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
// const routes = require('./api/routes');

app
    .use(bodyParser.json())
    .use(session({
        secret: server.clientSecret,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        next();
    })


mongodb.connectDatabase().then(() => {
    const routes = require("./api/routes");

    app
        .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'] }))
        .use(cors({ origin: '*' }))
        .use('/', routes);

    passport.use(new GitHubStrategy({
        clientID: server.clientID,
        clientSecret: server.clientSecret,
        callbackURL: server.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
        // For simplicity, we'll just use the GitHub profile as the user object
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') });
    app.get("/github/callback", passport.authenticate("github", {
        failureRedirect: "/api-docs", session: false
    }),
        (req, res) => {
            req.session.user = req.user;
            res.redirect("/");
        });

    app
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

    app.listen(server.port, () => {
        console.log(`Server is running on \x1b[32m${server.protocol}://${server.host}:${server.port}\x1b[0m`);
    });
}).catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit();
});