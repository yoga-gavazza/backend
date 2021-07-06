import { Request, Response } from 'express';
import { IUserModel } from '../models';
import { authService, userService, UserService } from '../services';
import { BaseController } from './base.controller';

class UserController extends BaseController<IUserModel, UserService> {
  constructor() {
    super(userService, {
      // keys do req.body que serão usados no create
      create: [
        'name',
        'foto',
        'email',
        'telefone',
        'sobre',
        'username',
        'password',
      ],
      // keys do req.body que serão usados no update
      update: [
        'name',
        'foto',
        'email',
        'telefone',
        'sobre',
        'username',
        'password',
      ],
    });
  }

  create = async (req: Request, res: Response) => {
    try {
      const model = this.keys.create.reduce(
        (obj, key) => ({ ...obj, ...{ [key]: req.body[key] } }),
        {} as any,
      );
      model.password = await authService.hashPassword(model.password);
      const reg = await this.service.create(model);
      res.status(201).json(reg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.json(token);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export const userController = new UserController();
