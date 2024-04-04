import { Router } from 'express';
import { create, login } from '../controllers/userController';

export const userRouter = Router();

userRouter.post('/', create);
userRouter.post('/login', login);
