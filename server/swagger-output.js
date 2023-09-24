const swaggerOutput = {
  swagger: '2.0',
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
    {
      name: 'Transaction',
      description: 'Endpoints',
    },
  ],
  paths: {
    '/transactions/': {
      get: {
        tags: ['Transaction'],
        description: `Returns all user's transactions`,
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      post: {
        tags: ['Transaction'],
        description: `Creates new user's transaction`,
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/transactions/{id}': {
      get: {
        tags: ['Transaction'],
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      put: {
        tags: ['Transaction'],
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      delete: {
        tags: ['Transaction'],
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/transactions/{category}': {
      get: {
        tags: ['Transaction'],
        description: '',
        parameters: [
          {
            name: 'category',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/transactions/statistics/{year}/{month}': {
      get: {
        tags: ['Transaction'],
        description: '',
        parameters: [
          {
            name: 'year',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'month',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/users/signup': {
      post: {
        tags: ['User'],
        summary: 'Registers new user',
        requestBody: {
          description: 'Create user in database',
          content: {
            'application/json': {
             /* schema: {
                $ref: '#/components/schemas/User',
              },*/
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Created',
          },
          400: {
            description: 'Bad Request',
          },
          409: {
            description: 'Conflict',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
      '/users/login': {
        post: {
          tags: ['User'],
          description: '',
          responses: {
            200: {
              description: 'OK',
            },
            400: {
              description: 'Bad Request',
            },
            401: {
              description: 'Unauthorized',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
      '/users/logout': {
        get: {
          tags: ['User'],
          description: '',
          responses: {
            200: {
              description: 'OK',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
      '/users/current': {
        get: {
          tags: ['User'],
          description: '',
          responses: {
            default: {
              description: '',
            },
          },
        },
      },
      '/users/verify/{verificationToken}': {
        get: {
          tags: ['User'],
          description: '',
          responses: {
            default: {
              description: '',
            },
          },
        },
      },
      '/users/verify': {
       
      },
      '/users/delete': {
        delete: {
          tags: ['User'],
          description: '',
          responses: {
            200: {
              description: 'OK',
            },
            400: {
              description: 'Bad Request',
            },
            401: {
              description: 'Unauthorized',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
      '/users/': {
        put: {
          tags: ['User'],
          description: '',
          responses: {
            default: {
              description: '',
            },
          },
        },
      },
    },
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
  }

export default swaggerOutput;
