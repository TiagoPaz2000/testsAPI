import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import SentTestController from '../controllers/SentTestsController';

const sentTestRouter = Router();
const sentTestController = new SentTestController();

sentTestRouter.post(
  '/:testId',
  middlewareAuth,
  sentTestController.CreateSentTest,
);

export default sentTestRouter;
