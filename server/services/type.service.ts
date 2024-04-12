import { Prisma } from '@prisma/client';
import TypeModel from '../models/type.model';

class TypeService {
  public async getType(): Promise<void> {
    await TypeModel.getType();
  }

  public async createType(name: string): Promise<void> {
    const createTypeInput: Prisma.TypeCreateInput = {
      name
    };

    await TypeModel.create(createTypeInput);
  }
}

export default new TypeService();
