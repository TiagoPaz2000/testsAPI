import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Answer from '../typeorm/entities/Answer';
import AnswerRepository from '../typeorm/repositories/AnswerRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  answer: string;
  isRight: boolean;
  testId: number;
  userId: number;
}

class UpdateAnswerService {
  public async execute({
    id,
    answer,
    isRight,
    testId,
    userId,
  }: IRequest): Promise<Answer> {
    const answerRepository = getCustomRepository(AnswerRepository);
    const testRepository = getCustomRepository(TestRepository);

    const answerExists = await answerRepository.findById(id);

    if (!answerExists) throw new AppError(`Don't have a answer with this id`);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    answerExists.answer = answer;
    answerExists.is_right = isRight;

    await answerRepository.save(answerExists);

    return answerExists;
  }
}

export default UpdateAnswerService;
