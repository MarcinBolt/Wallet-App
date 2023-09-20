const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./api/users.cjs');
require('dotenv').config();
require('./config/config-passport.cjs');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/users', usersRouter);

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
    status: 'Epic fail',
    code: 500,
    message: error.message,
    data: 'Internal server error',
  });
});

const PORT = process.env.PORT;

const databaseURI = process.env.DATABASE_URI;
const connection = mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection is very successful');
      console.log(`The server is also running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Something wrong with the server, because of: ${error.message}`);
    process.exit(1);
  });
