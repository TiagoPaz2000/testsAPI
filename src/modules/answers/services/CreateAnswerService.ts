import { getCustomRepository } from 'typeorm';
import Answer from '../typeorm/entities/Answer';
import AnswerRepository from '../typeorm/repositories/AnswerRepository';

interface IRequest {
  answer: string;
  isRight: boolean;
  questionId: number;
}

class CreateAnswerService {
  public async execute({
    answer,
    isRight,
    questionId,
  }: IRequest): Promise<Answer> {
    const answerRepository = getCustomRepository(AnswerRepository);

    const answerCreated = await answerRepository.create({
      answer,
      is_right: isRight,
      question_id: questionId,
    });

    await answerRepository.save(answerCreated);

    return answerCreated;
  }
}

export default CreateAnswerService;
