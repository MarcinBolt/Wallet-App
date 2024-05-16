const swaggerOutput = {
  openapi: '3.0.0',
  info: {
    title: 'Wallet App REST API',
    version: '1.2.0',
    contact: {
      name: 'Hi5',
      // url: 'https://github.com/MarcinBolt/Wallet-App',
      url: 'https://wallet-app-hi5.vercel.app',
    },
  },
  servers: [
    {
      // url: 'https://wallet-lpqy.onrender.com',
      url: 'https://wallet-app-hi5.vercel.app/api',
      description: 'API base URL',
    },
  ],
  paths: {
    '/users/signup': {
      post: {
        summary: 'Create a new user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created.',
          },
          409: {
            description: 'Email in use.',
          },
          400: {
            description: 'User creation error.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/login': {
      post: {
        summary: 'Login user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'string',
                  },
                  password: {
                    type: 'string',
                    format: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User is logged in.',
          },
          400: {
            description: 'Login error.',
          },
          401: {
            description: 'Email or password is wrong.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/logout': {
      post: {
        summary: 'Log out user',
        tags: ['User'],
        parameters: [
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'The user is logged out.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/current': {
      get: {
        summary: 'Get information about the current user',
        tags: ['User'],
        parameters: [
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Information found.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/verify/{verificationToken}': {
      get: {
        summary: 'Verify user by email',
        tags: ['User'],
        description: '',
        parameters: [
          {
            name: 'verificationToken',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Information found.',
          },
          404: {
            description: 'Invalid verification token.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/verify': {
      post: {
        summary: 'Resend email for signup confirmation',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Verification email sent.',
          },
          400: {
            description: 'Missing required field: email.',
          },
          400: {
            description: 'Verification has already been passed.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          404: {
            description: 'User not found.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/users/delete': {
      delete: {
        tags: ['User'],
        summary: 'Deletes user',
        description: '',
        parameters: [
          {
            name: 'verificationToken',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'User successfully logged out',
          },
          401: {
            description: 'Bad Request',
          },
          401: {
            description: 'Missing header with authorization token',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/users': {
      patch: {
        summary: 'Updates user',
        tags: ['User'],
        parameters: [
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          200: {
            description: `User's data successfully updated.`,
          },
          400: {
            description: 'User update error.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/transactions': {
      get: {
        summary: 'Get all user transactions',
        tags: ['Transaction'],
        parameters: [
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'transactions found.',
          },
          401: {
            description: 'Missing header with authorization token',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
      post: {
        summary: 'Create a new transaction',
        tags: ['Transaction'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Transaction',
              },
            },
          },
        },
        parameters: [
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          201: {
            description: 'The transaction was successfully created.',
          },
          400: {
            description: 'Creating transaction failed.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/transactions/{id}': {
      get: {
        summary: `Resend transaction's details.`,
        tags: ['Transaction'],
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'id',
            schema: {
              type: 'string',
            },
            description: 'Transaction ID.',
          },
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: `Transaction's details`,
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          404: {
            description: `Transaction wasn't found`,
          },
          500: {
            description: 'Server error.',
          },
        },
      },
      patch: {
        summary: 'Update an existing transaction',
        tags: ['Transaction'],
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'id',
            schema: {
              type: 'string',
            },
            description: 'Transaction ID.',
          },
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Transaction',
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'contactId',
            schema: {
              type: 'integer',
            },
            description: 'Contact ID.',
          },
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'The contact was successfully updated.',
          },
          400: {
            description: 'Contact update failed.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
        },
      },
      delete: {
        summary: 'Delete transaction.',
        tags: ['Transaction'],
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'id',
            schema: {
              type: 'string',
            },
            description: 'Transaction ID.',
          },
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Transaction was successfully deleted.',
          },
          401: {
            description: 'Missing header with authorization token.',
          },
          404: {
            description: 'There is no such user collection.',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/transactions/{category}': {
      get: {
        tags: ['Transaction'],
        summary: 'Filters transactions by category.',
        description: '',
        parameters: [
          {
            name: 'category',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Transactions by category',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
    '/transactions/statistics/{year}/{month}': {
      get: {
        tags: ['Transaction'],
        summary: 'Filters transactions by date.',
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
          {
            in: 'header',
            required: true,
            name: 'Authorization',
            description: 'The token issued to the current user.',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Transactions by date',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
            description: 'Server error.',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['firstName', 'email', 'password'],
        properties: {
          id: {
            type: 'string',
            description: 'Backend-generated unique identifier.',
          },
          firstName: {
            type: 'string',
            description: 'Username.',
          },
          email: {
            type: 'string',
            description: 'E-mail address.',
          },
          password: {
            type: 'string',
            description: 'Password.',
          },
        },
        example: {
          firstName: 'John Doe',
          email: 'example@mail.com',
          password: 'examplepwd12345',
        },
      },
      Transaction: {
        type: 'object',
        required: ['date', 'year', 'month', 'type', 'category', 'sum'],
        properties: {
          id: {
            type: 'string',
            description: 'Backend-generated unique identifier.',
          },
          date: {
            type: 'string',
            description: "Transaction's date.",
          },
          year: {
            type: 'string',
            description: "Transaction's year.",
          },
          month: {
            type: 'string',
            enum: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            description: 'The name of the month that transaction was made.',
          },
          type: {
            type: 'string',
            enum: ['Income', 'Expense'],
            description: 'The type of transaction.',
          },
          category: {
            type: 'string',
            enum: [
              'Main expenses',
              'Products',
              'Car',
              'Self care',
              'Child care',
              'Household products',
              'Education',
              'Leisure',
              'Other expenses',
              'Entertainment',
            ],
            description: 'Category of transaction.',
          },
          comment: {
            type: 'string',
            description: "User's comment to transaction.",
          },
          sum: {
            type: 'string',
            description: "Transaction's sum.",
          },
          owner: {
            type: 'string',
            description: "Owner's id in database.",
          },
        },
        example: {
          date: '2023:07:12',
          year: '2023',
          month: 'July',
          type: 'Expense',
          category: 'Products',
          comment: 'Grocery store',
          sum: '27',
        },
      },
    },
  },
  tags: [],
};

export default swaggerOutput;
