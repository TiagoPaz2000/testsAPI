import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findByEmail(email);

    if (userExists)
      throw new AppError('There is already one test with this name');

    const encryptedPassword = await hash(password, 8);

    const userCreated = await userRepository.create({
      name,
      email,
      password: encryptedPassword,
      role: 'user',
    });

    await userRepository.save(userCreated);

    return userCreated;
  }
}

export default CreateUserService;
