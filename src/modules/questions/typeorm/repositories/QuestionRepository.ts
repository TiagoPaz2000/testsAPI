import { EntityRepository, Repository } from 'typeorm';
import Question from '../entities/Question';

@EntityRepository(Question)
class QuestionRepository extends Repository<Question> {
  public async findByQuestionAndId(
    question: string,
    id: number,
  ): Promise<Question | undefined> {
    const questionSelected = this.findOne({
      where: {
        question,
        id,
      },
    });

    return questionSelected;
  }
}

export default QuestionRepository;
