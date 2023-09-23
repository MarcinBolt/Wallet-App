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

const transactionsRouter = Router();

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get an example resource
 *     description: Get all user's transactions
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Resource not found
 */
transactionsRouter.get('/' /*to do auth*/, getOwnerTransactions);

transactionsRouter.post('/' /*to do auth*/, createOwnerTransaction);

transactionsRouter.get('/:id' /*to do auth*/, getOwnerTransactionById);

transactionsRouter.put('/:id' /*to do auth*/, updateOwnerTransactionById);

transactionsRouter.delete('/:id' /*to do auth*/, deleteOwnerTransactionById);

transactionsRouter.get('/:category' /*to do auth*/, getOwnerTransactionsByCategory);

transactionsRouter.get('/statistics/:year/:month' /*to do auth*/, getOwnerStatisticsByDate);

export default transactionsRouter;
