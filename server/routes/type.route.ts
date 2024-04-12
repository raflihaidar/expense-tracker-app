import { Router } from 'express';
import { view, create } from '../controllers/type.controller';

export const typeRouter = Router();

typeRouter.get('/', view);
typeRouter.post('/create', create);
