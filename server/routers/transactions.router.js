import { Router } from 'express';
import { authentication } from '../controllers/users.controllers';

const transactionRouter = Router();

transactionRouter.get('/', authentication /*to do getOwnerTransactions*/);

transactionRouter.post('/', authentication /*to do createOwnerTransaction*/);

transactionRouter.get('/:id', authentication /*to do getOwnerTransactionById*/);

transactionRouter.put('/:id', authentication /*to do updateOwnerTransactionById*/);

transactionRouter.delete('/:id', authentication /*to dodeleteOwnerTransactionById*/);

transactionRouter.get('/:category', authentication /*to do getOwnerTransactionsByCategory*/);

//proponuję dać rok i miesiąc w params, a nie w query string
transactionRouter.get(
  '/statistics/:year/:month',
  authentication /*to dogetOwnerTransactionsByDate*/,
);

export default transactionRouter;
