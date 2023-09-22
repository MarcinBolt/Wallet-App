import Joi from 'joi';
import {
  createTransactionByOwner,
  deleteTransactionByIdAndOwner,
  getStatisticsByOwner,
  getTransactionByIdAndOwner,
  getTransactionsByCategoryAndOwner,
  getTransactionsByOwner,
  updateTransactionByIdAndOwner,
} from '../service/transactions.service.js';

const transactionBodySchema = Joi.object({
  date: Joi.string().required(),
  year: Joi.string().required(),
  month: Joi.string()
    .valid(
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
    )
    .required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string()
    .valid(
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
    )
    .required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
});

const dateBodySchema = Joi.object({
  year: Joi.string().required(),
  month: Joi.string()
    .valid(
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
    )
    .required(),
});

const categoryBodySchema = Joi.string()
  .valid(
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
  )
  .required();

const getOwnerTransactions = async (req, res, next) => {
  const owner = req.user.id;
  try {
    const results = await getTransactionsByOwner(owner);
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
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
    const createdTransaction = await createTransactionByOwner(
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
    const transaction = await getTransactionByIdAndOwner(id, owner);
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
    const updatedTransaction = await updateTransactionByIdAndOwner(id, owner, value);
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
    const deletedTransaction = await deleteTransactionByIdAndOwner(id, owner);
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
  const { _, error } = categoryBodySchema.validate(category);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const transactionsByCategory = await getTransactionsByCategoryAndOwner(owner, category);
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
  const { _, error } = dateBodySchema.validate({ year, month });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const statisticsByDate = await getStatisticsByOwner(owner, year, month);
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
