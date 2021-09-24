import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Question from '../typeorm/entities/Question';
import QuestionRepository from '../typeorm/repositories/QuestionRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';

interface IRequest {
  id: number;
  question: string;
  categorie: string;
  type: number;
  testId: number;
  userId: number;
}

class UpdateQuestionService {
  public async execute({
    id,
    question,
    categorie,
    type,
    testId,
    userId,
  }: IRequest): Promise<Question> {
    const questionRepository = getCustomRepository(QuestionRepository);
    const testRepository = getCustomRepository(TestRepository);

    const questionExists = await questionRepository.findById(id);

    if (!questionExists)
      throw new AppError(`Don't have a question with this id`);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const questionNamed = await questionRepository.findByQuestionAndId(
      question,
      testId,
    );

    if (questionNamed)
      throw new AppError(`There is already a question with this name`);

    questionExists.question = question;
    questionExists.type = type;
    questionExists.categorie = categorie;

    await questionRepository.save(questionExists);

    return questionExists;
  }
}

export default UpdateQuestionService;
