import { NextFunction, Request, Response } from 'express';

export const dateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.createdAt) {
    try {
      req.body.createdAt = new Date(req.body.createdAt).toISOString();
    } catch (error) {
      return res.status(400).send({ message: 'Invalid date format.' });
    }
  }

  next();
};

export const dateFilter = async (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;
  res.json = (data) => {
    if (data && data.data.transaction) {
      if (req.method === 'GET') {
        data.data.transaction.forEach((value) => {
          value.createdAt = value.createdAt.toISOString().substring(0, 10);
          console.log(value.createdAt);
        });
      } else {
        data.data.transaction.createdAt = data.data.transaction.createdAt
          .toISOString()
          .substring(0, 10);
      }
    }
    oldJson.call(res, data);
    return res;
  };

  next();
};
