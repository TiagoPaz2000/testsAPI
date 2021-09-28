import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import SentTest from '../typeorm/entities/SentTest';
import SentTestRepository from '../typeorm/repositories/SentTestRepository';
import TestRepository from '../../tests/typeorm/repositories/TestRepository';
import SendMail from '@shared/nodemailer/sendMail';

interface IRequest {
  receiverEmail: string;
  testId: number;
  userId: number;
}

class CreateSentTest {
  public async execute({
    receiverEmail,
    userId,
    testId,
  }: IRequest): Promise<SentTest> {
    const sentTest = getCustomRepository(SentTestRepository);
    const testRepository = getCustomRepository(TestRepository);

    const test = await testRepository.findById(testId);

    if (userId !== test?.user_id)
      throw new AppError(`You don't have permission`);

    const token = 'token';

    const sentTestCreated = await sentTest.create({
      receiver: receiverEmail,
      sender: userId,
      testId,
      token,
    });

    SendMail({
      email: receiverEmail,
      subject: `Prova: ${test.title}`,
      link: `http://localhost:3001/tests/realize/${testId}/${token}`,
    });

    await sentTest.save(sentTestCreated);

    return sentTestCreated;
  }
}

export default CreateSentTest;
