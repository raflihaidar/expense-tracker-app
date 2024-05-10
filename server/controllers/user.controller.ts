import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../common/response';
import { prisma } from '../models/index';

export class UserController {
  public async view(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findMany();

      successResponse(res, user);
    } catch (error: any) {
      res.status(error.statusCode).json(error.message);
    }

    next();
  }
}
