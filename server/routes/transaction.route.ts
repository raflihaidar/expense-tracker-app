import { Router } from 'express';
import { view, create } from '../controllers/transaction.controller';

export const transactionRouter = Router();

transactionRouter.get('/', view);
transactionRouter.post('/create', create);
