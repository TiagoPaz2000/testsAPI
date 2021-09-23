import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import tokenSign from '@shared/token/token';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    id: number;
  };
  token: string;
}
class LoginUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('"Email" or "Password" Incorrect');

    const encryptedPassword = await compare(password, user.password);

    if (!encryptedPassword)
      throw new AppError('"Email" or "Password" Incorrect');

    const token = tokenSign({
      name: user.name,
      email: user.email,
      id: user.id,
    });

    return { user: { name: user.name, email: user.email, id: user.id }, token };
  }
}

export default LoginUserService;
