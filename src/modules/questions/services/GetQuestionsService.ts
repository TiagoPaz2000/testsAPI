import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Question from '../typeorm/entities/Question';
import QuestionRepository from '../typeorm/repositories/QuestionRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  testId: number;
  userId: number;
}

class GetQuestionsService {
  public async execute({
    testId,
    userId,
  }: IRequest): Promise<Question[] | undefined> {
    const questionRepository = getCustomRepository(QuestionRepository);
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const question = await questionRepository.find({
      where: { test_id: testId },
    });

    return question;
  }
}

export default GetQuestionsService;
