import { NextFunction, Request, Response } from 'express';
import { CreateTransactionDto, DestroyTransactionDto } from '../dto/transaction.dto';
import transactionService from '../services/transaction.service';
import { successResponse, errorResponse } from '../common/response';
import { RESPONSE_CODE } from '../common/code';

interface IParam {
  id: string;
}

export class TransactionController {
  public async view(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const transaction = await transactionService.getTransactionData(id);

      successResponse(res, { transaction });
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }

    next();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      let createTransactionDto: CreateTransactionDto = req.body;
      const transaction = await transactionService.createTransaction(createTransactionDto);

      if (!transaction) {
        errorResponse(res, RESPONSE_CODE.BAD_REQUEST);
      } else {
        successResponse(res, { transaction, message: 'Success adding new transaction' });
      }
    } catch (error: any) {
      console.log(error);
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  public async destroy(req: Request<IParam>, res: Response, next: NextFunction) {
    try {
      let destroyTransactionDto: DestroyTransactionDto = req.params;
      const report = await transactionService.destroyTransaction(destroyTransactionDto);

      successResponse(res, report);
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
      console.log(error);
    }
  }
}
