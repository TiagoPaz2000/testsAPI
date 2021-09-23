import { NextFunction, Request, Response } from 'express';
import CreateTestService from '../services/CreateTestService';

class QuestionsController {
  public async CreateQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { title, categorie, timeLimit } = req.body;
    const { id } = req.user;

    try {
      const createTest = new CreateTestService();

      const testCreated = await createTest.execute({
        title,
        categorie,
        timeLimit,
        userId: +id,
      });

      return res.status(201).json(testCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionsController;
