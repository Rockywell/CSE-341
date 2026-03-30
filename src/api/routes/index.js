const passport = require('passport');
const { handleErrors } = require('../../utils');

const router = require('express').Router();

router.use("/", require('./swagger'));

// Customer routes
router.use("/customers", require('./customers'));


// Product routes
router.use("/products", require('./products'));

//Auth routes
router.get("/login", passport.authenticate('github'), handleErrors((req, user) => { }));

router.get("/logout", handleErrors((req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }
        res.redirect("/");
    })
}));

module.exports = router;