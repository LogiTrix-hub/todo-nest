import { NextFunction, Request, Response } from 'express';

export const FunctionalMiddlewareLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Functional Logger: "${req.url}";\nMethod: "${req.method}"`);
  next();
};
