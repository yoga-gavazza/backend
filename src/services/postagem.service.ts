import { PostagemModel, IPostagemModel } from '../models';
import { BaseService } from './base.service';

export class PostagemService extends BaseService<IPostagemModel> {
  constructor() {
    super(PostagemModel);
  }
}
