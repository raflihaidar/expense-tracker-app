import { Router } from 'express';
import { transactionRouter } from './transaction.route';
import { userRouter } from './user.route';
import { authRouter } from './auth.route';
import { typeRouter } from './type.route';

export const router = Router();

router.use('/transaction', transactionRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/type', typeRouter);
