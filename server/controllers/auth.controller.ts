import { Request, Response } from 'express';
import { prisma } from '../models/index';
import { signAccessToken, verifyAccessToken } from '../utils/jwt';
import bcrypt from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  const { fullname, username, password, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      fullname,
      username,
      password: hashPassword,
      email,
      report: {
        create: {
          income: 0,
          expense: 0,
          balance: 0
        }
      }
    }
  });

  res.status(200).json({
    message: 'Register Success',
    user
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

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
