const router = require('express').Router();

router.use("/", require('./swagger'));

// Customer routes
router.use("/customers", require('./customers'));


// Product routes
router.use("/products", require('./products'));

module.exports = router;