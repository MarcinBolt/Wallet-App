import Transaction from './schema/transaction.schema.js';

export const getTransactions = async owner => await Transaction.find({ owner });

export const createTransaction = async (date, year, month, type, category, comment, sum, owner) =>
  await Transaction.create({ date, year, month, type, category, comment, sum, owner });

export const updateTransactionById = async (id, field) =>
  await Transaction.findByIdAndUpdate({ _id: id }, field, { new: true });

export const deleteTransactionById = async id => await Transaction.deleteOne({ _id: id });

export const getTransactionsByCategory = async (owner, category) =>
  await await Transaction.find({ owner, category });

export const getStatistics = async (owner, year, month) =>
  await Transaction.find({ owner, year, month });
