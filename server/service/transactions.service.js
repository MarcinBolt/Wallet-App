import Transaction from './schema/transaction.schema.js';

export const getTransactionsByOwner = async owner => await Transaction.find({ owner });

export const createTransactionByOwner = async (date, year, month, type, category, comment, sum, owner) =>
  await Transaction.create({ date, year, month, type, category, comment, sum, owner });

export const getTransactionByIdAndOwner = async (id, owner) =>
  await Transaction.findOne({ _id: id, owner });

export const updateTransactionByIdAndOwner = async (id, owner, fields) =>
  await Transaction.findByIdAndUpdate({ _id: id, owner }, fields, { new: true });

export const deleteTransactionByIdAndOwner = async (id, owner) =>
  await Transaction.deleteOne({ _id: id, owner });

export const getTransactionsByCategoryAndOwner = async (owner, category) =>
  await await Transaction.find({ owner, category });

export const getStatisticsByOwner = async (owner, year, month) =>
  await Transaction.find({ owner, year, month });
