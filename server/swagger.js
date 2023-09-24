import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallet App REST API',
      version: '1.0.0',
      description:
        'API documentation for Express application to manage users and transactions in database',
    },
    components: {
      securitySchemes: {
        JWTAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT authorization header using the Bearer scheme',
        },
      },
    },
  },
  apis: [
    './routers/*.router.js',
    './service/schema/*.schema.js',
    './controllers/*.controller.js',
    './service/*.js',
  ],
};

export const openSpec = swaggerJsdoc(options);

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Wallet App REST API',
    description: 'Express App to manage users and transactions in db',
  },
  host: 'https://wallet-lpqy.onrender.com',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints',
    },
  ],
  definitions: {
    User: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'Backend-generated unique identifier',
        },
        email: {
          type: 'string',
          description: 'Email',
        },
        password: {
          type: 'string',
          description: 'Password',
        },
        firstName: {
          type: 'string',
          description: 'User name',
        },
      },
      required: ['email', 'password', 'firstName'],
      example: `{ _id: '3245345436354423', email: 'examplel@email.com', password: 'try67hgj', firstName: 'John Doe' }`,
    },
    Transaction: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: `Transaction's date`,
        },
        year: {
          type: 'string',
          description: `Year that transaction was made`,
        },
        month: {
          type: 'string',
          description: `Month that transaction was made`,
        },
        type: {
          type: 'string',
          description: `Transaction type`,
        },
        category: {
          type: 'string',
          description: `Transaction category`,
        },
        comment: {
          type: 'string',
          description: `User's description of transaction`,
        },
        sum: {
          type: 'number',
          description: `Sum`,
        },
        owner: {
          type: 'string',
          description: `User's id from database`,
        },
      },
      required: ['date', 'year', 'month', 'type', 'category', 'sum'],
      example: `{ date: '2023:07:12', year: '2023', month: 'July', type: 'Expense', category: 'Products', comment: 'Grocery', sum: 27, owner: '3245345436354423' }`,
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routers/users.router.js', './routers/transactions.router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  './server'; // Your project's root file
});
/*
swaggerAutogen('./swagger-output.json', [
  './routers/transactions.router.js',
  './service/schema/transactions.schema.js',
]);
*/
