import AppError from '@shared/errors/AppError';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface ITokenPayload {
  iat: number;
  exp: number;
  email: string;
  name: string;
  id: string;
}

const middlewareAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;
  const JWT_SECRET = 'secretoken';

  if (!authorization) throw new AppError('Token is required');

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { email, name, id } = decodedToken as ITokenPayload;

    req.user = { email, name, id };

    return next();
  } catch (error) {
    throw new AppError('Invalid Token');
  }
};

export default middlewareAuth;
