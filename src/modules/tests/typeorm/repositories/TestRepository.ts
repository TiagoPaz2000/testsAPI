import { EntityRepository, Repository } from 'typeorm';
import Test from '../entities/Test';

@EntityRepository(Test)
class TestRepository extends Repository<Test> {
  public async findByTitleAndUserId(
    title: string,
    userId: number,
  ): Promise<Test | undefined> {
    const testSelected = this.findOne({
      where: {
        title,
        user_id: userId,
      },
    });

    return testSelected;
  }

  public async findById(id: number): Promise<Test | undefined> {
    const testSelected = this.findOne({ where: { id } });

    return testSelected;
  }
}

export default TestRepository;
