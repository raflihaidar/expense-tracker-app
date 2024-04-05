import { Router } from 'express';
import { transactionRouter } from '../routes/transaction';
import userRouter from '../routes/user';
import authRouter from './auth.route';

export const router = Router();

router.use('/transaction', transactionRouter);
router.use('/user', userRouter);
router.use('/login', authRouter);
