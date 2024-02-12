import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyUser = (req: Request, _: Response, next: NextFunction) => {
  const token = req.get('Authorization');

  if (!token || token === '') {
    req.authenticated = false;
    return next();
  }

  let verified: string | JwtPayload;
  try {
    verified = jwt.verify(token!, process.env.JWT_SECRET!);
  } catch (err) {
    req.authenticated = false;
    return next();
  }

  if (!verified) {
    req.authenticated = false;
    return next();
  }

  req.authenticated = true;
  req.userId = (verified as JwtPayload).userId;
  return next();
};
