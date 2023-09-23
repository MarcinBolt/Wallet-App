import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallet App REST API',
      version: '1.0.0',
      description: "API documentation for Express application to manage users and transactions in database",
    },
  },
  apis: ['./routers/*.js', './service/schema/*.js', './controllers/*.js'],
};

export const openSpec = swaggerJsdoc(options);
/*
import swaggerAutogen from 'swagger-autogen';

swaggerAutogen('./swagger-output.json', [
  './routers/user.router.js',
  './service/schema/transactions.schema.js',
]);
*/