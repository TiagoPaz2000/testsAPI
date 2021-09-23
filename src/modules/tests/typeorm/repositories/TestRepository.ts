import { EntityRepository, Repository } from 'typeorm';
import Test from '../entities/Test';

@EntityRepository(Test)
class TestRepository extends Repository<Test> {
  public async findByTitle(title: string): Promise<Test | undefined> {
    const testSelected = this.findOne({
      where: {
        title,
      },
    });

    return testSelected;
  }
}

export default TestRepository;
