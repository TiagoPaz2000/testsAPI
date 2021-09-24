import { EntityRepository, Repository } from 'typeorm';
import Answer from '../entities/Answer';

@EntityRepository(Answer)
class AnswerRepository extends Repository<Answer> {
  public async findByQuestionId(
    questionId: number,
  ): Promise<Answer | undefined> {
    const answerSelected = this.findOne({
      where: {
        question_id: questionId,
      },
    });

    return answerSelected;
  }
}

export default AnswerRepository;
