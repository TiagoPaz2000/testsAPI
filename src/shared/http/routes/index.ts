import { Router } from 'express';
import questionRouter from '@modules/questions/routes/question.routes';
import testRouter from '@modules/tests/routes/test.routes';
import userRouter from '@modules/users/routes/user.routes';
import answerRouter from '@modules/answers/routes/answer.routes';
import sentTestRouter from '@modules/sentTests/routes/sentTest.routes';

const routes = Router();

routes.use('/api/questions', questionRouter);
routes.use('/api/tests', testRouter);
routes.use('/api/users', userRouter);
routes.use('/api/answers', answerRouter);
routes.use('/api/senttests', sentTestRouter);

export default routes;
