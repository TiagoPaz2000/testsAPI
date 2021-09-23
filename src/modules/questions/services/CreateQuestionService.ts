import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Question from '../typeorm/entities/Question';
import QuestionRepository from '../typeorm/repositories/QuestionRepository';

interface IRequest {
  question: string;
  categorie: string;
  type: number;
  testId: number;
}

class CreateQuestionService {
  public async execute({
    question,
    categorie,
    type,
    testId,
  }: IRequest): Promise<Question> {
    const questionRepository = getCustomRepository(QuestionRepository);

    const questionExists = await questionRepository.findByQuestionAndId(
      question,
      testId,
    );

    if (questionExists)
      throw new AppError('There is already one question with this name');

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
