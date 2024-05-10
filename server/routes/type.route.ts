import { Router } from 'express';
import { TypeController } from '../controllers/type.controller';

const typeController = new TypeController();
export const typeRouter = Router();

typeRouter.get('/', typeController.view);
typeRouter.post('/create', typeController.create);
