import { Request, Response } from 'express';
import { prisma } from '../models/index';
import { signAccessToken, verifyAccessToken } from '../utils/jwt';
import userService from '../services/user.service';
import { AuthDto } from '../dto/auth.dto';
import { CreateUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  const { fullname, username, unHasPassword, email } = req.body;
  const password = await bcrypt.hash(unHasPassword, 10);
  const createUserDto: CreateUserDto = {
    fullname,
    username,
    password,
    email
  };
  const user = await userService.createUser(createUserDto);

  res.status(200).json({
    message: 'Register Success',
    user
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthDto;
  const user = await userService.getUserByEmail(email);

  if (!user) return res.status(404).json({ message: "User Doesn't exist" });

  if (!user.password) return res.status(404).json({ message: 'password not set' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(password);

  if (isPasswordValid) {
    const payload = {
      username: user?.username,
      password: user?.password
    };
    const token = await signAccessToken(payload);
    console.log(token);
    return res.status(200).json({
      message: 'Login Success',
      user,
      token
    });
  } else {
    res.status(404).json({ message: 'Wrong password' });
  }
};
