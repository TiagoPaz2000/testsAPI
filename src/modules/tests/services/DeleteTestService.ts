import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  userId: number;
}

class DeleteTestService {
  public async execute({ id, userId }: IRequest): Promise<void> {
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findByIdAndUserId(id, userId);

    if (!test) throw new AppError(`Don't have a test with this id`);

    await testRepository.remove(test);
  }
}

export default DeleteTestService;
