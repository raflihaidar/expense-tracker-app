import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { dateMiddleware, dateFilter } from '../middleware/date.middleware';

export const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get('/:id', dateFilter, transactionController.view);
transactionRouter.post('/create', dateMiddleware, dateFilter, transactionController.create);
transactionRouter.delete('/destroy/:id', transactionController.destroy);
