import { Request, Response } from 'express';
import { prisma } from '../models/index';

export const view = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();

  res.status(200).json({
    user
  });
};
