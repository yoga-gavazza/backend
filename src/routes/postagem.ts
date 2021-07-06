import { Router } from 'express';
import { postagemController } from '../controllers';
import { checkJwt } from '../middlewares';

const routes = Router();

routes.get('/postagem', postagemController.getAll);
routes.get('/postagem/:id', postagemController.getOne);
routes.put('/postagem/:id', postagemController.update);
routes.delete('/postagem/:id', postagemController.delete);
routes.post('/postagem', postagemController.create);

export default routes;
