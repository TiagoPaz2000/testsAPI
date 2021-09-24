import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionRouter = Router();
const questionsController = new QuestionsController();

questionRouter.post(
  '/:testId',
  middlewareAuth,
  questionsController.CreateQuestion,
);
questionRouter.get(
  '/:testId',
  middlewareAuth,
  questionsController.GetQuestions,
);
questionRouter.put(
  '/:testId/:id',
  middlewareAuth,
  questionsController.UpdateQuestions,
);
questionRouter.delete(
  '/:testId/:id',
  middlewareAuth,
  questionsController.DeleteQuestions,
);

export default questionRouter;
