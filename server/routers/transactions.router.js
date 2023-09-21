import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/' /*to do auth, getOwnerTransactions*/);

transactionRouter.post('/' /*to do auth, createOwnerTransaction*/);

transactionRouter.get('/:id' /*to do auth, getOwnerTransactionById*/);

transactionRouter.put('/:id' /*to do auth, updateOwnerTransactionById*/);

transactionRouter.delete('/:id' /*to do auth, deleteOwnerTransactionById*/);

transactionRouter.get('/:category' /*to do auth, getOwnerTransactionsByCategory*/);

//proponuję dać rok i miesiąc w params, a nie w query string
transactionRouter.get('/statistics/:year/:month' /*to do auth, getOwnersTransactionsByDate*/);

export default transactionRouter;
