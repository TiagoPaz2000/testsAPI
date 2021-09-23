import { Router } from 'express';
import questionRouter from '@modules/questions/routes/question.routes';

const routes = Router();

routes.use('/questions', questionRouter);

export default routes;
