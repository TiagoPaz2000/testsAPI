import { EntityRepository, Repository } from 'typeorm';
import Answer from '../entities/Answer';

@EntityRepository(Answer)
class AnswerRepository extends Repository<Answer> {
  public async findById(id: number): Promise<Answer | undefined> {
    const answerSelected = this.findOne({
      where: {
        id,
      },
    });

    return answerSelected;
  }

  public async findAllByQuestionId(
    questionId: number,
  ): Promise<Answer[] | undefined> {
    const answers = this.find({ where: { question_id: questionId } });

    return answers;
  }
}

export default AnswerRepository;
