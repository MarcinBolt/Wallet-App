import Transaction from './schema/transaction.schema.js';

export const getOwnerTransactionsFromDB = async owner => await Transaction.find({ owner });

export const createOwnerTransactionInDB = async (
  date,
  year,
  month,
  type,
  category,
  comment,
  sum,
  owner,
) => await Transaction.create({ date, year, month, type, category, comment, sum, owner });

export const getOwnerTransactionByIdFromDB = async (id, owner) =>
  await Transaction.findOne({ _id: id, owner });

export const updateOwnerTransactionByIdInDB = async (id, owner, fields) =>
  await Transaction.findByIdAndUpdate({ _id: id, owner }, fields, { new: true });

export const deleteOwnerTransactionByIdInDB = async (id, owner) =>
  await Transaction.deleteOne({ _id: id, owner });

export const getOwnerTransactionsByCategoryFromDB = async (owner, category) =>
  await await Transaction.find({ owner, category });

export const getOwnerStatisticsFromBD = async (owner, year, month) =>
  await Transaction.find({ owner, year, month });

export const deleteOwnerAllTransactionsIdInDB = async owner =>
  await Transaction.deleteMany({ owner });
