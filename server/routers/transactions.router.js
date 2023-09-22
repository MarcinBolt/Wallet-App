import { Router } from 'express';
import {
  createOwnerTransaction,
  deleteOwnerTransactionById,
  getOwnerStatisticsByDate,
  getOwnerTransactionById,
  getOwnerTransactions,
  getOwnerTransactionsByCategory,
  updateOwnerTransactionById,
} from '../controllers/transactions.controller';

const transactionRouter = Router();

transactionRouter.get('/' /*to do auth*/, getOwnerTransactions);

transactionRouter.post('/' /*to do auth*/, createOwnerTransaction);

transactionRouter.get('/:id' /*to do auth*/, getOwnerTransactionById);

transactionRouter.put('/:id' /*to do auth*/, updateOwnerTransactionById);

transactionRouter.delete('/:id' /*to do auth*/, deleteOwnerTransactionById);

transactionRouter.get('/:category' /*to do auth*/, getOwnerTransactionsByCategory);

transactionRouter.get('/statistics/:year/:month' /*to do auth*/, getOwnerStatisticsByDate);

export default transactionRouter;
