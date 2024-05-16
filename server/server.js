import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import process from 'node:process';
import colors from 'colors';
import usersRouter from './routers/users.router.js';
import transactionsRouter from './routers/transactions.router.js';
import 'dotenv/config';
import './config/passport.config.js';
import swaggerOutput from './swagger-output.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'The given endpoint does not exist',
    data: 'Not found',
  });
});

app.use((error, _, res, __) => {
  console.log(error.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: error.message,
    data: 'Internal server error',
  });
});

const PORT = (process.env.NODE_ENV === 'production' ? process.env.PORT : 5000) || 4030;

const databaseURI = process.env.DATABASE_URI;
const connection = mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log(colors.yellow('Database connecting...'));
    app.listen(PORT, () => {
      console.log(colors.green('Database connection is successful'));
      console.log(colors.green(`The server running on port: ${PORT}`));
    });
  })
  .catch(error => {
    console.log(colors.red(`Something wrong with the server, because of: ${error.message}`));
    process.exit(1);
  });

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal =>
  process.on(signal, () => {
    mongoose.disconnect();
    console.log(colors.magenta('Database disconnected.'));
    process.exit();
  }),
);

// export default app;

// handle HTTP requests
export default async function handler(req, res) {
  const { url, method } = req;
  let body = null;

  try {
    body = await getRawBody(req);
  } catch {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const responseFromApp = await app(req, res, body);

  res.statusCode = responseFromApp.statusCode;
  res.statusMessage = responseFromApp.statusMessage;
  res.setHeader('Content-Type', 'application/json');

  responseFromApp.body && res.write(JSON.stringify(responseFromApp.body));
  res.end();
}

async function getRawBody(req) {
  const chunks = [];
  const promise = new Promise((resolve, reject) => {
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });

  return promise;
}
