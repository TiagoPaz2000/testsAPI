import { NextFunction, Request, Response } from 'express';
import CreateSentTest from '../services/CreateSentTest';

class QuestionsController {
  public async CreateSentTest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { receiverEmail } = req.body;
    const { testId } = req.params;
    const { id } = req.user;

    try {
      const createSentTest = new CreateSentTest();

      const sentTestCreated = await createSentTest.execute({
        receiverEmail,
        testId: +testId,
        userId: +id,
      });

      return res.status(201).json(sentTestCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionsController;
