import { Router } from 'express';
import questionRouter from '@modules/questions/routes/question.routes';
import testRouter from '@modules/tests/routes/test.routes';
import userRouter from '@modules/users/routes/user.routes';

const routes = Router();

routes.use('/questions', questionRouter);
routes.use('/tests', testRouter);
routes.use('/users', userRouter);

export default routes;
