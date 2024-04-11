import { Request, Response } from 'express';
import { signAccessToken, verifyAccessToken } from '../utils/jwt';
import userService from '../services/user.service';
import { AuthDto } from '../dto/auth.dto';
import { CreateUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
    let createUserDto: CreateUserDto = req.body;
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await userService.createUser(createUserDto);

    res.status(200).json({
      message: 'Register Success',
      user
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthDto;
  const user = await userService.getUserByEmail(email);

  if (!user) return res.status(404).json({ message: "User Doesn't exist" });

  if (!user.password) return res.status(404).json({ message: 'password not set' });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = {
      username: user?.username,
      password: user?.password
    };
    const token = await signAccessToken(payload);
    return res.status(200).json({
      message: 'Login Success',
      user,
      token
    });
  } else {
    res.status(404).json({ message: 'Wrong password' });
  }
};
