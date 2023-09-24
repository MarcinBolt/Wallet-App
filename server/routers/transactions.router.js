import { Router } from 'express';
import {
  createOwnerTransaction,
  deleteOwnerTransactionById,
  getOwnerStatisticsByDate,
  getOwnerTransactionById,
  getOwnerTransactions,
  getOwnerTransactionsByCategory,
  updateOwnerTransactionById,
} from '../controllers/transactions.controller.js';
import auth from '../utils/user.auth.js';

const transactionsRouter = Router();

transactionsRouter.get('/', auth, getOwnerTransactions);

transactionsRouter.post('/', auth, createOwnerTransaction);

transactionsRouter.get('/:id', auth, getOwnerTransactionById);

transactionsRouter.put('/:id', auth, updateOwnerTransactionById);

transactionsRouter.delete('/:id', auth, deleteOwnerTransactionById);

transactionsRouter.get('/:category', auth, getOwnerTransactionsByCategory);

transactionsRouter.get('/statistics/:year/:month', auth, getOwnerStatisticsByDate);

export default transactionsRouter;
