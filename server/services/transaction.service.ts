import { Prisma, Transaction } from '@prisma/client';
import TransactionModel from '../models/transaction.model';
import { CreateTransactionDto } from '../dto/transaction.dto';

class TransactionService {
  public async createTransaction(
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction | null> {
    const { description, amount, type_id, user_id } = createTransactionDto;

    const createTransactionInput: Prisma.TransactionCreateInput = {
      description,
      amount,
      createdAt: new Date(),
      user: { connect: { id: user_id } },
      type: { connect: { id: type_id } }
    };

    return await TransactionModel.create(createTransactionInput);
  }
}

export default new TransactionService();
