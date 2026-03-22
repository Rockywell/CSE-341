const { body } = require('express-validator');

const validation = {};

validation.createRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Product name is required'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number')
        .toFloat(),

    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
        .toInt(),

    body('manufacturer')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Manufacturer must be less than 100 characters')
];

validation.updateRules = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Product name can\'t be empty'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),

    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number')
        .toFloat(),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
        .toInt(),

    body('manufacturer')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Manufacturer must be less than 100 characters')
];


module.exports = validation;