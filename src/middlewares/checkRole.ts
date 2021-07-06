import { NextFunction, Request, Response } from 'express';
import { authService } from '../services';

const getRole = async (res: Response, next: NextFunction, role: number) => {
  const id = res.locals.jwtPayload.userId;
  try {
    const user = await authService.getById(id);
    if (user && user.role === role) next();
    else res.status(401).send();
  } catch (e) {
    throw new Error('Erro, role não autorizada para acessar a rota');
  }
};

const checkRole = (role: number) => async (_: Request, res: Response, next: NextFunction) => {
  await getRole(res, next, role);
};

export { checkRole };
