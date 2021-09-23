import { Router } from 'express';
import UserController from '../controllers/UsersController';
import SessionController from '../controllers/SessionController';

const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionController();

userRouter.post('/', userController.CreateUser);
userRouter.post('/login', sessionController.Login);

export default userRouter;
