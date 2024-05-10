import TypeService from '../services/type.service';
import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../common/response';

export class TypeController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const type = await TypeService.createType(name);

      res.status(200).json({
        message: 'Successfully added a new type',
        type
      });
    } catch (error) {
      res.status(error.statusCode).json(error.message);
    }

    next();
  }

  public async view(req: Request, res: Response, next: NextFunction) {
    try {
      const type = await TypeService.getType();

      successResponse(res, type);
    } catch (error) {
      res.status(error.statusCode).json(error.message);
    }

    next();
  }
}
