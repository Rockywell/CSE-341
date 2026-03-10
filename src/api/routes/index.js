const router = require('express').Router();
const homeController = require('../controllers/home');

router.use("/", require('./swagger'));

// Home routes
router.get('/', homeController.index);
router.get('/about', homeController.about);

// Contact routes
router.use("/contacts", require('./contacts'));

module.exports = router;