import { Router } from 'express';
import questionRouter from '@modules/questions/routes/question.routes';
import testRouter from '@modules/tests/routes/test.routes';
import userRouter from '@modules/users/routes/user.routes';
import answerRouter from '@modules/answers/routes/answer.routes';

const routes = Router();

routes.use('/questions', questionRouter);
routes.use('/tests', testRouter);
routes.use('/users', userRouter);
routes.use('/answers', answerRouter);

export default routes;
