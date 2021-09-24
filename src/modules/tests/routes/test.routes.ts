import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import TestController from '../controllers/TestsController';

const testRouter = Router();
const testController = new TestController();

testRouter.post('/', middlewareAuth, testController.CreateQuestion);
testRouter.get('/', middlewareAuth, testController.GetAllTests);
testRouter.get('/:testId', middlewareAuth, testController.GetOneTest);

export default testRouter;
