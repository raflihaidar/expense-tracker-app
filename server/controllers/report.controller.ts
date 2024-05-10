import reportService from '../services/report.service';
import { successResponse } from '../common/response';
import { NextFunction, Request, Response } from 'express';

export class ReportController {
  public async view(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const report = await reportService.view(id);
      console.log(report);
      successResponse(res, report);
    } catch (error: any) {
      console.log(error);
    }

    next();
  }
}
