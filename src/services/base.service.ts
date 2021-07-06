import { Model } from 'mongoose';
import { IBaseModel } from '../models';

export abstract class BaseService<A extends IBaseModel> {
  constructor(protected BaseModel: Model<A>) {}

  async getAll() {
    const res = await this.BaseModel.find();
    return res;
  }

  async getById(id: string) {
    try {
      const reg = await this.BaseModel.findById(id);
      if (reg) {
        return reg;
      }
      throw new Error('Objeto não encontrado');
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(model: Object) {
    try {
      const res = await this.BaseModel.create(model);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      // const reg = await this.BaseModel.findById(id).exec();
      // reg.delete();
      const reg = await this.BaseModel.findOneAndDelete({ _id: id } as any).exec();
      if (reg) {
        return reg;
      }
      throw new Error('Objeto não encontrado');
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, model: Object) {
    try {
      const reg = await this.BaseModel.findById(id);
      if (reg) {
        Object.assign(reg, model); // pega os dados de "model" e joga para "reg"
        const res = await reg.save();
        return res;
      }
      throw new Error('Objeto não encontrado');
    } catch (error) {
      throw new Error(error);
    }
  }
}
