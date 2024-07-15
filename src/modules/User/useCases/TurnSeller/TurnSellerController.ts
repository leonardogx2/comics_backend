import { Request, Response } from "express";
import { makeTurnSellerUseCase } from ".";

export class TurnSellerController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;

    const turnSellerUseCase = makeTurnSellerUseCase();
    await turnSellerUseCase.execute(userId);
    return res.status(204).end();
  }
}
