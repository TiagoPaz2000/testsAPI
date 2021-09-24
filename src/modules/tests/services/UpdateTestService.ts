import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Test from '../typeorm/entities/Test';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  title: string;
  categorie: string;
  timeLimit: number;
  userId: number;
}

class UpdateTestService {
  public async execute({
    id,
    title,
    categorie,
    timeLimit,
    userId,
  }: IRequest): Promise<Test> {
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findByIdAndUserId(id, userId);

    if (!test) throw new AppError(`Don't have a test with this id`);

    const testExists = await testRepository.findOne({ where: { title } });

    if (testExists)
      throw new AppError(`There is already one test with this name`);

    test.title = title;
    test.categorie = categorie;
    test.time_limit = timeLimit;

    await testRepository.save(test);

    return test;
  }
}

export default UpdateTestService;
