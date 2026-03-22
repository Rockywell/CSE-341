const router = require('express').Router();

const validation = require('../validation/customers');
const validateCustomer = require('../middleware/validate');

const { customersController } = require('../controllers');


router.get('/', customersController.getAll);
router.get('/:id', customersController.get);

router.post('/', validation.createRules, validateCustomer, customersController.create);
router.put('/:id', validation.updateRules, validateCustomer, customersController.update);
router.delete('/:id', customersController.delete);


module.exports = router;