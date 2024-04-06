import { create, login } from '../controllers/auth.controller';
import { Router } from 'express';

export const authRouter = Router();
authRouter.post('/register', create);
authRouter.post('/login', login);
