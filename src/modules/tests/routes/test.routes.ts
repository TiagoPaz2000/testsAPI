import { Router } from 'express';
import TestController from '../controllers/TestsController';

const testRouter = Router();
const testController = new TestController();

testRouter.post('/', testController.CreateQuestion);

export default testRouter;
