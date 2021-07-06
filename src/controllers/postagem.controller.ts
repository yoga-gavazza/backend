import { IPostagemModel } from '../models';
import { postagemService, PostagemService } from '../services';
import { BaseController } from './base.controller';

class PostagemController extends BaseController<
  IPostagemModel,
  PostagemService
> {
  constructor() {
    super(postagemService, {
      // keys do req.body que serão usados no create
      create: ['title', 'text', 'date'],
      // keys do req.body que serão usados no update
      update: ['title', 'text', 'date'],
    });
  }
}
export const postagemController = new PostagemController();
