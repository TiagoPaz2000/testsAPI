import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Test from '../typeorm/entities/Test';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  testId: number;
  userId: number;
}

class GetOneTestService {
  public async execute({
    testId,
    userId,
  }: IRequest): Promise<Test | undefined> {
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    return test;
  }
}

export default GetOneTestService;
