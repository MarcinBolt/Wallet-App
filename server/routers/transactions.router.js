import { Router } from 'express';
import {
  createOwnerTransaction,
  deleteOwnerTransactionById,
  getOwnerStatisticsByDate,
  getOwnerTransactionById,
  getOwnerTransactions,
  getOwnerTransactionsByCategory,
  getOwnerTransactionsByYear,
  updateOwnerTransactionById,
} from '../controllers/transactions.controller.js';
import auth from '../utils/user.auth.js';

const transactionsRouter = Router();

transactionsRouter.get('/', auth, getOwnerTransactions);

transactionsRouter.get('/:year', auth, getOwnerTransactionsByYear);

transactionsRouter.post('/', auth, createOwnerTransaction);

transactionsRouter.get('/:id', auth, getOwnerTransactionById);

transactionsRouter.patch('/:id', auth, updateOwnerTransactionById);

transactionsRouter.delete('/:id', auth, deleteOwnerTransactionById);

transactionsRouter.get('/category/:category', auth, getOwnerTransactionsByCategory);

transactionsRouter.get('/statistics/:year/:month', auth, getOwnerStatisticsByDate);

export default transactionsRouter;
