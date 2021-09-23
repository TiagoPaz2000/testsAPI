import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionRouter = Router();
const questionsController = new QuestionsController();

questionRouter.post('/', questionsController.CreateQuestion);

export default questionRouter;
