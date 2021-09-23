import { Request, Response } from 'express';
import CreateQuestionService from '../services/CreateQuestionService';

class QuestionsController {
  public async CreateQuestion(req: Request, res: Response): Promise<Response> {
    const { question, categorie, type, testId } = req.body;
    // const { testId } = req.params;
    const createQuestion = new CreateQuestionService();
    console.log(question, categorie, type, testId);
    const questionCreated = await createQuestion.execute({
      question,
      categorie,
      type,
      testId: +testId,
    });

    return res.status(201).json(questionCreated);
  }
}

export default QuestionsController;
