import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// import usersRouter from './api/users.js';
// import transactionsRouter from './api/transactions.js';
import 'dotenv/config';
import './config/passport.config.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// app.use('/users', usersRouter);
// app.use('/transactions', transactionsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Connection error',
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

const PORT = process.env.PORT || 4000;

const databaseURI = process.env.DATABASE_URI;
const connection = mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection is successful');
      console.log(`The server is also running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Something wrong with the server, because of: ${error.message}`);
    process.exit(1);
  });
