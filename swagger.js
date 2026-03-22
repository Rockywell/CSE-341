const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Products API',
        description: 'API for managing products'
    },
    host: 'localhost:5050',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/api/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);