import { NextFunction, Request, Response } from 'express';
import LoginUserService from '../services/LoginUserService';

class SessionController {
  public async Login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const { email, password } = req.body;

    try {
      const loginUser = new LoginUserService();
      const user = await loginUser.execute({
        email,
        password,
      });

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default SessionController;
