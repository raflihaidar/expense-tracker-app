import { User, Prisma } from '@prisma/client';
import { prisma } from '../common/db';

class UserModel {
  public async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email
      }
    });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User | null> {
    return await prisma.user.create({
      data,
      include: {
        report: true
      }
    });
  }
}

export default new UserModel();
