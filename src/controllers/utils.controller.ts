import { Request, Response } from 'express';

export default class UtilsController {
  ping = (_: Request, res: Response): void => {
    res.json({ message: 'Pong' });
  };
}

export const utilsController = new UtilsController();
