import { create, login } from '../controllers/auth.controller';
import { Router } from 'express';

const authRouter = Router();
// authRouter.post('/register', create);
authRouter.post('/', login);

export default authRouter;
