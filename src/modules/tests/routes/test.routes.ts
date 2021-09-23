import middlewareAuth from '@shared/token/middlewareAuth';
import { Router } from 'express';
import TestController from '../controllers/TestsController';

const testRouter = Router();
const testController = new TestController();

testRouter.post('/', middlewareAuth, testController.CreateQuestion);

export default testRouter;
