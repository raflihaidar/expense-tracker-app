import { Router } from 'express';
import { getData } from '../controllers/transaction.controller';

export const transactionRouter = Router();

transactionRouter.get('/', getData);
