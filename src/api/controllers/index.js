const { handleErrors, mapObjects } = require('../../utils');

const controllers = {
    customersController: require('./customers'),
    productsController: require('./products')
}

// Export all controllers with their handlers wrapped in error handling middleware
module.exports = mapObjects(controllers, handleErrors)