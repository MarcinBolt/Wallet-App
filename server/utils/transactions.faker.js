import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Transaction from '../service/schema/transaction.schema.js';

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
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
];

const types = ['Income', 'Expense'];

const owners = []; // here add strings from mongoDB (objectId) as owners

const generateTransactions = async () => {
  const transactions = [];

  for (let i = 0; i < 200; i++) {
    const date = faker.date.between({ from: '2023-01-20', to: '2023-09-25' });
    const year = 2023;
    const month = faker.date.month();
    const type = faker.helpers.arrayElement(types);
    const category = faker.helpers.arrayElement(categories);
    const comment = faker.lorem.sentence({ min: 1, max: 7 });
    const sum = faker.number.int({ min: 1, max: 2000 });
    const owner = faker.helpers.arrayElement(owners);

    transactions.push({
      date,
      year,
      month,
      type,
      category,
      comment,
      sum,
      owner,
    });
  }

  try {
    await Transaction.insertMany(transactions);
    console.log('Artificial transactions have been successfully created.');
  } catch (error) {
    console.error('Error while creating transactions:', error);
  } finally {
    mongoose.disconnect();
  }
};

generateTransactions();
