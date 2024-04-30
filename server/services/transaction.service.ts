import { Prisma, Transaction } from '@prisma/client';
import TransactionModel from '../models/transaction.model';
import { CreateTransactionDto } from '../dto/transaction.dto';

class TransactionService {
  public async getTransactionData(id: string): Promise<Transaction[] | null> {
    return TransactionModel.view(id);
  }

  public async createTransaction(
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction | null> {
    const { description, amount, type_id, user_id, createdAt } = createTransactionDto;

    const createTransactionInput: Prisma.TransactionCreateInput = {
      description,
      amount,
      createdAt,
      user: { connect: { id: user_id } },
      type: { connect: { id: type_id } }
    };

    return await TransactionModel.create(createTransactionInput);
  }
}

export default new TransactionService();
