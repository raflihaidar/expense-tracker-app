import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import * as dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.TOKEN_SECRET;

export const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' }, (err: Error, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

export const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return reject(createError.Unauthorized(message));
      }
      resolve(payload);
    });
  });
};
