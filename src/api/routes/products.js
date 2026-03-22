const router = require('express').Router();

const validation = require('../validation/product');
const validateProduct = require('../middleware/validate');

const { productsController } = require('../controllers');


router.get('/', productsController.getAll);
router.get('/:id', productsController.get);

router.post('/', validation.createRules, validateProduct, productsController.create);
router.put('/:id', validation.updateRules, validateProduct, productsController.update);
router.delete('/:id', productsController.delete);


module.exports = router;