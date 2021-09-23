import { Request, Response } from 'express';
import CreateTestService from '../services/CreateTestService';

class QuestionsController {
  public async CreateQuestion(req: Request, res: Response): Promise<Response> {
    const { title, categorie, timeLimit } = req.body;

    const createTest = new CreateTestService();

    const testCreated = await createTest.execute({
      title,
      categorie,
      timeLimit,
    });

    return res.status(201).json(testCreated);
  }
}

export default QuestionsController;
