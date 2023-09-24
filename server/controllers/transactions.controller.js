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
      data: {
        transactions: results,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
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
      data: createdTransaction,
    });
  } catch (err) {
    console.error(err);
    next(err);
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
        data: { transaction },
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
    next(err);
  }
};

const updateOwnerTransactionById = async (req, res, next) => {
  const owner = req.user.id;
  const { id } = req.params;
  const { value, error } = transactionBodySchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const updatedTransaction = await updateOwnerTransactionByIdInDB(id, owner, value);
    if (transaction) {
      return res.json({
        status: 'success',
        code: 200,
        data: { updatedTransaction },
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
    next(err);
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
        data: { deletedTransaction },
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getOwnerTransactionsByCategory = async (req, res, next) => {
  const owner = req.user.id;
  const { category } = req.params;
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
        data: transactionsByCategory,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
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
      data: statisticsByDate,
    });
  } catch (err) {
    console.error(err);
    next(err);
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
