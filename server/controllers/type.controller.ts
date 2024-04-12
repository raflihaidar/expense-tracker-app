import TypeService from '../services/type.service';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const type = await TypeService.createType(name);

    res.status(200).json({
      message: 'Successfully added a new type',
      type
    });
  } catch (error) {
    console.log(error);
  }
};

export const view = async (req: Request, res: Response) => {
  try {
    const type = await TypeService.getType();
    res.status(200).json({
      message: 'Success',
      type
    });
  } catch (error) {
    console.log(error);
  }
};
