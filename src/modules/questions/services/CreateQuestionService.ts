import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Question from '../typeorm/entities/Question';
import QuestionRepository from '../typeorm/repositories/QuestionRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  question: string;
  categorie: string;
  type: number;
  testId: number;
  userId: number;
}

class CreateQuestionService {
  public async execute({
    question,
    categorie,
    type,
    testId,
    userId,
  }: IRequest): Promise<Question> {
    const questionRepository = getCustomRepository(QuestionRepository);
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const questionExists = await questionRepository.findByQuestionAndId(
      question,
      testId,
    );

    if (questionExists)
      throw new AppError('There is already a question with this name');

    const questionCreated = await questionRepository.create({
      question,
      categorie,
      type,
      testId,
    });

    await questionRepository.save(questionCreated);

    return questionCreated;
  }
}

export default CreateQuestionService;
