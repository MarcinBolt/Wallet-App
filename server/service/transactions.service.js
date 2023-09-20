import Transaction from './schema/transaction.schema.js';

export const getOwnerTransactions = async owner => await Transaction.find({ owner });

export const createTransaction = async (date, year, month, type, category, comment, sum, owner) =>
  await Transaction.create({ date, year, month, type, category, comment, sum, owner });

export const updateTransactionById = async (id, field) =>
  await Transaction.findByIdAndUpdate({ _id: id }, field, { new: true });

export const deleteTransactionById = async id => await Transaction.deleteOne({ _id: id });

export const getOwnerTransactionsByCategory = async (owner, category) =>
  await await Transaction.find({ owner, category });

export const getOwnerStatistics = async (owner, year, month) =>
  await Transaction.find({ owner, year, month });
