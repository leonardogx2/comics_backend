import { AppError } from "@/shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("err", err);

  if (err instanceof AppError) {
    const errors = [
      {
        message: err.message,
        field: err.statusCode,
      },
    ];
    return res.status(err.statusCode).json(errors);
  }

  if (err instanceof multer.MulterError) {
    if ((err as multer.MulterError).code === "LIMIT_FIELD_VALUE") {
      return res.status(400).json({ message: "A imagem é muito grande" });
    } else {
      return res
        .status(500)
        .json({ message: "Erro durante o upload do arquivo" });
    }
  }

  if (err) {
    console.log("db error =>", err.message);
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
}
