import { EntityRepository, Repository } from 'typeorm';
import SentTest from '../entities/SentTest';

@EntityRepository(SentTest)
class SentTestRepository extends Repository<SentTest> {
  public async findById(id: number): Promise<SentTest | undefined> {
    const test = this.findOne({ where: { id } });

    return test;
  }
}

export default SentTestRepository;
