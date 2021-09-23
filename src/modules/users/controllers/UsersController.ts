import { NextFunction, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async CreateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { name, email, password } = req.body;

    try {
      const createUser = new CreateUserService();
      const userCreated = await createUser.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(userCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
