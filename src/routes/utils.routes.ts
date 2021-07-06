import { Router } from 'express';
import { utilsController } from '@controllers';

const routes = Router();

routes.get('/ping', utilsController.ping);

export default routes;
