import { NextFunction, Request, Response } from 'express';
import CreateTestService from '../services/CreateTestService';
import GetAllTestService from '../services/GetAllTestService';
import GetOneTestService from '../services/GetOneTestService';
import UpdateTestService from '../services/UpdateTestService';

class TestsController {
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

  public async GetOneTest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { testId } = req.params;
    const { id } = req.user;

    try {
      const getTest = new GetOneTestService();

      const test = await getTest.execute({
        testId: +testId,
        userId: +id,
      });

      return res.status(200).json(test);
    } catch (error) {
      next(error);
    }
  }

  public async GetAllTests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { id } = req.user;

    try {
      const getAllTests = new GetAllTestService();

      const test = await getAllTests.execute({
        userId: +id,
      });

      return res.status(200).json(test);
    } catch (error) {
      next(error);
    }
  }

  public async UpdateTest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { title, categorie, timeLimit } = req.body;
    const { id } = req.params;
    const userId = +req.user.id;
    try {
      const getAllTests = new UpdateTestService();

      const test = await getAllTests.execute({
        id: +id,
        title,
        categorie,
        timeLimit,
        userId,
      });

      return res.status(204).json(test);
    } catch (error) {
      next(error);
    }
  }
}

export default TestsController;
