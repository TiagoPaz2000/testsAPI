import { getCustomRepository } from 'typeorm';
import Test from '../typeorm/entities/Test';
import TestRepository from '../typeorm/repositories/TestRepository';

interface IRequest {
  userId: number;
}

class GetAllTestService {
  public async execute({ userId }: IRequest): Promise<Test[] | undefined> {
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.find({
      where: { user_id: userId },
    });

    return test;
  }
}

export default GetAllTestService;
