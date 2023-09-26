import {
  createOwnerTransactionInDB,
  deleteOwnerTransactionByIdInDB,
  getOwnerStatisticsFromBD,
  getOwnerTransactionByIdFromDB,
  getOwnerTransactionsByCategoryFromDB,
  getOwnerTransactionsFromDB,
  updateOwnerTransactionByIdInDB,
} from '../service/transactions.service.js';

import {
  transactionBodySchema,
  transactionCategoryBodySchema,
  transactionDateBodySchema,
} from '../utils/joi.schemas.js';

const getOwnerTransactions = async (req, res, next) => {
  const owner = req.user.id;
  try {
    const results = await getOwnerTransactionsFromDB(owner);
    res.json({
      status: 'success',
      code: 200,
      transactions: results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const createOwnerTransaction = async (req, res, next) => {
  const owner = req.user.id;
  const { value, error } = transactionBodySchema.validate(req.body);
  const { date, year, month, type, category, comment, sum } = value;

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const createdTransaction = await createOwnerTransactionInDB(
      date,
      year,
      month,
      type,
      category,
      comment,
      sum,
      owner,
    );
    res.status(201).json({
      status: 'created',
      code: 201,
      transaction: createdTransaction,
      message: 'The transaction was successfully created',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const getOwnerTransactionById = async (req, res, next) => {
  const owner = req.user.id;
  const { id } = req.params;
  try {
    const transaction = await getOwnerTransactionByIdFromDB(id, owner);
    if (transaction) {
      return res.json({
        status: 'success',
        code: 200,
        message: `Transaction's details`,
        transaction,
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `${id} transaction not found`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const updateOwnerTransactionById = async (req, res, _) => {
  const owner = req.user.id;
  const { id } = req.params;
  const { value, error } = transactionBodySchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const updatedTransaction = await updateOwnerTransactionByIdInDB(id, owner, value);
    if (updatedTransaction) {
      return res.json({
        status: 'success',
        code: 200,
        transaction: updatedTransaction,
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `${id} transaction not found`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const deleteOwnerTransactionById = async (req, res, next) => {
  const owner = req.user.id;
  const { id } = req.params;

  try {
    const deletedTransaction = await deleteOwnerTransactionByIdInDB(id, owner);
    if (deletedTransaction) {
      return res.json({
        status: 'success',
        code: 200,
        message: `Transaction was successfully deleted.`,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const getOwnerTransactionsByCategory = async (req, res, next) => {
  const owner = req.user.id;
  const { category } = req.params;
  console.log(category);
  const { _, error } = transactionCategoryBodySchema.validate(category);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const transactionsByCategory = await getOwnerTransactionsByCategoryFromDB(owner, category);
    if (transactionsByCategory) {
      return res.json({
        status: 'success',
        code: 200,
        message: `Transactions by category`,
        transactions: transactionsByCategory,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const getOwnerStatisticsByDate = async (req, res, next) => {
  const owner = req.user.id;
  const { year, month } = req.params;
  const { _, error } = transactionDateBodySchema.validate({ year, month });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const statisticsByDate = await getOwnerStatisticsFromBD(owner, year, month);
    return res.json({
      status: 'success',
      code: 200,
      transactions: statisticsByDate,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

export {
  getOwnerTransactions,
  createOwnerTransaction,
  getOwnerTransactionById,
  updateOwnerTransactionById,
  deleteOwnerTransactionById,
  getOwnerTransactionsByCategory,
  getOwnerStatisticsByDate,
};
