import { Transaction, Prisma } from '@prisma/client';
import { prisma } from '../common/db';

class TransactionModel {
  public async view(id: string): Promise<Transaction[] | null> {
    return prisma.transaction.findMany({
      where: {
        user_id: id
      }
    });
  }

  public async create(data: Prisma.TransactionCreateInput): Promise<Transaction | null> {
    return prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data,
        include: {
          user: {
            include: {
              report: true
            }
          }
        }
      });

      const { type_id, user_id, amount } = transaction;

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

  public async destroy(id: string): Promise<Transaction | null> {
    return await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.delete({
        where: {
          id
        },
        include: {
          user: {
            include: {
              report: true
            }
          }
        }
      });

      const { type_id, user_id, amount } = transaction;

      if (type_id === 1) {
        await tx.user.update({
          where: {
            id: user_id
          },
          data: {
            report: {
              update: {
                income: {
                  decrement: amount
                },
                balance: {
                  decrement: amount
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
                  decrement: amount
                },
                balance: {
                  increment: amount
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
