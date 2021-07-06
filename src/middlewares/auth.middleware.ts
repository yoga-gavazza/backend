import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '../config';

export const checkJwt = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  // Get the jwt token from the head
  const token = req.headers.auth as string;
  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, authConfig.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    req.user = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, authConfig.jwtSecret, {
    expiresIn: '90d',
  });
  res.setHeader('token', newToken);

  // Call the next middleware or controller
  next();
};
