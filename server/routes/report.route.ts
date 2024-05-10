import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';

const reportController = new ReportController();

export const reportRouter = Router();

reportRouter.get('/:id', reportController.view);
