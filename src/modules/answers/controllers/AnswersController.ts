import { NextFunction, Request, Response } from 'express';
import CreateAnswerService from '../services/CreateAnswerService';

class AnswersController {
  public async CreateQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { answer, isRight } = req.body;
    const { questionId } = req.params;

    try {
      const createAnswer = new CreateAnswerService();

      const answerCreated = await createAnswer.execute({
        answer,
        isRight,
        questionId: +questionId,
      });

      return res.status(201).json(answerCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default AnswersController;
