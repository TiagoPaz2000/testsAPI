import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import tokenSign from '@shared/token/token';

interface IRequest {
  name: string;
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

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (user) throw new AppError('This email already used');

    const encryptedPassword = await hash(password, 8);

    const userCreated = await userRepository.create({
      name,
      email,
      password: encryptedPassword,
      role: 'user',
    });

    await userRepository.save(userCreated);

    const token = tokenSign({
      name: userCreated.name,
      email: userCreated.email,
      id: userCreated.id,
    });

    return { user: { name, email, id: userCreated.id }, token };
  }
}

export default CreateUserService;
