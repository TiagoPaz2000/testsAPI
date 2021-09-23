import { Router } from 'express';
import questionRouter from '@modules/questions/routes/question.routes';
import testRouter from '@modules/tests/routes/test.routes';

const routes = Router();

routes.use('/questions', questionRouter);
routes.use('/tests', testRouter);

export default routes;
