import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Transaction from '../service/schema/transaction.schema.js';
import 'dotenv/config';

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categoriesTable = [
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
  // 'Income',
];

const owners = ['']; // here add strings from mongoDB (objectId) as owners

const generateTransactions = async () => {
  const transactions = [];

  for (let i = 0; i < 100; i++) {
    const iterableDate = faker.date.between({ from: '2023-02-10', to: '2023-10-02' });

    const date = iterableDate;
    const year = iterableDate.getFullYear();
    const month = iterableDate.toLocaleString('en-us', { month: 'long' });
    const type = 'Expense';
    const category = faker.helpers.arrayElement(categoriesTable);
    const comment = faker.lorem.sentence({ min: 1, max: 7 });
    const sum = faker.number.float({ min: 5, max: 2000 }).toFixed(2);
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

    for (let i = 0; i < 30; i++) {
      const iterableDate = faker.date.between({ from: '2023-06-10', to: '2023-10-02' });

      const date = iterableDate;
      const year = iterableDate.getFullYear();
      const month = iterableDate.toLocaleString('en-us', { month: 'long' });
      const type = 'Income';
      const category = 'Income';
      const comment = faker.lorem.sentence({ min: 1, max: 7 });
      const sum = faker.number.float({ min: 5, max: 2000 }).toFixed(2);
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
