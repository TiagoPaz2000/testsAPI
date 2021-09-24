import { EntityRepository, Repository } from 'typeorm';
import Question from '../entities/Question';

@EntityRepository(Question)
class QuestionRepository extends Repository<Question> {
  public async findById(id: number): Promise<Question | undefined> {
    const question = this.findOne({ where: { id } });

    return question;
  }

  public async findByQuestionAndId(
    question: string,
    testId: number,
  ): Promise<Question | undefined> {
    const questionSelected = this.findOne({
      where: {
        question,
        testId,
      },
    });

    return questionSelected;
  }
}

export default QuestionRepository;
