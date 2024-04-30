import { Router } from 'express';
import { view, create } from '../controllers/transaction.controller';
import { dateMiddleware, dateFilter } from '../middleware/date.middleware';

export const transactionRouter = Router();

transactionRouter.get('/:id', dateFilter, view);
transactionRouter.post('/create', dateMiddleware, create, dateFilter);
