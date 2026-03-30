const router = require('express').Router();

const validation = require('../validation/product');
const validateProduct = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

const { productsController } = require('../controllers');


router.get('/', productsController.getAll);
router.get('/:id', productsController.get);

router.post('/', isAuthenticated, validation.createRules, validateProduct, productsController.create);
router.put('/:id', isAuthenticated, validation.updateRules, validateProduct, productsController.update);
router.delete('/:id', isAuthenticated, productsController.delete);


module.exports = router;