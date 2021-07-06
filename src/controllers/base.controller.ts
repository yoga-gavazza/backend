import { Request, Response } from 'express';
import { BaseService } from '../services/base.service';
import { IBaseModel } from '../models';

export interface IControllerModelKeys<T> {
  create: Array<keyof T>;
  update: Array<keyof T>;
}

export abstract class BaseController<
  A extends IBaseModel,
  S extends BaseService<A>,
> {
  constructor(protected service: S, protected keys: IControllerModelKeys<A>) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const regs = await this.service.getAll();
      res.json(regs);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const model = this.keys.create.reduce(
        (obj, key) => ({ ...obj, ...{ [key]: req.body[key] } }),
        {} as A,
      );
      const reg = await this.service.create(model);
      res.status(201).json(reg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const model = this.keys.update.reduce(
        (obj, key) => ({ ...obj, ...{ [key]: req.body[key] } }),
        {} as A,
      );
      const reg = await this.service.update(id, model);
      res.json(reg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reg = await this.service.getById(id);
      res.json(reg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reg = await this.service.delete(id);
      res.json(reg);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
