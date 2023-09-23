const swaggerOutput = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Wallet API",
    "description": "Express App to manage user and transactions in db"
  },
  "host": "localhost:3000",
  "basePath": "/",
  "tags": [
    {
      "name": "Transactions",
      "description": "Endpoints"
    }
  ],
  "schemes": [
    "http", "https"
  ],
  "securityDefinitions": {
    "apiKeyAuth": {
      "type": "apiKey",
      "in": "header",
      "name": "X-API-KEY",
      "description": "any description..."
    }
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/transactions/": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "description": "",
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/transactions/{id}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "put": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          }
        }
      },
      "delete": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/transactions/{category}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "category",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/transactions/statistics/{year}/{month}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "year",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "month",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    }
  },
  "definitions": {
    "User": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "example": "exampleemail@exampleemail.com"
        },
        "password": {
          "type": "string",
          "example": "try67hgj"
        },
        "firstName": {
          "type": "string",
          "example": "John Doe"
        }
      }
    },
    "Transaction": {
      "type": "object",
      "properties": {
        "father": {
          "type": "string",
          "example": "Simon Doe"
        },
        "mother": {
          "type": "string",
          "example": "Marie Doe"
        }
      }
    }
  }
}

export default swaggerOutput