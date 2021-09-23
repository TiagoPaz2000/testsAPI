import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Test from '../typeorm/entities/Test';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  title: string;
  categorie: string;
  timeLimit: number;
}

class CreateQuestionService {
  public async execute({
    title,
    categorie,
    timeLimit,
  }: IRequest): Promise<Test> {
    const testRepository = getCustomRepository(TestRepository);

    const testExists = await testRepository.findByTitle(title);

    if (testExists)
      throw new AppError('There is already one test with this name');

    const testCreated = await testRepository.create({
      title,
      categorie,
      time_limit: timeLimit,
    });

    await testRepository.save(testCreated);

    return testCreated;
  }
}

export default CreateQuestionService;
