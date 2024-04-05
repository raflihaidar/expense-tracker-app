import { Router } from 'express';
import { view } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', view);

export default userRouter;
