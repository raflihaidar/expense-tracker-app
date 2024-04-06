import { Router } from 'express';
import { view } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', view);
