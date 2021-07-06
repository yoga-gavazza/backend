import { UserModel, IUserModel } from '../models';
import { BaseService } from './base.service';

export class UserService extends BaseService<IUserModel> {
  constructor() {
    super(UserModel);
  }

  getByUsername(username: string): Promise<IUserModel | null> {
    return this.BaseModel.findOne({ username }).exec();
  }
}
