import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/' /*to do auth, getTransactions*/);

transactionRouter.post('/' /*to do auth, createTransaction*/);

transactionRouter.get('/:id' /*to do auth, getTransactionById*/);

transactionRouter.put('/:id' /*to do auth, updateTransactionById*/);

transactionRouter.delete('/:id' /*to do auth, deleteTransactionById*/);

transactionRouter.get('/:category' /*to do auth, getTransactionsByCategory*/);

//proponuję dać rok i miesiąc w params, a nie w query string
transactionRouter.get('/statistics/:year/:month' /*to do auth, getTransactionsByDate*/);

export default transactionRouter;
