import { Transaction, Prisma, Report, User } from '@prisma/client';
import { prisma } from '../common/db';

class TransactionModel {
  public async create(data: Prisma.TransactionCreateInput): Promise<Transaction | null> {
    return prisma.$transaction(async (tx) => {
      const transaction = tx.transaction.create({
        data,
        include: {
          user: {
            include: {
              report: true
            }
          }
        }
      });

      const { type_id, user_id, amount } = await transaction;

      if (type_id === 1) {
        await tx.user.update({
          where: {
            id: user_id
          },
          data: {
            report: {
              update: {
                income: {
                  increment: amount
                },
                balance: {
                  increment: amount
                }
              }
            }
          }
        });
      } else {
        await tx.user.update({
          where: {
            id: user_id
          },
          data: {
            report: {
              update: {
                expense: {
                  increment: amount
                },
                balance: {
                  decrement: amount
                }
              }
            }
          }
        });
      }

      return transaction;
    });
  }
}

export default new TransactionModel();
