import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import AnswersController from '../controllers/AnswersController';

const answerRouter = Router();
const answersControllers = new AnswersController();

answerRouter.post(
  '/:testId/:questionId',
  middlewareAuth,
  answersControllers.CreateAnswer,
);
answerRouter.get(
  '/:testId/:questionId',
  middlewareAuth,
  answersControllers.GetAnswer,
);
answerRouter.put(
  '/:testId/:id',
  middlewareAuth,
  answersControllers.UpdateAnswer,
);
answerRouter.delete(
  '/:testId/:id',
  middlewareAuth,
  answersControllers.DeleteAnswer,
);

export default answerRouter;
