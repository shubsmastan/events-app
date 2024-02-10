import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyUser = (req: Request, _: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1];

  if (!token || token === '') {
    req.authenticated = false;
    return next();
  }

  let verified: string | JwtPayload;
  try {
    verified = jwt.verify(token!, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    req.authenticated = false;
    return next();
  }

  if (!verified) {
    req.authenticated = false;
    return next();
  }

  req.authenticated = true;
  console.log(verified);
  req.userId = (verified as any).userId;
  return next();
};
