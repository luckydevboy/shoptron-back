import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

export default catchAsync;
