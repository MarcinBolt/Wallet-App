import { Router } from 'express';

const transactionsRouter = Router();

transactionsRouter.get('/' /*to do auth, getOwnerTransactions*/);

transactionsRouter.post('/' /*to do auth, createOwnerTransaction*/);

transactionsRouter.get('/:id' /*to do auth, getOwnerTransactionById*/);

transactionsRouter.put('/:id' /*to do auth, updateOwnerTransactionById*/);

transactionsRouter.delete('/:id' /*to do auth, deleteOwnerTransactionById*/);

transactionsRouter.get('/:category' /*to do auth, getOwnerTransactionsByCategory*/);

//proponuję dać rok i miesiąc w params, a nie w query string
transactionsRouter.get('/statistics/:year/:month' /*to do auth, getOwnerTransactionsByDate*/);

export default transactionsRouter;
