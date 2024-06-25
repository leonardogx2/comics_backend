import { Request, Response, NextFunction } from "express";

export function printMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const date = new Date();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  console.log(`$${hour}:${minutes}:${seconds} Request => ${req.url}`);
  next();
}
