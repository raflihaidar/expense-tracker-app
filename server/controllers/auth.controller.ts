import { Request, Response } from 'express';
import { signAccessToken, verifyAccessToken } from '../utils/jwt';
import userService from '../services/user.service';
import { AuthDto } from '../dto/auth.dto';
import { CreateUserDto } from '../dto/user.dto';
import { successResponse, errorResponse } from '../common/response';
import { RESPONSE_CODE } from '../common/code';
import bcrypt from 'bcrypt';

export class AuthController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      let createUserDto: CreateUserDto = req.body;
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = await userService.createUser(createUserDto);

      successResponse(res, user);
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as AuthDto;
      const user = await userService.getUserByEmail(email);

      if (!user) return errorResponse(res, RESPONSE_CODE.NOT_FOUND, "User Doesn't exist");

      if (!user.password) return errorResponse(res, RESPONSE_CODE.NOT_FOUND, 'password not set');

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const payload = {
          username: user?.username,
          password: user?.password
        };
        const token = await signAccessToken(payload);
        successResponse(res, { user, token });
      } else {
        errorResponse(res, RESPONSE_CODE.UNAUTHORIZED, 'Wrong password');
      }
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}
