import { NextFunction, Request, Response } from 'express';
import CreateAnswerService from '../services/CreateAnswerService';
import DeleteAnswerService from '../services/DeleteAnswerService';
import GetAnswersServices from '../services/GetAnswerService';
import UpdateAnswerService from '../services/UpdateAnswerService';

class AnswersController {
  public async CreateAnswer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { answer, isRight, question } = req.body;
    const { testId } = req.params;
    const { id } = req.user;

    try {
      const createAnswer = new CreateAnswerService();

      const answerCreated = await createAnswer.execute({
        answer,
        isRight,
        question,
        testId: +testId,
        userId: +id,
      });

      return res.status(201).json(answerCreated);
    } catch (error) {
      next(error);
    }
  }

  public async GetAnswer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { testId, questionId } = req.params;
    const { id } = req.user;

    try {
      const getAnswer = new GetAnswersServices();

      const answer = await getAnswer.execute({
        questionId: +questionId,
        testId: +testId,
        userId: +id,
      });

      return res.status(200).json(answer);
    } catch (error) {
      next(error);
    }
  }

  public async UpdateAnswer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { answer, isRight } = req.body;
    const { testId, id } = req.params;
    const userId = +req.user.id;

    try {
      const updateAnswer = new UpdateAnswerService();

      const answerUpdated = await updateAnswer.execute({
        id: +id,
        answer,
        isRight,
        testId: +testId,
        userId,
      });

      return res.status(200).json(answerUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async DeleteAnswer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { testId, id } = req.params;
    const userId = +req.user.id;

    try {
      const deleteAnswer = new DeleteAnswerService();

      await deleteAnswer.execute({
        id: +id,
        testId: +testId,
        userId,
      });

      return res.status(204).json([]);
    } catch (error) {
      next(error);
    }
  }
}

export default AnswersController;
