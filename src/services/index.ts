import { AuthService } from './auth.service';
import { PostagemService } from './postagem.service';
import { UserService } from './user.service';

const postagemService = new PostagemService();
const userService = new UserService();
const authService = new AuthService();

export {
  postagemService,
  PostagemService,
  userService,
  UserService,
  authService,
  AuthService,
};
