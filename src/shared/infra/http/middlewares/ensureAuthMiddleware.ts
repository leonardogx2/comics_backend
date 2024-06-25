import { databaseRepositories } from "@/database";
import { AppError } from "@/shared/errors/AppError";
import { JWT_SECRET } from "@/shared/utils/env";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization as string;

  if (!authHeader) {
    return next(new AppError("Usuario inválido!", 403));
  }

  const [, token] = authHeader.split(" ");

  try {
    const { userId } = verify(token, JWT_SECRET) as { userId: string };
    const userRepository = new databaseRepositories.UserRepository();

    const userExists = await userRepository.findById(userId);
    if (!userExists) return next(new AppError("Usuário inválido", 403));

    req.user = {
      id: userId,
      isSeller: userExists.isSeller,
      isAdmin: userExists.isAdmin,
      email: userExists.email,
    };
  } catch (err) {
    return next(new AppError("Usuário inválido!", 403));
  }
  next();
}
