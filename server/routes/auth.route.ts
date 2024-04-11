import { create, login } from '../controllers/auth.controller';
import validMiddleware from '../middleware/validate.middleware';
import { AuthDto } from '../dto/auth.dto';
import { Router } from 'express';

export const authRouter = Router();
authRouter.post('/register', create);
authRouter.post('/login', validMiddleware(AuthDto, 'body'), login);
