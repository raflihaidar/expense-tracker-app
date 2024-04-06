import { User, Prisma } from '@prisma/client';
import userModel from '../models/user.model';
import { CreateUserDto } from '../dto/user.dto';

class userService {
  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { fullname, username, password, email } = createUserDto;
    const createUserInput: Prisma.UserCreateInput = {
      fullname,
      username,
      password,
      email,
      report: {
        create: {
          income: 0,
          expense: 0,
          balance: 0
        }
      }
    };
    await userModel.create(createUserInput);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await userModel.getByEmail(email);
  }
}

export default new userService();
