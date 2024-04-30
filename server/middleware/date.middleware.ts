import { NextFunction, Request, Response } from 'express';

export const dateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log('before middleware');
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
  console.log('after middleware');
  const oldJson = res.json;
  res.json = function (data) {
    console.log(data);
    if (data.transaction) {
      data.transaction.forEach((value) => {
        value.createdAt = value.createdAt.toISOString().substring(0, 10);
        console.log(value.createdAt);
      });
    }
    oldJson.call(res, data);
    return res;
  };

  next(); // Penting untuk memanggil next() agar eksekusi melanjutkan ke middleware berikutnya
};
