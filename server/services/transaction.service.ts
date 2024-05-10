import { Prisma, Transaction } from '@prisma/client';
import TransactionModel from '../models/transaction.model';
import { CreateTransactionDto, DestroyTransactionDto } from '../dto/transaction.dto';

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

  public async destroyTransaction(deleteTransactionDto: DestroyTransactionDto) {
    const { id } = deleteTransactionDto;

    return await TransactionModel.destroy(id);
  }
}

export default new TransactionService();
