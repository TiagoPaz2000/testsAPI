import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionRouter = Router();
const questionsController = new QuestionsController();

questionRouter.post('/', middlewareAuth, questionsController.CreateQuestion);

export default questionRouter;
