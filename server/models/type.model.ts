import { Type, Prisma } from '@prisma/client';
import { prisma } from '../common/db';

class TypeModel {
  public async getType(): Promise<Type[] | null> {
    return await prisma.type.findMany();
  }

  public async create(data: Prisma.TypeCreateInput): Promise<Type | null> {
    return await prisma.type.create({
      data
    });
  }
}

export default new TypeModel();
