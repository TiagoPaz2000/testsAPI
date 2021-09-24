import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AnswerRepository from '../typeorm/repositories/AnswerRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  testId: number;
  userId: number;
}

class DeleteAnswerService {
  public async execute({ id, testId, userId }: IRequest): Promise<void> {
    const answerRepository = getCustomRepository(AnswerRepository);
    const testRepository = getCustomRepository(TestRepository);

    const answerExists = await answerRepository.findById(id);

    if (!answerExists) throw new AppError(`Don't have a answer with this id`);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    await answerRepository.remove(answerExists);
  }
}

export default DeleteAnswerService;
