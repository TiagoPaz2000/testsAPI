import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import QuestionRepository from '../typeorm/repositories/QuestionRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  testId: number;
  userId: number;
}

class DeleteQuestionService {
  public async execute({ id, testId, userId }: IRequest): Promise<void> {
    const questionRepository = getCustomRepository(QuestionRepository);
    const testRepository = getCustomRepository(TestRepository);

    const questionExists = await questionRepository.findById(id);

    if (!questionExists)
      throw new AppError(`Don't have a question with this id`);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    await questionRepository.remove(questionExists);
  }
}

export default DeleteQuestionService;
