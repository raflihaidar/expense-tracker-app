import { NextFunction, Request, Response } from 'express';
import { CreateTransactionDto, DestroyTransactionDto } from '../dto/transaction.dto';
import transactionService from '../services/transaction.service';

interface IParam {
  id: string;
}

export const view = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionData(id);

    res.status(200).json({
      message: 'get data transaction success',
      transaction
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let createTransactionDto: CreateTransactionDto = req.body;
    const transaction = await transactionService.createTransaction(createTransactionDto);

    res.status(200).json({
      message: 'Success adding new transaction',
      transaction
    });
  } catch (error) {
    console.log(error);
  }

  next();
};

export const destroy = async (req: Request<IParam>, res: Response, next: NextFunction) => {
  try {
    let destroyTransactionDto: DestroyTransactionDto = req.params;
    await transactionService.destroyTransaction(destroyTransactionDto);

    res.status(200).json({
      message: 'Success Delete Transaction'
    });
  } catch (error) {
    console.log(error);
  }
};
