const router = require('express').Router();

const validation = require('../validation/customers');
const validateCustomer = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

const { customersController } = require('../controllers');


router.get('/', customersController.getAll);
router.get('/:id', customersController.get);

router.post('/', isAuthenticated, validation.createRules, validateCustomer, customersController.create);
router.put('/:id', isAuthenticated, validation.updateRules, validateCustomer, customersController.update);
router.delete('/:id', isAuthenticated, customersController.delete);


module.exports = router;