import { Request, Response } from 'express';
import { CreateTransactionDto } from '../dto/transaction.dto';
import transactionService from '../services/transaction.service';

export const view = (req: Request, res: Response) => {
  res.send('Hello Transaction Controller');
};

export const create = async (req: Request, res: Response) => {
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
};
