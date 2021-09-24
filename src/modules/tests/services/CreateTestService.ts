import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Test from '../typeorm/entities/Test';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  title: string;
  categorie: string;
  timeLimit: number;
  userId: number;
}

class CreateQuestionService {
  public async execute({
    title,
    categorie,
    timeLimit,
    userId,
  }: IRequest): Promise<Test> {
    const testRepository = getCustomRepository(TestRepository);

    const testExists = await testRepository.findByTitleAndUserId(title, userId);

    if (testExists)
      throw new AppError('There is already one test with this name');

    const testCreated = await testRepository.create({
      title,
      categorie,
      time_limit: timeLimit,
      user_id: userId,
    });

    await testRepository.save(testCreated);

    return testCreated;
  }
}

export default CreateQuestionService;
