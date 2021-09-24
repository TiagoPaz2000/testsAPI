import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Answer from '../typeorm/entities/Answer';
import AnswerRepository from '../typeorm/repositories/AnswerRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  questionId: number;
  testId: number;
  userId: number;
}

class GetAnswersServices {
  public async execute({
    questionId,
    testId,
    userId,
  }: IRequest): Promise<Answer[] | undefined> {
    const answerRepository = getCustomRepository(AnswerRepository);
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const answers = answerRepository.findAllByQuestionId(questionId);

    return answers;
  }
}

export default GetAnswersServices;
