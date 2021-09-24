import { NextFunction, Request, Response } from 'express';
import CreateQuestionService from '../services/CreateQuestionService';
import GetQuestionsService from '../services/GetQuestionsService';

class QuestionsController {
  public async CreateQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { question, categorie, type, testId } = req.body;
    const { id } = req.user;

    try {
      const createQuestion = new CreateQuestionService();

      const questionCreated = await createQuestion.execute({
        question,
        categorie,
        type,
        testId: +testId,
        userId: +id,
      });

      return res.status(201).json(questionCreated);
    } catch (error) {
      next(error);
    }
  }

  public async GetQuestions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { testId } = req.body;
    const { id } = req.user;

    try {
      const getQuestion = new GetQuestionsService();

      const question = await getQuestion.execute({
        testId: +testId,
        userId: +id,
      });

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionsController;
