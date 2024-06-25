import { NextFunction, Request, Response } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

export const uploadFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => upload.single("file")(req, res, next);
