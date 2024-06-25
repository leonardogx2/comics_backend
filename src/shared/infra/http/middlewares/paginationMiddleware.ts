import { Request, Response, NextFunction } from "express";

export function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqPage = req.query.page;
  const reqSize = req.query.size;

  const page = reqPage ? parseInt(reqPage as string) : 1;
  const size = reqSize ? parseInt(reqSize as string) : 10;

  req.pagination = { page, size };
  next();
}
