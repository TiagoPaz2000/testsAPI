import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import AnswersController from '../controllers/AnswersController';

const answerRouter = Router();
const answersControllers = new AnswersController();

answerRouter.post(
  '/:questionId',
  middlewareAuth,
  answersControllers.CreateQuestion,
);

export default answerRouter;
