const router = require('express').Router();
const contactsController = require('../controllers/contacts');


router.get('/', contactsController.getAll);
router.get('/:id', contactsController.get);


module.exports = router;
