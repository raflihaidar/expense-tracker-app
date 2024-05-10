import { AuthController } from '../controllers/auth.controller';
import validMiddleware from '../middleware/validate.middleware';
import { AuthDto } from '../dto/auth.dto';
import { Router } from 'express';

const authController = new AuthController();

export const authRouter = Router();
authRouter.post('/register', authController.create);
authRouter.post('/login', validMiddleware(AuthDto, 'body'), authController.login);
