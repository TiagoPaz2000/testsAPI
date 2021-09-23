import { Router } from 'express';
import UserController from '../controllers/UsersController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.CreateUser);

export default userRouter;
