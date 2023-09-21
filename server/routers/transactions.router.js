import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/' /*to do auth, getOwnersTransactions*/);

transactionRouter.post('/' /*to do auth, createOwnersTransaction*/);

transactionRouter.get('/:id' /*to do auth, getOwnersTransactionById*/);

transactionRouter.put('/:id' /*to do auth, updateOwnersTransactionById*/);

transactionRouter.delete('/:id' /*to do auth, deleteOwnersTransactionById*/);

transactionRouter.get('/:category' /*to do auth, getOwnersTransactionsByCategory*/);

//proponuję dać rok i miesiąc w params, a nie w query string
transactionRouter.get('/statistics/:year/:month' /*to do auth, getOwnersTransactionsByDate*/);

export default transactionRouter;
