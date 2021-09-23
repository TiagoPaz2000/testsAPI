import { NextFunction, Request, Response } from 'express';
import CreateQuestionService from '../services/CreateQuestionService';

class QuestionsController {
  public async CreateQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { question, categorie, type, testId } = req.body;

    try {
      const createQuestion = new CreateQuestionService();

      const questionCreated = await createQuestion.execute({
        question,
        categorie,
        type,
        testId: +testId,
      });

      return res.status(201).json(questionCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionsController;
