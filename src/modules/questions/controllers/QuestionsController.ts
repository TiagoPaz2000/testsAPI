import { NextFunction, Request, Response } from 'express';
import CreateQuestionService from '../services/CreateQuestionService';
import DeleteQuestionService from '../services/DeleteQuestionService';
import GetQuestionsService from '../services/GetQuestionsService';
import UpdateQuestionService from '../services/UpdateQuestionService';

class QuestionsController {
  public async CreateQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { question, categorie, type } = req.body;
    const { testId } = req.params;
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
    const { testId } = req.params;
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

  public async UpdateQuestions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { question, type, categorie } = req.body;
    const { id, testId } = req.params;
    const userId = +req.user.id;

    try {
      const updateQuestion = new UpdateQuestionService();

      const questionUpdated = await updateQuestion.execute({
        id: +id,
        question,
        type,
        categorie,
        testId: +testId,
        userId,
      });

      return res.status(200).json(questionUpdated);
    } catch (error) {
      next(error);
    }
  }

  public async DeleteQuestions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { id, testId } = req.params;
    const userId = +req.user.id;

    try {
      const deleteQuestion = new DeleteQuestionService();

      await deleteQuestion.execute({
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

export default QuestionsController;
