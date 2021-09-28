import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Answer from '../typeorm/entities/Answer';
import AnswerRepository from '../typeorm/repositories/AnswerRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  answer: string;
  isRight: boolean;
  question: any;
  testId: number;
  userId: number;
}

class CreateAnswerService {
  public async execute({
    answer,
    isRight,
    question,
    testId,
    userId,
  }: IRequest): Promise<Answer> {
    const answerRepository = getCustomRepository(AnswerRepository);
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const answerCreated = await answerRepository.create({
      answer,
      is_right: isRight,
      question,
    });

    await answerRepository.save(answerCreated);

    return answerCreated;
  }
}

export default CreateAnswerService;
